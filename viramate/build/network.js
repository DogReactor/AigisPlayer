var chatStampTable = null;
var isActionInProgress = false;
var isActionAnimating = false;
var hasAnActionSucceeded = false;
var lastActionStartedWhen = 0, lastSuccessfulActionStartedWhen = 0;
var nextActionId = Math.floor(Math.random() * 102400), currentActionId = null, previousActionId = null;
var lastEnhancementMaterials = {};
// 0-5 absolute party index
var lastPartyFormation = null;
// in start.json: 0-5 absolute party index
var lastPartyParam = null;
var lastPartyAbilityState = null;
var lastRaidStartData = null;
var isPartyStateRemote = false;
function onAjaxBegin(url, requestData, uid) {
    // console.log("ajax start", url, data);
    try {
        networkRequestCount++;
        networkRequestTotal++;
        updateNetworkHud();
    }
    catch (exc) {
        log(exc);
    }
    if (url.indexOf("/quest/create_quest") >= 0) {
        if (typeof (requestData) === "string")
            requestData = JSON.parse(requestData);
        var isCoOp = false;
        // HACK: This should stop us from recording co-op quests as recent quests
        if (requestData.quest_type === 7) {
            isCoOp = true;
        }
        if (!requestData.supporter_user_id) {
            // console.log("Not recording quest because it disallows support summons");
            return;
        }
        // hack for gw quests since they use the event hash prefix instead of quest
        var hash = window.location.hash;
        requestData.prefix = "/" + hash.split("/supporter")[0];
        if (isCoOp) {
            sendExtensionMessage({
                type: "setRecentCoOpHost",
                data: JSON.stringify(requestData)
            });
        }
        else {
            sendExtensionMessage({
                type: "setRecentQuest",
                url: JSON.stringify(requestData)
            });
        }
        return;
    }
    else if (url.indexOf("/normal_attack_result.json") >= 0) {
        onActionBegin(uid);
        onNormalAttackBegin();
        return;
    }
    else if (url.indexOf("/summon_result.json") >= 0) {
        onActionBegin(uid);
        onSummonBegin();
        return;
    }
    else if (url.indexOf("/ability_result.json") >= 0) {
        onActionBegin(uid);
        if (typeof (requestData) === "string")
            requestData = JSON.parse(requestData);
        if (!requestData.ability_id) {
            log("Skill activation has no ability id", requestData);
            return;
        }
        onAbilityCastStart(requestData.ability_id);
    }
    else if (url.indexOf("/user_recovery.json") >= 0) {
        onActionBegin(uid);
        return;
    }
    else if (url.indexOf("multiraid/start.json") >= 0) {
        // log("Raid started, invalidating raids list");
        if (invalidateRaidList)
            invalidateRaidList();
    }
    else if (url.indexOf("quest/decks_info/") >= 0) {
        lastDecksInfoUrl = url;
    }
    else if ((url.indexOf("result/data") >= 0) ||
        (url.indexOf("resultmulti/data") >= 0)) {
        // HACK
        hasLoadedQuestResults = true;
    }
}
;
function onAjaxComplete(bundle) {
    //console.log("ajax end  ", url);
    // on other pages /user/status is used to get the current status ->
    //  data.status
    // on the home page, it is bundled into /user/data_assets ->
    //  data.mydata.status
    var url = bundle.url;
    var requestData = bundle.requestData;
    var responseData = bundle.responseData;
    var uid = bundle.uid;
    try {
        var historyLength = 10;
        networkRequestCount--;
        networkDelayHistory.push(bundle.delay);
        networkDurationHistory.push(bundle.duration);
        if (networkDelayHistory.length > historyLength)
            networkDelayHistory.shift();
        if (networkDurationHistory.length > historyLength)
            networkDurationHistory.shift();
        updateNetworkHud();
    }
    catch (exc) {
        log(exc);
    }
    if ((typeof (requestData) === "string") && requestData) {
        try {
            requestData = JSON.parse(requestData);
        }
        catch (exc) {
        }
    }
    if ((typeof (responseData) === "string") && responseData) {
        try {
            responseData = JSON.parse(responseData);
        }
        catch (exc) {
        }
    }
    if (responseData && responseData.redirect) {
        log("Got redirect as response for " + url);
        return;
    }
    if (url.indexOf("/quest/create_quest") >= 0) {
        var questId = requestData.quest_id;
        var raidId = responseData.raid_id;
        sendExtensionMessage({ type: "recordRaidInfo", uid: uid, raidId: raidId, questId: questId });
        // HACK
        hasAnActionSucceeded = true;
        // console.log("create_quest", JSON.stringify(requestData), JSON.stringify(responseData));
    }
    else if (url.indexOf("/user/data_assets") >= 0) {
        if (responseData && responseData.mydata && responseData.mydata.status) {
            lastPlayerStatus = responseData.mydata.status;
            parseUserStatus(responseData.mydata.status, uid);
        }
    }
    else if (url.indexOf("/user/status") >= 0) {
        if (responseData) {
            lastPlayerStatus = responseData.status;
            parseUserStatus(responseData.status, uid);
        }
    }
    else if ((url.indexOf("/quest/content/newindex/") >= 0) ||
        (url.indexOf("/quest/content/newassist/") >= 0) ||
        (url.indexOf("/coopraid/content/index/") >= 0) ||
        (url.indexOf("/coopraid/content/room/") >= 0)) {
        if (responseData) {
            lastPlayerStatus = responseData.option.user_status;
            parseUserStatus(lastPlayerStatus, uid);
        }
    }
    else if (url.indexOf("/user/content/index") >= 0) {
        if (responseData) {
            lastPlayerStatus = responseData.option.mydata_assets.mydata.status;
            parseUserStatus(lastPlayerStatus, uid);
        }
    }
    else if (url.indexOf("/profile/content/index/" + uid) > 0) {
        if (responseData)
            parseProfile(responseData.data, uid);
    }
    else if (url.indexOf("item/normal_item_list/") > 0) {
        parseItemList(responseData, uid);
    }
    else if (url.indexOf("/normal_attack_result.json") >= 0) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        try {
            onActionResult(responseData, uid, failed);
        }
        finally {
            if ((typeof (responseData) === "object") && ("popup" in responseData)) {
                onNormalAttackFail();
            }
            else {
                onNormalAttackEnd();
            }
        }
        return;
    }
    else if (url.indexOf("/ability_result.json") >= 0) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        try {
            onActionResult(responseData, uid, failed);
        }
        finally {
            var abilityId = requestData.ability_id;
            if (!abilityId) {
                log("Skill activation has no ability id", requestData);
                return;
            }
            if (failed) {
                onAbilityCastFail(abilityId, responseData && responseData.popup ? responseData.popup.body : "unknown");
                return;
            }
            onAbilityCastEnd(abilityId);
        }
        return;
    }
    else if (url.indexOf("/summon_result.json") >= 0) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        onActionResult(responseData, uid, failed);
    }
    else if ((url.indexOf("/user_recovery.json") >= 0) ||
        (url.indexOf("/temporary_item_result.json") >= 0)) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        try {
            onActionResult(responseData, uid, failed);
        }
        finally {
            // HACK: If someone like bea is in front and then an elixir pushes her to the back,
            //  her clock buff would remain visible without this
            requestBuffsRefresh();
        }
    }
    else if (url.indexOf("quest/assist_list/0") >= 0) {
        if (invalidateRaidList)
            invalidateRaidList(responseData);
        if (doUpdateRaidsPanel)
            doUpdateRaidsPanel(responseData);
        return;
    }
    else if (url.indexOf("/guild_main/support_all_info/") >= 0) {
        if (doUpdateGuildSupportBuffs)
            doUpdateGuildSupportBuffs(responseData);
        return;
    }
    else if (url.indexOf("/shop_exchange/activated_personal_supports/") >= 0) {
        if (doUpdatePersonalSupportBuffs)
            doUpdatePersonalSupportBuffs(responseData);
        return;
    }
    else if (url.indexOf("/shop_exchange/activate_personal_support") >= 0) {
        if (invalidateSupportBuffs)
            invalidateSupportBuffs();
        return;
    }
    else if ((url.indexOf("item/article_list") >= 0) ||
        (url.indexOf("item/article_list_by_filter_mode") >= 0)) {
        mostRecentItems = responseData;
        if (invalidateItems)
            invalidateItems(responseData);
        if (doUpdateItemsPanel)
            doUpdateItemsPanel(responseData);
        if (showItemWatchButtons) {
            var siwb = showItemWatchButtons;
            showItemWatchButtons = null;
            siwb();
        }
        return;
    }
    else if ((url.indexOf("present/receive") >= 0) ||
        (url.indexOf("coopraid/exchange") >= 0) ||
        (url.indexOf("shop_exchange/purchase") >= 0) ||
        (url.indexOf("evolution_npc/item_evolution") >= 0) ||
        (url.indexOf("weapon_purchase") >= 0)) {
        if (invalidateItems)
            invalidateItems();
    }
    else if ((url.indexOf("result/data") >= 0) ||
        (url.indexOf("resultmulti/data") >= 0)) {
        parseQuestResult(url, responseData, uid);
    }
    else if (url.indexOf("quest/check_multi_start") >= 0) {
        // HACK: This always has both the quest and raid ID.
        // console.log("check_multi_start", requestData, responseData);
        sendExtensionMessage({ type: "recordRaidInfo", uid: uid, raidId: requestData.raid_id, questId: requestData.quest_id });
    }
    else if (url.indexOf("raid/start.json") >= 0) {
        serverSkillState = null;
        if (responseData) {
            // TODO: Timestamp of request start instead of end?
            raidStateTimestamp = Date.now();
            lastRaidStartData = responseData;
            lastPartyFormation = responseData.formation;
            lastPartyParam = responseData.player.param;
            lastPartyAbilityState = responseData.ability;
            currentFieldEffectsTimestamp = 0;
            currentFieldEffects = null;
            if (responseData.field_effect && responseData.field_effect.length) {
                if (!isFieldEffectUpdatePending)
                    log("Updating field effects because raid start said we have some");
                isFieldEffectUpdatePending = true;
            }
            if (responseData.chat)
                chatStampTable = responseData.chat[9999];
            parseServerPlayerState(true);
        }
        // console.log("Raid start", requestData, responseData);
    }
    else if (url.indexOf("/decks_info/") >= 0) {
        if (responseData && responseData.decks)
            showDeckNames(responseData.decks);
    }
    else if (url.indexOf("/deck_combination_list/") >= 0) {
        if (responseData && responseData.list)
            showDeckNames(responseData.list);
    }
    else if (url.indexOf("quest/extra_normal_quest") >= 0) {
        if (!responseData || !responseData.quest_list)
            return;
        sendExtensionMessage({ type: "updateExtraNormalQuests", uid: uid, quests: responseData.quest_list.group });
    }
    else if (url.indexOf("/multi_member_info") >= 0) {
        if (!responseData)
            return;
        currentPointStandings = responseData.mvp_info;
        if (isRemoteConnected)
            sendExternalMessage({
                type: "sendToRemote",
                data: {
                    type: "standingsChanged",
                    standings: responseData.mvp_info
                }
            });
    }
    else if (url.indexOf("/party/deck") >= 0) {
        if (responseData && responseData.deck)
            mostRecentDeck = responseData.deck;
        else
            mostRecentDeck = null;
    }
    else if (url.indexOf("raid/field_effect/") >= 0) {
        currentFieldEffectsTimestamp = Date.now();
        currentFieldEffects = responseData;
        if (!responseData)
            return;
        for (var i = 0; i < responseData.length; i++) {
            var cfe = responseData[i];
            if (cfe.class === "time") {
                cfe.originalDuration = getExpiresWhen(0, cfe.remain);
                // HACK
                var minDuration = (3 * 60 * 1000);
                if (cfe.originalDuration < minDuration)
                    cfe.originalDuration = minDuration;
                cfe.expiresWhen = getExpiresWhen(currentFieldEffectsTimestamp, cfe.remain);
            }
        }
    }
    else if (url.indexOf("/enhancement_materials/") >= 0) {
        if (!responseData || !responseData.options || !responseData.list)
            return;
        if (currentSettings.detailedUpgradePage)
            processUpgradeData(responseData.list, responseData.options.status_name);
    }
    else {
        // console.log("ajax", url, requestData, responseData);
    }
}
;
function onWebSocketMessage(data) {
    var offset = data.indexOf("[");
    if (offset < 0)
        return;
    var bundle = JSON.parse(data.substr(offset));
    if (bundle[0] !== "raid")
        return;
    var packets = bundle[1];
    for (var k in packets) {
        if (!packets.hasOwnProperty(k))
            continue;
        onRaidPacket(k, packets[k]);
    }
}
;
function onRaidPacket(name, packet) {
    switch (name) {
        case "battleFinish":
            if (luckyDay)
                return;
            if (!currentSettings.autoSkipToRaidResults)
                return;
            if (combatState) {
                log("Battle finished, checking for results...");
                // force an update to prevent the debuff panel/skill queue from sticking
                combatState.finish = true;
                refreshConditionUI();
                var raidId = combatState.raid_id;
                var url = window.location.href;
                if (suppressAutoSkip) {
                    log("Another window is already navigating to the results screen.");
                    return;
                }
                autoSkipInProgress = true;
                window.setTimeout(function () { checkForBattleResults(raidId, 1000, 0, url); }, 2900);
            }
            break;
        case "bossUpdate":
            // packet.param.bossN_mode_gauge
            break;
        case "bossKill":
            break;
        case "bossRecast":
            // Boss gauge changed?
            log("Got bossRecast packet", packet);
            break;
        case "memberJoin":
        // HACK: Fall-through because this also has an mvp list
        case "mvpUpdate":
        case "mvpReset":
            currentPointStandings = packet.mvpList;
            // FIXME: How are these different?
            if (isRemoteConnected)
                sendExternalMessage({
                    type: "sendToRemote",
                    data: {
                        type: "standingsChanged",
                        standings: packet.mvpList
                    }
                });
            break;
        case "chatAdd":
            parseChatMessage(packet);
            break;
        case "logAdd":
            parseLogMessage(packet);
            break;
        case "userCondition":
            parseUserConditionMessage(packet);
            break;
        case "userParam":
            log("got userParam packet");
            // Raid player HP update, apparently? Bizarre.
            /*
                {
                    timestamp: "n.n",
                    member: [obj, obj, obj, obj],
                    membersParams: {
                        user_id: [obj, obj, obj, ...],
                        user_id: [obj, obj, obj, ...]
                    }
                }

                member {
                    hp_ratio: [0-100],
                    nickname: "...",
                    pc_attribute: [0-6],
                    pc_image: "...",
                    pc_image_original: "...",
                    user_id: "n",
                    viewer_id: "m"
                }

                membersParamsElt {
                    num: [0-5],
                    param: {
                        hp: n,
                        hpmax: n
                    }
                }
            */
            break;
        case "logPop":
            // What is this?
            break;
        case "battleLose":
            // A player died
            break;
        case "battleRematch":
            // A player rejoined?
            break;
        case "summonUpdate":
            // Another player used a summon (that you can cross?)
            break;
        case "scenarioPlay":
            // Boss HP triggers??
            log("got scenarioPlay packet", packet);
            break;
        case "bgmPlay":
            // log(name, packet);
            break;
        case "fieldEffect":
            // Field effect changed?
            isFieldEffectUpdatePending = true;
            break;
        default:
            log(name, packet);
            break;
    }
}
;
var estimatedRpToNextRank = null;
function parseQuestResult(url, data, uid) {
    hasLoadedQuestResults = true;
    estimatedRpToNextRank = null;
    var searchItemId;
    var searchItemPredicate = function (item) {
        return item.item_id == searchItemId;
    };
    var addItem = function (id, count, name) {
        searchItemId = id;
        var itemInfo = findItemInfo(searchItemPredicate);
        if (!itemInfo) {
            log("Couldn't find item '" + id + "' in items table");
            return;
        }
        itemInfo.number = String(Number(itemInfo.number) +
            Number(count));
        log(name + " += " + count + " -> " + itemInfo.number);
    };
    if (mostRecentItems && data && data.rewards) {
        var rewards = data.rewards;
        for (var k in rewards.article_list) {
            var obj = rewards.article_list[k];
            addItem(obj.id, obj.count, obj.name);
        }
        for (var k in rewards.reward_list) {
            var sublist = rewards.reward_list[k];
            for (var k2 in sublist) {
                var obj = sublist[k2];
                if ((obj.type === "weapon") ||
                    (obj.type === "summon"))
                    continue;
                addItem(obj.id, obj.count || 1, obj.name);
            }
        }
        if (invalidateItems)
            invalidateItems(mostRecentItems);
    }
    else if (invalidateItems) {
        invalidateItems();
    }
    if (isRemoteConnected)
        sendExternalMessage({
            type: "sendToRemote",
            data: {
                type: "questResult",
                data: data
            }
        });
    var msg = {
        type: "recordRewards",
        uid: uid, url: url,
        response: data
    };
    sendExtensionMessage(msg);
    if (!(data && data.values && data.values.pc))
        return;
    if (!currentSettings.showNextRankExp)
        return;
    var param = data.values.pc.param;
    var gainedExp = (param.new.exp - Number(param.base.exp));
    estimatedRpToNextRank = param.remain_next_exp - gainedExp;
    var rankup = document.querySelector("div.prt-player-exp div.prt-rankup");
    if (!rankup)
        return;
    if (estimatedRpToNextRank <= 0)
        return;
    var textNode = document.createTextNode("Next in " + estimatedRpToNextRank);
    rankup.appendChild(textNode);
}
;
function onActionBegin(uid) {
    // HACK
    isActionInProgress = true;
    var now = Date.now();
    lastActionStartedWhen = now;
    currentActionId = currentBattleTabId + ":" + nextActionId++;
    sendExtensionMessage({
        type: "actionStarted", uid: uid,
        when: now, actionId: currentActionId
    });
}
;
function onActionResult(data, uid, failed) {
    isActionInProgress = false;
    if (!failed) {
        hasAnActionSucceeded = true;
        lastSuccessfulActionStartedWhen = lastActionStartedWhen;
        isActionAnimating = true;
    }
    else {
        isActionAnimating = false;
        if (isRemoteConnected)
            sendExternalMessage({
                type: "sendToRemote",
                data: {
                    type: (data && data.scenario &&
                        data.scenario[0] && (data.scenario[0].cmd === "finished"))
                        ? "battleEnded"
                        : "actionFailed",
                    data: data,
                    uid: uid
                }
            });
    }
    var now = Date.now();
    sendExtensionMessage({
        type: "actionEnded", succeeded: !failed,
        when: now, uid: uid,
        actionId: currentActionId
    });
    // HACK to ensure we update after reviving the party
    window.requestAnimationFrame(function () {
        partyStateIsDirty = true;
    });
    if (!data)
        return;
    var shouldPush = false;
    raidStateTimestamp = Date.now();
    if (data.status) {
        if (data.status.ability)
            lastPartyAbilityState = data.status.ability;
        if (data.status.formation)
            lastPartyFormation = data.status.formation;
        // TODO: Record summon status
        shouldPush = true;
    }
    if (!data.scenario) {
        if (shouldPush && !failed)
            parseServerPlayerState(true);
        return;
    }
    for (var i = 0, l = data.scenario.length; i < l; i++) {
        var cmd = data.scenario[i];
        switch (cmd.cmd) {
            case "condition":
                if (cmd.to === "field_effect") {
                    if ((cmd.condition.length > 0) && ((!currentFieldEffects) ||
                        (currentFieldEffects.length !== cmd.condition.length))) {
                        isFieldEffectUpdatePending = true;
                    }
                    continue;
                }
                break;
            case "super":
                showTransientMessage(cmd.name);
                if (isRemoteConnected)
                    sendExternalMessage({
                        type: "sendToRemote",
                        data: {
                            type: "enemyUsedSuper",
                            name: cmd.name,
                            kind: cmd.kind,
                            target: cmd.target,
                            pos: cmd.pos,
                            attr: cmd.attr
                        }
                    });
                break;
            case "replace":
                log("Party member replaced at position " + cmd.pos + " with party member #" + cmd.npc);
                break;
            case "damage":
            case "heal":
                if (cmd.to === "player") {
                    for (var j = 0; j < cmd.list.length; j++) {
                        var damage = cmd.list[j];
                        var pos = damage.pos;
                        var characterIndex = lastPartyFormation[pos];
                        if (!characterIndex)
                            continue;
                        var characterParam = lastPartyParam[characterIndex];
                        if (!characterParam)
                            continue;
                        characterParam.hp = damage.hp;
                    }
                    shouldPush = true;
                }
                break;
            case "recast":
                if (cmd.to === "player") {
                    var pos = cmd.pos;
                    var characterIndex = lastPartyFormation[pos];
                    if (!characterIndex)
                        continue;
                    var characterParam = lastPartyParam[characterIndex];
                    if (!characterParam)
                        continue;
                    characterParam.recast = cmd.value;
                    shouldPush = true;
                }
                break;
        }
        // TODO: Handle 'replace' and update front row params
        // TODO: Handle 'formchange' and update party params
        // TODO: Handle 'damage' and update party hp
        if (cmd.cmd !== "message")
            continue;
        if (!cmd.data)
            continue;
        for (var to in cmd.data) {
            if (!cmd.data.hasOwnProperty(to))
                continue;
            var list = cmd.data[to];
            for (var j = 0, l2 = list.length; j < l2; j++) {
                var group = list[j];
                for (var k = 0, l3 = group.length; k < l3; k++) {
                    var message = group[k];
                    if (!message.status)
                        continue;
                    if (!currentConditions)
                        return;
                    var cc = null;
                    switch (to) {
                        case "boss":
                            cc = currentConditions.enemy[message.pos];
                            break;
                        case "player":
                            cc = currentConditions.party[message.pos];
                            break;
                    }
                    if (!cc)
                        return;
                    if (cmd.to === "boss") {
                        if (!cc.updateRequested) {
                            // log("Requesting condition update because player action applied a condition");
                            cc.updateRequested = true;
                        }
                    }
                    else {
                        if (!cc.updateRequested) {
                            // log("Requesting condition update because player action applied a condition");
                            cc.updateRequested = true;
                            refreshBuffsButtonAnimation();
                        }
                    }
                }
            }
        }
    }
    if (shouldPush && !failed)
        parseServerPlayerState(true);
}
;
var networkRequestCount = 0;
var networkRequestTotal = 0;
var networkDelayHistory = [];
var networkDurationHistory = [];
var needToShowNetworkHud = true;
var hideNetworkHudTimeoutHandle = null;
var networkHudElement = null;
function updateNetworkHud() {
    if (!currentSettings.showNetworkHud) {
        networkDelayHistory.length = 0;
        networkDurationHistory.length = 0;
        return;
    }
    var now = performance.now();
    var uic = getUiContainer();
    if (!networkHudElement) {
        networkHudElement = document.createElement("div");
        networkHudElement.className = "network-hud";
        networkHudElement.style.opacity = 0.0;
        if (currentSettings.hideMobageSidebar)
            networkHudElement.style.right = "0px";
        else
            networkHudElement.style.left = "0px";
        injectElement(uic, networkHudElement);
        setTimeout(function () {
            networkHudElement.style.opacity = 1.0;
        }, 5);
    }
    else if (needToShowNetworkHud) {
        networkHudElement.style.opacity = 1.0;
        needToShowNetworkHud = false;
    }
    var minDelay = 999999, maxDelay = 0, delaySum = 0;
    var minDuration = 999999, maxDuration = 0, durationSum = 0;
    for (var i = 0, l = networkDelayHistory.length; i < l; i++) {
        var delay = networkDelayHistory[i];
        var duration = networkDurationHistory[i];
        minDelay = Math.min(minDelay, delay);
        maxDelay = Math.max(maxDelay, delay);
        delaySum += delay;
        minDuration = Math.min(minDuration, duration);
        maxDuration = Math.max(maxDuration, duration);
        durationSum += duration;
    }
    var avgDelay = delaySum / networkDelayHistory.length;
    var avgDuration = durationSum / networkDurationHistory.length;
    if (networkDelayHistory.length <= 0)
        avgDelay = 0;
    if (networkDurationHistory.length <= 0)
        avgDuration = 0;
    var html = "";
    var numDots = 9;
    for (var i = 0; i < numDots; i++) {
        if (i < networkRequestCount)
            html += "\u2022";
        else
            html += "&nbsp;";
    }
    html +=
        "<br>" +
            "wait " + (maxDelay / 1000).toFixed(2) + "<br>" +
            "&nbsp;avg " + (avgDelay / 1000).toFixed(2) + "<br>" +
            "dur &nbsp;" + (maxDuration / 1000).toFixed(2) + "<br>" +
            "&nbsp;avg " + (avgDuration / 1000).toFixed(2);
    networkHudElement.innerHTML = html;
    if (hideNetworkHudTimeoutHandle)
        clearTimeout(hideNetworkHudTimeoutHandle);
    hideNetworkHudTimeoutHandle = setTimeout(hideNetworkHud, 5000);
}
;
function hideNetworkHud() {
    if (!networkHudElement)
        return;
    // networkTimingHistory.length = 0;
    networkHudElement.style.opacity = 0.5;
    needToShowNetworkHud = true;
}
;
function parseChatMessage(packet) {
    if (packet && packet.commentData && packet.commentData.isStamp) {
        var stampImageName = packet.commentData.content;
        // HACK: Phalanx sticker
        if (stampImageName === "stamp19.png")
            schedulePartyBuffCheck("phalanx sticker");
    }
}
;
function parseLogMessage(packet) {
    // "{"timestamp":"1484328461.53431900","log":[{"viewer_id":"125380620","user_id":"10777899","comment":{"ja":"[02:27] Kateのパーティが攻撃<br><span class=\"red\">→117908ダメージを与えた！</span>","en":"[02:27] Kate's party attacked!<br><span class=\"red\">117908 damage!</span>"},"type":1}]}"
    for (var i = 0, l = packet.log.length; i < l; i++) {
        var entry = packet.log[i];
        if ((entry.comment.en && (entry.comment.en.indexOf("Phalanx") >= 0)) ||
            (entry.comment.ja && (entry.comment.ja.indexOf("ファランクス") >= 0))) {
            schedulePartyBuffCheck("phalanx message");
            return;
        }
    }
}
;
function parseUserConditionMessage(packet) {
    if (!packet || !packet.membersConditions)
        return;
    var conditions = packet.membersConditions[currentBattleUid];
    if (!conditions)
        return;
    window.setTimeout(function () {
        schedulePartyBuffCheck("raid event");
    }, 500);
}
;
function schedulePartyBuffCheck(reason) {
    if (!currentSettings.showPartyHelp)
        return;
    for (var i = 0; i < currentConditions.party.length; i++) {
        var cc = currentConditions.party[i];
        cc.updateRequested = true;
        refreshBuffsButtonAnimation();
    }
    if (reason)
        log("Scheduled party buff check because of " + reason);
}