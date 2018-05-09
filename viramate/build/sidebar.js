"use strict";
var raidListUpdateInterval = 30000;
var raidListUpdateBackoff = 1350;
var raidListUpdateCounter = 25;
var statusPanelUpdateIntervalSeconds = 30;
var minimumBuffUpdateIntervalSeconds = 70;
var currentRaidListUpdateInterval = raidListUpdateInterval;
var updateRaidsPanel = null, invalidateRaidList = null, doUpdateRaidsPanel = null, updateItemsPanel = null, invalidateItems = null, doUpdateItemsPanel = null;
var updateBuffsWhen = 0, isUpdatingBuffs = false;
var queuedRaidClick = null;
var pendingRaidUpdate = null;
var nextRaidUpdateWhen = null;
var menuIconSize = 0;
var menuLeftEdge = 0;
var subpanelOffset = 0;
var mostRecentItems = null;
var lastPlayerStatus = null;
var statusIntervalH, raidTimerIntervalH;
var allBookmarks = {};
function bookmarkNavigate(target, evt) {
    var inNewWindow = false;
    if (evt) {
        inNewWindow = (evt.button === 1) ||
            !!evt.shiftKey;
    }
    if (inNewWindow) {
        // HACK: Fully resolve the URL
        var elt = document.createElement("a");
        elt.href = target;
        sendExtensionMessage({ type: "openNewTab", url: elt.href });
    }
    else {
        sendExtensionMessage({ type: "setLastLocation", url: target });
        window.location.href = target;
    }
}
;
function repeatLastQuest(evt, callback) {
    sendExtensionMessage({ type: "getRecentQuest" }, function (recentQuestJson) {
        if (!recentQuestJson) {
            if (callback)
                callback(false, "No recent quest to attempt");
            else
                return showBookmarkError("No recent quest to attempt.");
        }
        var recentQuest;
        try {
            recentQuest = JSON.parse(recentQuestJson);
        }
        catch (exc) {
            if (callback)
                callback(false, "No recent quest to attempt");
            else
                return showBookmarkError("No recent quest to attempt.");
        }
        var parts = splitQuestId(recentQuest.quest_id);
        var chapterId = parts[0];
        var suffix = parts[1];
        var itemId = recentQuest.use_item_id;
        if (itemId)
            itemId = parseInt(itemId);
        else
            itemId = undefined;
        var data = makeBookmarkCore(chapterId, suffix, recentQuest.quest_type, itemId, recentQuest.prefix);
        checkQuestStart(data, function (ok, result, reason) {
            if (ok) {
                bookmarkNavigate(data.targetUrl, evt);
                setTimeout(function () {
                    if (callback)
                        callback(true);
                    window.location.reload();
                }, 50);
            }
            else {
                if (callback)
                    callback(false, reason);
                else
                    return showBookmarkError(reason);
            }
        });
    });
}
;
function makeBookmarkCore(chapterId, questSuffix, questType, useItemId, urlPrefix) {
    var questId = String(chapterId) + String(questSuffix);
    if (!urlPrefix) {
        urlPrefix = "/#quest";
    }
    var targetUrl = urlPrefix + "/supporter/" + questId + "/" + questType;
    if (useItemId)
        targetUrl += "/0/" + useItemId;
    var infoUrl = "/quest/treasure_raid/" + chapterId + "/" + questId;
    // FIXME: The /1/ here is the raid type
    var checkStartUrl = "/quest/check_quest_start/" + chapterId + "/1/" + questId;
    return {
        chapterId: chapterId,
        questId: questId,
        targetUrl: targetUrl,
        infoUrl: infoUrl,
        checkStartUrl: checkStartUrl
    };
}
;
function showBookmarkError(message, extra) {
    showGamePopup({
        title: "Bookmark",
        body: message + (extra ? "<br>" + String(extra) : "")
    });
}
;
function startRaid(data, evt) {
    log("Starting raid", data.targetUrl);
    bookmarkNavigate(data.targetUrl, evt);
}
;
function checkQuestStart_old(data, onSuccess) {
    checkQuestStart(data, function (ok, eligibility, reason) {
        if (ok)
            onSuccess(data, eligibility);
        else
            showBookmarkError(reason);
    });
}
function checkQuestStart(data, callback) {
    log("Checking eligibility", data.checkStartUrl);
    doClientAjax(data.checkStartUrl, function (eligibility, error) {
        if (!eligibility)
            return showBookmarkError("Failed to get information from server", error);
        switch (eligibility.result) {
            case "ok":
                callback(true, eligibility);
                return;
            case "error_cnt":
                callback(false, eligibility, "You have already attempted this raid the maximum number of times today.");
                return;
            case "other_quest_progress":
                callback(false, eligibility, "You cannot start this raid because another quest is in progress.");
                return;
            case "error_level":
                callback(false, eligibility, "Your rank is too low to start this raid.");
                return;
            default:
                try {
                    var blob = JSON.parse(eligibility);
                    if (blob.popup && blob.popup.body) {
                        callback(false, eligibility, blob.popup.body);
                        return;
                    }
                }
                catch (exc) {
                    callback(false, eligibility, "Unknown error");
                }
        }
    });
}
;
function makeRaidBookmark(chapterId, questSuffix) {
    var data = makeBookmarkCore(chapterId, questSuffix, 1);
    return function (evt) {
        checkQuestStart_old(data, function (data, eligibility) {
            startRaid(data, evt);
        });
    };
}
;
function getRaidInfo(data, onSuccess) {
    log("Requesting raid info", data.infoUrl);
    doClientAjax(data.infoUrl, function (raidInfo, error) {
        if (!raidInfo)
            return showBookmarkError("Failed to get information from server", error);
        onSuccess(data, raidInfo);
    });
}
;
function makeTreasureRaidBookmark(chapterId, questSuffix, itemId) {
    var data = makeBookmarkCore(chapterId, questSuffix, 1, itemId);
    return function (evt) {
        getRaidInfo(data, function (data, raidInfo) {
            var treasureIndex = raidInfo.treasure_id.indexOf(String(itemId));
            if (treasureIndex < 0)
                return showBookmarkError("Item not found in raid info");
            var itemsNeeded = parseInt(raidInfo.consume[treasureIndex]);
            var itemsHeld = raidInfo.num[treasureIndex];
            if (itemsHeld < itemsNeeded)
                return showBookmarkError(raidInfo.chapter_name + " requires " +
                    itemsNeeded + " of " +
                    raidInfo.treasure_name[treasureIndex] +
                    ", but you only have " + itemsHeld);
            checkQuestStart_old(data, function (data, eligibility) {
                startRaid(data, evt);
            });
        });
    };
    /*
    {
        "chapter_id":"30005",
        "quest_id":"300051",
        "type":"1",
        "action_point":"50",
        "chapter_name":"Tiamat Omega Showdown",
        "consume":["3"],
        "level":30,
        "treasure_id":["18"],
        "treasure_image_id":["18"],
        "treasure_name":["Tiamat Omega Anima"],
        "num":[26],
        "raid_name":"Lvl 50 Tiamat Omega",
        "limit":90
    }
    */
}
;
function visitCurrentEvent(evt, tail) {
    sendExtensionMessage({ type: "getCurrentEvent" }, function (currentEvent) {
        if (!currentEvent)
            showGamePopup({
                title: "Error",
                body: "No event stored. Try visiting the main page."
            });
        else if (tail)
            bookmarkNavigate("/#" + currentEvent + tail, evt);
        else
            bookmarkNavigate("/#" + currentEvent, evt);
    });
}
;
function makeGuildWarBookmark(tail) {
    return function (evt) {
        bookmarkNavigate("/#event/" + guildWarName + (tail || ""), evt);
    };
}
;
function makeGuildWarRaidBookmark(chapterId, questSuffix, checkItem) {
    var data = makeBookmarkCore(chapterId, questSuffix, 1);
    var checkItemFn, checkStartFn, visitSupporterPageFn, checkMultiStart;
    checkItemFn = function (evt, onComplete) {
        if (window.location.href.indexOf("event/" + guildWarName) < 0) {
            if (onComplete)
                onComplete(false);
            return bookmarkNavigate("#event/" + guildWarName, evt);
        }
        data.targetUrl = data.targetUrl.replace("#quest/", "#event/" + guildWarName + "/");
        if (!data.targetUrl.endsWith("/0"))
            data.targetUrl += "/0";
        var checkUrl = "/" + guildWarName + "/rest/top/check_item/" + data.questId;
        doClientAjax(checkUrl, function (checkResult) {
            if (checkResult && checkResult.result)
                return checkStartFn(evt, onComplete);
            else {
                if (onComplete)
                    onComplete(false);
                return showBookmarkError("You do not have the necessary items to start this quest.");
            }
        });
    };
    checkStartFn = function (evt, onComplete) {
        checkQuestStart_old(data, function (data, eligibility) {
            if (eligibility.result === "ok")
                checkMultiStart(evt, onComplete);
            else {
                if (onComplete)
                    onComplete(false);
                return showBookmarkError("You are not eligible to start this quest. " + eligibility.result);
            }
        });
    };
    checkMultiStart = function (evt, onComplete) {
        var checkUrl = "/quest/check_multi_start";
        doClientAjax(checkUrl, JSON.stringify({ quest_id: parseInt(data.questId) }), function (checkResult) {
            if (checkResult && checkResult.result === "ok")
                return visitSupporterPageFn(evt, onComplete);
            else {
                if (onComplete)
                    onComplete(false);
                return showBookmarkError("You cannot start a raid.");
            }
        });
    };
    visitSupporterPageFn = function (evt, onComplete) {
        if (window.location.href.indexOf("event/" + guildWarName) < 0) {
            if (onComplete)
                onComplete(false);
            return bookmarkNavigate("#event/" + guildWarName, evt);
        }
        else {
            if (onComplete)
                onComplete(true);
            startRaid(data, evt);
        }
    };
    if (!checkItem)
        return visitSupporterPageFn;
    return checkItemFn;
}
;
function makeEventTreasureRaidBookmark(chapterId, questSuffix) {
    return function (evt) {
        sendExtensionMessage({ type: "getCurrentEvent" }, function (currentEvent) {
            if (!currentEvent)
                showGamePopup({
                    title: "Error",
                    body: "No event stored. Try visiting the main page."
                });
            var data = makeBookmarkCore(chapterId, questSuffix, 1);
            data.targetUrl = data.targetUrl.replace("#quest/", "#" + currentEvent + "/");
            checkQuestStart_old(data, function (data, eligibility) {
                startRaid(data, evt);
            });
        });
    };
}
;
var guildWarName = null;
var guildWarSubmenu = {
    "guild-war-home": makeGuildWarBookmark(),
    "guild-war-gacha": makeGuildWarBookmark("/gacha/index"),
    "guild-war-reward": makeGuildWarBookmark("/reward"),
};
var menuItems = {
    "home": "/#mypage",
    "party": "/#party/index/0/npc/0",
    "mystuff": {
        "inventory": "/#list",
        "stash": "/#container",
        "crate": "/#present",
        "supplies": "/#item",
    },
    "quest": {
        "quest-all": "/#quest/index",
        "quest-special": "/#quest/extra",
        "join-raid": "/#quest/assist",
        "event": visitCurrentEvent,
        "trial-battles": "/#trial_battle",
        "pending-raids": "/#quest/assist/unclaimed",
    },
    "quest-repeat": repeatLastQuest,
    "guild-war": guildWarSubmenu,
    "hard-raids": {
        "hard-tia": makeRaidBookmark(30004, 1),
        "hard-colo": makeRaidBookmark(30009, 1),
        "hard-levi": makeRaidBookmark(30015, 1),
        "hard-yugu": makeRaidBookmark(30019, 1),
        "hard-chev": makeRaidBookmark(30022, 1),
        "hard-cel": makeRaidBookmark(30025, 1)
    },
    "magna-raids": {
        "magna-tia": makeTreasureRaidBookmark(30005, 1, 18),
        "magna-colo": makeTreasureRaidBookmark(30010, 1, 19),
        "magna-levi": makeTreasureRaidBookmark(30016, 1, 20),
        "magna-yugu": makeTreasureRaidBookmark(30026, 1, 21),
        "magna-chev": makeTreasureRaidBookmark(30027, 1, 26),
        "magna-cel": makeTreasureRaidBookmark(30028, 1, 31)
    },
    "hl-raids": {
        "hl-tia": makeTreasureRaidBookmark(30044, 1, 32),
        "hl-colo": makeTreasureRaidBookmark(30049, 1, 47),
        "hl-levi": makeTreasureRaidBookmark(30051, 1, 48),
        "hl-yugu": makeTreasureRaidBookmark(30053, 1, 49),
        "hl-chev": makeTreasureRaidBookmark(30056, 1, 50),
        "hl-cel": makeTreasureRaidBookmark(30058, 1, 51),
        "hl-rosequeen": makeTreasureRaidBookmark(30047, 1, 1204),
    },
    "primal-raids": {
        "nataku": makeTreasureRaidBookmark(30042, 1, 1343),
        "flame-glass": makeTreasureRaidBookmark(30041, 1, 1313),
        "macula-marius": makeTreasureRaidBookmark(30038, 1, 1323),
        "athena": makeTreasureRaidBookmark(30107, 1, 1313),
        "medusa": makeTreasureRaidBookmark(30039, 1, 1333),
        "apollo": makeTreasureRaidBookmark(30043, 1, 1353),
        "olivia": makeTreasureRaidBookmark(30040, 1, 1363),
        "odin": makeTreasureRaidBookmark(30046, 1, 1353),
    },
    "coop": {
        "coop": "/#coopraid",
        // This makes it impossible to return to an existing room
        // "coop-host": "/#coopraid/room/entry",
        "coop-join": "/#coopraid/offer",
        "coop-shop": "/#coopraid/lineup"
    },
    "me": {
        "profile": "/#profile",
        "crew": "/#guild",
        "friends": "/#friend",
        "trophies": "/#title"
    },
    "shop": {
        "shop-mobacoins": "#shop/moba/0",
        "shop-crystals": "#shop/lupi/0",
        "shop-points": "/#shop/exchange/points",
        "shop-trajectory": "#shop/exchange/trajectory",
        "shop-moon": "#shop/exchange/moon",
        "shop-treasure": "#shop/exchange/list",
        "shop-whale-tears": "#shop/exchange/ceiling",
        "shop-weapon-series": "#archaic",
    },
    "casino": {
        "poker": "/#casino/list/poker",
        "bingo": "/#casino/list/bingo",
        "casino-shop": "/#casino/exchange"
    },
};
var viramateMenuItems = {
    "settings": function () {
        var loc = chrome.extension.getURL("src/options_custom/index.html");
        var w = window.open(loc);
    },
    "update-notes": function () {
        var loc = chrome.extension.getURL("content/changelog.html");
        var w = window.open(loc);
    }
};
function isHorizontalLayout() {
    return (isMobileSite() ||
        !!currentSettings.horizontalBookmarks ||
        !!document.getElementById("gree-game-container"));
}
;
function makeMenuHandler(name, value, tryCloseMenu) {
    var result;
    if (typeof (value) === "string")
        result = function (evt) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            tryCloseMenu();
            bookmarkNavigate(value, evt);
        };
    else if (value && value.call && value.apply)
        result = function (evt) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            tryCloseMenu();
            value(evt);
        };
    else
        return null;
    allBookmarks[name] = result;
    return result;
}
;
function _updateIconSize(menuIcon) {
    if (isHorizontalLayout())
        menuIcon.style.left = menuLeftEdge.toFixed(0) + "px";
    else
        menuIcon.style.left = "-6px";
    var iconRect = menuIcon.getBoundingClientRect();
    if (isHorizontalLayout())
        menuIconSize = iconRect.width * getEffectiveZoom(menuIcon) * getEffectiveZoom(document.documentElement);
    else
        menuIconSize = iconRect.height * getEffectiveZoom(menuIcon);
}
;
function getColorForMenuItem(key) {
    switch (key) {
        case "hard-raids":
            return "#efc0ba";
        case "magna-raids":
            return "#e8e8f1";
        case "hl-raids":
            return "#efe0ba";
    }
    var dashPos = key.lastIndexOf("-");
    var suffix = key.substr(dashPos + 1);
    switch (suffix) {
        case "tia":
            return "#bfefbf";
        case "yugu":
            return "#efdfa0";
        case "colo":
            return "#efbfbf";
        case "levi":
            return "#bfcfef";
        case "cel":
            return "#d890df";
    }
    return null;
}
;
function showViraButton() {
    if (isShutdown)
        return;
    injectStylesheet("sidebar-shadow.css", getUiContainer());
    var outImg = getResourceUrl('vira-small-smile.png');
    var overImg = getResourceUrl('vira-small.png');
    var isCustomIcon = false;
    try {
        if (currentSettings.bookmarksInactiveIcon)
            outImg = encoding.Base64.stringToImageURL(currentSettings.bookmarksInactiveIcon);
        if (currentSettings.bookmarksActiveIcon)
            overImg = encoding.Base64.stringToImageURL(currentSettings.bookmarksActiveIcon);
        isCustomIcon = (currentSettings.bookmarksActiveIcon || currentSettings.bookmarksInactiveIcon);
    }
    catch (exc) {
        log("Error decoding custom bookmarks icons", exc);
    }
    var menuIcon = document.createElement("div");
    var mainMenu = document.createElement("div");
    menuIcon.className = "viramate-menu-icon";
    // HACK: Why is this necessary?
    menuIcon.style.backgroundRepeat = "no-repeat";
    menuIcon.style.backgroundImage = "url(" + outImg + ")";
    menuIcon.setAttribute("title", "DMCAmate");
    var maxIconWidth = isCustomIcon ? 64 : 56;
    // HACK: :after selectors don't work on img. html sucks.
    var tempImage = document.createElement("img");
    tempImage.style.opacity = "0.0";
    tempImage.onload = function () {
        var scale = 1.0;
        if (tempImage.naturalWidth > maxIconWidth)
            scale = maxIconWidth / tempImage.naturalWidth;
        menuIcon.style.width = (tempImage.naturalWidth * scale).toFixed(0) + "px";
        menuIcon.style.height = (tempImage.naturalHeight * scale).toFixed(0) + "px";
        uninjectElement(getUiContainer(), tempImage);
        _updateIconSize(menuIcon);
        _layoutPanels();
    };
    tempImage.src = outImg;
    injectElement(getUiContainer(), tempImage);
    var paddingSize = 100;
    if (typeof (currentSettings.bookmarksIconPadding) === "number")
        paddingSize = currentSettings.bookmarksIconPadding;
    if (isHorizontalLayout()) {
        menuIcon.style.paddingRight = Math.max(paddingSize - 12, 0).toFixed(0) + "px";
    }
    else {
        menuIcon.style.paddingBottom = Math.max(paddingSize - 12, 0).toFixed(0) + "px";
    }
    mainMenu.className = "viramate-menu";
    if (typeof (currentSettings.bookmarksSize) === "number")
        menuIcon.style.transform = "scale(" + currentSettings.bookmarksSize.toFixed(1) + ")";
    if (typeof (currentSettings.bookmarksMenuSize) === "number")
        mainMenu.style.transform = "scale(" + currentSettings.bookmarksMenuSize.toFixed(1) + ")";
    // mainMenu.style.zoom = menuIcon.style.zoom = (1 / getEffectiveZoom(document.documentElement)).toFixed(2);
    var mouseIsOverIcon = false;
    var mouseIsOverMenu = 0;
    var mouseIsOverSubmenu = 0;
    var menuIsVisible = false;
    var allMenus = [mainMenu];
    var updateTimeout = 0;
    var autoOpenDelay = isHorizontalLayout() ? 260 : 160;
    var autoCloseDelay = currentSettings.openBookmarksOnClick ? 500 : 250;
    var pamrklamr = function () {
        return 5 * 1000 + (Math.random() * 1600 * 1000);
    };
    var fmajrlialmsk;
    fmajrlialmsk = function () {
        if (isShutdown)
            return;
        if (isCustomIcon)
            return;
        if (!menuIsVisible) {
            menuIcon.style.backgroundImage = "url(" + getResourceUrl('hfgk/askpmr/vxgkql.png') + ")";
            window.setTimeout(function () {
                menuIcon.style.backgroundImage = "url(" + getResourceUrl('hfgk/qw3mkl/vqprlm.png') + ")";
            }, 60);
            window.setTimeout(function () {
                menuIcon.style.backgroundImage = "url(" + getResourceUrl('hfgk/askpmr/vxgkql.png') + ")";
            }, 950);
            window.setTimeout(function () {
                menuIcon.style.backgroundImage = "url(" + outImg + ")";
            }, 1060);
        }
        window.setTimeout(fmajrlialmsk, pamrklamr());
    };
    window.setTimeout(fmajrlialmsk, pamrklamr());
    var showMenu = function (menu) {
        if (menu.className.indexOf("viramate-menu") === 0)
            menu.style.left = menuLeftEdge.toFixed(0) + "px";
        else
            menu.style.left = "0px";
        menu.style.opacity = "1.0";
        menu.style.pointerEvents = "all";
        menuIsVisible = true;
    };
    var showMenus = function () {
        menuIcon.style.backgroundImage = "url(" + overImg + ")";
        if (menuIcon.className.indexOf("open") < 0)
            menuIcon.className += " open";
        for (var i = 0; i < allMenus.length; i++) {
            var elt = allMenus[i];
            showMenu(elt);
        }
    };
    var hideMenu = function (menu) {
        if (!isMobileSite()) {
            if (menu.className.indexOf("viramate-menu") === 0)
                menu.style.left = (menuLeftEdge - 32).toFixed(0) + "px";
            else
                menu.style.left = "-32px";
        }
        menu.style.opacity = "0.0";
        menu.style.pointerEvents = "none";
        menuIsVisible = false;
    };
    var hideMenus = function () {
        menuIcon.style.backgroundImage = "url(" + outImg + ")";
        menuIcon.className = menuIcon.className.replace(" open", "");
        closeSubmenus();
        hideMenu(allMenus[0]);
    };
    var closeSubmenus = function () {
        // Hide any other open submenus
        for (var i = 1; i < allMenus.length; i++) {
            var submenu = allMenus[i];
            if (submenu.owner)
                submenu.owner.className = submenu.owner.className.replace(" open", "");
            hideMenu(submenu);
        }
        // Pop them off the list
        allMenus.length = 1;
    };
    var openSubmenu = function (owner, submenu) {
        owner.className += " open";
        submenu.owner = owner;
        closeSubmenus();
        allMenus.push(submenu);
        showMenus();
    };
    var updateMenu = function () {
        if (isShutdown)
            return;
        if (mouseIsOverIcon || (mouseIsOverMenu > 0)) {
            if (mouseIsOverSubmenu <= 0)
                closeSubmenus();
            showMenus();
        }
        else
            hideMenus();
    };
    var scheduleUpdate = function (fast) {
        if (updateTimeout)
            window.clearTimeout(updateTimeout);
        updateTimeout = window.setTimeout(updateMenu, fast ? autoOpenDelay : autoCloseDelay);
    };
    var makeSubmenuOverHandler = function (item, submenu) {
        return function (evt) {
            mouseIsOverSubmenu += 1;
            openSubmenu(item, submenu);
        };
    };
    var makeSubmenuOutHandler = function (item, submenu) {
        return function (evt) {
            mouseIsOverSubmenu -= 1;
            // TODO: Anything?
            scheduleUpdate();
        };
    };
    var tryCloseMenu = function () {
        hideMenus();
        window.clearTimeout(updateTimeout);
    };
    menuIcon.addEventListener("click", function () {
        showMenus();
    }, false);
    menuIcon.addEventListener("mouseover", function () {
        mouseIsOverIcon = true;
        if (!isMobileSite() &&
            (currentSettings.openBookmarksOnClick !== true))
            scheduleUpdate(true);
    }, false);
    menuIcon.addEventListener("mouseout", function () {
        mouseIsOverIcon = false;
        scheduleUpdate();
    }, false);
    mainMenu.addEventListener("mouseover", function () {
        mouseIsOverMenu += 1;
    }, false);
    mainMenu.addEventListener("mouseout", function () {
        mouseIsOverMenu -= 1;
        scheduleUpdate();
    }, false);
    var isGuildWar = currentSettings.currentGuildWar &&
        (currentSettings.currentGuildWar.indexOf("event/teamraid") === 0);
    if (isGuildWar) {
        guildWarName = currentSettings.currentGuildWar.replace("event/", "");
        var raidJson = currentSettings.currentGuildWarRaidInfo;
        if (raidJson) {
            var raids = JSON.parse(raidJson);
            for (var k in raids) {
                var raidInfo = raids[k];
                var raidKey = "guild-war-" + (raidInfo.isHell ? "hell-" + raidInfo.cost : "dog");
                var mark = makeGuildWarRaidBookmark(raidInfo.id, 1, raidInfo.isHell);
                if (raidInfo.isHell)
                    mark.itemText = raidInfo.name + " " + raidInfo.cost + "AP";
                else
                    mark.itemText = raidInfo.name;
                guildWarSubmenu[raidKey] = mark;
            }
        }
    }
    allBookmarks = {};
    var populateSubmenu;
    populateSubmenu = function (container, items, isSubmenu, extraClassNames) {
        if (isSubmenu) {
            if (Object.keys(items).length > 4)
                container.style.columnCount = "2";
        }
        for (var k in items) {
            if (!items.hasOwnProperty(k))
                continue;
            var v = items[k];
            // HACK: Only show guild war submenu during guild war
            if ((v === guildWarSubmenu) &&
                (!isGuildWar || !currentSettings.showGuildWarMenu))
                continue;
            var elt = document.createElement("li");
            elt.className = "viramate-menu-item";
            if (extraClassNames)
                elt.className += " " + extraClassNames;
            elt.setAttribute("key", k);
            var label = v.itemText || i18n.get("m-" + k);
            elt.textContent = label;
            var color = getColorForMenuItem(k);
            if (color)
                elt.style.color = color;
            if (v && (typeof (v) === "object")) {
                // Submenu
                elt.className += " has-submenu";
                var submenu = document.createElement("ul");
                submenu.className = "viramate-submenu";
                submenu.addEventListener("mouseover", function () {
                    mouseIsOverSubmenu += 1;
                }, false);
                submenu.addEventListener("mouseout", function () {
                    mouseIsOverSubmenu -= 1;
                    scheduleUpdate();
                }, false);
                elt.addEventListener("mouseover", makeSubmenuOverHandler(elt, submenu), false);
                elt.addEventListener("mouseout", makeSubmenuOutHandler(elt, submenu), false);
                hideMenu(submenu);
                populateSubmenu(submenu, v, true);
                container.appendChild(submenu);
            }
            else {
                // Item
                elt.addEventListener("mouseup", makeMenuHandler(k, v, tryCloseMenu), true);
                elt.addEventListener("tap", makeMenuHandler(k, v, tryCloseMenu), false);
            }
            container.appendChild(elt);
        }
        ;
    };
    var ul = document.createElement("ul");
    mainMenu.appendChild(ul);
    populateSubmenu(ul, menuItems, false);
    var langSelectorEn = document.createElement("li");
    var langSelectorJp = document.createElement("li");
    langSelectorEn.className = "language-menu-item en";
    langSelectorJp.className = "language-menu-item jp";
    langSelectorEn.textContent = "English";
    langSelectorJp.textContent = "日本語";
    langSelectorEn.title = langSelectorJp.title = i18n.get("m-set-language");
    langSelectorEn.addEventListener("click", makeLanguageSetter(2), true);
    langSelectorJp.addEventListener("click", makeLanguageSetter(1), true);
    ul.appendChild(langSelectorEn);
    ul.appendChild(langSelectorJp);
    var versionText = document.createElement("span");
    versionText.className = "viramate-version";
    ul.appendChild(versionText);
    populateSubmenu(ul, viramateMenuItems, false, "small");
    hideMenus();
    if (isHorizontalLayout()) {
        menuIcon.className += " horizontal";
        mainMenu.className += " horizontal";
        var trySpawn = function () {
            if (isShutdown)
                return true;
            var gameContainer = getGameContainer();
            var wrapper = gameContainer.querySelector(".wrapper");
            if (!gameContainer || !wrapper)
                return false;
            var effectiveZoom = getEffectiveZoom(gameContainer);
            var documentZoom = getEffectiveZoom(document.documentElement);
            menuLeftEdge = parseFloat(wrapper.parentNode.getAttribute("data-show-menubar-width")) || 0;
            if ((wrapper.getBoundingClientRect().left === 0) || currentSettings.hideMobageSidebar)
                menuLeftEdge = 0;
            var effectiveSidebarHeight = 48;
            if (isMobileSite()) {
                effectiveSidebarHeight /= documentZoom;
                getOverlayContainer().style.zoom = (1 / documentZoom).toFixed(3);
            }
            wrapper.style.marginTop = (effectiveSidebarHeight / effectiveZoom).toFixed(0) + "px";
            // FIXME: prt-quest-header scene css selector:
            // .log .prt-quest-header has position 'fixed' so it slides under horizontal bar
            return true;
        };
        if (!trySpawn())
            window.setTimeout(trySpawn, 500);
    }
    injectElement(getUiContainer(), menuIcon);
    injectElement(getUiContainer(), mainMenu);
    sendExtensionMessage({ type: "getVersion" }, function (version) {
        var text = "DMCAmate " + version;
        if (isMobileSite())
            text += " (mobile)";
        versionText.textContent = text;
    });
    window.setTimeout(function () {
        if (isShutdown)
            return;
        _updateIconSize(menuIcon);
        getUserIdAndTabIdAsync(showStatusPanel);
    }, 25);
}
;
var primeHaloRequestIsPending = false;
var primeHaloStartsWhen = null, primeHaloStartsWhenText = null;
var needHaloPanelLayout = false;
function navigateToExtraQuests() {
    window.location.href = "/#quest/extra";
}
;
function updateClock(element) {
    var jstHourMinute = {
        timeZone: "Asia/Tokyo",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    };
    var text = new Date().toLocaleString("ja-JP", jstHourMinute) + " JST";
    var timeText = element.time;
    if (!timeText) {
        element.time = timeText = document.createElement("span");
        element.appendChild(timeText);
    }
    var c = (currentSettings.clockBrightness * 255).toFixed(0);
    var ct = "rgb(" + c + ", " + c + ", " + c + ")";
    timeText.style.color = ct;
    timeText.textContent = text;
    /*

    var haloText = element.halo;
    if (!haloText) {
        element.appendChild(document.createElement("br"));

        element.halo = haloText = document.createElement("span");
        haloText.className = "halo-timer";
        element.appendChild(haloText);

        haloText.addEventListener("click", navigateToExtraQuests, false);
    }

    if (primeHaloStartsWhen) {
        var now = Date.now();

        if (!primeHaloStartsWhenText) {
            var temp = new Date(primeHaloStartsWhen);
            primeHaloStartsWhenText = temp.toLocaleString("ja-JP", jstHourMinute);
        }

        if (primeHaloStartsWhen < now) {
            // Prime halo is active
            c = (currentSettings.clockBrightness * 255).toFixed(0);
            var c2 = (currentSettings.clockBrightness * 210).toFixed(0);
            haloText.textContent = "\u2605 Halo"
            haloText.style.color = "rgb(" + c + ", " + c + ", " + c2 + ")";
            haloText.style.fontWeight = "bold";
        } else {
            // Prime halo starts soon
            c = (currentSettings.clockBrightness * 220).toFixed(0);
            haloText.textContent = "\u2605H " + primeHaloStartsWhenText;
            haloText.style.color = "rgb(" + c + ", " + c + ", " + c + ")";
            haloText.style.fontWeight = "normal";
        }
    } else {
        haloText.textContent = "";
    }

    */
    if (needHaloPanelLayout) {
        _layoutPanels();
        needHaloPanelLayout = false;
    }
}
;
function showStatusPanel(uid) {
    var panel = document.createElement("div");
    panel.className = "viramate-status-panel";
    // panel.style.zoom = (1 / getEffectiveZoom(document.documentElement)).toFixed(2);
    var clock = null;
    if (currentSettings.clockBrightness >= 0.05) {
        clock = document.createElement("span");
        clock.className = "time";
        panel.appendChild(clock);
    }
    if (currentSettings.statusPanel) {
        var meters = document.createElement("div");
        meters.className = "meters";
        var createMeter = function (name, withShadow) {
            var meter = document.createElement("div");
            meter.className = "meter " + name + "-meter";
            meter.title = name.toUpperCase();
            var fill = document.createElement("div");
            fill.className = "fill";
            meter.fill = fill;
            meter.appendChild(fill);
            if (withShadow) {
                var shadow = document.createElement("div");
                shadow.className = "fill shadow";
                meter.shadow = shadow;
                meter.appendChild(shadow);
            }
            panel[name + "Meter"] = meter;
            meters.appendChild(meter);
        };
        panel.appendChild(meters);
        createMeter("rp", false);
        createMeter("ap", true);
        createMeter("bp", true);
        if (currentSettings.statusPanelBuffs) {
            var buffsPanel = panel.buffs = document.createElement("div");
            buffsPanel.className = "buffs";
            panel.appendChild(buffsPanel);
        }
    }
    if (currentSettings.itemsPanel) {
        var itemsPanel = panel.items = document.createElement("div");
        itemsPanel.className = "items";
        if (currentSettings.largeItemsPanel)
            itemsPanel.className += " large-items";
        panel.appendChild(itemsPanel);
    }
    if (clock)
        window.setInterval(function () { updateClock(clock); }, 1000);
    if (isHorizontalLayout())
        panel.className += " horizontal";
    injectElement(getUiContainer(), panel);
    if (currentSettings.raidsPanel)
        showRaidsPanel(uid);
    _layoutPanels();
    invalidateStatus = function () {
        sendExtensionMessage({ type: "invalidateStatus", uid: uid });
    };
    if (currentSettings.itemsPanel) {
        invalidateItems = function (items) {
            _invalidateItems(panel, uid, items);
        };
        updateItemsPanel = function () {
            _updateItemsPanel(panel, uid);
        };
        doUpdateItemsPanel = function (items) {
            _doUpdateItemsPanel(panel, uid, items);
        };
    }
    if (currentSettings.statusPanel) {
        updateStatusPanel = function (force, lazy) {
            if (isCombatPage(window.location.hash))
                return;
            else if (window.location.hash.indexOf("result_") >= 0)
                return;
            else if (window.location.hash.indexOf("coopraid/room") >= 0)
                return;
            _updateStatusPanel(panel, uid, force, lazy);
        };
        doUpdateStatusPanel = function (status) {
            _doUpdateStatusPanel(panel, status);
        };
        doUpdateGuildSupportBuffs = function (buffs) {
            _doUpdateGuildSupportBuffs(panel, uid, buffs);
        };
        doUpdatePersonalSupportBuffs = function (buffs) {
            _doUpdatePersonalSupportBuffs(panel, uid, buffs);
        };
        invalidateSupportBuffs = function () {
            _invalidateSupportBuffs(panel, uid);
        };
        var lazyUpdate = function () {
            if (isShutdown) {
                window.clearInterval(statusIntervalH);
                return;
            }
            updateStatusPanel(false, true);
        };
        statusIntervalH = window.setInterval(lazyUpdate, statusPanelUpdateIntervalSeconds * 1000);
        // HACK: We need to delay this a bit so the page can finish loading
        window.setTimeout(lazyUpdate, 1250);
    }
    _layoutPanels();
}
;
function _layoutPanels() {
    var uic = getUiContainer();
    var statusPanel = uic.querySelector("div.viramate-status-panel");
    var raidsPanel = uic.querySelector("div.viramate-raids-panel");
    if (!statusPanel)
        return;
    if (isHorizontalLayout()) {
        subpanelOffset = menuIconSize + 4;
        statusPanel.style.left = (menuLeftEdge).toFixed(0) + "px";
        statusPanel.style.paddingLeft = subpanelOffset.toFixed(0) + "px";
        var meters = statusPanel.querySelector("div.meters");
        var buffs = statusPanel.querySelector("div.buffs");
        var items = statusPanel.querySelector("div.items");
        if (meters) {
            meters.style.left = (subpanelOffset + 64).toFixed(0) + "px";
        }
        if (buffs) {
            buffs.style.left = (subpanelOffset + 128 + 4).toFixed(0) + "px";
            if (items)
                items.style.left = (subpanelOffset + 128 + buffs.clientWidth + 8).toFixed(0) + "px";
        }
        else if (items) {
            items.style.left = (subpanelOffset + 128 + 4).toFixed(0) + "px";
        }
        if (raidsPanel) {
            var bw = 0, iw = 0;
            if (buffs)
                bw = buffs.clientWidth;
            if (items)
                iw = items.clientWidth;
            if (bw)
                bw += 2;
            if (iw)
                iw += 2;
            if (buffs)
                raidsPanel.style.left = (128 + bw + iw + menuLeftEdge + subpanelOffset + 8).toFixed(0) + "px";
            else if (meters)
                raidsPanel.style.left = (128 + iw + menuLeftEdge + subpanelOffset + 8).toFixed(0) + "px";
            else
                raidsPanel.style.left = (64 + menuLeftEdge + subpanelOffset + 8).toFixed(0) + "px";
        }
    }
    else {
        subpanelOffset = menuIconSize + 12;
        statusPanel.style.top = subpanelOffset.toFixed(0) + "px";
        if (raidsPanel)
            raidsPanel.style.top = (statusPanel.clientHeight + subpanelOffset).toFixed(0) + "px";
    }
}
;
function _roundDown(value, decimals) {
    var mult = Math.pow(10, decimals);
    value *= mult;
    value = Math.floor(value);
    value /= mult;
    return value.toFixed(decimals);
}
;
function _setWidth(elt, fraction) {
    if (fraction < 0)
        fraction = 0;
    else if (fraction > 1)
        fraction = 1;
    var newWidth = (fraction * 100).toFixed(2) + "%";
    if (elt.style.width !== newWidth)
        elt.style.width = newWidth;
}
;
function _invalidateSupportBuffs(panel, uid) {
    var msg = { type: "invalidateBuffs", uid: uid };
    sendExtensionMessage(msg);
    updateBuffsWhen = Date.now() + 2000;
}
;
function _doUpdatePersonalSupportBuffs(panel, uid, buffs) {
    if (isShutdown)
        return;
    var msg = { type: "updatePersonalBuffs", uid: uid, buffs: buffs };
    sendExtensionMessage(msg);
    window.setTimeout(function () {
        _updateStatusPanel(panel, uid, false, true);
    }, 1000);
}
;
function _doUpdateGuildSupportBuffs(panel, uid, buffs) {
    if (isShutdown)
        return;
    var msg = { type: "updateGuildBuffs", uid: uid, buffs: buffs };
    sendExtensionMessage(msg);
    window.setTimeout(function () {
        _updateStatusPanel(panel, uid, false, true);
    }, 1000);
}
;
function _doUpdateStatusPanel(panel, status) {
    lastPlayerStatus = status;
    var ap = status._precise_ap;
    var bp = status._precise_bp;
    panel.apMeter.setAttribute("text", _roundDown(ap, 1));
    _setWidth(panel.apMeter.fill, Math.floor(ap) / parseInt(status.max_action_point));
    _setWidth(panel.apMeter.shadow, ap / parseInt(status.max_action_point));
    panel.bpMeter.setAttribute("text", _roundDown(bp, 0));
    _setWidth(panel.bpMeter.fill, Math.floor(bp) / parseInt(status.max_battle_point));
    _setWidth(panel.bpMeter.shadow, bp / parseInt(status.max_battle_point));
    panel.rpMeter.setAttribute("text", status.levelGauge);
    panel.rpMeter.fill.style.width = status.levelGauge;
    if (currentSettings.statusPanelBuffs)
        _doUpdateBuffsPanel(panel, status);
    _layoutPanels();
}
;
function _doUpdateBuffsPanel(panel, status) {
    var buffsPanel = panel.buffs;
    buffsPanel.textContent = "";
    var buffs = status.buffs;
    if (!buffs || !buffs.length)
        return;
    var x = 0, y = 0;
    var count = 0;
    var nextBuffUpdateMinutes = null;
    for (var i = 0, l = buffs.length; i < l; i++) {
        var buff = buffs[i];
        var elt = document.createElement("div");
        elt.className = "viramate-buff";
        elt.style.backgroundImage = "url('" + buff.imageUrl + "')";
        elt.style.left = x.toFixed(0) + "px";
        elt.style.top = y.toFixed(0) + "px";
        var minutesLeft = ((buff.timeRemaining / 1000) / 60);
        if (nextBuffUpdateMinutes === null)
            nextBuffUpdateMinutes = minutesLeft;
        else
            nextBuffUpdateMinutes = Math.min(minutesLeft, nextBuffUpdateMinutes);
        if (minutesLeft < 90)
            elt.setAttribute("remaining", minutesLeft.toFixed(0));
        else if (currentSettings.statusPanelExpiringBuffs)
            continue;
        if (minutesLeft > 60) {
            elt.title = buff.comment + " - " +
                (minutesLeft / 60).toFixed(1) + " hour(s) remaining";
        }
        else {
            elt.title = buff.comment + " - " +
                minutesLeft.toFixed(0) + " minute(s) remaining";
        }
        if (isHorizontalLayout()) {
            if (y >= 24) {
                y = 0;
                x += 24;
            }
            else {
                y += 24;
            }
        }
        else {
            if (x >= 32) {
                x = 0;
                y += 32;
            }
            else {
                x += 32;
            }
        }
        count++;
        buffsPanel.appendChild(elt);
    }
    if (nextBuffUpdateMinutes) {
        updateBuffsWhen = Math.max(updateBuffsWhen, Date.now() + ((nextBuffUpdateMinutes * 60 * 1000) + (59 * 1000)));
        var nextUpdateSeconds = (updateBuffsWhen - Date.now()) / 1000;
        if (nextUpdateSeconds <= 120)
            log("Updating buffs in " + nextUpdateSeconds.toFixed(0) + " second(s)");
    }
    if (isHorizontalLayout()) {
        buffsPanel.style.width = (Math.ceil(count / 2) * 24).toFixed(0) + "px";
    }
    else {
        buffsPanel.style.height = (Math.ceil(count / 2) * 32).toFixed(0) + "px";
    }
}
;
function _maybeRequestBuffsFromServer() {
    if (!currentSettings.statusPanelBuffs)
        return;
    if (isUpdatingBuffs)
        return;
    var now = Date.now();
    var shouldUpdateBuffs = now > updateBuffsWhen;
    if (!shouldUpdateBuffs)
        return;
    isUpdatingBuffs = true;
    updateBuffsWhen = now + (minimumBuffUpdateIntervalSeconds * 1000);
    var updateCounter = 2;
    doClientAjax("/guild_main/support_all_info/", function () {
        updateCounter--;
        if (updateCounter <= 0)
            isUpdatingBuffs = false;
    });
    doClientAjax("/shop_exchange/activated_personal_supports/", function () {
        updateCounter--;
        if (updateCounter <= 0)
            isUpdatingBuffs = false;
    });
}
;
function _updateStatusPanel(panel, uid, force, lazy) {
    if (isShutdown)
        return;
    var msg = { type: "getStatus", uid: uid, force: !!force, lazy: !!lazy };
    sendExtensionMessage(msg, function (status) {
        if (status) {
            _doUpdateStatusPanel(panel, status);
            _maybeRequestBuffsFromServer();
            _updateItemsPanel(panel, uid);
        }
        else
            log("Failed to get status");
    });
}
;
function showRaidsPanel(uid) {
    if (isShutdown)
        return;
    var panel = document.createElement("div");
    panel.className = "viramate-raids-panel";
    // panel.style.zoom = (1 / getEffectiveZoom(document.documentElement)).toFixed(2);
    if (isHorizontalLayout())
        panel.className += " horizontal";
    var cdt = document.createElement("div");
    panel.countdownTimer = cdt;
    cdt.className = "countdown-timer";
    if (isHorizontalLayout()) {
        cdt.style.height = "0px";
    }
    else {
        cdt.style.width = "0px";
    }
    injectElement(getUiContainer(), panel);
    raidTimerIntervalH = window.setInterval(function () {
        if (isShutdown) {
            window.clearInterval(raidTimerIntervalH);
            return;
        }
        updateRaidTimer(panel);
    }, 750);
    updateRaidsPanel = function () {
        _updateRaidsPanel(panel, uid, false);
    };
    invalidateRaidList = function (raids) {
        _invalidateRaidList(panel, uid, raids);
    };
    doUpdateRaidsPanel = function (raids) {
        _doUpdateRaidsPanel(panel, raids);
    };
    if (!pendingRaidUpdate)
        window.setTimeout(updateRaidsPanel, 1000);
}
;
function maybeScheduleNextRaidUpdate(panel) {
    if (isShutdown)
        return;
    if (pendingRaidUpdate) {
        updateRaidTimer(panel);
        return;
    }
    nextRaidUpdateWhen = null;
    if (!lastPlayerStatus) {
        pendingRaidUpdate = window.setTimeout(updateRaidsPanel, 3000);
        nextRaidUpdateWhen = Date.now() + 3000;
    }
    else if (raidListUpdateCounter-- >= 0) {
        currentRaidListUpdateInterval += raidListUpdateBackoff;
        // console.log("raid list update; next in " + (currentRaidListUpdateInterval / 1000).toFixed(1) + "s");
        pendingRaidUpdate = window.setTimeout(updateRaidsPanel, currentRaidListUpdateInterval);
        nextRaidUpdateWhen = Date.now() + currentRaidListUpdateInterval;
    }
    else {
        log("raid list updates disabled because player is idle");
        _doUpdateRaidsPanel(panel, null);
    }
    updateRaidTimer(panel);
}
;
function shouldShowRaidsPanel() {
    // return true;
    return !isCombatPage(window.location.hash) &&
        (window.location.hash.indexOf("#coopraid/room") < 0) &&
        (window.location.hash.indexOf("#result_") < 0) &&
        (window.location.hash.indexOf("quest/supporter") < 0);
}
;
function updateRaidTimer(panel) {
    var ct = panel.countdownTimer;
    var remaining = nextRaidUpdateWhen - Date.now();
    if (shouldShowRaidsPanel() && nextRaidUpdateWhen && (raidListUpdateCounter > 0)) {
        var total = currentRaidListUpdateInterval;
        var fraction = 1.0 - Math.max(Math.min(remaining / total, 1.0), 0.0);
        if (isHorizontalLayout())
            ct.style.height = (fraction * 44).toFixed(1) + "px";
        else
            ct.style.width = (fraction * 60).toFixed(1) + "px";
        ct.title = "Next raid list update in " + (remaining / 1000).toFixed(1) + " second(s)";
    }
    else {
        if (isHorizontalLayout())
            ct.style.height = "0px";
        else
            ct.style.width = "0px";
    }
}
;
function isJoined(raid) {
    return raid["data-raid-type"] === 0;
}
;
function raidJoinHandler(evt) {
    doJoinRaid(evt, this);
    evt.preventDefault();
}
;
function _doUpdateRaidsPanel(panel, _raids) {
    if (!panel)
        return;
    panel.innerHTML = "";
    panel.appendChild(panel.countdownTimer);
    if (!_raids) {
        return;
    }
    var raids = _raids.assist_raids_data;
    if (!raids)
        return;
    for (var i = 0; i < raids.length; i++) {
        var raid = raids[i];
        if (!raid)
            continue;
        var elt = document.createElement("div");
        elt.className = "raid";
        elt.title = raid.chapter_name;
        if (isJoined(raid))
            elt.className += " joined";
        if (raid.boss_image) {
            var imageUrl = "http://game-a1.granbluefantasy.jp/";
            if (i18n.get("lang") === "en")
                imageUrl += "assets_en";
            else
                imageUrl += "assets";
            imageUrl += "/img/sp/assets/summon/qm/" + raid.boss_image + ".png";
            elt.style.backgroundImage = "url('" + imageUrl + "')";
        }
        else {
            elt.textContent = raid.chapter_name;
        }
        elt.addEventListener("mouseup", raidJoinHandler.bind(raid), false);
        var gauge = document.createElement("div");
        gauge.className = "gauge";
        var fill = document.createElement("div");
        fill.className = "fill";
        fill.style.width = raid.boss_hp_width + "%";
        var memberCount = document.createElement("span");
        memberCount.className = "member-count";
        memberCount.textContent = raid.member_count;
        gauge.appendChild(fill);
        elt.appendChild(gauge);
        elt.appendChild(memberCount);
        panel.appendChild(elt);
    }
}
;
function _updateRaidsPanel(panel, uid, force) {
    if (isShutdown)
        return;
    pendingRaidUpdate = null;
    maybeScheduleNextRaidUpdate(panel);
    // HACK
    if (!shouldShowRaidsPanel()) {
        _doUpdateRaidsPanel(panel, null);
        return;
    }
    if (!lastPlayerStatus)
        return;
    if (currentSettings.raidsPanelBpFilter) {
        if (lastPlayerStatus && (lastPlayerStatus._precise_bp < 3)) {
            log("Not updating raids list because player only has " + lastPlayerStatus._precise_bp.toFixed(1) + " BP");
            _doUpdateRaidsPanel(panel, null);
            return;
        }
    }
    var msg = { type: "getRaids", uid: uid, force: !!force };
    sendExtensionMessage(msg, function (raids) {
        if (raids)
            _doUpdateRaidsPanel(panel, raids);
        else
            log("Failed to get raids");
    });
}
;
function _invalidateRaidList(panel, uid, raids) {
    if (!raids ||
        (window.location.hash.indexOf("quest/assist") >= 0)) {
        if (pendingRaidUpdate) {
            window.clearTimeout(pendingRaidUpdate);
            pendingRaidUpdate = null;
        }
        raidListUpdateCounter = 45;
        currentRaidListUpdateInterval = raidListUpdateInterval;
        maybeScheduleNextRaidUpdate(panel);
    }
    var msg = { type: "invalidateRaids", uid: uid, raids: raids };
    sendExtensionMessage(msg);
}
;
function _invalidateItems(panel, uid, items) {
    if (isShutdown)
        return;
    var msg = { type: "invalidateItems", uid: uid, items: items };
    sendExtensionMessage(msg);
    if (items) {
        _doUpdateItemsPanel(panel, uid, items);
    }
    else {
        // HACK
        window.setTimeout(function () {
            _updateItemsPanel(panel, uid);
        }, 2000);
    }
}
;
function _updateItemsPanel(panel, uid) {
    // Only check for items if something is watched.
    sendExtensionMessage({ type: "getWatchedItems" }, function (watchedItems) {
        if (!currentSettings.itemsPanel)
            return;
        if (!watchedItems.items || !watchedItems.items.length)
            return;
        var msg = { type: "getItems", uid: uid, force: false };
        sendExtensionMessage(msg, function (items) {
            mostRecentItems = items;
            _doUpdateItemsPanel(panel, uid, items);
        });
    });
}
;
function _doUpdateItemsPanel(_panel, uid, items) {
    var panel = _panel.items;
    if (!items)
        items = mostRecentItems;
    if (!items) {
        panel.textContent = "";
        return;
    }
    var onWatchedItemIconContextMenu = function (evt) {
        evt.preventDefault();
    };
    var onWatchedItemIconMouseUp = function (evt) {
        evt.preventDefault();
        var itemId = parseInt(evt.target.getAttribute("item-id"));
        var targetCount = parseInt(evt.target.getAttribute("target-count"));
        switch (evt.button) {
            case 0:
                log("Toggling item target count", itemId);
                var target = -1;
                if ((targetCount <= 0) ||
                    (typeof (targetCount) !== "number") ||
                    Number.isNaN(targetCount))
                    targetCount = parseInt(prompt("Set target number of " + evt.target.title));
                else
                    targetCount = -1;
                if (Number.isNaN(targetCount))
                    targetCount = -1;
                sendExtensionMessage({
                    type: "setItemWatchTarget", id: itemId, count: targetCount
                });
                break;
            case 2:
                log("Removing watch on item", itemId);
                sendExtensionMessage({ type: "setItemWatchState", id: itemId, state: false });
                break;
        }
        if (doUpdateItemsPanel)
            doUpdateItemsPanel();
    };
    sendExtensionMessage({ type: "getWatchedItems" }, function (obj) {
        var watchedItems = obj.items;
        var targetCounts = obj.counts;
        var x = 0, y = 0;
        var count = 0;
        panel.textContent = "";
        for (var i = 0, l = watchedItems.length; i < l; i++) {
            var itemInfo = findItemInfo(function (item, id) {
                return item.item_id == id;
            }, watchedItems[i]);
            if (!itemInfo)
                continue;
            var elt = document.createElement("div");
            elt.className = "viramate-item";
            elt.style.backgroundImage = "url('http://game-a.granbluefantasy.jp/assets_en/" +
                "img/sp/assets/item/article/s/" + itemInfo.image + ".jpg')";
            elt.style.left = x.toFixed(0) + "px";
            elt.style.top = y.toFixed(0) + "px";
            elt.title = itemInfo.name + " (Left-click to set goal, right-click to hide)";
            elt.setAttribute("item-id", itemInfo.item_id);
            elt.addEventListener("contextmenu", onWatchedItemIconContextMenu, false);
            elt.addEventListener("mouseup", onWatchedItemIconMouseUp, false);
            var targetCount = targetCounts[itemInfo.item_id] || -1;
            var remaining = targetCount - itemInfo.number;
            if (targetCount > 0)
                elt.setAttribute("target-count", targetCount);
            if ((remaining > 0) && (targetCount > 0)) {
                elt.setAttribute("count", "-" + remaining);
            }
            else {
                elt.setAttribute("count", itemInfo.number);
            }
            count++;
            panel.appendChild(elt);
            if (isHorizontalLayout()) {
                if (currentSettings.largeItemsPanel) {
                    y = 0;
                    x += 48;
                }
                else if (y >= 24) {
                    y = 0;
                    x += 24;
                }
                else {
                    y += 24;
                }
            }
            else {
                if (currentSettings.largeItemsPanel) {
                    y += 64;
                    x = 0;
                }
                else if (x >= 32) {
                    x = 0;
                    y += 32;
                }
                else {
                    x += 32;
                }
            }
        }
        var iconSize, iconDivisor;
        if (isHorizontalLayout()) {
            iconDivisor = currentSettings.largeItemsPanel ? 1 : 2;
            iconSize = currentSettings.largeItemsPanel ? 48 : 24;
            panel.style.width = (Math.ceil(count / iconDivisor) * iconSize).toFixed(0) + "px";
        }
        else {
            iconDivisor = currentSettings.largeItemsPanel ? 1 : 2;
            iconSize = currentSettings.largeItemsPanel ? 64 : 32;
            panel.style.height = (Math.ceil(count / iconDivisor) * iconSize).toFixed(0) + "px";
        }
        _layoutPanels();
    });
}
;
function doJoinRaid(evt, raid) {
    var inNewWindow = false;
    if (evt) {
        inNewWindow = (evt.button === 1) ||
            !!evt.shiftKey;
    }
    if (inNewWindow) {
        // HACK: Fully resolve the URL
        var elt = document.createElement("a");
        elt.href = "/#quest/assist";
        sendExtensionMessage({ type: "openNewTab", url: elt.href });
    }
    else {
        window.location.href = "/#quest/assist";
    }
}
;
function findItemInfo(predicate, arg) {
    if (!mostRecentItems)
        return false;
    for (var i = 0, l = mostRecentItems.length; i < l; i++) {
        var item = mostRecentItems[i];
        if (predicate(item, arg))
            return item;
    }
    return false;
}
;
function makeLanguageSetter(languageId) {
    return function (e) {
        e.preventDefault();
        doClientAjax("/setting/save", JSON.stringify({ special_token: null, language_type: String(languageId) }), function (result, error) {
            if (error)
                showGamePopup("Failed to set language");
            else
                log("Language set successfully");
        });
    };
}
;
//# sourceMappingURL=sidebar.js.map