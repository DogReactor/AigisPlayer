"use strict";
var previousConditions = null;
var previousConditionsTimestamps = null;
// If something seems to have changed (condition added/removed) we'll recheck this often at most
var fastConditionRefreshInterval = 4000;
// When it seems like buffs may expire soon we recheck to see if they were recast
var slowConditionRefreshInterval = 15000;
var isFieldEffectUpdatePending = false;
var currentFieldEffectsTimestamp = 0;
var currentFieldEffects = null;
var areBuffTimersInvalid = true;
function areTimersEnabled() {
    return currentSettings.showDebuffTimers ||
        currentSettings.showBuffTimers;
}
;
// Javascript is great
function areArraysEqual(lhs, rhs) {
    if (!lhs || !rhs)
        return (lhs === rhs);
    if (lhs.length !== rhs.length)
        return false;
    for (var i = 0; i < lhs.length; i++) {
        if (lhs[i] !== rhs[i])
            return false;
    }
    return true;
}
;
function maybeUpdateConditions() {
    if (!canUseAbility())
        return;
    // Don't start an update if debuff timers are disabled
    if (areTimersEnabled()) {
        maybeInvalidateEnemyConditions();
        if (combatState && combatState.enemies)
            for (var i = 0, l = Math.min(currentConditions.enemy.length, combatState.enemies.length); i < l; i++)
                currentConditions.enemy[i].tick(combatState.enemies[i].id);
    }
    if (combatState &&
        currentSettings.showPartyHelp)
        for (var i = 0, l = currentConditions.party.length | 0; i < l; i++)
            currentConditions.party[i].tick();
}
;
function ConditionRecord(category, index) {
    this.id = null;
    this.turn = null;
    this.category = category | 0;
    this.index = index | 0;
    this.emptySet = (category === 0) ? {} : [];
    this.state = this.emptySet;
    this.timestamp = null;
    this.updateRequested = false;
    this.slowUpdateRequested = false;
    this.pending = false;
    this.failureCount = 0;
    this.failedConditionUpdate = false;
}
;
ConditionRecord.prototype.reset = function (id) {
    this.turn = combatState.turn;
    this.id = id;
    this.state = this.emptySet;
    this.timestamp = Date.now();
    this.updateRequested = false;
    this.slowUpdateRequested = false;
};
ConditionRecord.prototype.getUrl = function () {
    var prefix;
    if (combatState.is_semi) {
        prefix = "rest/semiraid";
    }
    else if (combatState.is_multi) {
        prefix = "rest/multiraid";
    }
    else {
        prefix = "rest/raid";
    }
    var url;
    if (this.category === 0) {
        if (this.index >= combatState.party.length)
            return;
        // Player condition indexes are indexes into the full party, not the front row
        var fullPartyIndex = combatState.characterIds.indexOf(combatState.party[this.index].pid);
        if (fullPartyIndex < 0)
            return;
        url = prefix + "/condition/" + combatState.raid_id + "/" + this.category + "/" + fullPartyIndex + ".json";
    }
    else {
        // Enemy
        url = prefix + "/condition/" + combatState.raid_id + "/" + this.category + "/" + this.index + ".json";
    }
    return url;
};
ConditionRecord.prototype.isUpdateNeeded = function (id) {
    var now = Date.now();
    if (this.pending)
        return false;
    if (!this.timestamp)
        return true;
    var timeSinceLastUpdate = now - this.timestamp;
    if (timeSinceLastUpdate <= fastConditionRefreshInterval)
        return false;
    if ((timeSinceLastUpdate >= slowConditionRefreshInterval) &&
        this.slowUpdateRequested) {
        // log("Slow update triggered for conditions");
        return true;
    }
    if (this.updateRequested)
        return true;
    // FIXME: It's not really necessary to do this every turn... we could be smarter
    if (this.turn &&
        combatState &&
        (combatState.turn > this.turn))
        return true;
    if (this.id !== id)
        return true;
    return false;
};
ConditionRecord.prototype.maybeLogPartyConditions = function (result, error) {
    if (!result)
        log(error);
    else if (result.condition && result.condition.buff && false)
        log(this.index, result.condition.buff.map(function (e) {
            return e.detail;
        }));
};
var pendingPartyConditionUpdates = 0;
ConditionRecord.prototype.update = function (id) {
    if (this.pending)
        throw new Error("Duplicate update");
    var turn = combatState.turn;
    // This would be more correct, but we need backpressure for server lag
    // var timestamp = Date.now();
    var previousConditions = this.requestPreviousConditions;
    var pct = this.timestamp;
    var self = this;
    var url = this.getUrl();
    // console.log("Update " + url, this);
    if (!url) {
        if (!this.failedConditionUpdate)
            log("Can't perform condition update because character index could not be found");
        this.failedConditionUpdate = true;
        return;
    }
    this.requestPreviousConditions = null;
    this.updateRequested = false;
    this.slowUpdateRequested = false;
    this.pending = true;
    if (this.category === 0) {
        pendingPartyConditionUpdates += 1;
        refreshBuffsButtonAnimation();
        // log("Updating party conditions for " + this.index);
    }
    if (this.failureCount >= 2) {
        log("Failed too many condition updates. Giving up.");
        this.failedConditionUpdate = true;
        return;
    }
    doClientAjax(url, function (result, error, _url) {
        if (self.category === 0) {
            pendingPartyConditionUpdates -= 1;
            refreshBuffsButtonAnimation();
            self.maybeLogPartyConditions(result, error);
            areBuffTimersInvalid = true;
        }
        if (previousConditions) {
            previousConditions[self.id || id] = previousConditions;
            previousConditionsTimestamps[self.id || id] = pct;
        }
        self.timestamp = Date.now();
        self.pending = false;
        self.id = id;
        self.turn = turn;
        if (error) {
            self.failedConditionUpdate = true;
            self.failureCount += 1;
            log("Condition update failed", error);
        }
        // console.log("Update complete", result, error);
        if (result && !error) {
            self.state = result.condition;
            return;
        }
        self.state = self.emptySet;
    });
};
ConditionRecord.prototype.tick = function (id) {
    if (this.isUpdateNeeded(id))
        this.update(id);
};
function shouldBuffsButtonAnimate() {
    return (pendingPartyConditionUpdates > 0) ||
        currentConditions.party.some(function (e) {
            return e.updateRequested || e.slowUpdateRequested;
        });
}
;
function refreshBuffsButtonAnimation() {
    if (!refreshBuffsButton)
        return;
    var isAnimating = refreshBuffsButton.className.indexOf("spinning") >= 0;
    var shouldAnimate = shouldBuffsButtonAnimate();
    if (isAnimating === shouldAnimate)
        return;
    if (isAnimating) {
        refreshBuffsButton.addEventListener("animationiteration", function () {
            if (!shouldBuffsButtonAnimate())
                refreshBuffsButton.classList.remove("spinning");
        }, false);
    }
    else {
        refreshBuffsButton.classList.add("spinning");
    }
}
;
function maybeInvalidateEnemyConditions() {
    if (!combatState || !combatState.enemies)
        return;
    var enemies = combatState.enemies;
    var enemyCount = enemies.length;
    if (enemyCount <= 0)
        return;
    if (!previousConditions)
        previousConditions = {};
    if (!previousConditionsTimestamps)
        previousConditionsTimestamps = {};
    for (var i = 0, l = enemyCount; i < l; i++) {
        var enemy = enemies[i];
        var _previousConditions = previousConditions[enemy.id];
        var cce = currentConditions.enemy[i];
        if ((enemy.hp <= 0) || (enemy.conditions.length === 0)) {
            cce.reset(enemy.id);
            continue;
        }
        // FIXME: Unnecessarily slow
        enemy.conditions.sort();
        if (_previousConditions)
            _previousConditions.sort();
        var needsUpdate = false;
        if (!_previousConditions)
            needsUpdate = true;
        else if (!areArraysEqual(enemy.conditions, _previousConditions))
            needsUpdate = true;
        if (needsUpdate) {
            if (cce.updateRequested)
                continue;
            // HACK: Is this right?
            if (cce.pending) {
                cce.requestPreviousConditions = enemy.conditions;
                continue;
            }
            // HACK: Is this right either?
            if (areArraysEqual(enemy.conditions, cce.requestPreviousConditions))
                continue;
            /*
            log(
                "Requesting update because condition list changed\n",
                enemy.conditions.join(",") + "\n", _previousConditions ? _previousConditions.join(",") : "null"
            );
            */
            cce.requestPreviousConditions = enemy.conditions;
            cce.updateRequested = true;
        }
    }
}
;
function getExpiresWhen(timestamp, _remain) {
    var remainSeconds = 0;
    var remain = String(_remain);
    var colonOffset = remain.indexOf(":");
    if (colonOffset > 0) {
        var minutes = parseFloat(remain.substr(0, colonOffset));
        remainSeconds += minutes * 60;
        var seconds = parseFloat(remain.substr(colonOffset + 1));
        remainSeconds += seconds;
    }
    else {
        var seconds = parseFloat(remain);
        remainSeconds += seconds;
    }
    return timestamp + (remainSeconds * 1000);
}
;
function ConditionTableEntry(expiresWhen, name, status) {
    this.expiresWhen = expiresWhen;
    this.name = name;
    this.status = status;
    this.count = 1;
}
;
function _updateConditionDict(enemyIndex, enemyConditions, dict, now, dedupe, prefix) {
    var expiredCount = 0;
    for (var j = 0, l2 = enemyConditions.length; j < l2; j++) {
        var condition = enemyConditions[j];
        var key = prefix + condition.status;
        // Handle non-expiring buffs/debuffs like Treasure Hunt and ignore turn-based ones
        if (condition.remain <= 0 || condition.class !== "time")
            continue;
        var expiresWhen = getExpiresWhen(currentConditions.enemy[enemyIndex].timestamp, condition.remain);
        // Ignore expired debuffs
        if (expiresWhen <= now) {
            expiredCount++;
            continue;
        }
        var entry = new ConditionTableEntry(expiresWhen, condition.name, condition.status);
        if (dedupe) {
            var existing = dict.get(key);
            if (!existing || (existing.expiresWhen > expiresWhen)) {
                if (existing)
                    entry.count = existing.count + 1;
                dict.set(key, entry);
            }
            else if (existing)
                existing.count += 1;
        }
        else {
            dict.set(prefix + j, entry);
        }
    }
    return expiredCount;
}
;
function _updateConditionDictForEnemy(i, dict, now, dedupe) {
    var cc = currentConditions.enemy[i].state;
    if (!cc)
        return 0;
    var expiredCount = 0;
    if (cc.debuff && currentSettings.showDebuffTimers)
        expiredCount += _updateConditionDict(i, cc.debuff, dict, now, dedupe, "debuff");
    if (cc.buff && currentSettings.showBuffTimers)
        expiredCount += _updateConditionDict(i, cc.buff, dict, now, dedupe, "buff");
    return expiredCount;
}
;
var conditionDict = new Map();
var enemyPortrait = null;
function refreshConditionUI() {
    var now = Date.now();
    lastDebuffTimerUpdate = now;
    refreshFieldEffectUI();
    if (!areTimersEnabled() ||
        !combatState ||
        !combatState.enemies ||
        combatState.finish ||
        (currentConditions.enemy.length === 0)) {
        debuffTimerElement.style.opacity = 0.0;
        return;
    }
    var dict = conditionDict;
    dict.clear();
    var filter = (currentSettings.filterEnemyTimers &&
        (combatState.target > 0) &&
        (combatState.enemies[combatState.target - 1]) &&
        (combatState.enemies[combatState.target - 1].hp > 0));
    var targetEnemyIndex = combatState.target - 1;
    var remainingTargets = 0;
    var remainingTarget = 0;
    for (var i = 0; i < combatState.enemies.length; i++) {
        if (combatState.enemies[i] && combatState.enemies[i].hp > 0) {
            remainingTargets += 1;
            remainingTarget = i;
        }
    }
    if (remainingTargets === 1) {
        filter = true;
        targetEnemyIndex = remainingTarget;
    }
    var cce;
    var expiredCount;
    if (filter) {
        expiredCount = _updateConditionDictForEnemy(targetEnemyIndex, dict, now, false);
        cce = currentConditions.enemy[targetEnemyIndex];
        if (expiredCount && !cce.slowUpdateRequested) {
            // log("Requesting slow update because buffs have expired");
            cce.slowUpdateRequested = true;
        }
    }
    else {
        for (var i = 0, l = currentConditions.enemy.length; i < l; i++) {
            cce = currentConditions.enemy[i];
            expiredCount = _updateConditionDictForEnemy(i, dict, now, true);
            if (expiredCount && !cce.slowUpdateRequested) {
                // log("Requesting slow update because buffs have expired");
                cce.slowUpdateRequested = true;
            }
        }
    }
    if (dict.size <= 0) {
        debuffTimerElement.style.opacity = 0.0;
        if (debuffTimerElement.firstChild)
            debuffTimerElement.innerHTML = "";
        return;
    }
    else {
        debuffTimerElement.style.opacity = 1.0;
        // FIXME: Stop using innerHTML
        debuffTimerElement.innerHTML = "";
    }
    if (filter) {
        if (!enemyPortrait) {
            enemyPortrait = document.createElement("img");
            enemyPortrait.className = "enemy-portrait";
        }
        var newSrc = "http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/enemy/s/" +
            combatState.enemies[targetEnemyIndex].cjs.replace("enemy_", "") +
            ".png";
        if (newSrc != enemyPortrait.src)
            enemyPortrait.src = newSrc;
        debuffTimerElement.appendChild(enemyPortrait);
    }
    var entries = [];
    for (var _ of dict)
        entries.push(_[1]);
    entries.sort(function (lhs, rhs) {
        return lhs.expiresWhen - rhs.expiresWhen;
    });
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var debuffId = entry.status.trim();
        if (debuffId.length < 1)
            continue;
        var backgroundStyle = "url('http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/status/x64/status_" +
            debuffId +
            ".png')";
        var elt = document.createElement("div");
        elt.className = "debuff-timer";
        elt.style.backgroundImage = backgroundStyle;
        var expiresWhen = entry.expiresWhen;
        var actualSecondsLeft = (expiresWhen - now) / 1000;
        elt.textContent = actualSecondsLeft.toFixed(0);
        elt.style.opacity = "1.0";
        if (entry.count > 1) {
            elt.title = entry.name + " (x" + entry.count + ")";
        }
        else {
            elt.title = entry.name;
        }
        debuffTimerElement.appendChild(elt);
    }
}
;
function requestBuffsRefresh() {
    areBuffTimersInvalid = true;
    var ccp = currentConditions.party;
    for (var i = 0; i < ccp.length; i++) {
        var cc = ccp[i];
        cc.updateRequested = true;
    }
    refreshBuffsButtonAnimation();
}
;
function refreshPartyConditionUI() {
    if (!currentSettings.showPartyHelp)
        return;
    if (!combatState || !combatState.party)
        return;
    areBuffTimersInvalid = false;
    // log("Buff timers updating");
    var bte;
    if (!buffTimerElements)
        buffTimerElements = [];
    if (!refreshBuffsButton) {
        refreshBuffsButton = document.createElement("img");
        refreshBuffsButton.className = "refresh-buffs";
        refreshBuffsButton.src = getResourceUrl("refresh.png");
        refreshBuffsButton.title = "Refresh buffs";
        refreshBuffsButton.addEventListener("click", requestBuffsRefresh, false);
        injectElement(getRaidUiContainer(), refreshBuffsButton);
        refreshBuffsButtonAnimation();
    }
    for (var i = 0; i < combatState.party.length; i++) {
        var alreadyProcessed = new Set();
        var player = combatState.party[i];
        if (!player) {
            areBuffTimersInvalid = true;
            continue;
        }
        bte = buffTimerElements[i];
        if (!bte)
            buffTimerElements[i] = bte = getRaidUiContainer().querySelector("div.buff-timers[index='" + i + "']");
        if (!bte) {
            buffTimerElements[i] = bte = document.createElement("div");
            bte.className = "buff-timers";
            bte.setAttribute("index", i);
            var charElement = document.querySelector("div.lis-character" + i);
            if (!charElement) {
                areBuffTimersInvalid = true;
                continue;
            }
            bte.style.opacity = "0.0";
            injectElement(getRaidUiContainer(), bte);
            /*
            var pn = <HTMLElement>(charElement.parentNode);
            var statusPanel = pn.querySelector(".prt-status.prt-condition");
            // Open when timers are clicked
            */
        }
        bte.innerHTML = "";
        if (!refreshPlayerBuffTimers(player, i, bte, alreadyProcessed))
            areBuffTimersInvalid = true;
    }
}
;
function sortByRemainAscending(lhs, rhs) {
    if (!lhs || !rhs)
        return 0;
    if (lhs.remain < rhs.remain)
        return -1;
    else if (lhs.remain > rhs.remain)
        return 1;
    if (lhs.status < rhs.status)
        return -1;
    else if (lhs.status > rhs.status)
        return 1;
    return 0;
}
;
function refreshPlayerBuffTimers(player, index, bte, alreadyProcessed) {
    if (!currentConditions || !currentConditions.party)
        return false;
    var cc = currentConditions.party[index];
    if (!cc)
        return false;
    cc = cc.state;
    if (cc.buff)
        cc.buff.sort(sortByRemainAscending);
    if (cc.debuff)
        cc.debuff.sort(sortByRemainAscending);
    if (cc.buff && false)
        log("refresh " + index, cc.buff.map(function (e) {
            return e.detail;
        }));
    processSpecialBuffs(player, cc, bte, alreadyProcessed);
    if (!cc.buff)
        return true;
    var previousStatus = null, previousRemain = null, previousElt = null;
    var n = bte.children.length;
    for (var i = 0, l = cc.buff.length; i < l; i++) {
        var buff = cc.buff[i];
        if (!buff.remain) {
            previousStatus = null;
            previousRemain = null;
            continue;
        }
        if (alreadyProcessed.has(buff))
            continue;
        var elt = makeBuffTimer(buff);
        if ((buff.status === previousStatus) &&
            (buff.remain === previousRemain)) {
            elt.title = previousElt.title + "\r\n" + elt.title;
            previousElt.className += " stacked";
            previousElt.title = "";
            previousElt.setAttribute("remain", "");
            n--;
        }
        previousStatus = buff.status;
        previousRemain = buff.remain;
        previousElt = elt;
        if (n < 4)
            bte.appendChild(elt);
        n++;
    }
    return true;
    // console.log(cc.buff.map(function (x) { return x.remain + " " + x.detail; }).join(","));
}
;
var characterSpecialBuffHandlers = {
    // Beatrix
    "3040070000": processSpecialBuffs_Beatrix
};
function processSpecialBuffs(player, cc, bte, alreadyProcessed) {
    processSpecialBuffs_Phalanx(player, cc, bte, alreadyProcessed);
    var handler = characterSpecialBuffHandlers[player.pid];
    if (handler)
        handler(player, cc, bte, alreadyProcessed);
}
;
function makeBuffTimer(obj, statusOverride) {
    var elt = document.createElement("div");
    elt.className = "buff-timer";
    elt.title = obj.detail;
    elt.style.backgroundImage = "url('" +
        "http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/status/x64/status_" +
        (statusOverride || obj.status) + ".png')";
    elt.setAttribute("remain", obj.remain);
    return elt;
}
;
/* http://game-a.granbluefantasy.jp/assets_en/img/sp/ui/icon/ability/m/37_3.png?1475811018 */
function processSpecialBuffs_Phalanx(player, cc, bte, alreadyProcessed) {
    if (!cc.buff)
        return;
    var phalanx = cc.buff.find(function (elt) {
        return (elt.status === "1019_0_70") || (elt.status === "1019_0_100");
    });
    var athena = cc.buff.find(function (elt) {
        return (elt.status === "1019_0_30") || (elt.status === "1019_0_100");
    });
    if (!phalanx)
        return;
    alreadyProcessed.add(phalanx);
    if (athena && (athena !== phalanx))
        alreadyProcessed.add(athena);
    var icon = makeBuffTimer(phalanx, athena
        ? "1019_0_100"
        : null);
    icon.className += " phalanx";
    icon.title = athena ? "100% cut" : "70% cut";
    bte.appendChild(icon);
}
;
var beatrixClocks = {
    "14701": "Nayde Null",
    "14702": "Nayde Neli",
    "14703": "Nayde Seitse",
};
function processSpecialBuffs_Beatrix(player, cc, bte, alreadyProcessed) {
    if (!cc.buff)
        return;
    var currentClock = cc.buff.find(function (elt) {
        return (elt.remain === 0) &&
            !!beatrixClocks[elt.status];
    });
    if (!currentClock)
        return;
    alreadyProcessed.add(currentClock);
    var clockIcon = makeBuffTimer(currentClock);
    clockIcon.className += " special-buff";
    clockIcon.title = beatrixClocks[currentClock.status];
    cc.buff.forEach(function (elt) {
        if ((elt.status === currentClock.status) && (elt.remain === 1)) {
            alreadyProcessed.add(elt);
            clockIcon.title += "\r\n" + elt.detail;
        }
    });
    bte.appendChild(clockIcon);
}
;
var isFieldEffectUpdateInProgress = false;
var lastFieldEffectUpdateWhen = 0;
function getFieldEffectReadout(cfe, remainingMs, remainingText) {
    if ((cfe.status !== "5004") && (cfe.status !== "5004_02"))
        return "";
    var tiers;
    if (cfe.status === "5004_02") {
        tiers = [
            [120 + 45, 15],
            [120 + 35, 50],
            [120 + 15, 20],
            [120 + 5, 75],
            [60 + 50, 25],
            [60 + 36, 100],
            [60 + 20, 30],
            [60, 10],
            [45, 5],
            [30, 20],
            [20, 10],
            [5, 30]
        ];
    }
    else {
        tiers = [
            [120 + 45, 10],
            [120 + 35, 5],
            [120 + 15, 20],
            [120 + 5, 10],
            [60 + 50, 30],
            [60 + 35, 15],
            [60 + 20, 50],
            [60, 20],
            [45, 75],
            [30, 25],
            [20, 100],
            [5, 30]
        ];
    }
    var percentage = 10;
    var remainingSecs = remainingMs / 1000;
    for (var i = 0; i < tiers.length; i++) {
        if (remainingSecs >= tiers[i][0]) {
            percentage = tiers[i][1];
            break;
        }
    }
    return percentage + "%";
}
;
function refreshFieldEffectUI() {
    if (!currentSettings.showFieldEffectTimers)
        return;
    var now = Date.now();
    var canUpdateFieldEffects = (now - lastFieldEffectUpdateWhen) >= 12500;
    if (isFieldEffectUpdatePending &&
        !isFieldEffectUpdateInProgress &&
        canUpdateFieldEffects) {
        isFieldEffectUpdatePending = false;
        lastFieldEffectUpdateWhen = now;
        var prefix;
        if (combatState.is_semi) {
            prefix = "/rest/semiraid";
        }
        else if (combatState.is_multi) {
            prefix = "/rest/multiraid";
        }
        else {
            prefix = "/rest/raid";
        }
        isFieldEffectUpdateInProgress = true;
        var url = prefix + "/field_effect/" + combatState.raid_id;
        // log("Updating field effects");
        doClientAjax(url, function (result, error, _url) {
            isFieldEffectUpdateInProgress = false;
            refreshFieldEffectUI();
        });
        return;
    }
    if (!currentFieldEffects ||
        (currentFieldEffects.length === 0)) {
        if (fieldEffectsPanel)
            fieldEffectsPanel.style.display = "none";
        return;
    }
    if (!fieldEffectsPanel) {
        fieldEffectsPanel = document.createElement("div");
        fieldEffectsPanel.className = "field-effects";
        injectElement(getRaidUiContainer(), fieldEffectsPanel);
    }
    else {
        fieldEffectsPanel.style.display = "block";
    }
    fieldEffectsPanel.innerHTML = "";
    for (var i = 0, l = currentFieldEffects.length; i < l; i++) {
        var cfe = currentFieldEffects[i];
        if (!cfe)
            continue;
        var remaining = cfe.expiresWhen - now;
        if (remaining <= 0) {
            currentFieldEffects[i] = null;
            if (!isFieldEffectUpdatePending) {
                // log("Field effect expired so scheduling update");
                isFieldEffectUpdatePending = true;
            }
            continue;
        }
        var remainingText = Math.floor(remaining / 1000) + "s";
        var elt = document.createElement("div");
        elt.className = "field-effect";
        elt.title = cfe.detail + " (" + remainingText + ")";
        elt.setAttribute("readout", getFieldEffectReadout(cfe, remaining, remainingText));
        var icon = document.createElement("img");
        icon.className = "icon";
        icon.src = "http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/field_effect/status_" + cfe.status + ".png";
        var fill = document.createElement("div");
        fill.className = "fill";
        fill.style.width = (remaining / cfe.originalDuration * 100).toFixed(2) + "%";
        elt.appendChild(fill);
        elt.appendChild(icon);
        fieldEffectsPanel.appendChild(elt);
    }
}
;
//# sourceMappingURL=conditions.js.map