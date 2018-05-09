"use strict";
var stampInfo;
var kanaToRomajiTable;
var currentPointStandings = [];
var checkForTargetingAreaType = true;
var lastEnemyUIUpdate = -1, lastActionTimerUpdate = -1, lastBuffTimerUpdate = -1;
var targetingType = null;
var isPopupOpen = false;
var successfulAbilityCasts = [];
var raidBroadcastChannel = null;
var otherTabsOpen = false;
var loggedSuppressedSkipMessage = false;
var suppressedAutoSkipWhen = null;
var raidStateTimestamp = 0;
function processCombatPage() {
    if (!isCombatPage(window.location.hash))
        return;
    var turnHasChanged = combatState && (combatState.turn !== mostRecentTurn);
    if (combatState) {
        if (turnHasChanged)
            processTurnChange(combatState.turn);
        if (combatState.finish &&
            invalidateRaidList &&
            !hasInvalidatedRaidListAfterCombat) {
            hasInvalidatedRaidListAfterCombat = true;
            invalidateRaidList();
        }
        // force an update right after a battle finishes, since cooldowns tick once then too
        if (combatState.finish) {
            var current = combatState.attacking || combatState.usingAbility;
            updatePanels = updatePanels || (isAttackingLastUpdate && !current);
            isAttackingLastUpdate = current;
        }
    }
    // HACK: Sometimes the game tears down part of the raid UI, so we need to detect that
    //  and respond
    if (!raidContainer ||
        !document.body.contains(raidContainer)) {
        resetCachedElements();
        raidContainer = document.querySelector("div.cnt-raid");
        // Give it a frame to recover
        return;
    }
    if (!partyContainer)
        partyContainer = document.querySelector("div.prt-party");
    if (!partyContainer)
        return;
    if (!lisAbility)
        lisAbility = document.querySelector("div.lis-ability");
    if (!lisAbility)
        return;
    if (combatUIIsPrepared) {
        if (!partyIcons)
            partyIcons = partyContainer.querySelectorAll("div.btn-command-character");
        if (!skillContainers)
            skillContainers = document.querySelectorAll("div.prt-command-chara:not(.quick-panels)");
        if (partyStateIsDirty)
            refreshPartyUI(partyIcons, skillContainers);
        else
            tickPartyUI(partyIcons, skillContainers);
        if (raidBroadcastChannel == null)
            initRaidBroadcastChannel();
        processAutoAdvance();
        maybeUpdateConditions();
        var timeSinceLastUIUpdate = Date.now() - lastEnemyUIUpdate;
        var shouldUIUpdate = (timeSinceLastUIUpdate >= 250);
        if (shouldUIUpdate) {
            var popup = document.querySelector("div.pop-usual:not(.auto-hiding), div.btn-scroll, div.prt-command-end.retire");
            isPopupOpen = (popup && (popup.style.display === "block"));
        }
        if (turnHasChanged || shouldUIUpdate) {
            lastEnemyUIUpdate = Date.now();
            refreshEnemyUI();
            refreshButtonLocks();
        }
        var timeSinceLastActionTimerUpdate = Date.now() - lastActionTimerUpdate;
        if (timeSinceLastActionTimerUpdate >= 100)
            refreshActionTimer();
        var timeSinceLastDebuffTimerUpdate = Date.now() - lastDebuffTimerUpdate;
        if (timeSinceLastDebuffTimerUpdate >= 500)
            refreshConditionUI();
        var timeSinceLastBuffTimerUpdate = Date.now() - lastBuffTimerUpdate;
        if ((timeSinceLastBuffTimerUpdate >= 200) && areBuffTimersInvalid) {
            lastBuffTimerUpdate = Date.now();
            refreshPartyConditionUI();
        }
    }
}
;
function processTurnChange(turnIndex) {
    if (true) {
        var digits = String(turnIndex);
        var digitElements = document.querySelectorAll("div.prt-turn-info div.prt-number div");
        for (var i = 0, l = digitElements.length; i < l; i++) {
            var elt = digitElements[i];
            if (i < digits.length) {
                elt.className = "num-turn" + digits[i];
                elt.style.display = "";
            }
            else {
                elt.className = "";
                elt.style.display = "none";
            }
        }
    }
    // console.log("Turn #" + turnIndex);
    mostRecentTurn = turnIndex;
    // HACK: Otherwise we do it multiple times
    normalAttacking = false;
    partyStateIsDirty = true;
    pendingOneClickSummon = null;
    checkForTargetingAreaType = true;
    successfulAbilityCasts.length = 0;
    areBuffTimersInvalid = true;
    resetCachedElements();
    updateSettings();
    sendExtensionMessage({ type: "updateRaidCode", raidCode: combatState.raidCode });
}
;
function processAutoAdvance() {
    if (!combatState)
        return;
    if (!combatState.finish) {
        hasAutoAdvanced = false;
        return;
    }
    if (hasAutoAdvanced)
        return;
    if (luckyDay)
        return;
    if (!currentSettings.autoSkipToQuestResults)
        return;
    // A raid-triggered auto-skip is already on progress so we don't want to also click next
    if (autoSkipInProgress)
        return;
    if (suppressAutoSkip) {
        if (!loggedSuppressedSkipMessage) {
            log("Another window is already navigating to the results screen.");
            loggedSuppressedSkipMessage = true;
        }
        return;
    }
    var buttonContainer = document.querySelector("div.prt-command-end");
    var computedStyle = window.getComputedStyle(buttonContainer);
    if (computedStyle.getPropertyValue("display") !== "block")
        return;
    var button = buttonContainer.querySelector("div.btn-result");
    hasAutoAdvanced = true;
    // console.log("Wave finished, automatically advancing");
    window.setTimeout(function () {
        pulseElement(button);
        generateClick(button, true);
        generateClick(button, false);
    }, 600);
}
;
function prepareCombatUI() {
    getUserIdAndTabIdAsync(function (uid, tabId) {
        currentBattleUid = uid;
        currentBattleTabId = tabId;
    });
    waitForElementToExist(document, "div.cnt-raid-stage", function (stageWrapper) {
        var gameContainer = getGameContainer();
        var effectiveZoom = getEffectiveZoom(gameContainer);
        raidContainer = document.querySelector("div.cnt-raid");
        updateQuickPanelSize();
        if (raidContainer && currentSettings.largeQuickPanels) {
            if (raidContainer.className.indexOf("large-quick-panels") < 0)
                raidContainer.className += " large-quick-panels";
        }
        debuffTimerElement = getUiContainer().querySelector("div.debuff-timers");
        if (!debuffTimerElement || !document.body.contains(debuffTimerElement)) {
            debuffTimerElement = document.createElement("div");
            debuffTimerElement.className = "debuff-timers";
            debuffTimerElement.style.backgroundImage = "url('" + getResourceUrl("debuff-timers.png") + "')";
            debuffTimerElement.style.zoom = effectiveZoom.toFixed(3);
            injectElement(getUiContainer(), debuffTimerElement);
            lastDebuffTimerUpdate = -1;
        }
        else {
            debuffTimerElement.style.display = "block";
        }
        // HACK: A touch triggers both touch events and click events. When touching a party member
        // on the mobile site, the click is delayed enough to trigger after the skills are shown,
        // creating a pseudo double click and causing skills to be unintentionally clicked if the touch
        // is in the right place. Calling preventDefault() on a touchstart prevents the click events.
        if (isMobileSite()) {
            var party = document.querySelectorAll("div.prt-member > div.btn-command-character");
            for (var i = 0; i < party.length; i++) {
                party[i].addEventListener("touchstart", function (evt) {
                    evt.preventDefault();
                }, true);
            }
        }
        combatUIIsPrepared = true;
    }, false);
    var updatingStandings = false;
    waitForElementToExist(document, "div.pop-alliance-window", function (allianceWindow) {
        if (!currentPointStandings)
            return;
        if (updatingStandings)
            return;
        updatingStandings = true;
        window.setTimeout(function () {
            var entries = allianceWindow.querySelectorAll("div.lis-user");
            for (var i = 0, l = entries.length; i < l; i++) {
                var entry = entries[i];
                var pointText = "0";
                var id = entry.getAttribute("data-id");
                if (id) {
                    for (var j = 0, l2 = currentPointStandings.length; j < l2; j++) {
                        var ps = currentPointStandings[j];
                        if ((ps.user_id === id)) {
                            if (ps.is_dead) {
                                var nameText = entry.querySelector("div.txt-name");
                                nameText.className = "txt-name all-dead";
                            }
                            var roundedPoints = (Number(ps.point) / 1000).toFixed(0);
                            pointText = roundedPoints + "k";
                            break;
                        }
                    }
                }
                var rankText = entry.querySelector("div.txt-rank");
                rankText.appendChild(document.createElement("br"));
                rankText.appendChild(document.createTextNode(pointText));
            }
        }, 0);
        updatingStandings = false;
    }, true);
    waitForElementToExist(document, "textarea.frm-post-tweet", function (textbox) {
        if (!currentSettings.autofillBackupTweets)
            return;
        // HACK: The same selector will also find the AP refill dialog box
        var selectClass = document.querySelector("div.prt-select-tweet-text");
        if (selectClass)
            return;
        if (!combatState || !combatState.enemies.length)
            return;
        var prefilled = document.querySelector("div.txt-attention-comment");
        var prefilledText = prefilled.textContent.trim();
        var hp = -999999;
        for (var i = 0, l = combatState.enemies.length; i < l; i++) {
            var e = combatState.enemies[i];
            if (e.hpMax > hp) {
                hp = e.hpMax;
                if (prefilledText.indexOf(e.name.ja) >= 0)
                    textbox.textContent = e.name.en + " ";
                else
                    textbox.textContent = e.name.ja + " ";
            }
        }
    }, true);
    waitForElementToExist(document, "div.lis-stamp-slider", function (slider) {
        if (!currentSettings.disablePhalanxSticker)
            return;
        var hasPhalanx = isPhalanxAvailable();
        if (hasPhalanx)
            return;
        var phalanxStickers = slider.querySelectorAll('div.lis-stamp[chatid="22"]');
        for (var i = 0, l = phalanxStickers.length; i < l; i++) {
            var sticker = phalanxStickers[i];
            sticker.style.opacity = 0.4;
            sticker.style.pointerEvents = "none";
        }
    }, true);
    waitForElementToExist(document, "div.prt-battle-id", function (elt) {
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
    if (currentSettings.singlePageStickers)
        setupStickerUI();
}
;
function kanaToRomaji(text) {
    var result = "";
    var tsu = false;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === "っ") {
            tsu = true;
            continue;
        }
        var ss = text.substr(i, 2);
        var romaji = null;
        if (ss.length === 2)
            romaji = kanaToRomajiTable[ss];
        if (!romaji) {
            romaji = kanaToRomajiTable[text[i]];
        }
        else {
            i += 1;
        }
        if (romaji) {
            if (tsu)
                romaji = romaji[0] + romaji;
            result += romaji;
        }
        else {
            if (tsu)
                ch += ch;
            result += ch;
        }
        tsu = false;
    }
    return result;
}
;
function setupStickerUI() {
    var searchField, body, allStamps;
    var filteredListElement = null;
    var lastFilterText = null;
    var updateStickerFilter = function () {
        var filterText = kanaToRomaji(searchField.value.toLowerCase());
        filterText = filterText
            .replace(/vyrn/g, "vii")
            .replace(/rakamu/g, "rackam")
            .replace(/eugen/g, "oigen")
            .replace(/['!\?\-\ー\’\！\？]/g, "")
            .trim();
        if (filterText === lastFilterText)
            return;
        lastFilterText = filterText;
        var desiredIndex = parseInt(filterText);
        if (!filteredListElement) {
            filteredListElement = document.createElement("div");
            body.querySelector("div.flex-viewport").appendChild(filteredListElement);
        }
        var isFiltering = (filterText && filterText.length);
        body.querySelector("div.prt-stamp-wrapper").style.display =
            isFiltering
                ? "none"
                : "block";
        filteredListElement.style.display =
            isFiltering
                ? "block"
                : "none";
        filteredListElement.innerHTML = "";
        if (!isFiltering)
            return;
        var row = null, k = 0;
        var keywords = filterText.split(" ");
        var matchingStamps = [];
        for (var i = 0, l = allStamps.length; i < l; i++) {
            var stamp = allStamps[i];
            var stampKeywords = stamp.getAttribute("keywords");
            if (!stampKeywords)
                continue;
            var failed = false;
            if (desiredIndex >= 0) {
                failed = desiredIndex !== parseInt(stamp.getAttribute("chatid"));
            }
            else {
                for (var j = 0, l2 = keywords.length; j < l2; j++) {
                    if (stampKeywords.indexOf(keywords[j]) < 0)
                        failed = true;
                }
            }
            if (failed)
                continue;
            var stampElement = stamp.cloneNode(true);
            stampElement.className += " show-number";
            if ((row === null) || ((k % 4) === 0)) {
                row = document.createElement("div");
                row.className = "lis-stamp-row";
                filteredListElement.appendChild(row);
            }
            if (k === 0)
                stampElement.className += " auto-selected";
            row.appendChild(stampElement);
            k++;
        }
    };
    waitForElementToExist(document, "div.pop-usual.pop-ready-stamp", function (popup) {
        filteredListElement = null;
        allStamps = null;
        lastFilterText = null;
        var notice = popup.querySelector("div.txt-notice");
        if (notice && !notice.title) {
            notice.title = notice.innerText.trim();
            notice.textContent = "";
        }
        searchField = popup.querySelector("input.stamp-filter");
        if (searchField)
            return;
        body = popup.querySelector("div.txt-popup-body");
        searchField = document.createElement("input");
        searchField.className = "stamp-filter";
        searchField.placeholder = "Search";
        searchField.incremental = true;
        searchField.type = "search";
        searchField.addEventListener("search", updateStickerFilter, true);
        body.insertBefore(searchField, body.firstChild);
        searchField.focus();
        allStamps = body.querySelectorAll("div.lis-stamp-row:not(.recent-stamps) div.lis-stamp");
        for (var i = 0, l = allStamps.length; i < l; i++) {
            var stamp = allStamps[i];
            stamp.setAttribute("displayIndex", i);
            var id = stamp.getAttribute("chatid");
            if (!id)
                continue;
            var keywords = stampInfo[id];
            if (!keywords)
                continue;
            stamp.setAttribute("keywords", keywords);
        }
        // popup.
    }, true);
}
;
function updateQuickPanelSize() {
    if (!raidContainer)
        return;
    var cn = "large-quick-panels";
    var masks = document.querySelectorAll("div.active-mask");
    if (currentSettings.largeQuickPanels) {
        raidContainer.classList.add(cn);
        for (var i = 0, l = masks.length; i < l; i++)
            masks[i].classList.add(cn);
    }
    else {
        raidContainer.classList.remove(cn);
        for (var i = 0, l = masks.length; i < l; i++)
            masks[i].classList.remove(cn);
    }
}
;
function scheduleGaugeTransplant(gauge, container) {
    var gameContainer = getGameContainer();
    var effectiveZoom = getEffectiveZoom(gameContainer);
    var tryTransplant;
    tryTransplant = function () {
        if (!container.parentNode)
            return;
        var parentCs = window.getComputedStyle(container.parentNode);
        if ((parentCs.display === "none")) {
            requestAnimationFrame(tryTransplant);
            return;
        }
        // We have to touch a property to force layout (???)
        var x = container.clientLeft;
        // HACK: Figure out where the numbers should go, then hoist them out
        //  so they are always visible
        var clientRect = container.getBoundingClientRect();
        var computedStyle = window.getComputedStyle(container);
        var fontSize = computedStyle.getPropertyValue("font-size");
        var raidBox = document.querySelector("div.cnt-raid-stage");
        var raidBoxRect = raidBox.getBoundingClientRect();
        var verticalOffset = gameContainer.parentNode.scrollTop / effectiveZoom;
        if (isHorizontalLayout())
            verticalOffset = (-48 / effectiveZoom);
        container.parentNode.removeChild(container);
        var left = (clientRect.left - raidBoxRect.left);
        var top = (clientRect.top + verticalOffset);
        /*
        // HACK: there is probably a better way to do this, and this'll probably break, needs testing
        // shifts up the number container by a few pixels to fix positioning on enemies with mode gauges in fights with multiple enemies
        if (combatState.enemies.length > 1 && container.querySelector("span.mode"))
            top -= 12;
        */
        container.style.position = "absolute";
        container.style.left = left.toFixed(1) + "px";
        container.style.top = top.toFixed(1) + "px";
        container.style.width = clientRect.width.toFixed(1) + "px";
        container.style.height = clientRect.height.toFixed(1) + "px";
        container.style.fontSize = fontSize;
        injectElement(getRaidUiContainer(), container);
        return true;
    };
    tryTransplant();
    // requestAnimationFrame(tryTransplant);
}
;
function refreshEnemyUI() {
    if (!combatState || !combatState.enemies)
        return;
    // HACK
    if (buffTimerElements) {
        var isPartyShown = commandTop && (commandTop.style.display !== "none");
        var hideBuffTimers = !isPartyShown ||
            combatState.attacking;
        for (var i = 0, l = buffTimerElements.length; i < l; i++) {
            if (hideBuffTimers ||
                (buffTimerElements[i].children.length === 0))
                buffTimerElements[i].style.opacity = "0.0";
            else
                buffTimerElements[i].style.opacity = "1.0";
        }
        if (hideBuffTimers)
            refreshBuffsButton.classList.add("hidden");
        else
            refreshBuffsButton.classList.remove("hidden");
    }
    var enemies = combatState.enemies;
    if (!enemyGauges)
        enemyGauges = document.querySelectorAll('div.btn-enemy-gauge:not(.prt-enemy-percent)');
    if (!enemyGauges)
        return;
    var gauges = enemyGauges;
    var sec = Math.floor(Date.now() / 1000);
    for (var i = 0, l = gauges.length; i < l; i++) {
        var gauge = gauges[i];
        var targetIndex = gauge.targetIndex;
        if (typeof (targetIndex) !== "number")
            gauge.targetIndex = targetIndex = parseInt(gauge.getAttribute("target"));
        var enemy = enemies[targetIndex - 1];
        var selector = "div.number-container[index='" + i + "']";
        var container = gauge.numberContainer;
        if (!container)
            container = document.querySelector(selector) ||
                getRaidUiContainer().querySelector(selector);
        if (!enemy ||
            (enemy.hp <= 0)) {
            if (container)
                container.style.display = "none";
            continue;
        }
        if (container &&
            combatState &&
            (typeof (combatState.turn) === "number")) {
            var computedStyle = window.getComputedStyle(gauge);
            if (
            // Why is this check necessary?
            (computedStyle.display === "block") &&
                ((container.turnIndex != combatState.turn) ||
                    (container.lastSecond != sec))) {
                container.parentNode.removeChild(container);
                container = null;
            }
        }
        if (!container) {
            if (!currentSettings.showGaugeOverlays)
                return;
            // HACK: The new percentage HP gauges have accurate padding for everything <3
            var paddingSource = gauges[i].paddingSource;
            if (!paddingSource) {
                gauges[i].paddingSource = paddingSource =
                    document.querySelector("div.btn-enemy-gauge.prt-enemy-percent[target='" + gauge.targetIndex + "']");
            }
            if (paddingSource) {
                var cs = window.getComputedStyle(paddingSource);
                var sourceTopPadding = parseFloat(cs.paddingTop.replace("px", ""));
                switch (enemies.length) {
                    case 1:
                        sourceTopPadding += 10;
                        break;
                    case 2:
                    case 3:
                        if (enemies[i].hasModeGauge)
                            sourceTopPadding -= 2.5;
                        else
                            sourceTopPadding += 1.5;
                        break;
                }
                gauge.style.paddingTop = sourceTopPadding.toFixed(1) + "px";
            }
            container = document.createElement("div");
            container.className = "number-container";
            container.turnIndex = combatState.turn;
            container.lastSecond = sec;
            container.setAttribute("index", i);
            gauge.numberContainer = container;
            gauge.appendChild(container);
            scheduleGaugeTransplant(gauge, container);
        }
        container.style.display = "block";
        var numeric = container.numeric;
        if (!numeric)
            container.numeric = numeric = container.querySelector("span.numeric");
        if (!numeric) {
            numeric = document.createElement("span");
            numeric.className = "numeric";
            if (currentSettings.highPrecisionHP) {
                numeric.setAttribute("type", "high-prec");
            }
            container.numeric = numeric;
            container.appendChild(numeric);
        }
        var percentage = container.percentage;
        if (!percentage)
            container.percentage = percentage = container.querySelector("span.percentage");
        if (!percentage) {
            percentage = document.createElement("span");
            percentage.className = "percentage";
            container.percentage = percentage;
            container.appendChild(percentage);
        }
        if (numeric.lastValue !== enemy.hp) {
            numeric.lastValue = enemy.hp;
            numeric.textContent = formatLargeNumber(enemy.hp, enemy.hpMax);
        }
        if (percentage.lastValue !== enemy.hp) {
            percentage.lastValue = enemy.hp;
            percentage.textContent = ((enemy.hp / enemy.hpMax) * 100)
                .toFixed(currentSettings.highPrecisionHP ? 2 : 1) + "%";
        }
        if (enemy.hasModeGauge) {
            var modeGauge = container.modeGauge;
            if (!modeGauge)
                container.modeGauge = modeGauge = container.querySelector("span.mode");
            if (!modeGauge) {
                modeGauge = document.createElement("span");
                modeGauge.className = "mode";
                container.modeGauge = modeGauge;
                container.appendChild(modeGauge);
            }
            if (modeGauge.lastValue !== enemy.gauge) {
                modeGauge.lastValue = enemy.gauge;
                modeGauge.textContent = enemy.gauge;
            }
        }
    }
    var shiftGauges = function () {
        if (targetingType === "m1" || targetingType.indexOf("2") >= 0 || targetingType.indexOf("3") >= 0) {
            for (var i = 0; i < gauges.length; i++) {
                if (!gauges[i].classList.contains("gauge-mode-override") && gauges[i].numberContainer) {
                    gauges[i].numberContainer.numeric.setAttribute("type", "high-prec-high");
                }
            }
        }
    };
    if (checkForTargetingAreaType) {
        if (currentSettings.highPrecisionHP) {
            targetingType = document.querySelector("div.prt-targeting-area").getAttribute("type");
            if (!targetingType) {
                // fix the shifting for high precision on some enemies since the css rules don't apply if shadowed
                // unfortunately, type isn't populated until later
                var areaObserver = new MutationObserver(function (mutations) {
                    // there should only ever be one mutation that applies
                    if (mutations.length !== 1) {
                        return;
                    }
                    areaObserver.disconnect();
                    var ga = mutations[0].target["getAttribute"];
                    if (ga)
                        targetingType = mutations[0].target["getAttribute"]("type");
                    shiftGauges();
                });
                areaObserver.observe(document.querySelector("div.prt-targeting-area"), { attributes: true, attributeFilter: ["type"] });
            }
        }
        checkForTargetingAreaType = false;
    }
    if (targetingType) {
        shiftGauges();
    }
}
;
function formatLargeNumber(value, maximum) {
    if (currentSettings.highPrecisionHP) {
        // add thousands separator for readability
        value = Math.floor(value).toLocaleString("en-US", { maximumFractionDigits: 0, useGrouping: true });
        maximum = (maximum / 1000).toLocaleString("en-US", { maximumFractionDigits: 1, useGrouping: true });
        return value + "/" + maximum + "k";
    }
    if (maximum >= 90000000) {
        return (value / 1000000).toFixed(2) + "m";
    }
    else if (maximum >= 10000000) {
        return (value / 1000000).toFixed(3) + "m";
    }
    else if (maximum >= 20000) {
        return (value / 1000).toFixed(1) + "k";
    }
    else {
        return Math.floor(value).toLocaleString();
    }
}
;
function canUseAbility() {
    if (!combatState)
        return false;
    if (combatState.btn_lock)
        return false;
    else if (combatState.attacking)
        return false;
    else if (combatState.usingAbility)
        return false;
    else if (combatState.finish)
        return false;
    return true;
}
;
function processQuestStagePage() {
}
;
function hideActionTimer() {
    if (actionTimerElement)
        actionTimerElement.style.opacity = 0.0;
}
;
function refreshActionTimer() {
    var now = Date.now();
    lastActionTimerUpdate = now;
    if (!currentSettings.showLastActionTimer)
        return hideActionTimer();
    if (!combatState)
        return hideActionTimer();
    if (combatState.finish)
        return hideActionTimer();
    /*
    if (isActionInProgress !== false)
        return hideActionTimer();
    */
    if (!currentBattleUid)
        return hideActionTimer();
    /*
    if (hasAnActionSucceeded)
        return hideActionTimer();
    */
    var cua = canUseAbility();
    if (isActionAnimating) {
        if (cua) {
            isActionAnimating = false;
            if (currentActionId) {
                sendExtensionMessage({
                    type: "actionCompletedAnimation",
                    uid: currentBattleUid,
                    actionId: currentActionId || previousActionId
                });
                previousActionId = currentActionId;
                currentActionId = null;
            }
        }
    }
    if (!lastActionTimestamps) {
        sendExtensionMessage({ type: "getLastActionTimestamps", uid: currentBattleUid }, function (result) {
            lastActionTimestamps = result;
            refreshActionTimer();
        });
        return hideActionTimer();
    }
    if (currentActionId &&
        ((lastActionTimestamps.successfulActionId === currentActionId) ||
            (lastActionTimestamps.actionId === currentActionId)) &&
        (!otherTabsOpen && !currentSettings.alwaysShowActionTimer))
        return hideActionTimer();
    if (!lastActionTimestamps.actionId && !lastActionTimestamps.successfulActionId)
        return hideActionTimer();
    var started = lastActionTimestamps.successfulStarted ||
        lastActionTimestamps.started;
    if (!started)
        return hideActionTimer();
    if (lastSuccessfulActionStartedWhen >= started) {
        if ((lastSuccessfulActionStartedWhen == started) && currentSettings.alwaysShowActionTimer) {
        }
        else
            return hideActionTimer();
    }
    var elapsed = now - started;
    if (elapsed >= 30 * 1000)
        return hideActionTimer();
    if (actionTimerElement && !getRaidUiContainer().contains(actionTimerElement))
        actionTimerElement = null;
    if (!actionTimerElement) {
        actionTimerElement = document.createElement("div");
        actionTimerElement.className = "action-timer";
        actionTimerElement.style.opacity = 1.0;
        injectElement(getRaidUiContainer(), actionTimerElement);
    }
    actionTimerElement.textContent = (elapsed / 1000).toFixed(2);
    actionTimerElement.style.opacity = 1.0;
}
;
var broadcastTabId;
function sendBroadcastMessage(msg) {
    if (!raidBroadcastChannel)
        initRaidBroadcastChannel();
    if (!raidBroadcastChannel)
        return;
    msg.senderId = broadcastTabId;
    raidBroadcastChannel.postMessage(msg);
}
;
function initRaidBroadcastChannel() {
    if (!combatState || !combatState.raid_id)
        return;
    if (typeof (BroadcastChannel) !== "function")
        return;
    broadcastTabId = Math.random() + ":" + Date.now();
    raidBroadcastChannel = new BroadcastChannel(combatState.raid_id);
    raidBroadcastChannel.addEventListener("message", onRaidBroadcastMessage, false);
    sendBroadcastMessage({ type: "ping" });
    refreshActionTimer();
}
;
function trySuppressAutoSkip() {
    if (suppressedAutoSkipWhen)
        return;
    suppressedAutoSkipWhen = Date.now();
    sendBroadcastMessage({ type: "suppressAutoSkip", ts: suppressedAutoSkipWhen });
}
;
function onRaidBroadcastMessage(evt) {
    if (evt.data.senderId === broadcastTabId)
        return;
    var type = evt.data.type;
    switch (type) {
        case "partyStateChanged":
            var data = evt.data;
            if (data.ts < raidStateTimestamp) {
                log("Discarded outdated raid state broadcast");
                return;
            }
            else {
                log("Processing raid state broadcast");
                raidStateTimestamp = data.ts;
            }
            var oldFormation = lastPartyFormation;
            var oldParam = lastPartyParam;
            lastPartyAbilityState = data.lastPartyAbilityState;
            lastPartyFormation = data.lastPartyFormation;
            lastPartyParam = data.lastPartyParam;
            parseServerPlayerState(false);
            partyStateIsDirty = true;
            window.setTimeout(function () {
                applyPartyParamToUi(oldFormation, oldParam, lastPartyFormation, lastPartyParam);
            }, 1);
            return;
        case "suppressAutoSkip":
            if ((!suppressedAutoSkipWhen) || (suppressedAutoSkipWhen > evt.data.ts)) {
                log("Lost the race to load raid results");
                suppressAutoSkip = true;
            }
            else {
                log("Ignoring spurious auto-skip suppression (won the race)");
            }
            return;
        case "ping":
            otherTabsOpen = true;
            return;
        default:
            log(evt.data);
    }
}
;
function applyPartyParamToUi(oldFormation, oldParam, newFormation, newParam) {
    for (var i = 0; i < 4; i++) {
        var characterIndex = newFormation[i];
        if (typeof (characterIndex) !== "string")
            continue;
        var index = parseInt(characterIndex);
        if ((index < 0) || (index >= newParam.length))
            continue;
        var param = newParam[index];
        var characterElement = document.querySelector("div.lis-character" + i);
        if (!characterElement)
            continue;
        var hp = param.hp;
        if (characterIndex !== oldFormation[i]) {
            // Dead or character in position changed
            hp = 0;
        }
        var hpText = characterElement.querySelector("div.txt-hp-value");
        hpText.textContent = hp;
        var hpBar = characterElement.querySelector("div.prt-gauge-hp-inner");
        hpBar.style.width = (hp / param.hpMax * 100).toFixed(1) + "%";
        var ougiText = characterElement.querySelector("span.txt-gauge-value");
        ougiText.textContent = param.recast;
        var ougiBar = characterElement.querySelector("div.prt-gauge-special-inner");
        ougiBar.style.width = Math.min(100, param.recast).toFixed(1) + "%";
        var ougiShine = characterElement.querySelector("div.prt-shine");
        ougiShine.style.display = (param.recast >= 100) ? "block" : "none";
    }
}
;
//# sourceMappingURL=combat.js.map