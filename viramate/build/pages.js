"use strict";
var storedSupportsPage = null;
var lastDecksInfoUrl = null;
var mostRecentDeck = null;
function handleNewPage() {
    resetState();
    if (tryHandleIdleTimeout())
        return;
    // HACK: This can't be done in handleNewPage because of latency
    var isJobPage = location.hash.indexOf("party/job/") >= 0;
    var isIndexPage = location.hash.indexOf("party/index/") >= 0;
    // If we're supposed to bounce them back from a quick class/weapon change, do it now
    if ((isJobPage || isIndexPage) && storedSupportsPage) {
        var ssp = storedSupportsPage;
        storedSupportsPage = null;
        window.location.href = "/" + ssp;
    }
    sendExtensionMessage({ type: "heartbeat" });
    updateSettings(handleNewPageInner);
}
;
function tryHandleIdleTimeout() {
    if (window.location.hash === "#mypage") {
        // HACK: Flag idle timeout/maintenance as being suppressed
        getUserIdAndTabIdAsync(function (uid, tabId) {
            sendExtensionMessage({ type: "cancelSuspend", uid: uid });
        });
        sendExtensionMessage({ type: "getIdleRedirectInfo" }, function (info) {
            if (info &&
                info.pending) {
                sendExtensionMessage({ type: "setIdleRedirectPending", state: false, url: info.location });
                if (window.location.href === info.location) {
                    log("Not redirecting to " + info.location + " after idle timeout.");
                    return;
                }
                if (info.location === info.lastRedirectTarget) {
                    log("Last redirect to " + info.location + " didn't work... ignoring.");
                    return;
                }
                log("Redirecting to " + info.location + " after idle timeout.");
                window.location.href = info.location;
                window.setTimeout(function () {
                    window.location.reload();
                }, 333);
            }
        });
        return false;
    }
    if (window.location.hash === "#authentication") {
        // TODO: Handle idle logout
        log("Idle logout occurred.");
        return false;
    }
    if (window.location.hash !== "#top") {
        // HACK: Flag idle timeout/maintenance as being suppressed
        // TODO: Handle maintenance notice page?
        getUserIdAndTabIdAsync(function (uid, tabId) {
            sendExtensionMessage({ type: "cancelSuspend", uid: uid });
        });
        sendExtensionMessage({ type: "setLastLocation", url: window.location.href });
        return false;
    }
    sendExtensionMessage({ type: "getLastLocation" }, function (lastLocation) {
        if (lastLocation) {
            sendExtensionMessage({ type: "setIdleRedirectPending", state: true });
            log("Idle timeout bounced us from " + lastLocation + " to home screen.");
        }
    });
    if (chrome.runtime.lastError)
        log(chrome.runtime.lastError);
    return true;
}
;
function isCombatPage(hash) {
    // FIXME: More prefixes
    return hash.startsWith("#raid/") ||
        hash.startsWith("#raid_multi/") ||
        hash.startsWith("#raid_semi/");
}
;
function handleNewPageInner() {
    var hash = window.location.hash;
    resizeSubmenu();
    maybeInstallDropdownHack();
    if (shouldHandleTouchInput()) {
        removeTouchEndCanceler();
    }
    if (!isCombatPage(hash)) {
        var dt = getUiContainer().querySelector("div.debuff-timers");
        if (dt)
            getUiContainer().removeChild(dt);
    }
    window.setTimeout(function () {
        if (updateRaidsPanel && !pendingRaidUpdate)
            updateRaidsPanel();
        if (updateStatusPanel)
            updateStatusPanel(false, true);
        if (updateItemsPanel)
            updateItemsPanel();
    }, 500);
    if ((hash.indexOf("/supporter/") >= 0) ||
        (hash.indexOf("/supporter_raid/") >= 0) ||
        (hash.indexOf("/supporter_defend_order/") >= 0) ||
        (hash.indexOf("/supporter_raid_do/") >= 0) ||
        (hash.indexOf("/supporter_lobby/") >= 0)) {
        processSupporterPage();
    }
    else if (isCombatPage(hash)) {
        // FIXME: Do this less aggressively
        if (invalidateStatus)
            invalidateStatus();
        prepareCombatUI();
        processCombatPage();
        if (shouldHandleTouchInput()) {
            installTouchEndCanceler();
        }
        return;
    }
    else if (hash.indexOf("zenith/npc") >= 0) {
        processZenithPage();
    }
    else if (hash.indexOf("enhancement/") >= 0) {
        processEnhancementPage();
    }
    else if ((hash.indexOf("container/") >= 0) ||
        (hash.indexOf("list/move/") >= 0) ||
        (hash.indexOf("sell/") >= 0) ||
        (hash.indexOf("guild/airship/enhance") >= 0)) {
        enableDragSelect();
    }
    else if (hash.indexOf("/scene/") >= 0) {
        processScenePage();
    }
    else if (hash.indexOf("#party/") >= 0) {
        processPartyPage();
    }
    else if (hash.indexOf("#quest/stage") >= 0) {
        processQuestStagePage();
    }
    else if (hash.indexOf("#quest/assist") >= 0) {
        processRaidListPage();
    }
    else if (hash.indexOf("#quest/") >= 0) {
        processMiscellaneousQuestPage();
    }
    else if (hash.indexOf("#mypage") >= 0) {
        processMyPage();
    }
    else if (hash.indexOf("#setting/stamps") >= 0) {
        /*
        waitForElementToExist(
            document, "div.lis-stamp img",
            function (img) {
                img.parentNode.setAttribute("chatid", img.getAttribute("data-stamp-id"));
            }, true
        );
        */
    }
    else if ((hash.indexOf("#coopraid/offer") >= 0) ||
        (hash.indexOf("#coopraid/room") >= 0) ||
        (hash.indexOf("#lobby/room") >= 0)) {
        if (currentSettings.enableCoOpEnhancements) {
            processCoOpPage();
            if (shouldHandleTouchInput()) {
                installTouchEndCanceler();
            }
        }
    }
    else if (hash.indexOf("gacha/lineup") >= 0 ||
        hash.indexOf("gacha/result") >= 0 ||
        hash.search(/event\/teamraid[\d]+\/gacha\/index/) >= 0) {
        processEventGachaLineupPage();
    }
    else if (hash.indexOf("#item") >= 0) {
        processItemPage();
    }
    else if (hash.indexOf("archaic/") >= 0) {
        processWeaponShopPage();
    }
    else if (hash.indexOf("evolution/") >= 0) {
        processUncapPage();
    }
    else if (hash.indexOf("shop/exchange") >= 0) {
        processExchangeShopPage();
    }
    else if (hash.indexOf("result_") >= 0) {
        processResultPage();
    }
    else if (window.location.hash.search(/event\/teamraid[\d]+$/) >= 0) {
        processGuildWarPage();
    }
    else {
        // console.log("Unknown page");
    }
    resetRaidCode();
}
;
function triggerRaidListRefresh() {
}
;
function processRaidListPage() {
    if (currentSettings.realtimeRaidList)
        pollingInterval = window.setInterval(triggerRaidListRefresh, 30000);
}
;
function _showWatchButton(element, itemId, isActive) {
    if (!itemId)
        return;
    var onClick = function (evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        var newState = evt.target.className.indexOf("active") < 0;
        if (newState) {
            log("Adding watch on item " + itemId);
            evt.target.className = "watch-button active";
        }
        else {
            log("Removing watch on item " + itemId);
            evt.target.className = "watch-button";
        }
        sendExtensionMessage({ type: "setItemWatchState", id: itemId, state: newState });
        // FIXME: update instead of doUpdate?
        if (doUpdateItemsPanel)
            doUpdateItemsPanel();
    };
    var watchButton = document.createElement("div");
    watchButton.className = "watch-button" +
        (isActive ? " active" : "");
    watchButton.title = "Show item on sidebar";
    watchButton.setAttribute("itemId", itemId);
    watchButton.addEventListener("mouseup", onClick, true);
    injectElement(element, watchButton);
}
;
function showWatchButtons(containerSelector, itemSelector, getItemId) {
    if (!currentSettings.showItemWatchButtons)
        return;
    var watchedItems = {
        items: [],
        counts: {}
    };
    var showWatchButton = function (element) {
        var itemId = getItemId(element);
        if (itemId === null)
            return;
        var isActive = watchedItems.items.indexOf(itemId) >= 0;
        _showWatchButton(element, itemId, isActive);
    };
    sendExtensionMessage({ type: "getWatchedItems" }, function (_watchedItems) {
        watchedItems = _watchedItems;
        waitForElementToExist(document, containerSelector, function (container) {
            waitForElementToExist(container, itemSelector, showWatchButton, true);
        }, true);
    });
}
;
var showItemWatchButtons = null;
function processItemPage() {
    var parseRe = /item\/article\/s\/([0-9]+)\..+/;
    var getItemId = function (treasure) {
        var itemImage = treasure.querySelector("img").src;
        var m = parseRe.exec(itemImage);
        if (!m)
            return;
        var itemImageStem = m[1];
        if (!itemImageStem)
            return;
        var itemInfo = findItemInfo(function (item) {
            return item.image == itemImageStem;
        });
        if (!itemInfo)
            return;
        var itemId = parseInt(itemInfo.item_id);
        return itemId;
    };
    showItemWatchButtons = function () {
        showWatchButtons("div.prt-item-list div.prt-item-filter", "div.lis-item", getItemId);
    };
}
;
function processWeaponShopPage() {
    var getItemId = function (articleIcon) {
        var kind = parseInt(articleIcon.getAttribute("data-kind"));
        if (kind !== 10)
            return null;
        var itemId = parseInt(articleIcon.getAttribute("data-id"));
        return itemId;
    };
    showWatchButtons("div.cnt-item", "div.btn-article-icon", getItemId);
}
;
function processUncapPage() {
    var getItemId = function (articleIcon) {
        var kind = parseInt(articleIcon.getAttribute("data-item-kind"));
        if (kind !== 10)
            return null;
        var itemId = parseInt(articleIcon.getAttribute("data-material-id"));
        return itemId;
    };
    showWatchButtons("div.prt-module-evolution", "div.btn-material", getItemId);
}
;
function processExchangeShopPage() {
    var getItemId = function (itemIcon) {
        if (!itemIcon.hasAttribute("data-item-id"))
            return null;
        // HACK
        itemIcon.style.position = "relative";
        var itemId = parseInt(itemIcon.getAttribute("data-item-id"));
        return itemId;
    };
    showWatchButtons("div.cnt-exchange-list", "div.item-explain", getItemId);
}
;
function processCoOpPage() {
    waitForElementToExist(document, "div.pop-usual.pop-room-detail", function (joinPopup) {
        var joinButton = joinPopup.querySelector("div.btn-usual-join");
        if (!joinButton) {
            console.log("Room can't be joined");
            return;
        }
        console.log("Attempting to join room");
        pulseElement(joinButton);
        generateClick(joinButton);
    }, true);
    waitForElementToExist(document, "div.txt-room-id", function (elt) {
        elt.addEventListener("mousedown", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            window.getSelection().selectAllChildren(elt);
        }, true);
        elt.addEventListener("click", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }, true);
        elt.addEventListener("mouseup", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }, true);
    }, true);
}
;
function processGuildWarPage() {
    sendExtensionMessage({ type: "setCurrentGuildWar", href: window.location.hash.substr(1) });
    var parser = new DOMParser();
    var allRaidInfo = Object.create(null);
    waitForElementToExist(document, "script[type='text/template']", function (templateElement) {
        var templateFragment = parser.parseFromString(templateElement.textContent, "text/html");
        var buttons = templateFragment.querySelectorAll(".btn-multi-battle");
        for (var j = 0; j < buttons.length; j++) {
            var button = buttons[j];
            var cost = button.getAttribute("data-ap");
            if (!cost)
                continue;
            if (button.getAttribute("data-type") != "1")
                continue;
            var chapterId = button.getAttribute("data-chapter-id").trim();
            var chapterLastDigit = chapterId[chapterId.length - 1];
            // EX+ is 61, nm90 is 71, etc
            if (chapterLastDigit < "6")
                continue;
            var raidInfo = {
                name: button.getAttribute("data-chapter-name") || button.getAttribute("data-quest-name"),
                cost: cost,
                id: chapterId,
                // gross
                isHell: button.innerHTML.indexOf("_hell") >= 0
            };
            allRaidInfo[chapterId] = raidInfo;
            console.log(raidInfo);
            sendExtensionMessage({ type: "setCurrentGuildWarRaidInfo", raids: JSON.stringify(allRaidInfo) });
        }
    }, true);
}
;
function processMyPage() {
    // FIXME: Handle multiple events
    waitForElementToExist(document, "div.btn-banner.location-href", function (eventBanner) {
        // HACK: Scan all the visible events and pick the first one.
        //  Good enough? This still acts odd on guild wars
        var banners = document.querySelectorAll("div.btn-banner.location-href");
        var eventHref = null;
        var guildWarHref = null;
        for (var i = 0, l = banners.length; i < l; i++) {
            var href = banners[i].getAttribute("data-location-href");
            if (href && (href.indexOf("teamraid") >= 0)) {
                href = href.replace("/teaser", "")
                    .replace("/exchange", "")
                    .replace("/medal", "");
                guildWarHref = href;
            }
            else if (!eventHref)
                eventHref = href;
        }
        sendExtensionMessage({ type: "setCurrentEvent", href: eventHref });
        sendExtensionMessage({ type: "setCurrentGuildWar", href: guildWarHref });
    }, true);
    if (false)
        waitForElementToExist(document, "div.txt-twitter-name", function (twitterNameElement) {
            var twitterName = twitterNameElement.textContent
                .toLowerCase()
                .replace("verifying as", "")
                .replace("で認証中", "")
                .trim();
            // log("User's twitter handle is @" + twitterName);
            if (currentSettings.hiddenTwitterRefills) {
                var messageTextarea = document.querySelector("textarea#frm-post-tweet");
                if (messageTextarea)
                    messageTextarea["value"] = "d @" + twitterName + " ";
            }
        }, true);
    if (Math.random() <= (1 / 20000))
        window.setTimeout(mainpagerandom, 5000);
}
;
function processMiscellaneousQuestPage() {
}
;
function mainpagerandom() {
    waitForElementToExist(document, "div.prt-power-number", function (powerNumber) {
        powerNumber.title = "I\n" +
            " can\n" +
            "  see\n" +
            "   you";
        var x = '<span class="num-power6"></span>';
        var i = 0;
        var t = 400;
        powerNumber.innerHTML = "";
        var tick = function () {
            powerNumber.innerHTML += x;
            if (i >= 13)
                return;
            i++;
            t += 99 + (t * 0.05);
            window.setTimeout(tick, t);
        };
        var myimage = document.querySelector("img.img-myimage");
        myimage.style.opacity = "1.0";
        myimage.style.transition = "opacity 1s";
        window.setTimeout(function () {
            myimage.style.opacity = "0.0";
        }, 100);
        window.setTimeout(function () {
            myimage.src = "http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/npc/my/3040043000_03.png";
            myimage.style.opacity = "1.0";
        }, 1200);
        window.setTimeout(tick, 2500);
    }, true);
}
;
function processPartyPage() {
    waitForElementToExist(document, "div.prt-bottom", function (container) {
        var exportButton = document.createElement("div");
        exportButton.className = "btn-export-grid";
        exportButton.textContent = "Export (alpha)";
        injectElement(container, exportButton);
        exportButton.addEventListener("click", doGridExport, false);
    }, true);
    waitForElementToExist(document, "div.prt-party-detail.currentDeck > div.prt-party-detail-title", function (toSaveHeader) {
        toSaveHeader.textContent = "Slot being overwritten";
    }, true);
    waitForElementToExist(document, "div.prt-party-detail.newDeck > div.prt-party-detail-title", function (toOverwriteHeader) {
        toOverwriteHeader.textContent = "Overwrite with";
    }, true);
    waitForElementToExist(document, "img.img-pc", function (partyImage) {
        if (Math.random() < 0.9992)
            return;
        partyImage.style.transform = "scaleY(-1)";
    }, true);
    waitForElementToExist(document, "img.img-summon-sub", function (summonImage) {
        if (Math.random() < 0.9989)
            return;
        summonImage.style.transform = "scaleX(-1)";
    }, true);
    if (currentSettings.showWeaponAttack)
        waitForElementToExist(document, ["div.prt-weapon-main-status", "div.prt-weapon-sub-status"], function (weaponStatus) {
            var skillElement = weaponStatus.parentNode.querySelector("div.prt-weapon-main-status-skill") ||
                weaponStatus.parentNode.querySelector("div.prt-weapon-sub-status-skill");
            if (!skillElement)
                return;
            var atk = weaponStatus.querySelector("div.prt-attack");
            skillElement.appendChild(atk.cloneNode(true));
        }, true);
}
;
function splitQuestId(questId) {
    var questIdText = String(questId);
    var chapterId = parseInt(questIdText.substr(0, questIdText.length - 1));
    var suffix = questIdText[questIdText.length - 1];
    return [chapterId, suffix];
}
;
function selectPreferredSummonTab() {
    var preferredSelector = "div.icon-supporter-type-" + currentSettings.preferredSummonElement;
    waitForElementToExist(document, preferredSelector, function (tabButton) {
        generateClick(tabButton);
    }, true);
}
function processSupporterPage() {
    storedSupportsPage = null;
    waitForElementToExist(document, "div.txt-baloon", fillQuestInfoBalloon, true);
    waitForElementToExist(document, "div.prt-supporter-attribute", function (supporterList) {
        if (supporterList.className.indexOf("faved") >= 0)
            return;
        processSupporterList(currentSettings, supporterList);
    }, true);
    waitForElementToExist(document, "div.btn-type.selected div.prt-type-text", function (tabButton) {
        tabButton.style.color = "lightgreen";
    }, false);
    if (!currentSettings.smartSupports || !currentSettings.defaultToSmartSupports) {
        selectPreferredSummonTab();
    }
    var showError = function (message, extra) {
        showGamePopup({
            title: "Party management",
            body: message + (extra ? "<br>" + String(extra) : "")
        });
    };
    var doEditParty = function (deckId, callback) {
        /*
            /quest/edit_party/<supporter_user_id>/<quest_id>/<quest_type>/<deck_id>/<supporter_attribute_id>/<treasure_id>
            /quest/decks_info/<supporter_user_id>/<quest_id>/<quest_type>/0/<supporter_attribute_id>/<treasure_id>
        */
        var url = lastDecksInfoUrl.replace(window.location.origin, "");
        var parts = url.split("/");
        if (parts.length !== 9)
            return showError("Unexpected party url", lastDecksInfoUrl);
        // ["", "quest", "decks_info", "712873", "711141", "1", "0", "6", "0?_=1471048562884&t=1471048567375&uid=10777899"]
        var ajaxUrl = "/quest/edit_party/" +
            parts[3] + "/" +
            parts[4] + "/" +
            parts[5] + "/" +
            deckId + "/" +
            parts[6] + "/" +
            parts[7];
        doClientAjax(ajaxUrl, function () {
            callback();
        });
    };
    var changeClass = function (evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        var currentDeck = document.querySelector("div.lis-deck.flex-active-slide");
        var currentDeckId = parseInt(currentDeck.getAttribute("data-deck-id"));
        doEditParty(currentDeckId, function () {
            storedSupportsPage = window.location.hash;
            window.location.href = "/#party/list_job/" + currentDeckId;
        });
    };
    var changeWeapon = function (evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        var currentDeck = document.querySelector("div.lis-deck.flex-active-slide");
        var currentDeckId = parseInt(currentDeck.getAttribute("data-deck-id"));
        doClientAjax("/party/deck", function (response, error) {
            if (!response || !response.deck || !response.deck.pc || !response.deck.pc.weapons)
                return showError("Failed to get party info", error);
            var weaponId = response.deck.pc.weapons[1].param.id;
            doEditParty(currentDeckId, function () {
                storedSupportsPage = window.location.hash;
                window.location.href = "/#party/top/detail_weapon/" + currentDeckId + "/1/" + weaponId;
            });
        });
    };
    if (currentSettings.quickChangeButtons)
        waitForElementToExist(document, "div.prt-leader", function (leaderIcon) {
            var button = leaderIcon.querySelector("span.class-change-button");
            if (button)
                return;
            button = document.createElement("span");
            button.className = "class-change-button";
            button.textContent = "Class";
            button.addEventListener("click", changeClass, true);
            leaderIcon.appendChild(button);
            button = document.createElement("span");
            button.className = "weapon-change-button";
            button.textContent = "Weapon";
            button.addEventListener("click", changeWeapon, true);
            leaderIcon.appendChild(button);
        }, true);
    if (currentSettings.smartSupports)
        processSmartSupports();
}
;
function fillQuestInfoBalloon(balloon) {
    var pageUrl = window.location.hash;
    var parts = pageUrl.split("/");
    var isEvent = false;
    // HACK
    if (parts[0] === "#event") {
        isEvent = true;
        parts = pageUrl.replace("event/", "").split("/");
    }
    if (parts[1] !== "supporter") {
        log("Failed to parse supporter page URL", pageUrl);
        return;
    }
    var questId = parseInt(parts[2]);
    var questType = parseInt(parts[3]);
    var idParts = splitQuestId(questId);
    var chapterId = idParts[0];
    var suffix = idParts[1];
    // Treasure raid
    // Event raids use the regular start page. It appears that all story raids have the ID 3xxxxx
    if (parts.length > 4 && Math.floor(questId / 100000) === 3) {
        var mysteryNumber = parseInt(parts[4]);
        var itemId = parts[5];
        log((isEvent ? "Event treasure" : "Treasure") + " raid start page", questId, itemId);
        doClientAjax("/quest/treasure_raid/" + chapterId + "/" + questId, function (questInfo, error) {
            if (!questInfo) {
                log("Failed to get quest info", error);
                return;
            }
            var treasureIndex = questInfo.treasure_id.indexOf(itemId);
            var treasureName = questInfo.treasure_name[treasureIndex];
            var treasureCount = questInfo.consume[treasureIndex];
            var treasureRemaining = questInfo.num[treasureIndex];
            var apConsumed = parseInt(questInfo.action_point);
            var nextTreasureIndex = (treasureIndex + 1) % questInfo.treasure_id.length;
            var nextItemId = questInfo.treasure_id[nextTreasureIndex];
            var nextTreasureName = questInfo.treasure_name[nextTreasureIndex];
            var iconUrl = "//game-a.granbluefantasy.jp/assets_en/img/sp/assets/item/article/s/" + itemId + ".jpg";
            var iconDiv = document.createElement("div");
            iconDiv.className = "support-treasure-icon";
            var icon = document.createElement("img");
            icon.src = iconUrl;
            icon.title = treasureName;
            var count = document.createElement("div");
            count.textContent = treasureCount + "/" + treasureRemaining;
            iconDiv.appendChild(icon);
            iconDiv.appendChild(count);
            balloon.innerHTML = i18n.getExpand("raid-info", [questInfo.chapter_name, apConsumed]);
            balloon.className += " uses-treasure";
            if (nextTreasureIndex != treasureIndex) {
                icon.className += " clickable";
                icon.title += " (Click to switch to " + nextTreasureName + ")";
                iconDiv.addEventListener("click", function () {
                    var splitPoint = pageUrl.lastIndexOf("/");
                    var head = pageUrl.substr(0, splitPoint);
                    var tail = pageUrl.substr(splitPoint);
                    tail = tail.replace(String(itemId), String(nextItemId));
                    var newUrl = head + tail;
                    window.location.href = newUrl;
                });
            }
            balloon.appendChild(iconDiv);
        });
    }
    else {
        log((isEvent ? "Event" : "ordinary") + " raid start page", questId);
        doClientAjax("/quest/quest_data/" + questId + "/" + questType, function (questInfo, error) {
            if (!questInfo) {
                log("Failed to get quest info", error);
                return;
            }
            var apConsumed = parseInt(questInfo.action_point);
            balloon.innerHTML = i18n.getExpand("raid-info", [questInfo.chapter_name, apConsumed]);
        });
    }
}
;
function getSummonOrderTable() {
    var orderTable = currentSettings.summonOrder;
    if (!orderTable)
        orderTable = currentSettings.summonOrder = {};
    else if (typeof (orderTable) === "string")
        orderTable = currentSettings.summonOrder = JSON.parse(orderTable);
    return orderTable;
}
;
function processSmartSupports() {
    var favedButton = null;
    var favedView = null;
    var a = false, b = false;
    var favedSummons = null;
    var safetyCheck = function () {
        if (document.querySelector("div.prt-supporter-confirm")) {
            log("Verify prompt is up so no faved tab");
            return true;
        }
        var unknownElt = document.querySelector("div.prt-supporter-list div.prt-supporter-attribute:not(.faved) > :not(.lis-supporter)");
        if (unknownElt) {
            log("Unknown element in supporter list: ", unknownElt);
            return true;
        }
        return false;
    };
    var suppress = function (e) {
        // e.preventDefault();
        e.stopImmediatePropagation();
    };
    var onFavedClick = function (e) {
        if (e)
            suppress(e);
        var buttons = document.querySelectorAll("#prt-type .btn-type");
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            btn.className = btn.className.replace("unselected", "")
                .replace("selected", "")
                .trim() + " unselected";
        }
        favedButton.className = favedButton.className.replace("unselected", "selected");
        var views = document.querySelectorAll("div.prt-supporter-attribute");
        for (var i = 0; i < views.length; i++) {
            var view = views[i];
            if (view === favedView)
                continue;
            view.className = "prt-supporter-attribute disableView";
        }
        favedView.className = "prt-supporter-attribute faved";
    };
    var maybeChangeTab = function () {
        if (!currentSettings.defaultToSmartSupports)
            return;
        if (safetyCheck())
            return;
        if (!favedView.firstElementChild) {
            selectPreferredSummonTab();
            return;
        }
        if (favedView.firstElementChild.className === "no-faves-message") {
            selectPreferredSummonTab();
            return;
        }
        onFavedClick(null);
    };
    var onFavButtonClick = function (e) {
        suppress(e);
        var newState = this.className.indexOf("active") < 0;
        var summonId = this.getAttribute("summon-id");
        if (newState) {
            log("Adding summon to favorites " + summonId);
            this.className = "fav-summon-button active";
        }
        else {
            log("Removing summon from favorites " + summonId);
            this.className = "fav-summon-button";
        }
        var orderTable = getSummonOrderTable();
        orderTable[summonId] = 0;
        sendExtensionMessage({ type: "setSummonOrder", data: JSON.stringify(orderTable) });
        sendExtensionMessage({ type: "setSummonFaveState", id: summonId, state: newState }, function (newFaves) {
            if (!newFaves)
                return;
            favedSummons = newFaves;
            refreshFavedStates();
            refreshFavedView();
        });
    };
    var onOrderButtonClick = function (e) {
        suppress(e);
        var summonId = this.getAttribute("summon-id");
        var delta = parseInt(this.getAttribute("delta"));
        var orderTable = getSummonOrderTable();
        var currentOrder = orderTable[summonId];
        if (typeof (currentOrder) === "number")
            orderTable[summonId] = currentOrder + delta;
        else
            orderTable[summonId] = delta;
        sendExtensionMessage({ type: "setSummonOrder", data: JSON.stringify(orderTable) }, function (newFaves) {
            refreshFavedView();
        });
    };
    var refreshFavedStates = function () {
        var buttons = document.querySelectorAll("div.fav-summon-button");
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var id = btn.getAttribute("summon-id");
            btn.className = "fav-summon-button" +
                ((favedSummons.indexOf(id) >= 0) ? " active" : "");
        }
    };
    var refreshFavedView = function () {
        var pn = favedView.parentNode;
        pn.removeChild(favedView);
        favedView.innerHTML = "";
        var items = document.querySelectorAll("div.btn-supporter.lis-supporter");
        // If every tab doesn't have at least 6 summons in it, I'm on to you, cygames
        if (items.length < (7 * 6)) {
            log("Suspiciously small number of support summons available...", items.length);
            return;
        }
        var parsedItems = [];
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            var parsed = parseSupporter(item);
            if (parsed === null)
                return;
            if (favedSummons.indexOf(parsed.id) < 0)
                continue;
            parsed.randomKey = Math.random();
            parsedItems.push(parsed);
        }
        var orderTable = getSummonOrderTable();
        // We sort the summons alphabetically (then by ID in the case of
        //  two summons sharing the same name, like Famitsu carbies),
        //  then sort based on MLB tier and friend status
        // After this the next pass will pick the first entry for each id
        parsedItems.sort(function (lhs, rhs) {
            var lhsOrder = orderTable[lhs.id];
            if (!lhsOrder)
                lhsOrder = 0;
            var rhsOrder = orderTable[rhs.id];
            if (!rhsOrder)
                rhsOrder = 0;
            if (rhsOrder > lhsOrder)
                return -1;
            else if (rhsOrder < lhsOrder)
                return 1;
            if (rhs.name > lhs.name)
                return -1;
            else if (rhs.name < lhs.name)
                return 1;
            if (rhs.id > lhs.id)
                return -1;
            else if (rhs.id < lhs.id)
                return 1;
            var result = 0;
            if (result === 0)
                result = rhs.tier - lhs.tier;
            if ((result === 0) && (rhs.isFriend !== lhs.isFriend)) {
                if (currentSettings.preferNonFriendSummonsInFavorites)
                    result = (rhs.isFriend ? 0 : 1) - (lhs.isFriend ? 0 : 1);
                else
                    result = (rhs.isFriend ? 1 : 0) - (lhs.isFriend ? 1 : 0);
            }
            // Shuffle summons within the same tier/friend status
            if (result === 0) {
                if (rhs.randomKey > lhs.randomKey)
                    result = -1;
                else if (rhs.randomKey < lhs.randomKey)
                    result = 1;
            }
            return result;
        });
        var lastId = null;
        for (var i = 0; i < parsedItems.length; i++) {
            let item = parsedItems[i];
            if (item.id === lastId)
                continue;
            lastId = item.id;
            var copy = item.element.cloneNode(true);
            copy.className += " faved";
            var favButton = copy.querySelector("div.fav-summon-button");
            if (favButton)
                favButton.parentNode.removeChild(favButton);
            var reorderWidget = document.createElement("div");
            reorderWidget.className = "reorder-widget";
            var currentOrder = orderTable[item.id] || 0;
            var orderUp = document.createElement("a");
            orderUp.textContent = "⇧";
            orderUp.title = "Move to position " + -(currentOrder - 1);
            orderUp.setAttribute("summon-id", item.id);
            orderUp.setAttribute("delta", "-1");
            orderUp.addEventListener("click", onOrderButtonClick, true);
            orderUp.addEventListener("mousedown", suppress, true);
            orderUp.addEventListener("mouseup", suppress, true);
            var orderDown = document.createElement("a");
            orderDown.textContent = "⇩";
            orderDown.title = "Move to position " + -(currentOrder + 1);
            orderDown.setAttribute("summon-id", item.id);
            orderDown.setAttribute("delta", "1");
            orderDown.addEventListener("click", onOrderButtonClick, true);
            orderDown.addEventListener("mousedown", suppress, true);
            orderDown.addEventListener("mouseup", suppress, true);
            reorderWidget.appendChild(orderUp);
            reorderWidget.appendChild(orderDown);
            copy.appendChild(reorderWidget);
            favedView.appendChild(copy);
        }
        if (parsedItems.length === 0) {
            var message = document.createElement("div");
            message.className = "no-faves-message";
            message.textContent = "No favorite summons available. Click the heart icon to add summons to your favorites!";
            favedView.appendChild(message);
        }
        pn.appendChild(favedView);
    };
    if (safetyCheck())
        return;
    sendExtensionMessage({ type: "getFavedSummons" }, function (_favedSummons) {
        favedSummons = _favedSummons;
        if (safetyCheck())
            return;
        waitForElementToExist(document, "div#prt-type", function (typeStrip) {
            if (safetyCheck())
                return;
            if (document.querySelector("div.icon-supporter-type-f"))
                return;
            var btn = favedButton = document.createElement("div");
            btn.className = "icon-supporter-type-f btn-type unselected";
            var text = document.createElement("div");
            text.className = "prt-type-text";
            text.textContent = "Faves";
            btn.appendChild(text);
            typeStrip.appendChild(btn);
            btn.addEventListener("mousedown", suppress, true);
            btn.addEventListener("mouseup", suppress, true);
            btn.addEventListener("click", onFavedClick, true);
            a = true;
            if (b)
                setTimeout(maybeChangeTab, 10);
        }, true);
        waitForElementToExist(document, "div.prt-supporter-list.prt-module", function (supporterList) {
            if (safetyCheck())
                return;
            var view = favedView = document.createElement("div");
            view.className = "prt-supporter-attribute disableView";
            supporterList.appendChild(view);
            refreshFavedView();
            b = true;
            if (a)
                setTimeout(maybeChangeTab, 10);
        }, true);
        waitForElementToExist(document, "div.btn-supporter.lis-supporter", function (item) {
            var btn = item.querySelector("div.fav-summon-button");
            if (btn)
                return;
            var id = item.querySelector("div.prt-summon-image").getAttribute("data-image");
            // FIXME
            var isActive = favedSummons.indexOf(id) >= 0;
            btn = document.createElement("div");
            btn.className = "fav-summon-button" +
                (isActive ? " active" : "");
            btn.setAttribute("summon-id", id);
            btn.title = "Add summon to favorites list";
            btn.addEventListener("mousedown", suppress, true);
            btn.addEventListener("mouseup", suppress, true);
            btn.addEventListener("click", onFavButtonClick.bind(btn), true);
            injectElement(item, btn);
        }, true);
    });
}
;
function processScenePage() {
}
;
function enableDragSelect() {
    waitForElementToExist(document, [
        "div.cnt-container-move div.prt-list-item",
        "div.cnt-list-move div.prt-list-item",
        "div.prt-module-enhancement > div.cnt-list-order",
        "div.cnt-list div.prt-list-weapon",
        "div.cnt-list div.prt-list-item"
    ], function (itemList) {
        if (itemList.getAttribute("evt-registered") === "1")
            return;
        itemList.addEventListener("mousedown", onItemListMouseDown, false);
        itemList.addEventListener("mousemove", onItemListMouseMove, false);
        itemList.addEventListener("mouseup", onItemListMouseUp, false);
        if (shouldHandleTouchInput()) {
            itemList.addEventListener("touchstart", onItemListMouseDown, false);
            itemList.addEventListener("touchmove", onItemListMouseMove, false);
            itemList.addEventListener("touchend", onItemListMouseUp, false);
        }
        itemList.setAttribute("evt-registered", "1");
    }, true);
}
;
var inventoryItemClickHistory = null;
function inventoryItemFromPoint(x, y) {
    var newControl = document.elementFromPoint(x, y);
    if (newControl.className.indexOf("img-list-thumbnail") >= 0)
        return newControl.parentNode;
    else if (newControl.className.indexOf("txt-list-status") >= 0) {
        var parent = newControl.parentNode;
        if (parent.className.indexOf("prt-status") >= 0) {
            return parent.parentNode;
        }
        else {
            return parent;
        }
    }
    else if (newControl.className.indexOf("btn-weapon") >= 0)
        return newControl;
    else if (newControl.className.indexOf("btn-summon") >= 0)
        return newControl;
    else if (newControl.className.indexOf("img-item") >= 0)
        return newControl;
    else
        return null;
}
;
function tryClickInventoryItem(elt) {
    if (!elt)
        return false;
    if (inventoryItemClickHistory.has(elt))
        return false;
    // console.log("Click " + elt.getAttribute("data-id"), elt);
    inventoryItemClickHistory.add(elt);
    pulseElement(elt);
    // generateClick(elt);
}
;
function onItemListMouseDown(evt) {
    if (!currentSettings.allowDragSelect)
        return;
    if (!evt.isTrusted)
        return;
    // let the touchmove select instead of scrolling the page
    if (evt.type === "touchstart") {
        document.addEventListener("touchmove", eventPreventDefault);
    }
    inventoryItemClickHistory = new Set();
    tryClickInventoryItem(inventoryItemFromPoint(evt.clientX || evt.touches[0].clientX, evt.clientY || evt.touches[0].clientY));
}
function onItemListMouseUp(evt) {
    if (!evt.isTrusted)
        return;
    // re-enable the drag scroll
    if (evt.type === "touchend") {
        document.removeEventListener("touchmove", eventPreventDefault);
    }
    inventoryItemClickHistory = null;
}
function onItemListMouseMove(evt) {
    if (!evt.isTrusted)
        return;
    else if (!currentSettings.allowDragSelect)
        return;
    else if (evt.buttons === 0) {
        inventoryItemClickHistory = null;
        return;
    }
    else if (!inventoryItemClickHistory)
        return;
    var newControl = inventoryItemFromPoint(evt.clientX || evt.touches[0].clientX, evt.clientY || evt.touches[0].clientY);
    tryClickInventoryItem(newControl);
}
;
function parseSupporter(elt) {
    var result = {
        element: elt
    };
    var skillTextElement = elt.querySelector("div.prt-summon-skill");
    if (skillTextElement.className.indexOf("bless-rank1") >= 0)
        result.tier = 1;
    else if (skillTextElement.className.indexOf("bless-rank2") >= 0)
        result.tier = 2;
    else if (skillTextElement.className.indexOf("bless-rank3") >= 0)
        result.tier = 3;
    else if (skillTextElement.className.indexOf("bless-rank4") >= 0)
        result.tier = 4;
    else if (skillTextElement.className.indexOf("bless-rank5") >= 0)
        result.tier = 5;
    else
        result.tier = 0;
    var userName = elt.querySelector("div.prt-supporter-name");
    result.isFriend = userName.className.indexOf("ico-friend") >= 0;
    var levelText = elt.querySelector("span.txt-summon-level").textContent;
    result.name = elt.querySelector("div.prt-supporter-summon").textContent.replace(levelText, "").trim();
    result.level = parseInt(levelText.replace(/[\D]+/, "").trim());
    result.effect = skillTextElement.textContent.trim();
    var icon = elt.querySelector("div.prt-summon-image");
    result.id = icon.getAttribute("data-image");
    result.userId = elt.getAttribute("data-supporter-user-id");
    var computedStyle = window.getComputedStyle(elt);
    if ((computedStyle.display === "none") ||
        (parseFloat(computedStyle.opacity) < 1) ||
        (computedStyle.pointerEvents === "none") ||
        (parseFloat(computedStyle.zoom) < 1)) {
        log("Suspiciously invisible support summon element", elt);
        return null;
    }
    return result;
}
;
var boostedSummons = [
    "2040003000",
    "2040056000",
];
var bunnies = [
    "2030079000",
    "2030026000",
    "2040114000",
];
function sortSupportList(settings, elements) {
    var parsedSupporters = new Array(elements.length);
    for (var i = 0; i < elements.length; i++) {
        parsedSupporters[i] = parseSupporter(elements[i]);
        if (parsedSupporters[i] === null)
            return;
    }
    parsedSupporters.sort(function (lhs, rhs) {
        var result = 0;
        if (settings.preferBahamut)
            result = ((boostedSummons.indexOf(rhs.id) >= 0) ? 1 : 0) - ((boostedSummons.indexOf(lhs.id) >= 0) ? 1 : 0);
        if ((result === 0) && settings.preferBunny)
            result = (bunnies.indexOf(rhs.id)) - (bunnies.indexOf(lhs.id));
        if (settings.preferFriendSummons && (rhs.isFriend !== lhs.isFriend))
            result = (rhs.isFriend ? 1 : 0) - (lhs.isFriend ? 1 : 0);
        if ((result === 0) && settings.preferLimitBrokenSummons)
            result = rhs.tier - lhs.tier;
        if ((result === 0) && settings.preferHighLevelSummons)
            result = rhs.level - lhs.level;
        return result;
    });
    return parsedSupporters;
}
;
function processSupporterList(settings, list) {
    var supporters = list.querySelectorAll("div.btn-supporter");
    if (supporters.length === 0)
        return;
    if (supporters[0].className.indexOf("faved") >= 0)
        return;
    var parsedSupporters = sortSupportList(settings, supporters);
    if (!parsedSupporters)
        return;
    for (var i = 0, l = parsedSupporters.length; i < l; i++) {
        var ps = parsedSupporters[i];
        list.removeChild(ps.element);
        list.appendChild(ps.element);
        if (ps.element.querySelector("a"))
            continue;
        var supporterName = ps.element.querySelector("span.txt-supporter-name");
        var link = document.createElement("a");
        link.href = "/#profile/" + ps.userId;
        supporterName.parentNode.replaceChild(link, supporterName);
        link.appendChild(supporterName);
        if (currentSettings.tinySupportSummons) {
            var supporterDetail = ps.element.querySelector("div.prt-supporter-detail");
            var summonSkill = supporterDetail.querySelector("div.prt-summon-skill");
            var summonLevel = supporterDetail.querySelector("div.prt-supporter-summon");
            summonLevel.className = "prt-supporter-summon " + summonSkill.className.replace("text-small", "");
        }
    }
}
;
function processEventGachaLineupPage() {
    // add a total to the top of the list
    waitForElementToExist(document.querySelector("div.contents"), ["div.prt-box-list"], function (list) {
        // simulate the div structure to reuse some css
        var lineup = document.createElement("div"), itemName = document.createElement("div"), itemCount = document.createElement("div");
        lineup.className = "prt-lineup event-total";
        itemName.className = "event-total-text";
        itemCount.className = "event-total-count";
        lineup.appendChild(itemName);
        lineup.appendChild(itemCount);
        // TODO: Shadow DOM
        list.insertBefore(lineup, list.firstElementChild);
        itemName.textContent = i18n.get("event-gacha-total");
        // iterate through all the item counts
        var counts = document.getElementsByClassName("txt-item-count");
        var remaining = 0;
        var total = 0;
        for (var i = 0; i < counts.length; i++) {
            var parts = counts[i].textContent.split("/");
            remaining += parseInt(parts[0]);
            total += parseInt(parts[1]);
        }
        itemCount.textContent = remaining + "/" + total;
    }, true);
}
function installTouchEndCanceler() {
    // do nothing on a touchend event if a touchmove is detected
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", touchEndHandler, true);
}
function removeTouchEndCanceler() {
    // do nothing on a touchend event if a touchmove is detected
    document.removeEventListener("touchmove", touchMoveHandler);
    document.removeEventListener("touchend", touchEndHandler);
}
function touchMoveHandler(evt) {
    cancelTouch = true;
}
function touchEndHandler(evt) {
    if (cancelTouch) {
        suppressEvent(evt);
        cancelTouch = false;
    }
}
function eventPreventDefault(evt) {
    evt.preventDefault();
}
;
function showDeckNames(decks) {
    if (!currentSettings.showPartyNames)
        return;
    var elements = Array.from(document.querySelectorAll("div.prt-deck-slider ol.flex-control-paging a")).concat(Array.from(document.querySelectorAll("div.prt-deck-select-slider ol.flex-control-paging a")));
    for (var i = 0, l = elements.length; i < l; i++) {
        elements[i].setAttribute("deck-name", (decks[i].deck_name || decks[i].name));
    }
}
;
function processResultPage() {
    // TODO
}
;
function doGridExport() {
    var showError = function (text) {
        prompt("An error occurred. You can copy it from the box below to report it.", text);
    };
    if (!mostRecentDeck)
        return showError("Deck info not captured for some reason");
    try {
        var deck = mostRecentDeck;
        var pc = deck.pc, job = deck.pc.job;
        var data = {
            rank: 0,
            job_atk: 0,
            master_atk: 0,
            // fixme
            ship_bonus: 0,
            attribute_bonus: 0,
            hp_percent: 90,
            buff_koujin: 0,
            buff_attribute: 0,
            buff_multiply: 0,
            summon_atk: [0, 0, 0, 0, 0],
            // fixme
            summon_type: ["", "", "", ""],
            summon_percent: [0, 0, 0, 0],
            weapon_atk: [],
            skill_type1: [],
            skill_type2: [],
            skill_lv: [],
            // fixme: zenith bonus for weapon type
            type_bonus: [],
            cosmos: []
        };
        if (lastPlayerStatus)
            data.rank = Number(lastPlayerStatus.level);
        var sumAtkBonuses = function (bonuses) {
            var result = 0;
            for (var k in bonuses) {
                var v = bonuses[k];
                if (v.kind !== "bonus_1")
                    continue;
                if ((v.name || v.kind_jp).indexOf("ATK") < 0 && (v.name || v.kind_jp).indexOf("攻撃力") < 0)
                    continue;
                result += Number(v.param || v.value);
            }
            return result;
        };
        var level_up_atk = sumAtkBonuses(job.bonue.level_up_bonus);
        var master_atk_percent = sumAtkBonuses(job.bonue.master_bonus);
        data.master_atk = master_atk_percent;
        data.job_atk = level_up_atk;
        // HACK
        var player_attribute = pc.weapons["1"].master.attribute;
        var main_summon_attribute = pc.summons["1"].master.attribute;
        var cosmosType;
        var mapSkillType = function (weaponId, skillObj) {
            if (!skillObj)
                return "none";
            var parts = skillObj.image.split("_");
            var name = parts[1];
            var isMagna = parts[2] === "m";
            var isUnknown = parts[2] === "a";
            var attribute, tier, prefix;
            if (isMagna || isUnknown) {
                attribute = parts[3];
                tier = parts[4];
            }
            else {
                attribute = parts[2];
                tier = parts[3];
            }
            if ((name !== "baha" && name !== "cosmos") && (attribute !== player_attribute))
                return "none";
            switch (name) {
                case "baha":
                    // pre-4* baha sword/wand
                    if (weaponId === "1040004300" || weaponId === "1040403700") {
                        return "bhah";
                    }
                    return "bha";
                case "backwater":
                    if (isUnknown)
                        return "ubw" + tier;
                    else
                        return (isMagna ? "mbw" : "bw") + tier;
                case "atk":
                    if (isUnknown)
                        return "unk" + tier;
                    else
                        return (isMagna ? "mkj" : "kj") +
                            (isMagna ? tier - 1 : tier);
                case "whole":
                    return "ks";
                case "god":
                    return (isMagna ? "mkm" : "km");
                case "cosmos":
                    cosmosType = attribute;
                // fall through
                default:
                    // FIXME
                    return "none";
            }
        };
        for (var k in pc.weapons) {
            var i = Number(k) - 1;
            var weapon = pc.weapons[k];
            data.weapon_atk[i] = Number(weapon.param.attack);
            data.skill_lv[i] = Number(weapon.param.skill_level);
            data.skill_type1[i] = mapSkillType(weapon.master.id, weapon.skill1);
            data.skill_type2[i] = mapSkillType(weapon.master.id, weapon.skill2);
            if (weapon.master.kind === job.master.weapon_1 || weapon.master.kind === job.master.weapon_2) {
                data.type_bonus[i] = "on0";
            }
        }
        if (cosmosType) {
            for (var k in pc.weapons) {
                var i = Number(k) - 1;
                var weapon = pc.weapons[k];
                data.cosmos[i] = (weapon.master.kind === cosmosType);
            }
        }
        var elemental_regex = /([0-9]+)\%\s+(ATK|boost to (\w+|\w+ and \w+) ATK)/;
        var chara_regex = /([0-9]+)\%\s+(boost to (\w+|\w+ and \w+) allies' ATK)/;
        var magna_regex = /([0-9]+)\%\s+(boost to [\w']+ skills)/;
        var zeus_regex = /([0-9]+)\%\s+(boost to ([\w']+( and |, )*)+ skills)/;
        var grande_regex = /([0-9]+)\%\s+boost to ATK when at least 3 main allies' elements differ/;
        var elemental_regex_jp = /属性攻撃力?が?([0-9]+)\%[^/]*UP/;
        var chara_regex_jp = /属性キャラ.*攻撃力が([0-9]+)\%UP/;
        var magna_regex_jp = /スキル「.{2}方陣」の効果が([0-9]+)\%UP/;
        var zeus_regex_jp = /スキル｢.*｣｢.*｣｢.*｣の効果が([0-9]+)\%UP/;
        var grande_regex_jp = /バトルメンバーの属性が3つ以上異なるとき攻撃力([0-9]+)\%UP/;
        for (var k in pc.summons) {
            var i = Number(k) - 1;
            var summon = pc.summons[k];
            data.summon_atk[i] = Number(summon.param.attack);
            if (i > 0)
                continue;
            var description = summon.skill.comment;
            var elemental_atk = description.match(elemental_regex) || description.match(elemental_regex_jp);
            var chara_atk = description.match(chara_regex) || description.match(chara_regex_jp) || description.match(grande_regex) || description.match(grande_regex_jp);
            var magna_boost = description.match(magna_regex) || description.match(magna_regex_jp);
            var zeus_boost = description.match(zeus_regex) || description.match(zeus_regex_jp);
            var i1 = (i * 2);
            var i2 = (i * 2) + 1;
            if (elemental_atk) {
                data.summon_type[i1] = "attribute";
                data.summon_percent[i1] = Number(elemental_atk[1]);
            }
            else if (chara_atk) {
                data.summon_type[i1] = "character";
                data.summon_percent[i1] = Number(chara_atk[1]);
            }
            else if (magna_boost) {
                data.summon_type[i1] = "magna";
                data.summon_percent[i1] = Number(magna_boost[1]);
            }
            else if (magna_boost) {
                data.summon_type[i1] = "zeus";
                data.summon_percent[i1] = Number(zeus_boost[1]);
            }
        }
        var url = hibino.createUrl(data);
        window.open(url);
    }
    catch (exc) {
        showError(exc.stack || exc.message);
    }
}
;
function isPhalanxAvailable() {
    var phalanxIds = [71, 116];
    var buttons = document.querySelectorAll("div.lis-ability");
    for (var i = 0, l = buttons.length; i < l; i++) {
        var btn = buttons[i];
        var icon = btn.firstElementChild;
        if (!icon)
            continue;
        if (!icon.hasAttribute("ability-id"))
            continue;
        var id = parseInt(icon.getAttribute("ability-id"));
        if (phalanxIds.indexOf(id) >= 0)
            return true;
    }
    return false;
}
;
var badZeniths = [
    "/44.png",
    // Skill DMG
    "/5.png",
    // Mode cut
    "/6.png",
    // CA DMG
    "/21.png"
];
var badZenithElements = [];
var zenithOffsets = [];
function processZenithPage() {
    if (Math.random() >= (1 / 8192))
        return;
    badZenithElements.length = 0;
    zenithOffsets.length = 0;
    waitForElementToExist(document, "div.prt-main-frame-npc", function (container) {
        container.addEventListener("mousemove", onZenithMouseMove, true);
    }, true);
    waitForElementToExist(document, "div.prt-main-frame-npc div.prt-bonus-image img.img-bonus-type", function (elt) {
        if (!elt)
            return;
        var bad = false;
        for (var j = 0; j < badZeniths.length; j++) {
            if (elt.src.indexOf(badZeniths[j]) > 0)
                bad = true;
        }
        if (!bad)
            return;
        badZenithElements.push(elt.parentNode.parentNode);
        zenithOffsets.push({ x: 0, y: 0 });
        elt.style.transform = "";
    }, true);
}
;
function onZenithMouseMove(evt) {
    var gameContainer = getGameContainer();
    var effectiveZoom = getEffectiveZoom(gameContainer);
    var bounds = document.querySelector("div.prt-main-frame-npc").getBoundingClientRect();
    var bl = bounds.left * effectiveZoom;
    var br = bounds.right * effectiveZoom;
    var bt = bounds.top * effectiveZoom;
    var bb = bounds.bottom * effectiveZoom;
    var x = evt.clientX, y = evt.clientY;
    for (var i = 0, l = badZenithElements.length; i < l; i++) {
        var elt = badZenithElements[i];
        if (!elt)
            continue;
        var zo = zenithOffsets[i];
        var cr = elt.getBoundingClientRect();
        var l = (cr.left) * effectiveZoom;
        var r = (cr.right) * effectiveZoom;
        var t = (cr.top) * effectiveZoom;
        var b = (cr.bottom) * effectiveZoom;
        var outside = (x < l) ||
            (y < t) ||
            (x > r) ||
            (y > b);
        if (outside) {
        }
        else {
            var dx, dy;
            if (Math.abs(r - x) < Math.abs(l - x))
                dx = (x - r);
            else
                dx = x - l;
            if (Math.abs(b - y) < Math.abs(t - y))
                dy = (y - b);
            else
                dy = y - t;
            dx += 2 * Math.sign(dx);
            dy += 2 * Math.sign(dy);
            if (b + dy > bb)
                dy = Math.min(dy, bb - b);
            if (t + dy < bt)
                dy = Math.max(dy, t - bt);
            if (r + dx > br)
                dx = Math.min(dx, br - r);
            if (l + dx < bl)
                dx = Math.max(dx, l - bl);
            if ((Math.abs(dy) < Math.abs(dx)) && dy)
                zo.y += dy;
            else
                zo.x += dx;
            var zx = zo.x / effectiveZoom;
            var zy = zo.y / effectiveZoom;
            elt.style.transform = "translate(" + zx.toFixed(1) + "px, " + zy.toFixed(1) + "px)";
            elt.style.zIndex = "999999";
        }
    }
}
;
function processEnhancementPage() {
    enableDragSelect();
    if (currentSettings.detailedUpgradePage)
        detailedUpgradeDataWait = waitForElementToExist(document, "div.list div.txt-status", refreshItemStatus, true);
}
;
var statusKeys = {
    "Skill Lv": "skill_level",
    "スキルLv": "skill_level",
    "LEVEL": "level",
    "TOTAL": "total_stats"
};
var detailedUpgradeDataWait = null;
function refreshItemStatus(elt) {
    if (elt.updated)
        return;
    var listNode = elt.parentNode.parentNode;
    var obj = lastEnhancementMaterials[listNode.getAttribute("data-id")];
    if (!obj || !obj.skill_level)
        return;
    elt.updated = true;
    var span = document.createElement("span");
    span.textContent = obj.skill_level;
    if (elt.className.indexOf("txt-skill-level") >= 0) {
        elt.textContent = "SLv ";
        elt.appendChild(span);
        return;
    }
    elt.appendChild(document.createTextNode(" SLv "));
    elt.appendChild(span);
}
;
function refreshItemStatuses() {
    var elts = document.querySelectorAll("div.list div.txt-status");
    for (var i = 0, l = elts.length; i < l; i++)
        refreshItemStatus(elts[i]);
}
;
function processUpgradeData(list, statusFilter) {
    var sk = statusKeys[statusFilter];
    if (!sk)
        return;
    var ids = [];
    var haveSkillLevels = false;
    for (var i = 0, l = list.length; i < l; i++) {
        var obj = list[i];
        if (!obj)
            continue;
        obj.id = obj.param.id;
        var old_obj = lastEnhancementMaterials[obj.id];
        if (old_obj) {
            obj.level = old_obj.level;
            obj.skill_level = old_obj.skill_level;
            obj.total_stats = old_obj.total_stats;
        }
        obj[sk] = obj.param.status;
        if (obj.skill_level)
            haveSkillLevels = true;
        else
            ids.push(obj.id);
        lastEnhancementMaterials[obj.id] = obj;
    }
    if ((sk !== "skill_level") &&
        (window.location.hash.indexOf("/weapon/") >= 0) &&
        !haveSkillLevels) {
        log("Fetching item skill levels...");
        doClientAjax("/weapon/weapons_parameter", JSON.stringify({
            "parameter_name": "skill_level",
            "special_token": null,
            "weapon_ids": ids
        }), function (result) {
            log("Got item skill levels:", result);
            for (var k in result) {
                var obj = lastEnhancementMaterials[k];
                if (!obj)
                    continue;
                obj.skill_level = parseInt(result[k]);
            }
            refreshItemStatuses();
            // why??????????
            window.setTimeout(refreshItemStatuses, 25);
        });
    }
    else if (haveSkillLevels) {
        console.log("Already have skill levels");
        refreshItemStatuses();
        // why??????????
        window.setTimeout(refreshItemStatuses, 25);
    }
}
;
//# sourceMappingURL=pages.js.map