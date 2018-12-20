import { AigisGameDataService } from '../aigis.service';
import { AigisStatisticsService } from '../statistics.service';
import { QuestNameList } from './parseQuestName';

class ReferenceData {
    public QuestList = null;
    public UnitsList = null;
    public BarrackInfo = null;
    public ClassInfo = null;
    public AbilityConfig = null;
    public AbilityList = null;
    public StoryQuestList = null;
    public DailyQuestList = null;
    public MapsInfo = {};
    private dataCritical = false;
    constructor() { }
    loadRawData(label: string, data: any) {
        if (label === 'AbilityConfig') {
            let configId = 0;
            this.AbilityConfig = [];
            data.forEach(c => {
                if (c._ConfigID !== 0) {
                    configId = c._ConfigID;
                    this.AbilityConfig[configId] = [];
                }
                this.AbilityConfig[configId].push(
                    {
                        _InfluenceType: c._InfluenceType,
                        _Param1: c._Param1
                    }
                )
            })
        } else {
            this[label] = data;
        }
    }
    checkFull() {
        return new Promise((resolve, reject) => {
            if (this.dataCritical) {
                return resolve('Full')
            } else if (Object.keys(this).every(key => this[key] !== null || key === 'MapsInfo')) {
                this.dataCritical = true
                return resolve('Critical')
            } else {
                return reject('Empty')
            }
        });
    }
}

class SpoilsBuff {
    public ProbMod = 0;
    public PreyFlag = null;
    public TeamBuff = false;
    constructor(prob, target: (obj: number) => boolean, teamBuff = false) {
        this.ProbMod = prob;
        this.PreyFlag = target;
        this.TeamBuff = teamBuff;
    }
}

