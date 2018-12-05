export class QuestNameList {
    private rawDict: Map<string, { Quests: Array<number>, Name: Array<string> }> = new Map();
    private id2title: Map<number, number> = new Map();
    private zippedDict: Map<number, string> = new Map();
    loadMissionQuestDict(dict: Array<{ MissionID: number, QuestID: number }>) {
        const reduce = {};
        dict.forEach(pair => {
            if (reduce[pair.MissionID]) {
                reduce[pair.MissionID].push(pair.QuestID);
            } else {
                reduce[pair.MissionID] = [pair.QuestID];
            }
        })
        Object.keys(reduce).forEach(mission => {
            if (this.rawDict.get(mission)) {
                this.rawDict.get(mission).Quests = this.rawDict.get(mission).Quests.concat(reduce[mission]);
            } else {
                this.rawDict.set(mission, { Quests: reduce[mission], Name: [] });
            }
            this.tryZip(mission);
        })
    }
    loadQuestNames(sign: string, dict: Array<{ Message: string }>) {
        const match = /QuestNameText(\d+)\.atb/.exec(sign);
        if (match) {
            const mission = match[1];
            if (this.rawDict.get(mission)) {
                this.rawDict.get(mission).Name = dict.map(e => e.Message);
            } else {
                this.rawDict.set(mission, { Quests: [], Name: dict.map(e => e.Message) });
            }
            this.tryZip(mission);
        }
    }
    loadQuestTitle(QuestsId: Array<number>, QuestsTitle: Array<number>) {
        for (let i = 0; i < QuestsId.length; ++i) {
            this.id2title.set(QuestsId[i], QuestsTitle[i]);
        }
        this.rawDict.forEach((v, m) => {
            this.tryZip(m.toString());
        })
    }
    tryZip(mission: string) {
        if (this.id2title.size > 0) {
            const info = this.rawDict.get(mission);
            const zlog = []
            if (info.Quests.length > 0 && info.Name.length > 0) {
                for (let i = 0; i < info.Quests.length; ++i) {
                    const id = info.Quests[i];
                    this.zippedDict.set(id, info.Name[this.id2title.get(id)]);
                    zlog.push([id, info.Name[this.id2title.get(id)]])
                }
            }
        }
    }
    getQuestName(id: number) {
        return this.zippedDict.get(id);
    }
}
