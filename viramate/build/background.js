"use strict";
var settings = new Store("settings", {
    "preferFriendSummons": true,
    "preferNonFriendSummonsInFavorites": true,
    "preferLimitBrokenSummons": true,
    "preferHighLevelSummons": true,
    "notifyOnFullAP": false,
    "notifyOnFullBP": false,
    "showSkillCooldowns": true,
    "showDebuffTimers": true,
    "showBuffTimers": true,
    "monitorRaidDebuffs": true,
    "keyboardShortcuts": true,
    "showBookmarks": true,
    "preferredSummonElement": "",
    "submenuSize": 1.0,
    "bookmarksSize": 1.0,
    "bookmarksMenuSize": 1.0,
    "recentQuest": null,
    "showQuickPanels": true,
    "showGaugeOverlays": true,
    "openBookmarksOnClick": false,
    "fixJPFontRendering": true,
    "enableCoOpEnhancements": true,
    "dropdownFix": true,
    "disableMiddleRightClick": true,
    "statusPanel": true,
    "itemsPanel": true,
    "raidsPanel": false,
    "clockBrightness": 0.65,
    "oneClickQuickSummons": true,
    "bookmarksInactiveIcon": null,
    "bookmarksActiveIcon": null,
    "bookmarksIconPadding": 100,
    "horizontalBookmarks": false,
    "statusPanelBuffs": false,
    "statusPanelExpiringBuffs": true,
    "betterEnglishFont": false,
    "showItemWatchButtons": true,
    "showPartyNames": true,
    "filterEnemyTimers": true,
    "showPerformanceHud": false,
    "showNetworkHud": false,
    "showWeaponAttack": true,
    "showSkillActivationIndicator": true,
    "autofillBackupTweets": true,
    "moveCoOpFooter": true,
    "largeQuickPanels": false,
    "showPartyHelp": false,
    "keepSoundOnBlur": true,
    "stuckButtonWorkaround2": true,
    "showLastActionTimer": true,
    "smartSupports": true,
    "defaultToSmartSupports": false,
    "disablePhalanxSticker": true,
    "summonOrder": "{}",
    "password": "",
    "minimumPopupWait": 350,
    "maximumPopupWait": 1750,
    "focusQuickPanels": true,
    "newSkillSystem": true,
    "arcarumFix": true,
    "enableRaidSync": true,
    "enableAutomaticUpdates": true,
    "showGuildWarMenu": true,
    "mistakeGuard": true,
    "showNextRankExp": true,
    "globalDisable": false
});
var failedUpdateMinimumDelay = 10 * 1000;
var minimumUpdateDelay = 60 * 4 * 1000;
var minimumRaidUpdateDelay = 30 * 1000;
var minimumItemUpdateDelay = 60 * 30 * 1000;
var minimumHaloUpdateDelay = 60 * 30 * 1000;
var secretKeysByTabId = {};
var lastFailure = -1;
var users = {};
var lastRaidCodes = {};
var isDead = true;
var isShutdown = false;
var lastLocation = null;
var idleRedirectPending = false;
var lastRedirectTarget = null;
var minimumVersionJsonUpdateDelay = 2 * 60 * 60 * 1000;
var isFreshStart = true;
var isRemoteShutdown = JSON.parse(settings.get("isRemoteShutdown") || "false");
var remoteDisabledFeatures = JSON.parse(settings.get("remoteDisabledFeatures") || "[]");
var updateCheckDelay = Math.max(JSON.parse(settings.get("updateCheckDelay") || "0"), minimumVersionJsonUpdateDelay);
// chrome.runtime.onConnect.addListener(onPortConnect);
chrome.runtime.onMessage.addListener(onRuntimeMessage);
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.runtime.onInstalled.addListener(function () {
    var dc = chrome.declarativeContent;
    dc.onPageChanged.removeRules(undefined, function () {
        dc.onPageChanged.addRules([
            {
                conditions: [
                    new dc.PageStateMatcher({
                        pageUrl: { hostEquals: 'game.granbluefantasy.jp', schemes: ["https", "http"] },
                    }),
                    new dc.PageStateMatcher({
                        pageUrl: { hostEquals: 'gbf.game.mbga.jp', schemes: ["https", "http"] },
                    })
                ],
                actions: [new dc.ShowPageAction()]
            }
        ]);
    });
});
log("Started");
try {
    if (isRemoteShutdown)
        log("Remote shutdown currently enabled.");
    if (remoteDisabledFeatures.length)
        log("Remote disabled features: " + JSON.stringify(remoteDisabledFeatures));
    var nextUpdateWhen = Number(settings.get("nextVersionJsonUpdate") || "0");
    if (nextUpdateWhen < Date.now())
        log("version.json update is due.");
    else
        log("Next version.json update in " + (((nextUpdateWhen - Date.now()) / 1000) / 60).toFixed(1) + " minute(s).");
}
catch (exc) {
    log(exc);
}
try {
    var openAtStartupUrl = settings.get("openAtStartupUrl");
    settings.set("openAtStartupUrl", null);
    if (openAtStartupUrl) {
        log("Opening at startup as configured:", openAtStartupUrl);
        chrome.tabs.create({ url: openAtStartupUrl });
    }
}
catch (exc) {
    log(exc);
}
function forceReloadExtension(reason) {
    log("Attempting to reload extension...", reason);
    var extensionManagerId = "oeckhkihaapneibcobhbegmgoaejfflc";
    chrome.runtime.sendMessage(extensionManagerId, { type: "reloadExtension", id: chrome.runtime.id, reason: reason }, {}, function (response) {
        if (chrome.runtime.lastError) {
            console.log("Viramate Extension Manager is not installed or is disabled.", chrome.runtime.lastError);
        }
        else
            log("Reload request sent and got response", response);
    });
}
;
function getAdjustedSettings() {
    var result = settings.toObject();
    result.allowDragSelect = false;
    // result.autoSkipToQuestResults = false;
    // result.oneClickQuickSummons = false;
    result.realtimeRaidList = false;
    // result.raidsPanel = false;
    // result.showQuickPanels = false;
    result.touchInputSupport = false;
    // Cygamesssssssssssssss
    result.autofillBackupTweets = false;
    // API changes broke this
    result.detailedUpgradePage = false;
    result.newSkillSystem = true;
    for (var i = 0; i < remoteDisabledFeatures.length; i++)
        result[remoteDisabledFeatures[i]] = false;
    if (isShutdown || isRemoteShutdown || result.globalDisable)
        result.isShutdown = true;
    // FIXME: Is this necessary?
    if (result.hideMobageSidebar)
        result.horizontalBookmarks = true;
    return result;
}
;
function log(...args) {
    args.unshift((new Date()).toLocaleString() + " |");
    console.log.apply(console, args);
}
;
function getWatchedItems() {
    var result = JSON.parse(settings.get("watchedItems") || "[]");
    if ((result.length === 1) && (result[0] === null))
        result = [];
    var targetCounts = JSON.parse(settings.get("targetItemCounts") || "{}");
    return {
        items: result,
        counts: targetCounts
    };
}
;
function setItemWatchTarget(id, count) {
    var targetCounts = JSON.parse(settings.get("targetItemCounts") || "{}");
    targetCounts[id] = count;
    settings.set("targetItemCounts", JSON.stringify(targetCounts));
}
;
function addWatchedItem(id) {
    var items = getWatchedItems().items;
    if (items.indexOf(id) >= 0)
        return items;
    if (!id)
        return items;
    items.push(id);
    settings.set("watchedItems", JSON.stringify(items));
    return items;
}
;
function removeWatchedItem(id) {
    var items = getWatchedItems().items;
    var index = items.indexOf(id);
    if (index < 0)
        return items;
    items.splice(index, 1);
    settings.set("watchedItems", JSON.stringify(items));
    return items;
}
;
function getFavedSummons() {
    var result = JSON.parse(settings.get("favedSummons") || "[]");
    if ((result.length === 1) && (result[0] === null))
        result = [];
    return result;
}
;
function addFavedSummon(id) {
    var items = getFavedSummons();
    if (items.indexOf(id) >= 0)
        return items;
    if (!id)
        return items;
    items.push(id);
    settings.set("favedSummons", JSON.stringify(items));
    return items;
}
;
function removeFavedSummon(id) {
    var items = getFavedSummons();
    var index = items.indexOf(id);
    if (index < 0)
        return items;
    items.splice(index, 1);
    settings.set("favedSummons", JSON.stringify(items));
    return items;
}
;
function getUserDict(uid) {
    var dict = users[uid];
    if (!dict)
        dict = users[uid] = { lastUpdate: [] };
    return dict;
}
;
function setUserData(uid, key, data) {
    var dict = getUserDict(uid);
    if (data) {
        dict.lastUpdate[key] = Date.now();
        dict[key] = data;
    }
    else {
        dict.lastUpdate[key] = 0;
        dict[key] = null;
    }
}
;
function getUserData(uid, key) {
    var dict = getUserDict(uid);
    return dict[key];
}
;
function getLastDataUpdate(uid, key) {
    var dict = getUserDict(uid);
    return dict.lastUpdate[key];
}
;
function formatItemCounters(uid) {
    var itemCounters = getUserDict(uid).itemCounters;
    if (!itemCounters)
        return null;
    var counterDict = {};
    for (var i = 0, l = itemCounters.length; i < l; i++) {
        var item = itemCounters[i];
        counterDict[item.item_id] = item;
    }
    return counterDict;
}
;
function onPortConnect(port) {
    port.onMessage.addListener(onPortMessage.bind(port));
}
;
function onPortMessage(msg) {
    var port = this;
    var didSendResponse = false;
    var id = msg.__messageId__;
    var expectsResponse = typeof (id) !== "undefined";
    var sendResponse;
    if (expectsResponse)
        sendResponse = function (response) {
            didSendResponse = true;
            port.postMessage({ type: "__result__", result: response, id: id });
        };
    else
        sendResponse = function (response) {
            log("sendResponse called on message not expecting a response", msg.type, response);
        };
    var result = onRuntimeMessage(msg, port.sender, sendResponse);
    var isSync = (result !== true);
    if (expectsResponse && isSync && !didSendResponse) {
        log("Message handler failed to send a response when one was expected", msg);
        port.postMessage({ type: "__result__", result: undefined, error: "response not sent" });
    }
}
;
function onRuntimeMessage(msg, sender, sendResponse) {
    if (chrome.runtime.lastError)
        log(chrome.runtime.lastError);
    var key = msg.type;
    var userDict;
    if (msg.uid)
        userDict = getUserDict(msg.uid);
    var tabId;
    if (sender.tab && sender.tab.id)
        tabId = sender.tab.id;
    else if (msg.tabId)
        tabId = msg.tabId;
    if (tabId <= 0) {
        log("Message has no tab id", key);
        return;
    }
    var newState;
    var senderUrl = sender.url || "";
    if ((senderUrl.indexOf("granbluefantasy.jp") >= 0) ||
        (senderUrl.indexOf("mbga.jp") >= 0)) {
    }
    else if ((senderUrl.indexOf("chrome-extension://") >= 0) &&
        (senderUrl.indexOf("api.html") >= 0)) {
        switch (key) {
            case "apiRequest":
            case "getSettings":
                break;
            default:
                log("Rejected disallowed API request", msg);
                return;
        }
    }
    switch (key) {
        case "apiRequest":
            if (!settings.get("webAPI")) {
                log("Rejected API request because API is disabled", msg);
                sendResponse(null);
                return;
            }
            log("Processing API request", msg.request.type);
            switch (msg.request.type) {
                case "getUserIds":
                    sendResponse(JSON.stringify(Object.keys(users)));
                    break;
                case "getVersion":
                    sendResponse(chrome.app.getDetails().version);
                    break;
                case "tryJoinCoOpRoom":
                case "tryJoinRaid":
                case "getCombatState":
                    log("Preparing to send api request", msg);
                    chrome.tabs.query({}, function (tabs) {
                        if (tabs.length === 0) {
                            log("Found no game tab");
                            sendResponse({ type: "result", error: "No game tab found" });
                            return;
                        }
                        for (var i = 0, l = tabs.length; i < l; i++) {
                            var tab = tabs[i];
                            var tabUrl = tab.url;
                            if (!tabUrl ||
                                ((tabUrl.indexOf("game.granbluefantasy.jp") < 0) &&
                                    (tabUrl.indexOf("gbf.game.mbga.jp") < 0))) {
                                continue;
                            }
                            log("Sending api request", msg);
                            actuallySendMessage(msg, tab.id, function (result) {
                                log("Got result for api request");
                                sendResponse(result);
                            });
                            return;
                        }
                        log("Found no granblue tab");
                        sendResponse({ type: "result", error: "No granblue tab found" });
                    });
                    return true;
                default:
                    sendResponse({ type: "result", error: "Unknown message" });
                    break;
            }
            break;
        case "reloadExtension":
            log("Reloading extension upon request");
            settings.set("openAtStartupUrl", msg.openAtStartupUrl);
            forceReloadExtension(msg.reason || "got reloadExtension message");
            break;
        case "getUserIds":
            sendResponse(JSON.stringify(Object.keys(users)));
            break;
        case "setPassword":
            settings.set("password", msg.password);
            break;
        case "pleaseInjectStylesheets":
            injectStylesheetsIntoTab(sender);
            sendResponse(tabId);
            break;
        case "heartbeat":
            isDead = false;
            break;
        case "cancelSuspend":
            if (userDict.isSuspended)
                log("Canceling idle/maintenance suspend for " + msg.uid);
            userDict.isSuspended = false;
            lastFailure = -1;
            break;
        case "isShutdown":
            sendResponse(isShutdown || isRemoteShutdown);
            break;
        case "setCompatibility":
            newState = (msg.state === false);
            if (newState !== isShutdown) {
                log("Compatibility shutdown state set to", newState);
                isShutdown = newState;
            }
            break;
        case "setGlobalDisable":
            newState = !!msg.state;
            if (newState !== !!(settings.get("globalDisable") || false)) {
                log("Global disable state set to", newState);
                settings.set("globalDisable", newState);
            }
            break;
        case "openNewTab":
            chrome.tabs.create({
                url: msg.url
            });
            break;
        case "getVersion":
            sendResponse(chrome.app.getDetails().version);
            break;
        case "setRecentCoOpHost":
            settings.set("recentCoOpHost", msg.data);
            break;
        case "getRecentCoOpHost":
            sendResponse(settings.get("recentCoOpHost") || null);
            break;
        case "setCurrentEvent":
            if (msg.href !== settings.get("currentEvent"))
                log("Event changed to '" + msg.href + "'");
            settings.set("currentEvent", msg.href);
            break;
        case "setCurrentGuildWar":
            if (msg.href !== settings.get("currentGuildWar"))
                log("Guild war changed to '" + msg.href + "'");
            settings.set("currentGuildWar", msg.href);
            if (!msg.href)
                settings.set("currentGuildWarRaidInfo", null);
            break;
        case "setCurrentGuildWarRaidInfo":
            if (msg.raids !== settings.get("currentGuildWarRaidInfo"))
                log("Guild war raid info changed to '" + msg.raids + "'");
            settings.set("currentGuildWarRaidInfo", msg.raids);
            break;
        case "getCurrentEvent":
            sendResponse(settings.get("currentEvent") || null);
            break;
        case "setRecentQuest":
            settings.set("recentQuest", msg.url);
            break;
        case "getRecentQuest":
            sendResponse(settings.get("recentQuest") || null);
            break;
        case "setLastLocation":
            // FIXME: Track per-tab
            lastLocation = msg.url;
            break;
        case "setIdleRedirectPending":
            // FIXME: Track per-tab
            idleRedirectPending = msg.state;
            if (msg.url)
                lastRedirectTarget = msg.url;
            break;
        case "getLastLocation":
            sendResponse(lastLocation || null);
            break;
        case "getIdleRedirectInfo":
            if (idleRedirectPending) {
                sendResponse({ pending: true, location: lastLocation, lastRedirectTarget: lastRedirectTarget });
            }
            else {
                sendResponse({ pending: false });
            }
            break;
        case "getSettings":
            var nextUpdate;
            if (!settings.get("alwaysUpdateVersionJson") &&
                !(isFreshStart && isRemoteShutdown)) {
                nextUpdate = settings.get("nextVersionJsonUpdate");
                if (typeof (nextUpdate) === "string")
                    nextUpdate = Number(nextUpdate);
                else
                    nextUpdate = 0;
            }
            else {
                log("Triggering automatic version.json update");
                nextUpdate = 0;
            }
            isFreshStart = false;
            return maybeDoUpdate(nextUpdate, updateCheckDelay, getAdjustedSettings, downloadLatestVersionJson, sendResponse, false, tabId, msg.uid);
        case "getRaidCode":
            sendResponse(lastRaidCodes[tabId]);
            break;
        case "updateRaidCode":
            lastRaidCodes[tabId] = msg.raidCode;
            break;
        case "getItemCounters":
            return maybeDoUpdate(userDict.nextCounterUpdate, minimumUpdateDelay, formatItemCounters, updateItemCounters, sendResponse, msg.force, tabId, msg.uid);
        case "updateItemCounters":
            userDict.nextCounterUpdate = Date.now() + minimumUpdateDelay;
            userDict.itemCounters = msg.counters;
            break;
        case "invalidateStatus":
            if (userDict.lastStatus)
                log("Status invalidated");
            userDict.nextStatusUpdate = 0;
            userDict.lastStatus = null;
            break;
        case "getStatus":
            var getLastStatus = function (uid) {
                var s = getUserDict(uid).lastStatus;
                if (s)
                    fixupStatus(s, uid);
                return s;
            };
            if (msg.lazy) {
                var lastStatus = getLastStatus(msg.uid);
                if (lastStatus) {
                    sendResponse(lastStatus);
                    return;
                }
                else {
                    // log("Lazy status update failed");
                }
            }
            return maybeDoUpdate(userDict.nextStatusUpdate, minimumUpdateDelay, getLastStatus, updateStatus, sendResponse, msg.force, tabId, msg.uid);
        case "updateStatus":
            handleNewStatus(msg.status, msg.uid);
            break;
        case "invalidateBuffs":
            userDict.nextGuildBuffUpdate = 0;
            userDict.nextPersonalBuffUpdate = 0;
            userDict.guildBuffs = null;
            userDict.personalBuffs = null;
            log("Buffs invalidated");
            break;
        case "updateGuildBuffs":
            userDict.lastGuildBuffUpdate = Date.now();
            userDict.nextGuildBuffUpdate = Date.now() + minimumUpdateDelay;
            userDict.guildBuffs = msg.buffs;
            break;
        case "updatePersonalBuffs":
            userDict.lastPersonalBuffUpdate = Date.now();
            userDict.nextPersonalBuffUpdate = Date.now() + minimumUpdateDelay;
            userDict.personalBuffs = msg.buffs;
            break;
        case "getNextRankRp":
            // if not force, don't actually update since this is a heavy call
            if (!msg.force) {
                if (userDict.nextNextRankRpUpdate) {
                    sendResponse(userDict.nextRankRp);
                    break;
                }
                sendResponse(null);
                break;
            }
            return maybeDoUpdate(userDict.nextNextRankRpUpdate, minimumUpdateDelay, function (uid) { return getUserDict(uid).nextRankRp; }, updateNextRankRp, sendResponse, msg.force, tabId, msg.uid);
        case "updateNextRankRp":
            userDict.nextNextRankRpUpdate = Date.now() + minimumUpdateDelay;
            userDict.nextRankRp = getRpToNextRank(msg.data);
            break;
        case "getRaids":
            return maybeDoUpdate(userDict.nextRaidUpdate, minimumRaidUpdateDelay, function (uid) { return getUserDict(uid).lastRaids; }, updateRaids, sendResponse, msg.force, tabId, msg.uid);
        case "invalidateRaids":
            if (msg.raids) {
                handleNewRaids(msg.raids, msg.uid);
            }
            else {
                if (userDict.lastRaids)
                    log("Raids invalidated");
                userDict.nextRaidUpdate = 0;
                userDict.lastRaids = null;
            }
            break;
        case "getItems":
            return maybeDoUpdate(userDict.nextItemUpdate, minimumItemUpdateDelay, function (uid) { return getUserDict(uid).lastItems; }, updateItems, sendResponse, msg.force, tabId, msg.uid);
        case "invalidateItems":
            if (msg.items) {
                handleNewItems(msg.items, msg.uid);
            }
            else {
                if (userDict.lastItems)
                    log("Items invalidated");
                userDict.nextItemUpdate = 0;
                userDict.lastItems = null;
            }
            break;
        case "getWatchedItems":
            sendResponse(getWatchedItems());
            break;
        case "setItemWatchState":
            if (msg.state)
                sendResponse(addWatchedItem(msg.id));
            else
                sendResponse(removeWatchedItem(msg.id));
            break;
        case "setItemWatchTarget":
            setItemWatchTarget(msg.id, msg.count);
            break;
        case "getFavedSummons":
            sendResponse(getFavedSummons());
            break;
        case "setSummonFaveState":
            if (msg.state)
                sendResponse(addFavedSummon(msg.id));
            else
                sendResponse(removeFavedSummon(msg.id));
            break;
        case "setSummonOrder":
            settings.set("summonOrder", msg.data);
            break;
        case "getIsDead":
            sendResponse(isDead);
            break;
        case "doGameAjax":
            doGameAjax(msg, tabId, msg.uid, sendResponse);
            // retain sendResponse
            return true;
        case "doGamePopup":
        case "doGameRedirect":
            actuallySendMessage(msg, tabId);
            break;
        case "tryJoinCoOpRoom":
        case "getUserId":
            actuallySendMessage(msg, tabId, sendResponse);
            return true;
        case "getIsSuspended":
            sendResponse(!!userDict.isSuspended);
            return true;
        case "recordRewards":
            handleQuestRewards(msg);
            break;
        case "recordRaidInfo":
            handleRaidInfo(msg);
            break;
        case "registerSecretKey":
            secretKeysByTabId[tabId] = msg.key;
            break;
        case "actionStarted":
            userDict.lastActionStartedWhen = msg.when;
            userDict.lastActionId = msg.actionId;
            broadcastActionTimestamps(msg.uid, userDict);
            break;
        case "actionEnded":
            if (msg.succeeded) {
                userDict.lastSuccessfulActionStartedWhen =
                    userDict.lastActionStartedWhen;
            }
            if (userDict.lastActionId === msg.actionId) {
                if (msg.succeeded) {
                    userDict.lastSuccessfulActionId =
                        userDict.lastActionId;
                }
                else {
                    userDict.lastActionId = null;
                }
            }
            userDict.lastActionEndedWhen = msg.when;
            broadcastActionTimestamps(msg.uid, userDict);
            break;
        case "actionCompletedAnimation":
            // When an action's animation is complete, we disable
            //  the timer since the lockout is definitely over
            if (msg.actionId === userDict.lastActionId) {
                userDict.lastActionStartedWhen =
                    userDict.lastActionId = null;
                broadcastActionTimestamps(msg.uid, userDict);
            }
            break;
        case "getLastActionTimestamps":
            sendResponse(makeActionTimestamps(userDict));
            break;
        default:
            log("Unknown message " + key);
            sendResponse({ error: true });
            break;
    }
}
;
function broadcastActionTimestamps(uid, userDict) {
    var obj = makeActionTimestamps(userDict);
    var msg = {
        type: "actionTimestampsChanged",
        data: obj,
        uid: uid
    };
    chrome.tabs.query(
    // FIXME: Can we narrow this to granblue tabs without the 'tabs' permission?
    {}, function (tabs) {
        if (!tabs)
            return;
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            chrome.tabs.sendMessage(tab.id, msg);
            if (chrome.runtime.lastError)
                log(chrome.runtime.lastError);
        }
    });
}
;
function makeActionTimestamps(userDict) {
    return {
        actionId: userDict.lastActionId,
        successfulActionId: userDict.lastSuccessfulActionId,
        started: userDict.lastActionStartedWhen,
        successfulStarted: userDict.lastSuccessfulActionStartedWhen,
        ended: userDict.lastActionEndedWhen
    };
}
;
function handleQuestRewards(msg) {
    var userDict = getUserDict(msg.uid);
    if (!userDict.raids)
        return;
    var urlFragment = msg.url.substr(msg.url.lastIndexOf("/") + 1);
    urlFragment = urlFragment.substr(0, urlFragment.indexOf("?"));
    var raidId = parseInt(urlFragment);
    var questId = userDict.raids[raidId];
}
;
function handleRaidInfo(msg) {
    var userDict = getUserDict(msg.uid);
    if (!userDict.raids)
        userDict.raids = {};
    userDict.raids[msg.raidId] = msg.questId;
}
;
function parseTimeInMinutes(text) {
    var parts = text.split(/[\D]+/);
    var result = 0;
    for (var i = 0, len = Math.min(parts.length, 2); i < len; i++) {
        if (parts[i].length === 0) {
            break;
        }
        result = result * 60 + parseInt(parts[i]);
    }
    return result;
}
;
function estimateValue(truncated, maximum, timeRemaining, elapsedTimeMs, minutesPerUnit) {
    if (truncated >= maximum)
        return truncated;
    // HACK: Add 59 seconds to the remaining time since they round down the number of minutes
    timeRemaining += 59 / 60;
    var durationFromFull = maximum * minutesPerUnit;
    timeRemaining = Math.max(0, timeRemaining - (elapsedTimeMs / 60000));
    var fract = (timeRemaining / durationFromFull);
    fract = Math.max(0.0, Math.min(1.0, fract));
    var estimatedValue = maximum * (1.0 - fract);
    return estimatedValue;
}
;
function fixupStatus(status, uid) {
    if (!status)
        return status;
    var userDict = getUserDict(uid);
    // FIXME
    var lastUpdate = userDict.lastStatusUpdate;
    status._lastUpdate = lastUpdate;
    status._now = Date.now();
    var age = (status._now - status._lastUpdate);
    status._precise_ap = estimateValue(status.ap, parseInt(status.max_action_point), parseTimeInMinutes(status.action_point_remain), age, 5);
    status._precise_bp = estimateValue(status.bp, parseInt(status.max_battle_point), parseTimeInMinutes(status.battle_point_remain), age, 10);
    status.buffs = [];
    if (userDict.guildBuffs) {
        // FIXME
        age = (status._now - userDict.lastGuildBuffUpdate);
        for (var i = 0, l = userDict.guildBuffs.length; i < l; i++) {
            var gb = userDict.guildBuffs[i];
            var timeRemaining = (parseTimeInMinutes(gb.time) * 60 * 1000) - age;
            if (timeRemaining <= 0)
                continue;
            status.buffs.push({
                comment: gb.comment,
                timeRemaining: timeRemaining,
                imageUrl: "http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/item/support/support_" +
                    gb.image + "_" + gb.level + ".png"
            });
        }
    }
    if (userDict.personalBuffs) {
        // FIXME
        age = (status._now - userDict.lastPersonalBuffUpdate);
        for (var k in userDict.personalBuffs) {
            if (!userDict.personalBuffs.hasOwnProperty(k))
                continue;
            var pb = userDict.personalBuffs[k];
            var timeRemaining = (parseTimeInMinutes(pb.remain_time) * 60 * 1000) - age;
            if (timeRemaining <= 0)
                continue;
            status.buffs.push({
                comment: pb.name,
                timeRemaining: timeRemaining,
                imageUrl: "http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/item/support/" +
                    pb.image_path + "_" + pb.level + ".png"
            });
        }
    }
    return status;
}
;
function handleNewStatus(status, uid) {
    if (!status) {
        log("Failed status update");
        return;
    }
    getUserDict(uid).lastStatus = status;
    getUserDict(uid).lastStatusUpdate = Date.now();
    getUserDict(uid).nextStatusUpdate = Date.now() + minimumUpdateDelay;
    var minutesUntilApRefill = parseTimeInMinutes(status.action_point_remain);
    var minutesUntilBpRefill = parseTimeInMinutes(status.battle_point_remain);
    if ((minutesUntilApRefill > 1) && settings.get("notifyOnFullAP"))
        chrome.alarms.create("apFull", { delayInMinutes: minutesUntilApRefill + 1 });
    else
        chrome.alarms.clear("apFull");
    if ((minutesUntilBpRefill > 1) && settings.get("notifyOnFullBP"))
        chrome.alarms.create("bpFull", { delayInMinutes: minutesUntilBpRefill + 1 });
    else
        chrome.alarms.clear("bpFull");
    // log("ap time", minutesUntilApRefill, "bp time", minutesUntilBpRefill);
}
;
function maybeDoUpdate(nextTime, minimumUpdateDelay, getValue, doUpdate, sendResponse, force, tabId, uid) {
    var shouldUpdate = false;
    var userDict = getUserDict(uid);
    var now = Date.now();
    if (!nextTime)
        shouldUpdate = true;
    else if (now >= nextTime)
        shouldUpdate = true;
    else if (force)
        shouldUpdate = true;
    if ((now - lastFailure) < failedUpdateMinimumDelay) {
        log("Rate-limiting update due to failure");
        shouldUpdate = false;
    }
    if (userDict.isSuspended &&
        shouldUpdate) {
        log("Rejecting update request due to idle timeout");
        sendResponse(null);
        return false;
    }
    if (!userDict.inFlightRequests)
        userDict.inFlightRequests = {};
    var requestName = doUpdate.name;
    var ifr = userDict.inFlightRequests[requestName];
    if (ifr) {
        var elapsed = now - ifr.startedWhen.getTime();
        if (elapsed >= 30000) {
            log("Request of type '" + requestName + "' in-flight since " + ifr.startedWhen.toLocaleString() + "; that's too long, so we're going again anyway.");
        }
        else {
            log("Request of type '" + requestName + "' in-flight since " + ifr.startedWhen.toLocaleString() + "; waiting for it.");
            ifr.then(function (result) {
                log("In-flight '" + requestName + "' request completed with value", result);
                sendResponse(result);
            });
            return true;
        }
    }
    if (shouldUpdate) {
        var pr = new PromiseResolver();
        pr.promise.startedWhen = new Date();
        userDict.inFlightRequests[requestName] = pr.promise;
        doUpdate(tabId, uid, function (_uid) {
            var response = getValue(_uid);
            delete userDict.inFlightRequests[requestName];
            sendResponse(response);
            pr.resolve(response);
        });
        return true;
    }
    else {
        sendResponse(getValue(uid));
        return false;
    }
}
;
function doGameAjax(msg, tabId, uid, callback) {
    /*
    if (Math.random() < 0.33) {
        console.log("Injecting error for request", msg);
        callback(null, "fake error");
        return;
    }
    */
    actuallySendMessage(msg, tabId, function (bundle) {
        if (!bundle) {
            callback({ error: true }, "no response");
            return;
        }
        var response = bundle[0];
        var error = bundle[1];
        var url = bundle[2];
        if (chrome.runtime.lastError) {
            isDead = true;
            log(chrome.runtime.lastError);
        }
        else {
            isDead = false;
        }
        if (error) {
            if (error.indexOf("-- abort") >= 0) {
                log("xhr aborted", url);
            }
            else {
                log("Error from server", error, url);
                lastFailure = Date.now();
            }
        }
        if (typeof (response) === "string") {
            try {
                response = JSON.parse(response);
            }
            catch (exc) {
            }
        }
        if (isIdleTimeoutRedirect(response)) {
            handleIdleTimeout(uid);
            callback({ idleTimeout: true }, error);
        }
        else if (isMaintenanceRedirect(response)) {
            handleMaintenance(uid);
            callback({ maintenance: true }, error);
        }
        else {
            callback(response, error);
        }
    });
}
;
function isIdleTimeoutRedirect(jsonBody) {
    if (jsonBody &&
        jsonBody.redirect &&
        (jsonBody.redirect.indexOf("top") >= 0))
        return true;
    return false;
}
;
function isMaintenanceRedirect(jsonBody) {
    if (jsonBody &&
        jsonBody.redirect &&
        (jsonBody.redirect.indexOf("maintenance") >= 0))
        return true;
    return false;
}
;
function handleIdleTimeout(uid) {
    log("Idle timeout");
    getUserDict(uid).isSuspended = true;
    lastFailure = Date.now() + 5000;
}
;
function handleMaintenance(uid) {
    log("Maintenance");
    getUserDict(uid).isSuspended = true;
    lastFailure = Date.now() + 5000;
}
;
function updateStatus(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/user/status"
    };
    // log("Triggering status update");
    doGameAjax(msg, tabId, uid, function (result) {
        getUserDict(uid).nextStatusUpdate = Date.now() + minimumUpdateDelay;
        if (!result) {
            log("Status update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Status update failed: idle timeout");
            callback(uid);
        }
        else if (result.maintenance) {
            log("Status update failed: maintenance");
            callback(uid);
        }
        else {
            getUserDict(uid).lastStatusUpdate = Date.now();
            getUserDict(uid).lastStatus = result.status;
            // log("Status updated -> ", lastStatus);
            callback(uid);
        }
    });
}
;
function getRpToNextRank(data) {
    data = decodeURIComponent(data);
    /*
        Data is of the following form:
        [garbage]
        <div class="txt-next-value">Next ###Rankポイント</div>
        
        OR (depending on language)
        
        <div class="txt-next-value">Next lvl in ### Rank Points</div>
        [garbage]
    */
    var result = parseInt(data.replace(/^[^]*txt-next-value[\D]+([\d]+)[^]*$/, "$1"));
    // in case of something unexpected being passed in
    if (isNaN(result)) {
        return "?";
    }
    return result;
}
function updateNextRankRp(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/profile/content/index/" + uid
    };
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("RP to next rank update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("RP to next rank update failed: idle timeout");
            callback(uid);
        }
        else {
            getUserDict(uid).lastNextRankRpUpdate = Date.now();
            getUserDict(uid).nextNextRankRpUpdate = Date.now() + minimumUpdateDelay;
            getUserDict(uid).nextRankRp = getRpToNextRank(result.data);
            callback(uid);
        }
    });
}
;
function getStrikeTime(data) {
    data = decodeURIComponent(data);
    /*
        Data is of the following form:
        [garbage]
        <div class="txt-next-value">Next ###Rankポイント</div>
        
        OR (depending on language)
        
        <div class="txt-next-value">Next lvl in ### Rank Points</div>
        [garbage]
    */
    /*
    var strikeTimes = [];
    var re = /\<div class="prt\-assault\-guildinfo"\>.*?\<div class="prt\-item\-status"\>(.*?)\<\/div/gms
    var m;
    while (m = re.exec(data)) {
        strikeTimes.push(m[1]);
    }

    log(strikeTimes);
    return strikeTimes;
    */
}
function updateStrikeTime(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/guild_main/content/index/"
    };
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Strike time update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Strike time update failed: idle timeout");
            callback(uid);
        }
        else {
            getUserDict(uid).lastStrikeTimeUpdate = Date.now();
            getUserDict(uid).nextStrikeTimeUpdate = Date.now() + minimumUpdateDelay;
            getUserDict(uid).strikeTime = getStrikeTime(result.data);
            callback(uid);
        }
    });
}
;
function updateItemCounters(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/item/normal_item_list/1"
    };
    // log("Triggering counter update");
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Counter update failed");
            getUserDict(uid).nextCounterUpdate = Date.now() + minimumUpdateDelay;
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Counter update failed: idle timeout");
            getUserDict(uid).nextCounterUpdate = Date.now() + minimumUpdateDelay;
            callback(uid);
        }
        else {
            getUserDict(uid).lastCounterUpdate = Date.now();
            getUserDict(uid).nextCounterUpdate = Date.now() + minimumItemUpdateDelay;
            getUserDict(uid).itemCounters = result;
            // log("Counters updated -> ", itemCounters);
            callback(uid);
        }
    });
}
;
function onAlarm(alarm) {
    log("Alarm '" + alarm.name + "' fired");
    if (alarm.name.indexOf("Full") >= 0) {
        var resourceName = alarm.name.replace("Full", "").toUpperCase();
        chrome.notifications.create({
            type: "basic",
            iconUrl: "../../icons/active-256.png",
            title: resourceName + " full",
            message: "Your " + resourceName + " is full."
        });
        return;
    }
}
;
function actuallySendMessage(message, tabId, callback) {
    // *$!@)%KAKLMRSJ chrome garbage APIs
    if (tabId) {
        chrome.tabs.sendMessage(tabId, message, callback);
    }
    else {
        log("No granblue tab found as target for message", message, tabId);
    }
}
;
function handleNewRaids(raids, uid) {
    if (!raids) {
        log("Failed raid update");
        return;
    }
    getUserDict(uid).lastRaids = raids;
    getUserDict(uid).lastRaidUpdate = Date.now();
    getUserDict(uid).nextRaidUpdate = Date.now() + minimumRaidUpdateDelay;
    // log("ap time", minutesUntilApRefill, "bp time", minutesUntilBpRefill);
}
;
function handleNewItems(items, uid) {
    if (!items) {
        log("Failed item update");
        return;
    }
    getUserDict(uid).lastItems = items;
    getUserDict(uid).lastItemUpdate = Date.now();
    getUserDict(uid).nextItemUpdate = Date.now() + minimumItemUpdateDelay;
    // log("ap time", minutesUntilApRefill, "bp time", minutesUntilBpRefill);
}
;
function updateRaids(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/rest/quest/assist_list/0"
    };
    // log("Triggering status update");
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Raid update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Raid update failed: idle timeout");
            lastFailure = Date.now() + 5000;
            callback(uid);
        }
        else if (result.maintenance) {
            log("Raid update failed: maintenance");
            lastFailure = Date.now() + 15000;
            callback(uid);
        }
        else {
            handleNewRaids(result, uid);
            callback(uid);
        }
    });
}
;
function updateItems(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/item/article_list"
    };
    // log("Triggering status update");
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Item update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Item update failed: idle timeout");
            lastFailure = Date.now() + 5000;
            callback(uid);
        }
        else if (result.maintenance) {
            log("Item update failed: maintenance");
            lastFailure = Date.now() + 15000;
            callback(uid);
        }
        else {
            handleNewItems(result, uid);
            callback(uid);
        }
    });
}
;
function checkVersionMatch(version, matchAgainst) {
    if (matchAgainst === "*")
        return true;
    var matchLower = false;
    if (matchAgainst[0] === "<") {
        matchLower = true;
        matchAgainst = matchAgainst.substr(1);
    }
    var versionParts = version.split(".");
    var patternParts = matchAgainst.split(".");
    for (var i = 0, l = patternParts.length; i < l; i++) {
        if (patternParts[i] === "*")
            continue;
        var lhs = parseInt(versionParts[i]);
        var rhs = parseInt(patternParts[i]);
        if (matchLower) {
            if (lhs < rhs)
                return true;
            else if (lhs > rhs)
                return false;
        }
        else {
            if (lhs !== rhs)
                return false;
        }
    }
    return !matchLower;
}
;
function downloadLatestVersionJson(tabId, uid, callback) {
    var scheduleNext = function () {
        var nextVersionJsonUpdate = Date.now() + updateCheckDelay;
        settings.set("nextVersionJsonUpdate", nextVersionJsonUpdate.toFixed(0));
        log("Next version check scheduled for " + (updateCheckDelay / 60 / 1000) + " minute(s) from now.");
    };
    var doAutoUpdate = JSON.parse(settings.get("enableAutomaticUpdates") || "false");
    var gotResponse = function (ok, data) {
        try {
            if (ok)
                parseVersionJson(data);
            else
                log("Failed to get latest version data.", data);
        }
        catch (exc) {
            log(exc);
        }
        if (callback)
            callback(uid);
        if (doAutoUpdate) {
            sendInstallerCommand("installUpdate", function (result, error) {
                if (error) {
                    log("Automatic update attempt failed", error);
                    return;
                }
                if (result && result.result === "Updated") {
                    if (result.installedVersion.trim().toLowerCase() !==
                        chrome.app.getDetails().version.trim().toLowerCase()) {
                        log("Automatic update installed v" + result.installedVersion + ", restarting extension.");
                        window.setTimeout(function () { forceReloadExtension("automatic update to " + result.installedVersion); }, 1000);
                    }
                    else {
                        log("Automatic update installed but version is the same so not force reloading");
                    }
                }
                else {
                    log("Automatic update completed without updating.", result, error);
                }
            });
        }
        scheduleNext();
    };
    try {
        log("Downloading latest version data...");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://viramate.luminance.org/version.json?_=" + Date.now(), true);
        xhr.timeout = 15 * 1000;
        xhr.onload = function () {
            if (xhr.status === 200)
                gotResponse(true, xhr.responseText);
            else
                gotResponse(false, xhr.status + " " + xhr.statusText);
        };
        xhr.ontimeout = function (evt) {
            gotResponse(false, "timed out");
        };
        xhr.onerror = function (evt) {
            gotResponse(false, evt.error);
        };
        xhr.send();
    }
    catch (exc) {
        log(exc);
        gotResponse(false, "unknown error");
        scheduleNext();
    }
}
;
function parseVersionJson(json) {
    try {
        var dict = JSON.parse(json);
        var currentVersion = chrome.app.getDetails().version;
        log("Processing latest version.json.");
        isRemoteShutdown = false;
        for (var i = 0, l = dict.shutdown_versions.length; i < l; i++) {
            var pattern = dict.shutdown_versions[i];
            if (checkVersionMatch(currentVersion, pattern)) {
                log("Remote shutdown activated for version(s) " + pattern);
                isRemoteShutdown = true;
            }
        }
        settings.set("isRemoteShutdown", JSON.stringify(isRemoteShutdown));
        remoteDisabledFeatures.length = 0;
        for (var k in dict.disabled_features) {
            if (!dict.disabled_features.hasOwnProperty(k))
                continue;
            if (!checkVersionMatch(currentVersion, k))
                continue;
            var featureList = dict.disabled_features[k];
            if (!Array.isArray(featureList))
                featureList = [featureList];
            log("Features remotely disabled for version(s) " + k + ":", JSON.stringify(featureList));
            for (var i = 0, l = featureList.length; i < l; i++)
                remoteDisabledFeatures.push(featureList[i]);
        }
        settings.set("remoteDisabledFeatures", JSON.stringify(remoteDisabledFeatures));
        settings.set("updateCheckDelay", JSON.stringify(dict.updateCheckDelay));
        return true;
    }
    catch (exc) {
        log("Failed to parse version.json", exc);
        return false;
    }
}
;
function injectStylesheetsIntoTab(sender) {
    var injectStylesheet = function (uri) {
        var cb = function () { };
        chrome.tabs.insertCSS(sender.tab.id, { file: uri, runAt: "document_start" }, cb);
    };
    // log(sender.tab.id, sender.url);
    var currentSettings = getAdjustedSettings();
    if (isRemoteShutdown || currentSettings.isShutdown)
        return;
    injectStylesheet("/content/viramate.css");
    injectStylesheet("/css/watch-button.css");
    if (currentSettings.condensedUI)
        injectStylesheet("/css/condensed-ui.css");
    if ((navigator.userAgent.indexOf("Chrome/53.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/54.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/55.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/56.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/57.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/58.0") >= 0))
        injectStylesheet("/css/chrome-53.css");
    if (currentSettings.betterEnglishFont) {
        injectStylesheet("/content/lato-woff.css");
        injectStylesheet("/css/lato.css");
    }
    if (currentSettings.showGaugeOverlays)
        injectStylesheet("/content/gauge-overlays.css");
    if (currentSettings.showQuickPanels)
        injectStylesheet("/css/quick-panels.css");
    if (currentSettings.moveCoOpFooter)
        injectStylesheet("/css/move-coop-footer.css");
    if (currentSettings.enableCoOpEnhancements)
        injectStylesheet("/css/coop.css");
    if (currentSettings.smartSupports)
        injectStylesheet("/css/smart-supports.css");
    if (currentSettings.singlePageStickers)
        injectStylesheet("/css/single-page-stickers.css");
    if (currentSettings.keyboardShortcuts2)
        injectStylesheet("/css/keyboard.css");
    if (currentSettings.permanentTurnCounter)
        injectStylesheet("/css/permanent-turn-counter.css");
    if (currentSettings.disablePerCharacterOugiSkip)
        injectStylesheet("/css/per-character-ougi-skip.css");
    if (currentSettings.tinySupportSummons)
        injectStylesheet("/css/tiny-support-summons.css");
    if (currentSettings.popupPositionFix)
        injectStylesheet("/css/popup-position-fix.css");
    if (currentSettings.arcarumFix)
        injectStylesheet("/css/arcarum-fix.css");
    if (currentSettings.buttonSwipeFix)
        injectStylesheet("/css/skill-button-fix.css");
    if (currentSettings.hideMobageSidebar)
        injectStylesheet("/css/hide-mobage-sidebar.css");
    if (currentSettings.mistakeGuard)
        injectStylesheet("/css/mistake-guard.css");
    // chrome.tabs.insertCSS(tabId, {code: "body{border:1px solid red}"});
}
;
//# sourceMappingURL=background.js.map