class BuffCalculator {
    private buffList = {};
    private staticBuffStatus: Promise<string>;
    public IsBredWeek = false;
    constructor() { }
    async RemarkProb(questId, dropInfos, reference) {
        if (this.IsBredWeek) {
            if (reference.DailyQuestList.indexOf(questId) !== -1 ||
                reference.StoryQuestList.indexOf(questId) !== -1) {
                dropInfos.forEach(obj => {
                    if (questId >= 141 && questId <= 147) {
                        obj.ProbMod *= 2;
                    } else {
                        obj.ProbMod *= 1.5;
                    }
                })
            }
        }
        Object.keys(this.buffList).forEach(key => {
            dropInfos.forEach(obj => {
                if (this.buffList[key].PreyFlag(obj.Treasure)) {
                    obj.Prob += this.buffList[key].ProbMod;
                }
            })
            if (this.buffList[key].TeamBuff) {
                this.buffList[key].ProbMod = 0;
            }
        })
        console.log('dropInfo: ', dropInfos)
        return Promise.resolve({ QuestID: questId, DropInfos: dropInfos });
    }
    registerBuff(label, hunter: SpoilsBuff) {
        this.buffList[label] = hunter;
    }
    async calculateBuff(reference) {
        this.staticBuffStatus = new Promise((resolve, reject) => {
            reference.BarrackInfo.forEach((unit, index) => {
                this.checkIfBuff(unit, true, reference);
            });
            return resolve('Buff calculated');
        })
        return this.staticBuffStatus
    }
    checkIfBuff(unit, mode, reference) {
        const i = unit.A1 - 1;
        let AbilityId = reference.UnitsList.Ability[i];
        const classObj = reference.ClassInfo.find(cl => cl.ClassID === unit.A2);
        if (classObj.MaxLevel < 99) {
            AbilityId = reference.UnitsList.Ability_Default[i];
        }
        if (AbilityId < reference.AbilityList.length) {
            const configId = reference.AbilityList[AbilityId]._ConfigID;
            if (configId !== 0) {
                reference.AbilityConfig[configId].forEach(c => {
                    if (c._InfluenceType !== 80 && this.buffList.hasOwnProperty(c._InfluenceType)) {
                        if (mode) {
                            this.buffList[c._InfluenceType].ProbMod = Math.max(this.buffList[c._InfluenceType].ProbMod, c._Param1);
                        } else {
                            return configId;
                        }
                    }
                })
            }
        }
        return 0;
    }
    updateBuff(operation, reference, unit) {
        switch (operation) {
            case 'unit-evo':
                const member = reference.BarrackInfo.find(u => u.A7 === unit.A7);
                member.A2 = unit.A2;
                this.checkIfBuff(member, true, reference);
                break;
            case 'new-unit':
                reference.BarrackInfo.push(unit);
                this.checkIfBuff(unit, true, reference);
                break;
            case 'del-unit':
                let needReCal = false;
                const unitlist = unit.A7[0] ? unit.A7 : [unit.A7];
                unitlist.forEach(per => {
                    const memberIndex = reference.BarrackInfo.findIndex(u => u.A7 === per);
                    const configId = this.checkIfBuff(reference.BarrackInfo[memberIndex], false, reference);
                    if (configId !== 0) {
                        needReCal = true
                        reference.AbilityConfig[configId].forEach(c => {
                            if (c._InfluenceType !== 80
                                && this.buffList.hasOwnProperty(c._InfluenceType)
                                && c._Param1 === this.buffList[c._InfluenceType].ProbMod) {
                                this.buffList[c._InfluenceType].ProbMod = 0;
                            }
                        })
                        reference.BarrackInfo.splice(memberIndex, 1);
                    }

                })
                if (needReCal) {
                    this.calculateBuff(reference);
                }
                break;
            default: break
        }
    }
    async modTeamBuff(team, reference) {
        this.staticBuffStatus.then(sucMsg => {
            try {
                team.forEach(u => {
                    if (u.A1 !== 1) {
                        const teammate = reference.BarrackInfo.find(e => e.A7 === u.A7);
                        // 暂时入队生效的掉落插件只有作死贼，因此硬编码
                        switch (teammate.A2) {
                            case 12200:
                                this.buffList[80].ProbMod = Math.max(this.buffList[80].ProbMod, 3);
                                break;
                            case 12210:
                                this.buffList[80].ProbMod = Math.max(this.buffList[80].ProbMod, 3);
                                break;
                            case 12220:
                                this.buffList[80].ProbMod = Math.max(this.buffList[80].ProbMod, 5);
                                break;
                            case 12270:
                                this.buffList[80].ProbMod = Math.max(this.buffList[80].ProbMod, 7);
                                break;
                            case 12280:
                                this.buffList[80].ProbMod = Math.max(this.buffList[80].ProbMod, 5);
                                break;
                            default: break;
                        }
                        // 注释里是一般的处理流程
                        // let configId = reference.ClassInfo.find(cl => cl.ClassID === teammate.A2).ClassAbility1
                        // console.log(configId, teammate)
                        // if (configId > 0 && configId < reference.AbilityConfig.length) {
                        //     reference.AbilityConfig[configId].forEach(c => {
                        //         if (this.buffList.hasOwnProperty(c._InfluenceType)) {
                        //             this.buffList[c._InfluenceType].ProbMod =
                        //                       Math.max(this.buffList[c._InfluenceType].ProbMod, c._Param1)
                        //         }
                        //     })
                        // }
                    }
                })
                return Promise.resolve('Updated spoils buff by team');
            } catch (err) {
                return Promise.reject(err);
            }
        })
    }
}

