"use strict";
var combatState = null;
var currentSkillRequestId = null;
var debuffTimerElement = null, buffTimerElements = null;
var refreshBuffsButton = null;
var activatingSkillId = null;
var mostRecentTurn = -1;
var currentSettings = {};
var lastDebuffTimerUpdate = -1;
var currentConditions;
var hasAutoAdvanced = false;
var normalAttacking = false, usingSummon = false;
var autoSkipInProgress = false;
var suppressAutoSkip = false;
var partyStateIsDirty = true;
var combatUIIsPrepared = false;
var pendingOneClickSummon = null, pendingOneClickSummonId = null;
var bufferedTargetSwitch = null;
var hasInvalidatedRaidListAfterCombat = false;
var hasLoadedQuestResults = false;
var skillMap = null;
var currentBattleUid = null, currentBattleTabId = null;
var conditionUpdateIsPending = false, conditionUpdateInProgress = false;
var lastConditionUpdateTimestamp = null, lastSlowConditionUpdateTimestamp = null;
var recheckTimeout = null;
var resultCheckTimeout = null;
var pollingInterval = null;
var statusInterval = null;
var cancelTouch = false;
var updatePanels = false;
var isAttackingLastUpdate = false;
var lastActionTimestamps = null;
var isRemoteConnected = false;
// Callbacks for manipulating the status panel
var updateStatusPanel = null, doUpdateStatusPanel = null, invalidateStatus = null;
var doUpdateGuildSupportBuffs = null, doUpdatePersonalSupportBuffs = null, invalidateSupportBuffs = null;
var statusPanelUpdateIntervalMinutes = 5;
var partyIcons = null, skillContainers = null, partyContainer = null, lisAbility = null, quickPanels = null, commandTop = null, skipButton = null, enemyGauges = null, quickSummonPanel = null, summonDetailModal = null, raidContainer = null, fieldEffectsPanel = null, actionTimerElement = null;
var myTabId = null;
var activeWatches = [];
function resetState() {
    partyStateIsDirty = true;
    combatState = null;
    mostRecentTurn = -1;
    conditionUpdateIsPending = false;
    currentConditions = {};
    currentConditions.enemy = [
        new ConditionRecord(1, 0),
        new ConditionRecord(1, 1),
        new ConditionRecord(1, 2)
    ];
    currentConditions.party = [
        new ConditionRecord(0, 0),
        new ConditionRecord(0, 1),
        new ConditionRecord(0, 2),
        new ConditionRecord(0, 3)
    ];
    // Don't update conditions right away, to avoid the server shouting at us
    lastConditionUpdateTimestamp = Date.now();
    lastDebuffTimerUpdate = -1;
    activatingSkillId = null;
    normalAttacking = false;
    usingSummon = false;
    autoSkipInProgress = false;
    combatUIIsPrepared = false;
    previousConditions = null;
    previousConditionsTimestamps = null;
    bufferedTargetSwitch = null;
    raidListUpdateCounter = 25;
    currentRaidListUpdateInterval = raidListUpdateInterval;
    hasInvalidatedRaidListAfterCombat = false;
    cancelTouch = false;
    updatePanels = false;
    isAttackingLastUpdate = false;
    currentPointStandings = null;
    areBuffTimersInvalid = true;
    focusedCharacterIndex = null;
    lastEnhancementMaterials = {};
    if (buffTimerElements)
        for (var i = 0, l = buffTimerElements.length | 0; i < l; i++)
            buffTimerElements[i].parentNode.removeChild(buffTimerElements[i]);
    if (enemyGauges)
        for (var i = 0, l = enemyGauges.length | 0; i < l; i++)
            enemyGauges[i].parentNode.removeChild(enemyGauges[i]);
    buffTimerElements = null;
    enemyGauges = null;
    resetCachedElements();
    // Cancel any active element watches
    for (var i = 0, l = activeWatches.length | 0; i < l; i++)
        activeWatches[i]();
    activeWatches.length = 0;
    if (recheckTimeout) {
        window.clearTimeout(recheckTimeout);
        recheckTimeout = null;
    }
    if (resultCheckTimeout) {
        // HACK: Don't kill this timer on results pages
        if (window.location.href.indexOf("result") < 0) {
            window.clearTimeout(resultCheckTimeout);
            resultCheckTimeout = null;
        }
    }
    if (pollingInterval) {
        window.clearInterval(pollingInterval);
        pollingInterval = null;
    }
    if (debuffTimerElement)
        debuffTimerElement.style.display = "none";
    if (fieldEffectsPanel)
        fieldEffectsPanel.style.display = "none";
    if (actionTimerElement)
        actionTimerElement.style.opacity = 0.0;
}
;
function resetCachedElements() {
    partyIcons = skillContainers =
        partyContainer = lisAbility =
            quickPanels = commandTop =
                skipButton = enemyGauges =
                    quickSummonPanel = summonDetailModal =
                        skillMap = null;
}
;
doInitialize();
function doInitialize() {
    sendExtensionMessage({ type: "pleaseInjectStylesheets" }, function (tabId) {
        myTabId = tabId;
    });
    var hasUpdatedSettings = false;
    var hasContentLoaded = false;
    var hasInitializedSandbox = false;
    window.addEventListener("hashchange", onHashChange, false);
    window.addEventListener("keydown", onKeyDown, false);
    var tick = function () {
        if (!hasUpdatedSettings)
            return;
        if (!hasContentLoaded && !document.querySelector("div.contents"))
            return;
        if (!hasInitializedSandbox)
            return;
        doInitialSetup();
    };
    document.addEventListener("DOMContentLoaded", function () {
        hasContentLoaded = true;
        tick();
    }, false);
    updateSettings(function () {
        hasUpdatedSettings = true;
        tick();
    });
    initExternalSandbox(function () {
        initMessageChannel();
        i18n.setLanguageGetter(function () {
            return currentSettings.language;
        });
        sendExtensionMessage({ type: "heartbeat" });
        hasInitializedSandbox = true;
        tick();
    });
}
;
var mobileViewportScale = 1.0, mobileElementScale = 1.0;
var scrollbarWidth;
var isCenterPending = false, centerHook = null;
function isMobileSite() {
    return (location.host === "gbf.game.mbga.jp") ||
        (document.body.className.indexOf("android4") >= 0);
}
;
function queueCenterPopups() {
    if (isCenterPending)
        return;
    isCenterPending = true;
    // window.requestAnimationFrame(centerMobilePopups);
}
;
function centerMobilePopups() {
    isCenterPending = false;
    // HACK
    if (isCombatPage(window.location.hash) ||
        (window.location.hash.indexOf("quest/scene") >= 0))
        return;
}
;
function registerMobileHooks() {
    waitForElementToExist(document, "div#pop", function (popContainer) {
        var observer = AbstractMutationObserver.forElement(popContainer, {
            childList: true, subtree: true, attributes: true
        });
        observer.register(queueCenterPopups);
    }, true);
}
;
function handleMobileSizeChange() {
    mobileViewportScale = parseFloat(document.documentElement.style.zoom);
    var gameContainer = getGameContainer();
    document.documentElement.style.marginLeft = Math.ceil(64 / mobileViewportScale).toFixed(0) + "px";
    var targetWidth = measureElementWidth(document.body) - 64;
    var extraZoomRatio = targetWidth / (320 * mobileViewportScale);
    gameContainer.style.transform = "scale(" + extraZoomRatio.toFixed(3) + ")";
    mobileElementScale = mobileViewportScale * extraZoomRatio;
    queueCenterPopups();
}
;
function isQuestMapPage() {
    return (location.hash === "#quest/island") ||
        (location.hash === "#quest/index");
}
;
function measureElementWidth(element) {
    var elt = document.createElement("div");
    elt.style = "position: fixed; left: 0px; right: 0px; top: 0px; bottom: 1px; margin: 0px; padding: 0px; display: block; zoom: reset;";
    element.appendChild(elt);
    var result = elt.clientWidth;
    element.removeChild(elt);
    return result;
}
;
function setupMobileGameContainer() {
    var scrollableElement = document.documentElement;
    // Force the scrollbars off, measure
    scrollableElement.style.overflowY = "hidden";
    var fullWidth = measureElementWidth(scrollableElement);
    // Force the scrollbars to appear, measure
    scrollableElement.style.overflowY = "scroll";
    var innerWidth = measureElementWidth(scrollableElement);
    // Hide the scrollbars again
    scrollableElement.style.overflowY = "";
    scrollbarWidth = (window.outerWidth - window.innerWidth) + (fullWidth - innerWidth);
    window.addEventListener("resize", handleMobileSizeChange, false);
    window.addEventListener("scroll", queueCenterPopups, false);
    handleMobileSizeChange();
    registerMobileHooks();
    // UGH
    window.setTimeout(handleMobileSizeChange, 1000);
    window.setTimeout(handleMobileSizeChange, 2000);
}
;
var hasDoneInitialSetup = false;
var hasDoneEarlySetup = false;
function doEarlyCssSetup() {
    if (hasDoneEarlySetup)
        return;
    hasDoneEarlySetup = true;
}
;
function injectStylesheetsIntoContainer(container) {
    if (isChromeHackNeeded)
        injectStylesheet("chrome-53-shadow.css", container);
    injectStylesheet("viramate.css", container);
    injectStylesheet("viramate-shadow.css", container);
    if (currentSettings.betterEnglishFont)
        injectStylesheet("lato-woff.css", container);
    if (currentSettings.showGaugeOverlays)
        injectStylesheet("gauge-overlays.css", container);
    if (isMobileSite())
        injectStylesheet("mobile.css", container);
}
;
var isChromeHackNeeded = false;
function doInitialSetup() {
    if (hasDoneInitialSetup)
        return;
    hasDoneInitialSetup = true;
    if (!isMobileSite() &&
        ((navigator.userAgent.indexOf("Chrome/53.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/54.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/55.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/56.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/57.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/58.0") >= 0)))
        isChromeHackNeeded = true;
    injectStylesheetsIntoContainer(getUiContainer());
    if (currentSettings.fixJPFontRendering) {
        // fix the lang element since it's originally set to jp
        if (document.documentElement.lang === "jp") {
            document.documentElement.lang = "ja";
        }
        // no point doing this if lato is enabled since it's handled by the css
        if (!currentSettings.betterEnglishFont) {
            // fix fonts for <select> elements
            var fonts = window.getComputedStyle(document.body)["font-family"].split(", ");
            fonts.splice(-1, 0, '"Yu Gothic"', '"Meiryo"');
            document.body.style.fontFamily = fonts.join(", ");
        }
    }
    if (currentSettings.disableMiddleRightClick) {
        document.addEventListener("mousedown", suppressMouse, true);
        document.addEventListener("mouseup", suppressMouse, true);
    }
    if (currentSettings.keepSoundOnBlur) {
        window.addEventListener("blur", function (e) {
            e.stopImmediatePropagation();
        }, false);
    }
    // console.log("お姉さま。。。");
    if ((document.readyState === "complete") ||
        (document.readyState === "interactive")) {
        onPageReady();
    }
    else {
        document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete")
                onPageReady();
        }, false);
    }
}
;
function showGamePopup(options) {
    if (typeof (options) !== "object")
        throw new Error("Expected options dictionary");
    var template = document.querySelector("script#popup");
    if (!template) {
        log("Could not find popup template");
        return;
    }
    var templateText = escape(template.textContent);
    var popupData = {
        "element_name": "pop",
        "title": options.title,
        "body": options.body,
        "className": null,
        "okCallBackName": "popRemove",
        "cancelCallBackName": null,
        "exceptionFlag": false,
        "url": null,
        "tpl": templateText
    };
    sendExternalMessage({ type: "doPopup", data: popupData });
}
;
function waitForElementToExist(container, selectors, callback, 
    // If false, watch terminates after a match is found
    ongoing, 
    // If true, the 'id' and 'class' attributes are watched in order to find a match
    //  that only appears after an element is added to the DOM
    watchAttributes) {
    if (!container)
        throw new Error("No container element");
    else if (!selectors)
        throw new Error("No selector");
    else if (!callback || !callback.call)
        throw new Error("No callback provided");
    if (container === document)
        container = document.body;
    var _container = container;
    if (typeof (selectors) === "string")
        selectors = [selectors];
    var trace = false;
    var hasCleanedUp = false, hasFired = false, checkPending = false;
    var observer = null, unregister = null;
    var seenElements = new WeakMap();
    var cleanup = function () {
        if (hasCleanedUp)
            return;
        if (trace)
            log("Cancelled element watch:", selectors);
        hasCleanedUp = true;
        if (unregister)
            unregister();
        unregister = observer = null;
        seenElements = null;
    };
    var matches = [];
    var checkForElement = function () {
        var result = false;
        var queue = [];
        checkPending = false;
        if (matches.length !== 0)
            throw new Error("Re-entrant element watch check");
        for (var j = 0, l2 = selectors.length; j < l2; j++) {
            var selector = selectors[j];
            var elts = _container.querySelectorAll(selector);
            for (var i = 0, l = elts.length; i < l; i++)
                matches.push(elts[i]);
        }
        for (var i = 0, l = matches.length; i < l; i++) {
            var elt = matches[i];
            if (!seenElements)
                continue;
            if (seenElements.get(elt) === 1)
                continue;
            if (trace)
                log("Found element", elt);
            seenElements.set(elt, 1);
            var cbresult = callback(elt);
            if (cbresult)
                queue.push(cbresult);
            result = true;
            if (!ongoing) {
                cleanup();
                matches.length = 0;
                return result;
            }
        }
        matches.length = 0;
        for (var i = 0, l = queue.length; i < l; i++)
            queue[i]();
        return result;
    };
    if (checkForElement() && !ongoing)
        return null;
    activeWatches.push(cleanup);
    var observerOptions = {
        childList: true, subtree: true,
        attributes: !!watchAttributes, characterData: false
    };
    if (observerOptions.attributes)
        observerOptions.attributeFilter = ["class", "id"];
    observer = AbstractMutationObserver.forElement(_container, observerOptions);
    if (trace)
        log("Started watching for selectors", selectors);
    unregister = observer.register(checkForElement);
    return cleanup;
}
;
function onKeyDown(evt) {
    if (isShutdown)
        return;
    if (!currentSettings.keyboardShortcuts2)
        return;
    if (evt.ctrlKey || evt.altKey)
        return;
    var keyText = evt.code.toUpperCase();
    var focused = document.activeElement;
    var isSpecialCased = false;
    // HACK: Sticker UI stuff
    if (focused && (focused.className === "stamp-filter")) {
        if (keyText === "ENTER") {
            var autoSelected = document.querySelector("div.lis-stamp.auto-selected");
            if (autoSelected) {
                pulseElement(autoSelected);
                generateClick(autoSelected);
            }
            return;
        }
        isSpecialCased = (keyText === "ESCAPE") || (keyText === "BACKQUOTE");
    }
    if (!isSpecialCased &&
        focused && ((focused.nodeName.toLowerCase() === "input") ||
        (focused.nodeName.toLowerCase() === "textarea"))) {
        return;
    }
    var okButton = findOkButton();
    var cancelButton = findCancelButton();
    var textButton = findActiveUsualTextButton();
    if (keyText === "SPACE") {
        if (okButton) {
            pulseElement(okButton);
            generateClick(okButton);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
        else if (cancelButton && !textButton) {
            // HACK: If they hit space while a modal is open that only has a cancel button,
            //  it's unlikely they meant to do anything other than click 'OK'
            // If there is a "usual text" button, then this is probably something different
            return;
        }
    }
    else if ((keyText === "ESCAPE") ||
        (keyText === "BACKQUOTE")) {
        if (cancelButton) {
            // FIXME: Why doesn't this work?
            pulseElement(cancelButton);
            generateClick(cancelButton);
            evt.preventDefault();
            evt.stopPropagation();
            // HACK: Ugh, what is wrong with this modal?
            var summonModal = document.querySelector("div.pop-summon-detail");
            if (summonModal)
                summonModal.style.display = "none";
            return;
        }
    }
    else if (keyText === "KEYL") {
        var btn = document.querySelector("div.btn-repeat-last");
        if (btn) {
            pulseElement(btn);
            generateClick(btn, true);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    else if (keyText === "KEYA") {
        var btn = document.querySelector("div.prt-recommend-buttons div.btn-recommend");
        if (btn) {
            pulseElement(btn);
            generateClick(btn, false);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    else if (keyText === "KEYR") {
        var btn = document.querySelector("div.prt-bonus-reset div.btn-bonus-reset") ||
            document.querySelector("div.pop-confirm-decompose.pop-show div.btn-decompose") ||
            document.querySelector("div.prt-button-decompose div.btn-decompose-confirm") ||
            document.querySelector("div.prt-decompose-button div.btn-decompose");
        if (btn) {
            pulseElement(btn);
            generateClick(btn, false);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    if (combatState) {
        if (processSkillHotkey(evt)) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    else if (window.location.hash.indexOf("/opening/scene") >= 0 ||
        window.location.hash.indexOf("/scene/") >= 0 ||
        window.location.hash.indexOf("/scene_epilogue/") >= 0 ||
        window.location.hash.indexOf("archive/story/play_view") >= 0 ||
        window.location.hash.indexOf("archive/detail_npc") >= 0) {
        var choiceNumber = parseInt(keyText.replace("DIGIT", "").replace("NUMPAD", ""));
        var choiceElement;
        if (keyText === "SPACE") {
            // don't do anything if there's a choice available
            var selectionArea = document.querySelector("div.prt-sel-area");
            if (selectionArea && selectionArea.style.display === "block") {
                return;
            }
            var cursorTalk = document.querySelector("div.ico-cursor-talk");
            if (!cursorTalk) {
                return;
            }
            pulseElement(cursorTalk);
            generateClick(cursorTalk);
            evt.preventDefault();
            evt.stopPropagation();
        }
        else if (keyText === "KEYS") {
            var skipButton = document.querySelector("div.btn-skip");
            if (!skipButton) {
                return;
            }
            pulseElement(skipButton);
            generateClick(skipButton);
            evt.preventDefault();
            evt.stopPropagation();
        }
        else if (choiceElement = document.querySelector("div.txt-sel" + choiceNumber)) {
            pulseElement(choiceElement);
            generateClick(choiceElement);
            evt.preventDefault();
            evt.stopPropagation();
        }
    }
    else if (window.location.hash.indexOf("/stage") >= 0) {
        if (keyText === "SPACE") {
            var forwardButton = document.querySelector("div.btn-command-forward");
            pulseElement(forwardButton);
            generateClick(forwardButton);
            evt.preventDefault();
            evt.stopPropagation();
        }
    }
    else if (window.location.hash.indexOf("comic/") >= 0) {
        if (keyText === "ARROWLEFT" || keyText === "ARROWRIGHT") {
            var btn = document.querySelector("li.btn-" + ((keyText === "ARROWLEFT") ? "new" : "old"));
            if (btn) {
                pulseElement(btn);
                generateClick(btn);
                evt.preventDefault();
                evt.stopPropagation();
            }
        }
    }
}
;
function findOkButton() {
    if (
    // HACK: The stamina pop-up sometimes appears on top of an existing modal with an OK button.
    findVisibleElementWithSelector("div.pop-stamina") ||
        // The quest start button has special anticheat treatment like Attack
        findVisibleElementWithSelector("div.se-quest-start"))
        return null;
    var result = findVisibleElementWithSelector("div.btn-usual-ok") ||
        // Confirm join button when joining a public raid
        findVisibleElementWithSelector("div.btn-usual-join") ||
        // OK buttons on raid/quest results pages
        findVisibleElementWithSelector('div.btn-control[data-status="ok"]') ||
        findVisibleElementWithSelector('a.btn-control.location-href[data-location-href="quest"]') ||
        // Quest retreat 'Quests' button
        findVisibleElementWithSelector('div.btn-usual-questlist') ||
        // Co-op room 'leave' confirmation button
        findVisibleElementWithSelector('div.btn-leave') ||
        // Co-op room 'close room' confirmation button
        findVisibleElementWithSelector('div.btn-close') ||
        // Healing 'use' confirmation button
        findVisibleElementWithSelector('div.btn-usual-use') ||
        // Twitter reset tweet confirmation
        findVisibleElementWithSelector('div.btn-tweet-post') ||
        // Setting/removing wonders
        findVisibleElementWithSelector('div.btn-usual-set') ||
        findVisibleElementWithSelector('div.btn-usual-remove') ||
        // Upgrade page
        findVisibleElementWithSelector('div.btn-synthesis') ||
        findVisibleElementWithSelector('div.btn-settle') ||
        findVisibleElementWithSelector('div.prt-follow-button-enhance div.btn-follow-again') ||
        findVisibleElementWithSelector('div.cnt-confirm-material.prt-module-evolution div.btn-evolution.active') ||
        // DO
        findVisibleElementWithSelector('btn-location-island') ||
        findVisibleElementWithSelector('div.btn-start-battle') ||
        // Event new quest notification
        findVisibleElementWithSelector('div.btn-usual-close') ||
        // Casino/shop exchange
        findVisibleElementWithSelector('div.btn-usual-text.exchange') ||
        findVisibleElementWithSelector('div.btn-usual-text.buy') ||
        // Bonus reset
        findVisibleElementWithSelector('div.pop-bonus-reset div.btn-usual-exchange');
    return result;
}
;
function findCancelButton() {
    return findVisibleElementWithSelector("div.btn-usual-cancel") ||
        findVisibleElementWithSelector('div.btn-usual-close');
}
;
function findActiveUsualTextButton() {
    // to account for the assassin anki div having its own class name for some reason
    return findVisibleElementWithSelector("div[class*='btn-usual-']:not(.btn-usual-cancel):not(.disable)");
}
function onHashChange(evt) {
    if (isShutdown)
        return;
    handleNewPage();
}
;
var nextAjaxToken = 0;
var ajaxCallbacks = {};
var nextUidToken = 0;
var uidCallbacks = {};
function doClientAjax(...args) {
    if (isShutdown)
        return;
    var url, data, callback;
    if (args.length === 2) {
        url = args[0];
        data = undefined;
        callback = args[1];
    }
    else if (args.length === 3) {
        url = args[0];
        data = args[1];
        callback = args[2];
    }
    else
        throw new Error("Expected [url, callback] or [url, data, callback]");
    var token = ++nextAjaxToken;
    ajaxCallbacks[token] = callback;
    // console.log("ajax ", url, window.location.hash);
    sendExternalMessage({
        type: "doAjax",
        token: token,
        data: data,
        url: url
    });
}
;
function onWindowMessage(evt) {
    if (!evt.data.type)
        return;
    if (evt.data.type === "shutdownOk") {
        finishCompatibilityShutdown();
        return;
    }
    if (isShutdown)
        return;
    switch (evt.data.type) {
        case "vmHello":
            finishChannelSetup(evt.data.secretToken);
            return;
        case "externalLog":
            var args = evt.data.args;
            args.unshift("vms>");
            console.log.apply(console, args);
            return;
        case "moduleLoaded":
            validateModule(evt.data.id, evt.data.hash);
            return;
        case "ajaxBegin":
            onAjaxBegin(evt.data.url, evt.data.requestData, evt.data.uid);
            return;
        case "ajaxComplete":
            onAjaxComplete(evt.data);
            return;
        case "stageTick":
            // prevent finished combat state from being set back to unfinished in a raid
            if (combatState &&
                combatState.is_multi &&
                combatState.finish &&
                !evt.data.state.finish &&
                (combatState.raid_id == evt.data.state.raid_id)) {
                evt.data.state.finish = true;
            }
            combatState = evt.data.state;
            processCombatPage();
            return;
        case "doAjaxResult":
            var token = evt.data.token;
            var callback = ajaxCallbacks[token];
            delete ajaxCallbacks[token];
            callback(evt.data.result, evt.data.error, evt.data.url);
            return;
        case "webSocketCreated":
            return;
        case "webSocketMessageReceived":
            onWebSocketMessage(evt.data.data);
            return;
        case "gotUserId":
            var token = evt.data.token;
            var callback = uidCallbacks[token];
            delete uidCallbacks[token];
            callback(evt.data.uid);
            return;
        case "doAjax":
        case "doPopup":
        case "click":
        case "dispatchMouseEvent":
        case "getUserIdAndTabId":
            return;
        case "getSkillState":
            var skillState = getSkillState();
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: skillState
            });
            return;
        case "getExtensionVersion":
            sendExtensionMessage({ type: "getVersion" }, function (version) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: version
                });
            });
            return;
        case "getBookmarks":
            var keys = Object.keys(allBookmarks);
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: keys
            });
            return;
        case "visitBookmark":
            var handler = allBookmarks[evt.data.key];
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: !!handler
            });
            handler();
            return;
        case "tryStartGuildWarRaid":
            var bookmarkFn = makeGuildWarRaidBookmark(evt.data.chapterId, evt.data.questSuffix, evt.data.checkItem);
            bookmarkFn(null, function (ok) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: ok
                });
            });
            return;
        case "tryUseSummon":
            var elements = document.querySelectorAll("div.lis-summon[summon-name=\"" + evt.data.name + "\"]");
            if (!elements || elements.length == 0) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: "not found"
                });
                return;
            }
            for (var i = 0, l = elements.length; i < l; i++) {
                var element = elements[i];
                if (element.className.indexOf("btn-summon-available") >= 0) {
                    pendingOneClickSummonId = evt.data.id;
                    var scheduleResult = scheduleOneClickSummon(element, null);
                    if (scheduleResult !== "ok")
                        sendExternalMessage({
                            type: "socketResult",
                            id: evt.data.id,
                            result: scheduleResult
                        });
                    return;
                }
            }
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: "on cooldown"
            });
            return;
        case "connectionStatusChanged":
            isRemoteConnected = evt.data.connected;
            var uic = getUiContainer();
            var icon = uic.querySelector("img.connection-status");
            if (!icon) {
                if (!evt.data.connected)
                    return;
                icon = document.createElement("img");
                icon.className = "connection-status";
                icon.style.opacity = 0.0;
                icon.addEventListener("click", function () { sendExternalMessage({ type: "tryConnect" }); }, false);
                injectElement(uic, icon);
            }
            var newSrc = getResourceUrl(evt.data.connected ? "connected.png" : "disconnected.png");
            icon.title = evt.data.connected ? "Connected." : "Disconnected. Click to connect.";
            if (currentSettings.hideMobageSidebar)
                icon.style.right = "0px";
            else
                icon.style.left = "0px";
            if (newSrc != icon.src) {
                icon.src = newSrc;
                window.setTimeout(function () { icon.style.opacity = 0.8; }, 25);
                window.setTimeout(function () { icon.style.opacity = 0.33; }, 2500);
            }
            return;
        case "error":
            log(evt.data.stack);
            return;
        case "frameStats":
            updatePerformanceHud(evt.data);
            return;
        case "tryRepeatLastQuest":
            repeatLastQuest(null, function (result, reason) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: result ? "ok" : reason
                });
            });
            return;
        case "tryJoinRaid":
            tryJoinRaid(evt.data.code, function (ok) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: ok
                });
            });
            return;
        case "tryJoinCoOpRoom":
            tryJoinCoOpRoom(evt.data.code, function (ok) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: ok
                });
            });
            return;
        default:
            log("Unknown window message " + evt.data.type);
            return;
    }
}
;
// FIXME: Duplicated from popup.js
function tryJoinRaid(raidId, onComplete) {
    var oc = function (x) {
        if (onComplete)
            onComplete(x);
        return x;
    };
    if (!raidId || (raidId.length !== 8))
        return oc("invalid id");
    if (combatState && combatState.raidCode == raidId) {
        return oc("already in this raid");
    }
    try {
        var payload = { special_token: null, battle_key: raidId };
        doClientAjax("/quest/battle_key_check", JSON.stringify(payload), function (result, error) {
            console.log("Battle key check returned", result, error);
            if (result) {
                if (typeof (result) === "string")
                    result = JSON.parse(result);
                if (result.popup && result.popup.body) {
                    showGamePopup(result.popup);
                    return oc("popup: " + result.popup.body);
                }
                else if (result.redirect) {
                    if (window.location.href != result.redirect) {
                        doNavigate(result.redirect);
                        window.setTimeout(function () {
                            // Work around stuck summon lists (pretty rare)
                            if (!document.querySelector("div.btn-supporter")) {
                                sendExternalMessage({ type: "navigating" });
                                window.location.reload();
                            }
                        }, 3000);
                    }
                    return oc("ok");
                }
                else if ((typeof (result.current_battle_point) === "number") &&
                    !result.battle_point_check) {
                    console.log("Refill required, need " + result.used_battle_point + "bp");
                    return oc("refill required");
                    /*
                    var useCount = Math.min(result.used_battle_point, result.used_battle_point - status.bp);
                    useNormalItemCallback(5, useCount, function () {
                        // always use the current raid id in case it changes due to the focus changing
                        doJoinRaid(raidId);
                    });
                    */
                }
                else if (result.idleTimeout) {
                    return oc("idle timeout");
                }
                else {
                    return oc("unknown response: " + JSON.stringify(result));
                }
            }
            else {
                return oc("no response from server");
            }
        });
    }
    catch (exc) {
        oc("unknown error: " + String(exc));
    }
}
;
function tryJoinCoOpRoom(roomId, onComplete) {
    var oc = function (x) {
        if (onComplete)
            onComplete(x);
        return x;
    };
    if (!roomId || (roomId.length < 5) || (roomId.length > 6))
        return oc("invalid id");
    try {
        var payload = { special_token: null, room_key: roomId };
        doClientAjax("/coopraid/room_key", JSON.stringify(payload), function (result, error) {
            console.log("Room key check returned", result, error);
            if (result) {
                if (typeof (result) === "string")
                    result = JSON.parse(result);
                if (result.popup && result.popup.body) {
                    showGamePopup(result.popup);
                    return oc("popup: " + result.popup.body);
                }
                else if (result.redirect) {
                    if (window.location.href != result.redirect)
                        doNavigate(result.redirect);
                    return oc("ok");
                }
                else if (result.idleTimeout) {
                    return oc("idle timeout");
                }
                else {
                    return oc("unknown response: " + JSON.stringify(result));
                }
            }
            else {
                return oc("no response from server");
            }
        });
    }
    catch (exc) {
        oc("unknown error: " + String(exc));
    }
}
;
function isCoOpRaid() {
    return combatState && combatState.is_coopraid;
}
;
function autoReloadIfResultsHung() {
    var elt = findVisibleElementWithSelector("div.prt-result-head");
    if (!elt && !hasLoadedQuestResults) {
        log("Raid results still haven't loaded. Force-reloading.");
        sendExternalMessage({ type: "navigating" });
        window.location.reload();
    }
}
;
function checkForBattleResults(raidId, nextDelay, retryCount, originalUrl) {
    if (suppressAutoSkip)
        return;
    trySuppressAutoSkip();
    if (retryCount >= 4) {
        log("Retried results check 4 times, stopping");
        return;
    }
    // HACK: Co-op raids never show up in unclaimed rewards under normal circumstances
    if (isCoOpRaid() && !suppressAutoSkip) {
        trySuppressAutoSkip();
        log("Co-op raid; reloading quickly");
        window.setTimeout(function () {
            if (window.location.href.indexOf("result") < 0) {
                sendExternalMessage({ type: "navigating" });
                if (!suppressAutoSkip)
                    window.location.reload();
            }
        }, 1100);
        return;
    }
    var scheduleRetry = function (offset) {
        window.setTimeout(function () { checkForBattleResults(raidId, nextDelay + 750 + offset, retryCount + 1, originalUrl); }, nextDelay + offset);
    };
    var url = "/quest/unclaimed_reward/1";
    doClientAjax(url, function (result, error) {
        if ((window.location.href !== originalUrl) ||
            (window.location.href.indexOf("#raid") < 0))
            return;
        if (error) {
            log("Failure checking unclaimed rewards", error);
            if (error.indexOf("abort") < 0) {
                scheduleRetry(1700);
            }
            return;
        }
        else if (!result ||
            (typeof (result) !== "object") ||
            (result.count < 0)) {
            // log("No unclaimed rewards yet");
            scheduleRetry(200);
            return;
        }
        var matchingResults = result.list.filter(function (e) {
            if (e.raid_id.trim() === String(raidId))
                return true;
            else
                return false;
        });
        if (!matchingResults.length) {
            log("This raid not in results list yet");
            scheduleRetry(200);
            return;
        }
        if ((window.location.href.indexOf("raid") < 0) ||
            (window.location.href.indexOf("" + combatState.raid_id) < 0)) {
            log("Got victory notification while not on raid page; ignoring");
            return;
        }
        hasLoadedQuestResults = false;
        var unclaimedResult = matchingResults[0];
        log("Found results for this raid", unclaimedResult);
        var url = "/#" + unclaimedResult.href;
        if (window.location.href.indexOf("result") < 0) {
            trySuppressAutoSkip();
            if (!suppressAutoSkip)
                doNavigate(url);
        }
        // HACK: We need to wait a bit to start this timer, otherwise handleNewPage clears it
        window.setTimeout(function () {
            // HACK: If the results dialog doesn't appear within 5 seconds, force reload
            resultCheckTimeout = window.setTimeout(autoReloadIfResultsHung, 5000);
        }, 600);
        autoSkipInProgress = false;
    });
}
;
var showButtonInterval = -1;
var hasFiredOnPageReady = false;
function onPageReady() {
    if (isShutdown)
        return;
    if (hasFiredOnPageReady)
        return;
    hasFiredOnPageReady = true;
    log("onPageReady");
    if (!maybeShowViraButton())
        showButtonInterval = window.setInterval(maybeShowViraButton, 50);
    handleNewPage();
}
;
function getGameContainer() {
    return document.getElementById("mobage-game-container") || document.getElementById("gree-game-container");
}
;
function maybeShowViraButton() {
    if (!currentSettings.showBookmarks)
        return true;
    var gameContainer = getGameContainer();
    if (!gameContainer) {
        log("Not showing vira because no game container");
        return false;
    }
    // don't show the sidebar stuff if we're on the top page and there is no sidebar yet
    if (isMobileSite() ||
        (gameContainer.parentNode !== document.body)) {
        log("Not showing vira because we're on the top page");
        window.clearInterval(showButtonInterval);
        showButtonInterval = -1;
        showViraButton();
        return true;
    }
    return false;
}
;
function parseItemList(itemList, uid) {
    // console.log("Item list updated:", itemList);
    sendExtensionMessage({ type: "updateItemCounters", counters: itemList, uid: uid });
}
;
function parseUserStatus(status, uid) {
    console.log("Captured status update from network");
    sendExtensionMessage({ type: "updateStatus", status: status, uid: uid });
    // We want to fetch the updated data from the background script since it annotates it
    if (updateStatusPanel)
        updateStatusPanel(false, true);
}
;
function parseProfile(data, uid) {
    if (!data)
        return;
    sendExtensionMessage({ type: "updateNextRankRp", data: data, uid: uid });
}
;
function resetRaidCode() {
    sendExtensionMessage({ type: "updateRaidCode", raidCode: null });
}
;
function resizeSubmenu() {
    var size = currentSettings.submenuSize;
    if (typeof (size) !== "number")
        return;
    var elt = document.querySelector("div#submenu");
    if (!elt)
        return;
    elt.style.transformOrigin = "0 0";
    elt.style.transform = "scale(" + size.toFixed(2) + ")";
}
;
function updateSettings(callback) {
    sendExtensionMessage({ type: "getSettings" }, function (settings) {
        if (!settings) {
            settings = {};
            throw new Error("No settings?");
        }
        else {
            currentSettings = settings;
        }
        if (settings.isShutdown) {
            log("Extension currently in shutdown state (remotely?)");
            if (!isShutdown)
                compatibilityShutdown();
            return;
        }
        if (applyPassword)
            applyPassword(settings.password);
        if (callback)
            callback(settings);
        sendExternalMessage({
            type: "settingsChanged",
            settings: JSON.stringify(currentSettings)
        });
    });
}
;
function maybeInstallDropdownHack() {
    if (!currentSettings.dropdownFix)
        return;
    // console.log("Dropdown fix enabled");
    var eventCanceller = function (evt) {
        // HACK: We stop propagation of the event without preventing the default
        //  action, so that the browser will properly open dropdowns or assign input
        //  focus without being hindered by granblue's event handlers
        evt.stopImmediatePropagation();
    };
    waitForElementToExist(document, ["select", "textarea"], function (element) {
        // HACK: Granblue installs a broken mousedown handler on the entire document that
        //  cancels events and breaks input controls
        // We register in capturing mode to run before bubbling event handlers
        // Luckily they don't use a capturing top-level handler - that would be harder to
        //  intercept.
        element.addEventListener("mousedown", eventCanceller, true);
        // We also cancel mouseup events so that their input handler library doesn't have
        //  a chance to be confused by unbalanced down/up events
        element.addEventListener("mouseup", eventCanceller, true);
    }, true);
}
;
function getUserIdAndTabIdAsync(callback) {
    var result = {
        userId: null,
        tabId: myTabId
    };
    var maybeInvokeCallback = function () {
        if (result.userId !== null)
            callback(result.userId, result.tabId);
    };
    var token = ++nextUidToken;
    uidCallbacks[token] = function (userId) {
        result.userId = userId;
        maybeInvokeCallback();
    };
    sendExternalMessage({
        type: "getUserId",
        token: token
    });
}
;
chrome.runtime.onMessage.addListener(function onBackgroundMessage(msg, sender, _sendResponse) {
    var sentResponse = false, sentValue = null;
    var sendResponse = function (value) {
        if (sentResponse)
            log("Already sent response", sentValue, "dropping second response", value);
        else {
            sentResponse = true;
            sentValue = value;
            _sendResponse(value);
        }
    };
    if (isShutdown) {
        if (msg.type === "doGameAjax")
            sendResponse([null, "compatibility shutdown", msg.url]);
        return;
    }
    var key = msg.type;
    switch (key) {
        case "myTabId":
            myTabId = msg.id;
            break;
        case "doGamePopup":
            sendExternalMessage({
                type: "doPopup",
                data: msg.data
            });
            break;
        case "doGameRedirect":
            window.location.href = msg.url;
            break;
        case "doGameAjax":
            // retain sendResponse
            doClientAjax(msg.url, msg.data, function (response, error, url) {
                sendResponse([response, error, url]);
            });
            return true;
        case "getUserId":
        case "getUserIdAndTabId":
            getUserIdAndTabIdAsync(sendResponse);
            return true;
        case "actionTimestampsChanged":
            if (!currentBattleUid)
                return;
            if (msg.uid !== currentBattleUid)
                return;
            lastActionTimestamps = msg.data;
            return;
        case "apiRequest":
            return handleApiRequest(msg.request, sendResponse);
        case "tryJoinRaid":
            tryJoinRaid(msg.code, function (ok) {
                sendResponse(ok);
            });
            return true;
        case "tryJoinCoOpRoom":
            tryJoinCoOpRoom(msg.code, function (ok) {
                sendResponse(ok);
            });
            return true;
        default:
            console.log("Unknown message " + key);
            break;
    }
});
function handleApiRequest(request, sendResponse) {
    console.log("Handling API request", request.type);
    switch (request.type) {
        case "tryJoinRaid":
            tryJoinRaid(request.raidCode, function (ok) {
                sendResponse(ok);
            });
            return true;
        case "tryCoOpRoom":
            tryJoinCoOpRoom(request.roomCode, function (ok) {
                sendResponse(ok);
            });
            return true;
        case "getCombatState":
            sendResponse(combatState);
            return;
        default:
            sendResponse("unknown request");
            return;
    }
}
;
function pulseElement(evt) {
    var pulse = document.createElement("div");
    var boundingBox = evt.getBoundingClientRect();
    var container = document.querySelector("div.contents");
    var containerBox = container.getBoundingClientRect();
    var padding = 1;
    pulse.style.left = (boundingBox.left - containerBox.left + padding) + "px";
    pulse.style.top = (boundingBox.top - containerBox.top + padding) + "px";
    pulse.style.width = (boundingBox.width - (padding * 2)) + "px";
    pulse.style.height = (boundingBox.height - (padding * 2)) + "px";
    pulse.className = "button-pulse pulse-animation";
    injectElement(container, pulse);
    window.setTimeout(function () {
        uninjectElement(container, pulse);
    }, 300);
}
;
var nextClickToken = 1;
var tokenAttribute;
function generateClick(target, asClick) {
    if (!tokenAttribute)
        tokenAttribute = generateRandomText();
    var token;
    if (!target.hasAttribute(tokenAttribute)) {
        token = String(nextClickToken++);
        target.setAttribute(tokenAttribute, token);
    }
    else {
        token = target.getAttribute(tokenAttribute);
    }
    sendExternalMessage({
        type: "click",
        name: target.nodeName,
        token: token,
        tokenAttribute: tokenAttribute,
        asClick: !!asClick
    });
}
;
function suppressMouse(evt) {
    // HACK: Viramate UI still wants to handle middle/right clicks
    if (evt.target === getOverlayContainer())
        return;
    if (evt.which !== 1)
        suppressEvent(evt);
}
function suppressEvent(evt) {
    // If the event is synthesized we don't want to mess with it
    if (!evt.isTrusted)
        return;
    evt.stopImmediatePropagation();
}
;
function shouldHandleTouchInput() {
    return currentSettings.touchInputSupport || isMobileSite();
}
;
var performanceHistory = [];
var needToShowPerformanceHud = true;
var hideHudTimeoutHandle = null;
var lastPerformanceHudUpdateWhen = null;
var performanceHudElement = null;
function updatePerformanceHud(frameStats) {
    if (!currentSettings.showPerformanceHud) {
        performanceHistory.length = 0;
        return;
    }
    var now = performance.now();
    performanceHistory.push(frameStats);
    if (performanceHistory.length > 75)
        performanceHistory.shift();
    // Wait for a few samples before showing the hud
    if (performanceHistory.length < 6)
        return;
    if ((lastPerformanceHudUpdateWhen !== null) &&
        (now - lastPerformanceHudUpdateWhen) <= 500)
        return;
    lastPerformanceHudUpdateWhen = now;
    var uic = getUiContainer();
    if (!performanceHudElement) {
        performanceHudElement = document.createElement("div");
        performanceHudElement.className = "performance-hud";
        injectElement(uic, performanceHudElement);
    }
    else if (needToShowPerformanceHud) {
        performanceHudElement.style.opacity = 1.0;
        needToShowPerformanceHud = false;
    }
    var minDelay = 999999, maxDelay = 0, delaySum = 0;
    for (var i = 0, l = performanceHistory.length; i < l; i++) {
        var fs = performanceHistory[i];
        minDelay = Math.min(minDelay, fs.realTimeSinceLastFrame);
        maxDelay = Math.max(maxDelay, fs.realTimeSinceLastFrame);
        delaySum += fs.realTimeSinceLastFrame;
    }
    var avgDelay = delaySum / performanceHistory.length;
    var estimatedFps = 1000 / avgDelay;
    performanceHudElement.textContent = estimatedFps.toFixed(0) + "fps " +
        "[" + minDelay.toFixed(1) + ", " + maxDelay.toFixed(1) + "] ms";
    if (hideHudTimeoutHandle)
        clearTimeout(hideHudTimeoutHandle);
    hideHudTimeoutHandle = setTimeout(hidePerformanceHud, 3000);
}
;
function hidePerformanceHud() {
    if (!performanceHudElement)
        return;
    performanceHistory.length = 0;
    performanceHudElement.style.opacity = 0.0;
    needToShowPerformanceHud = true;
}
;
function doNavigate(url) {
    sendExternalMessage({ type: "navigating", url: url });
    window.location.href = url;
}
;
var hideTransientMessageTimeoutHandle = null;
var transientMessageElement = null;
function showTransientMessage(text) {
    if (!currentSettings.showTransientMessages)
        return;
    var now = performance.now();
    var uic = getUiContainer();
    if (!transientMessageElement) {
        transientMessageElement = document.createElement("div");
        transientMessageElement.className = "transient-message";
        transientMessageElement.style.opacity = 0.0;
        transientMessageElement.style.top = isHorizontalLayout() ? "50px" : "2px";
        injectElement(uic, transientMessageElement);
        setTimeout(function () {
            transientMessageElement.style.opacity = 1.0;
        }, 5);
    }
    else {
        transientMessageElement.style.opacity = 1.0;
    }
    transientMessageElement.textContent = text;
    if (hideTransientMessageTimeoutHandle)
        clearTimeout(hideTransientMessageTimeoutHandle);
    hideTransientMessageTimeoutHandle = setTimeout(hideTransientMessage, 4000 + (text.length * 100));
}
;
function hideTransientMessage() {
    if (!transientMessageElement)
        return;
    transientMessageElement.style.opacity = 0.0;
}
;
//# sourceMappingURL=inject.js.map