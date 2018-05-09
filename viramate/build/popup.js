"use strict";
window.addEventListener("load", onLoad, false);
var lastStatus, lastCounters, lastRaidCode;
var activatorTab;
var log = console.log.bind(console);
function onLoad() {
    log("onLoad");
    chrome.runtime.sendMessage({ type: "getSettings" }, function (currentSettings) {
        log("got settings");
        applyLocalization(currentSettings);
        if (currentSettings.globalDisable) {
            showModal(i18n.get("p-globalDisable"), tryEnableExtension, false, i18n.get("p-enable"));
        }
        else {
            console.log("finding tabs");
            chrome.tabs.query({
                active: true, lastFocusedWindow: true
            }, function (tabs) {
                if (tabs.length === 0) {
                    showModal(i18n.get("p-tabNotFound"), false);
                    return;
                }
                // check the url
                if ((tabs[0].url.indexOf("game.granbluefantasy.jp") < 0) &&
                    (tabs[0].url.indexOf("gbf.game.mbga.jp") < 0)) {
                    showModal(i18n.get("p-tabNotFound"), false);
                    return;
                }
                log("found tabs", tabs);
                activatorTab = tabs[0];
                chrome.runtime.sendMessage({ type: "getRaidCode", tabId: activatorTab.id }, refreshRaidCode);
                log("Getting userid and tab id");
                chrome.runtime.sendMessage({ type: "getUserId", tabId: activatorTab.id }, function (uid) {
                    log("Got userid and tab id", uid);
                    // prevent doing extra work if not logged in
                    if (!uid) {
                        log("Not logged in");
                        showModal(i18n.get("p-notLoggedIn"), false);
                        return;
                    }
                    chrome.runtime.sendMessage({ type: "getStatus", tabId: activatorTab.id, uid: uid }, refreshStatus);
                    chrome.runtime.sendMessage({ type: "getNextRankRp", tabId: activatorTab.id, uid: uid }, refreshNextRankRp);
                    chrome.runtime.sendMessage({ type: "getItemCounters", tabId: activatorTab.id, uid: uid }, refreshItemCounts);
                    document.querySelector("#xp").addEventListener("mousedown", function (evt) {
                        if (evt.which === 1) {
                            chrome.runtime.sendMessage({ type: "getNextRankRp", tabId: activatorTab.id, uid: uid, force: true }, refreshNextRankRp);
                            document.querySelector("#xp > span.value").style.display = "inline";
                        }
                    });
                });
                maybeShowDeadMessage();
            });
            chrome.runtime.sendMessage({ type: "isShutdown" }, function (state) {
                log("Got isShutdown response");
                if (state) {
                    showModal(i18n.get("p-incompatibleVersion"), false);
                    var mt = document.querySelector("#modalText");
                    var img = document.createElement("img");
                    img.style.marginTop = "6px";
                    img.width = "160";
                    img.src = "update.png";
                    img.onload = centerModal;
                    mt.appendChild(img);
                }
            });
        }
    });
    var rc = autoPasteRaidCode();
    rc.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            doJoinRaid_popup();
        }
    }, false);
    addTextboxListeners();
    window.addEventListener("focus", function (e) { autoPasteRaidCode(); }, false);
    document.querySelector("#join").addEventListener("click", doJoinRaid_popup, false);
    document.querySelector("#fullElixir").addEventListener("click", useFullElixir, false);
    document.querySelector("#halfElixir").addEventListener("click", useHalfElixir, false);
    document.querySelector("#soulBalm").addEventListener("click", useSoulBalm, false);
    document.querySelector("#soulBerry").addEventListener("click", useSoulBerry, false);
    document.querySelector("#copyRaidCode").addEventListener("click", copyRaidCode, false);
    document.querySelector("#disableExtension").addEventListener("click", tryDisableExtension, false);
}
;
function tryDisableExtension() {
    chrome.runtime.sendMessage({ type: "setGlobalDisable", state: true });
    showModal(i18n.get("p-triedToDisable"), false);
}
;
function tryEnableExtension() {
    chrome.runtime.sendMessage({ type: "setGlobalDisable", state: false });
    showModal(i18n.get("p-triedToEnable"), false);
}
;
function addTextboxListeners() {
    var rc = document.querySelector("input#raidCode");
    var btn = document.querySelector("#join");
    var onChange = function () {
        var code = rc.value.trim();
        switch (code.length) {
            case 8:
                btn.removeAttribute("disabled");
                btn.textContent = i18n.get("p-joinRaid");
                break;
            case 5:
            case 6:
                btn.removeAttribute("disabled");
                btn.textContent = i18n.get("p-joinRoom");
                break;
            default:
                btn.setAttribute("disabled", "disabled");
                btn.textContent = i18n.get("p-join");
                break;
        }
    };
    rc.addEventListener("change", onChange);
    rc.addEventListener("keydown", onChange);
    rc.addEventListener("keyup", onChange);
    onChange();
    window.setTimeout(onChange, 100);
}
;
function autoPasteRaidCode() {
    var rc = document.querySelector("input#raidCode");
    var oldValue = rc.value;
    rc.focus();
    rc.value = "";
    document.execCommand("paste");
    rc.value = rc.value.trim();
    if ((rc.value.length < 5) || (rc.value.length > 8))
        rc.value = oldValue;
    return rc;
}
;
function applyLocalization(currentSettings) {
    i18n.setLanguageGetter(function () {
        return currentSettings.language;
    });
    var elts = document.querySelectorAll(".localized");
    for (var i = 0; i < elts.length; i++) {
        var elt = elts[i];
        var key = "p-" + elt.id;
        if (elt.className.indexOf("tooltip") >= 0) {
            elt.title = i18n.get(key);
        }
        else {
            elt.textContent = i18n.get(key);
        }
    }
    document.documentElement.lang = currentSettings.language;
}
;
function maybeShowDeadMessage() {
    chrome.runtime.sendMessage({ type: "getIsDead" }, function (isDead) {
        if (isDead)
            showModal(i18n.get("p-pleaseReload"), false);
    });
}
;
function refreshRaidCode(raidCode) {
    lastRaidCode = raidCode;
    if (raidCode) {
        document.querySelector("#raidCodePanel").style.display = "block";
        document.querySelector("#currentRaidCode").value = raidCode;
    }
    else {
        document.querySelector("#raidCodePanel").style.display = "none";
    }
    maybeShowDeadMessage();
}
;
function copyRaidCode() {
    var textbox = document.querySelector("#currentRaidCode");
    textbox.value = lastRaidCode;
    textbox.select();
    document.execCommand("copy", false, null);
}
;
function refreshStatus(status) {
    if (!status)
        return;
    lastStatus = status;
    var ap = status._precise_ap;
    var bp = status._precise_bp;
    var apFill = Math.min((ap / parseInt(status.max_action_point) * 100), 100).toFixed(1);
    var bpFill = Math.min(bp / status.max_battle_point * 100, 100).toFixed(1);
    document.querySelector("#xp > div.fill").style.width = status.levelGauge;
    document.querySelector("#ap > span.value").textContent = Math.floor(ap * 10) / 10;
    document.querySelector("#ap > div.fill").style.width = apFill + "%";
    document.querySelector("#bp > span.value").textContent = Math.floor(bp * 10) / 10;
    document.querySelector("#bp > div.fill").style.width = bpFill + "%";
    refreshButtonStates();
}
;
function refreshNextRankRp(toNextRank) {
    if (!toNextRank)
        return;
    document.querySelector("span#expValue").textContent = toNextRank;
    document.querySelector("#xp > span.value").style.display = "inline";
}
;
function refreshItemCounts(itemCounts) {
    if (!itemCounts)
        return;
    lastCounters = itemCounts;
    var buttons = document.querySelectorAll("button.item");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var itemId = button.getAttribute("index");
        if (!itemCounts[itemId]) {
            button.textContent = 0;
        }
        else {
            button.textContent = itemCounts[itemId].number;
        }
    }
    refreshButtonStates();
}
;
function refreshButtonStates() {
    if (!lastCounters)
        return;
    if (!lastStatus)
        return;
    var buttons = document.querySelectorAll("button.item");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var itemId = button.getAttribute("index");
        var isEnabled = (itemId === "1") ||
            (itemId === "2") ||
            Number(lastStatus.bp) < lastStatus.battle_point_limit;
        isEnabled = isEnabled && (Number(lastCounters[itemId].number) > 0);
        if (isEnabled)
            button.removeAttribute("disabled");
        else
            button.setAttribute("disabled", "disabled");
        button.title = i18n.getExpand("p-use", ["@i-" + button.id]);
    }
    maybeShowDeadMessage();
}
;
// showModal(text) -> text, OK button
// showModal(text, false) -> no OK button
// showModal(text, onConfirm) -> OK & cancel buttons; callback invoked if OK is clicked
// showModal(text, onConfirm, false) -> OK button; callback invoked if OK is clicked
// showModal(text, onConfirm, onCancel) -> OK & cancel buttons; callback invoked if OK is clicked
// if text contains {drop|#|#|#}, it will be replaced with a dropdown, the first number being the default, second the min, third the max
function showModal(text, onConfirm, onCancel, confirmText) {
    var done = false;
    var msg = document.querySelector("#modalText");
    msg.innerHTML = parseDrop(text);
    var dialog = document.querySelector("#modal");
    var unhookEvents;
    var confirmed = function () {
        if (done)
            return;
        done = true;
        unhookEvents();
        dialog.style.display = "none";
        if (onConfirm) {
            var dropdown = document.getElementById("item-dropdown");
            if (dropdown) {
                onConfirm(parseInt(dropdown.value));
            }
            else {
                onConfirm();
            }
        }
    };
    var cancelled = function () {
        if (done)
            return;
        done = true;
        unhookEvents();
        dialog.style.display = "none";
        if (onCancel)
            onCancel();
    };
    var confirmButton = document.querySelector("#confirm");
    var cancelButton = document.querySelector("#cancel");
    unhookEvents = function () {
        confirmButton.removeEventListener("click", confirmed, false);
        cancelButton.removeEventListener("click", cancelled, false);
    };
    confirmButton.addEventListener("click", confirmed, false);
    if (onConfirm === false) {
        confirmButton.style.display = "none";
        cancelButton.style.display = "none";
    }
    else if (onConfirm) {
        cancelButton.style.display = (onCancel !== false) ? "inline-block" : "none";
        cancelButton.addEventListener("click", cancelled, false);
        if (confirmText) {
            confirmButton.textContent = confirmText;
        }
        else {
            confirmButton.textContent = i18n.get("p-confirm");
        }
    }
    else {
        cancelButton.style.display = "none";
        confirmButton.textContent = i18n.get("p-ok");
    }
    dialog.style.display = "block";
    centerModal();
}
;
function centerModal() {
    var dialog = document.querySelector("#modal");
    var contentBox = document.querySelector("#modalContent");
    var contentHeight = contentBox.scrollHeight;
    var paddingTop = (dialog.scrollHeight - contentHeight) / 2.0;
    dialog.style.paddingTop = paddingTop.toFixed(1) + "px";
}
;
function useFullElixir() {
    var max = Math.min(Math.ceil((lastStatus.action_point_limit - lastStatus.ap) / lastStatus.elixir_recover_value), parseInt(lastCounters["1"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-fullElixir", 1, 1, max]), function (value) {
        useNormalItem(1, value);
    });
}
;
function useHalfElixir() {
    var max = Math.min(Math.ceil((lastStatus.action_point_limit - lastStatus.ap) / lastStatus.elixir_half_recover_value), parseInt(lastCounters["2"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-halfElixir", 1, 1, max]), function (value) {
        useNormalItem(2, value);
    });
}
;
function useSoulBalm() {
    var max = Math.min(Math.ceil((lastStatus.battle_point_limit - lastStatus.bp) / parseInt(lastStatus.soul_powder_recover_value)), parseInt(lastCounters["3"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-soulBalm", 1, 1, max]), function (value) {
        useNormalItem(3, value);
    });
}
;
function useSoulBerry() {
    var useCount = Math.min(lastStatus.battle_point_limit, lastStatus.max_battle_point - lastStatus.bp);
    if (useCount < 1)
        useCount = 5;
    var max = Math.min(Math.ceil((lastStatus.battle_point_limit - lastStatus.bp) / parseInt(lastStatus.soul_seed_recover_value)), parseInt(lastCounters["5"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-soulBerry", useCount, 1, max]), function (value) {
        useNormalItem(5, value);
    });
}
;
function useNormalItem(itemId, count) {
    useNormalItemCallback(itemId, count, function (result) {
        chrome.runtime.sendMessage({ type: "getUserId", tabId: activatorTab.id }, function (uid) {
            chrome.runtime.sendMessage({ type: "getStatus", tabId: activatorTab.id, uid: uid, force: true }, refreshStatus);
            chrome.runtime.sendMessage({ type: "getItemCounters", tabId: activatorTab.id, uid: uid, force: true }, refreshItemCounts);
        });
    });
}
;
function useNormalItemCallback(itemId, count, successCallback) {
    var data = {
        item_id: String(itemId),
        num: count,
        special_token: null
    };
    console.log("Using item", data);
    doGameAjax("/item/use_normal_item", JSON.stringify(data), function (result) {
        console.log("Used item, response was", result);
        if (result &&
            (typeof (result.before) !== "undefined") &&
            (typeof (result.after) !== "undefined")) {
            successCallback(result);
        }
        else if (result && result.idleTimeout) {
            showModal("Idle timeout");
        }
        else {
            showModal("Failed to use item");
        }
    });
}
;
function parseDrop(text) {
    // if there is a match, this will result in an array with the matched text and the 3 numerical params
    var matches = text.match(/\{drop\|([\d]+)\|([\d]+)\|([\d]+)\}/);
    if (matches) {
        var defaultItem = parseInt(matches[1]);
        var min = parseInt(matches[2]);
        var max = parseInt(matches[3]);
        var select = document.createElement("select");
        select.id = "item-dropdown";
        for (var i = min; i <= max; i++) {
            var option = document.createElement("option");
            option.text = option.value = i;
            select.add(option);
            if (i === defaultItem) {
                option.setAttribute("selected", "selected");
            }
        }
        text = text.replace(matches[0], select.outerHTML);
    }
    return text;
}
function doGamePopup(data) {
    var msg = {
        type: "doGamePopup",
        data: data,
        tabId: activatorTab.id
    };
    chrome.runtime.sendMessage(msg);
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
}
;
function doGameRedirect(url) {
    var msg = {
        type: "doGameRedirect",
        url: url,
        tabId: activatorTab.id
    };
    chrome.runtime.sendMessage(msg);
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
}
;
function doGameAjax(url, data, callback) {
    var msg = {
        type: "doGameAjax",
        url: url,
        data: data,
        tabId: activatorTab.id
    };
    chrome.runtime.sendMessage(msg, callback);
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
}
;
function doJoinRaid_popup(raidId) {
    // the type of the variable can be an event since this function is used as the callback of an event handler
    if (!raidId || typeof (raidId) !== "string") {
        raidId = document.querySelector("input#raidCode").value.trim();
    }
    if ((raidId.length == 5) || (raidId.length == 6)) {
        var msg = {
            type: "tryJoinCoOpRoom",
            code: raidId,
            tabId: activatorTab.id
        };
        chrome.runtime.sendMessage(msg, function (ok) {
            if (ok && ok.startsWith("popup"))
                return;
            showModal(ok || "unknown result", null, null, null);
        });
        if (chrome.runtime.lastError)
            showModal(chrome.runtime.lastError.toString());
        return;
    }
    if (raidId.length !== 8) {
        showModal(i18n.get("p-invalidRaidCode"));
        return;
    }
    var payload = { special_token: null, battle_key: raidId };
    doGameAjax("/quest/battle_key_check", JSON.stringify(payload), function (result) {
        console.log("Battle key check returned", result);
        if (result) {
            if (result.popup && result.popup.body) {
                doGamePopup(result.popup);
                window.close();
            }
            else if (result.redirect) {
                doGameRedirect(result.redirect);
                window.close();
            }
            else if ((typeof (result.current_battle_point) === "number") &&
                !result.battle_point_check) {
                var statusText = result.chapter_name + " @ ";
                statusText += i18n.getExpand("p-status", [result.member_count, result.boss_hp_width]);
                showModal(statusText + "<br />" + i18n.getExpand("p-bpRequired", [result.used_battle_point]), function () {
                    // force an update just to check that we're refilling the right amount
                    chrome.runtime.sendMessage({ type: "getUserId", tabId: activatorTab.id }, function (uid) {
                        chrome.runtime.sendMessage({ type: "getStatus", tabId: activatorTab.id, uid: uid, force: true }, function (status) {
                            var useCount = Math.min(result.used_battle_point, result.used_battle_point - status.bp);
                            useNormalItemCallback(5, useCount, function () {
                                // always use the current raid id in case it changes due to the focus changing
                                doJoinRaid_popup(raidId);
                            });
                        });
                    });
                }, null, i18n.get("p-refill"));
            }
            else if (result.idleTimeout) {
                showModal("Idle timeout");
            }
            else {
                showModal(i18n.get("p-raidJoinFailed"));
            }
        }
        else {
            showModal(i18n.get("p-raidJoinFailed"));
        }
    });
}
;
//# sourceMappingURL=popup.js.map