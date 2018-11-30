export class QuestNameList {
    private rawDict: Map<string, { Quests: Array<number>, Name: Array<string> }> = new Map();
    private zippedDict: Map<number, string>
    loadMissionQuestDict(dict: Array<{ MissionID: number, QuestID: number }>) {
        const reduce = {};
        dict.forEach(pair => {
            if (reduce[pair.MissionID]) {
                reduce[pair.MissionID].push[pair.QuestID];
            } else {
                reduce[pair.MissionID] = [pair.QuestID];
            }
        })
        Object.keys(reduce).forEach(mission => {
            if (this.rawDict.get(mission)) {
                this.rawDict.get(mission).Quests = reduce[mission];
            } else {
                this.rawDict.set(mission, { Quests: reduce[mission], Name: [] });
            }
            this.tryZip(mission);
        })
    }
    loadQuestNames(sign: string, dict: Array<string>) {
        const match = /QuestNameText(\d+)\.atb/.exec(sign);
        if (match) {
            const mission = match[1];
            if (this.rawDict.get(mission)) {
                this.rawDict.get(mission).Name = dict;
            } else {
                this.rawDict.set(mission, { Quests: [], Name: dict });
            }
            this.tryZip(mission);
        }
    }
    tryZip(mission: string) {
        const info = this.rawDict.get(mission);
        if (info.Quests.length > 0 && info.Name.length === info.Quests.length) {
            for (let i = 0; i < info.Quests.length; ++i) {
                this.zippedDict.set(info.Quests[i], info.Name[i]);
            }
        }
    }
    getQuestName(id: number) {
        return this.zippedDict.get(id);
    }
}