class DropInfo {
    public Treasure: number;
    public EnemyOrder: number;
    public Prob = 100;
    public Num = 0;
    public DropOrder: number;
    public IsFirst = false;
    constructor(treasure, enemyOrder) {
        this.Treasure = treasure;
        this.EnemyOrder = enemyOrder
    }
}
export class SpoilsStatistics {
    public DisplayQuestName: QuestNameList = new QuestNameList();
    private reference: ReferenceData = new ReferenceData();
    private buffCalculator: BuffCalculator = new BuffCalculator();
    constructor(private mailBox: AigisStatisticsService) {
        this.buffCalculator.registerBuff(57, new SpoilsBuff(0, (obj) => obj >= 1001 && obj <= 1004));

        this.buffCalculator.registerBuff(58, new SpoilsBuff(0, (obj) => obj >= 1005 && obj <= 1008));

        this.buffCalculator.registerBuff(59, new SpoilsBuff(0, (obj) => obj >= 2001 && obj <= 2010));

        this.buffCalculator.registerBuff(60, new SpoilsBuff(0, (obj) => obj === 77 || obj === 133 || obj === 250 || obj === 320));

        this.buffCalculator.registerBuff(61, new SpoilsBuff(0, (obj) => {
            const cl = this.reference.UnitsList.InitClassID[obj - 1];
            if (cl && cl < 100) {
                const clName = this.reference.ClassInfo.find(c => c.ClassID === cl).Name;
                return clName.includes('聖霊')
            } else {
                return false
            }
        }));

        this.buffCalculator.registerBuff(
            79, new SpoilsBuff(0, (obj) => this.reference.UnitsList.Rare[obj - 1] === 2 &&
                this.reference.UnitsList.InitClassID[obj - 1] >= 100)
        );

        this.buffCalculator.registerBuff(80, new SpoilsBuff(0, (obj) => obj >= 1000, true));
    }
    async parseSpoils(data, firstEncounter) {
        try {
            const index = this.reference.QuestList.QuestID.findIndex(q => q === data.QR.QuestID);
            const mapLabel = 'Map' + this.reference.QuestList.MapNo[index] + '.aar';
            const entryLabel = 'Entry' + this.reference.QuestList.EntryNo[index].toString().padStart(2, '0') + '.atb';
            const mapInfo = this.reference.MapsInfo[mapLabel][entryLabel];
            const dropInfos = [];
            let enemeyCount = 0;
            mapInfo.forEach(e => {
                if (e.EnemyID > 0 && e.EnemyID !== 2000) {
                    enemeyCount += e.Loop;
                }
                if (e.PrizeCardID > 0) {
                    dropInfos.push(new DropInfo(e.PrizeCardID, enemeyCount));
                }
            })
            for (const i of Object.keys(dropInfos)) {
                dropInfos[i].Num = data.LOTTERY.Result[i];
                dropInfos[i].DropOrder = parseInt(i, 10);
                const treasureLabel = 'Treasure' + dropInfos[i].Treasure;
                dropInfos[i].Treasure = this.reference.QuestList[treasureLabel][index];
                dropInfos[i].IsFirst = firstEncounter[i]
            }
            return Promise.resolve(dropInfos);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    fillReference(label, data) {
        this.reference.loadRawData(label, data);
        this.reference.checkFull()
            .then(msg => {
                if (msg === 'Critical' || label === 'allunits-info') {
                    this.buffCalculator.calculateBuff(this.reference)
                }
            })
            .catch(err => { })
    }
    subscribData(gameDataService: AigisGameDataService) {

        // deal with normal combat
        gameDataService.subscribe('quest-start', (url, response: any, request: any) => {
            // console.log('quest-response', response, request)
            const firstEncounter = request.RT.ATTR.map(e => e === 0);
            Promise.all([this.parseSpoils(response, firstEncounter), this.buffCalculator.modTeamBuff(request.BL, this.reference)])
                .then(([dropInfos, sucMsg]) => {
                    return this.buffCalculator.RemarkProb(response.QR.QuestID, dropInfos, this.reference);
                }, rej => { throw rej })
                .then(record => {
                    if (record.DropInfos.length > 0) {
                        this.mailBox.sendRecord({
                            type: 'spoils',
                            record: record,
                            name: this.DisplayQuestName.getQuestName(record.QuestID),
                        });
                    }
                }).catch(err => { throw err })
        }, true)

        // auto combat, only for story missions for the present
        gameDataService.subscribe('inin-result', (url, response: any, request: any) => {
            const questId = request.QI;
            const treasureSeq = request.RT.TYPE;
            const index = this.reference.QuestList.QuestID.findIndex(q => q === questId);
            const uarr = response.PPU[0] ? response.PPU.map(u => u.A1) : [response.PPU.A1];
            let ptr = 0;
            const result = uarr.map(u => 0);
            try {
                treasureSeq.forEach((tid, ind) => {
                    if (this.reference.QuestList['Treasure' + tid][index] === uarr[ptr]) {
                        result[ind] = 1;
                        ++ptr;
                    } else { result[ind] = 0 }
                });
                const dropInfos = treasureSeq.map((tid, tind) => {
                    const drop = new DropInfo(this.reference.QuestList['Treasure' + tid][index], 0);
                    drop.IsFirst = false;
                    drop.Num = result[tind];
                    drop.DropOrder = tind;
                    if (this.buffCalculator.IsBredWeek) {
                        drop.Prob = 150;
                    }
                    return drop
                });
                this.mailBox.sendRecord({
                    type: 'spoils',
                    record: { QuestID: questId, DropInfos: dropInfos },
                    name: this.DisplayQuestName.getQuestName(questId),
                });
            } catch (err) { }
        }, true);

        // collect all useful data
        gameDataService.subscribe('allcards-info', (url, data: any) => {
            this.fillReference('UnitsList', data);
        });
        gameDataService.subscribe('allunits-info', (url, data: any) => {
            this.fillReference('BarrackInfo', data);
        });
        gameDataService.subscribe('all-quest-info', (url, data: any) => {
            this.fillReference('QuestList', data);
            this.DisplayQuestName.loadQuestTitle(data.QuestID, data.QuestTitle);
        });
        gameDataService.subscribe('AbilityConfig.atb', (url, data: any) => {
            this.fillReference('AbilityConfig', data.Contents);
        });
        gameDataService.subscribe('AbilityList.atb', (url, data: any) => {
            this.fillReference('AbilityList', data.Contents);
        });
        gameDataService.subscribe('PlayerUnitTable.aar', (url, data: any) => {
            this.fillReference('ClassInfo', data.Files[1].Content.Contents);
        });
        gameDataService.subscribe('StoryMissionQuestList.atb', (url, data: any) => {
            this.fillReference('StoryQuestList', data.Contents.map(e => e.QuestID));
        });
        gameDataService.subscribe('DailyMissionQuestList.atb', (url, data: any) => {
            this.fillReference('DailyQuestList', data.Contents.map(e => e.QuestID));
        });
        gameDataService.subscribe(file => file.includes('MissionQuestList'), (url, data: any) => {
            this.DisplayQuestName.loadMissionQuestDict(data.Data.Contents);
        });
        gameDataService.subscribe(file => /QuestNameText(\d+)\.atb/.test(file), (url, data: any) => {
            this.DisplayQuestName.loadQuestNames(data.Label, data.Data.Contents);
        });
        gameDataService.subscribe('GloryConditionConfig.atb', (url, data: any) => {
            const weeklyMissions = data.Contents.filter(e => e.PeriodType === 3);
            if (weeklyMissions.some(e => e.ConditionText.includes('曜日ミッション'))) {
                this.buffCalculator.IsBredWeek = true;
            }
        });
        gameDataService.subscribe(
            file => file.includes('Map') && file.includes('.aar'),
            (url, data: any) => {
                if (!this.reference.MapsInfo[data.Label]) {
                    this.reference.MapsInfo[data.Label] = {};
                }
                data.Data.Files.forEach(e => {
                    if (e.Name !== 'MapPng.atx') {
                        this.reference.MapsInfo[data.Label][e.Name] = e.Content.Contents;
                    }
                })
            });

        // update buff when units changed
        gameDataService.subscribe('quest-success', (url, data: any) => {
            if (data.PPU) {
                if (data.PPU[0]) {
                    data.PPU.forEach(u => {
                        this.buffCalculator.updateBuff('new-unit', this.reference, u);
                    })
                } else {
                    this.buffCalculator.updateBuff('new-unit', this.reference, data.PPU);
                }
            }
        });
        gameDataService.subscribe('new-gacha-result', (url, data: any) => {
            this.buffCalculator.updateBuff('new-unit', this.reference, data.PPU);
        });
        gameDataService.subscribe('white-guarantee-gacha', (url, data: any) => {
            this.buffCalculator.updateBuff('new-unit', this.reference, data.PPU);
        });
        gameDataService.subscribe('fame-gacha-result', (url, data: any) => {
            this.buffCalculator.updateBuff('new-unit', this.reference, data.PPU);
        });
        gameDataService.subscribe('cc', (url, data: any) => {
            this.buffCalculator.updateBuff('unit-evo', this.reference, data.PPU);
        });
        gameDataService.subscribe('aw1', (url, data: any) => {
            this.buffCalculator.updateBuff('unit-evo', this.reference, data.PPU);
        });
        gameDataService.subscribe('aw2', (url, data: any) => {
            this.buffCalculator.updateBuff('unit-evo', this.reference, data.PPU);
        });
        gameDataService.subscribe('unit-sell', (url, res: any, data) => {
            this.buffCalculator.updateBuff('del-unit', this.reference, data.APPEND);
        }, true);
    }
}
