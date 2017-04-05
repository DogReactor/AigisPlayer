'use strict'
const {ipcRenderer} = require('electron');
const orbsIndexs = [0,1,2,3,5,7,21,22,23,25,26,27,28,29,30,33,35,36,37,52,53,54,55,56,58,59,72,73,76,77,78,84,85,86,87];
const orbsNames = ['士兵','盾','骑士','盗贼','山贼','武士','忍者','天马','暗黑骑士','拳师','前卫军师','魔法剑士','堕天使','机甲师','水兵','神官战士','魔盾','龙骑兵','弓骑兵','弓箭手','术士','牧师','魔女','海贼','吸血鬼杀手','巫女','祭司','后卫军师','风水师','炮兵','舞娘','炼金术师','游侠','小偷','咒术师'];
const orbDays = [
    '周三', '周四', '周二', '周三',
    '周二', '周四', '周五', '周二',
    '周一', '周二', '周五', '周四',
    '周五', '周日', '周四', '周六',
    '周六', '周六', '周日', '周一',
    '周五', '周一', '周五', '周三',
    '周四', '周三', '周三', '周一',
    '周二', '周一', '周六', '周日',
    '周六', '周日', '周日'];
const extendClassNames = [
    ['战圣灵'],
    ['战圣灵', '龙姬'],
    ['皇家卫士', '公主'],
    ['魔物使'],
    ['复仇'],
    ['剑圣', '妖狐'],
    ['剑圣'],
    [],
    ['皇家卫士', '吸血姬'],
    ['妖狐', '复仇', '女仆'],
    ['吸血鬼'],
    ['龙姬', '公主', '魔神'],
    ['魔神'],
    ['仙人'],
    ['商人'],
    ['附魔'],
    ['附魔'],
    [],
    [],
    [],
    ['死灵', '召唤'],
    ['龙巫女', '不死姬', '狼巫女'],
    ['阴阳师'],
    ['狙击'],
    ['吸血姬'],
    ['阴阳师', '龙巫女'],
    ['德鲁伊', '不死姬'],
    ['时魔女', '魔物使'],
    ['仙人'],
    ['狙击'],
    ['召唤', '女仆'],
    ['附魔', '死灵'],
    ['时魔女'],
    ['商人'],
    ['狼巫女', '德鲁伊']
]
const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
let Info = class {
    constructor(){
        this._orbs = [];
    }
    get orbs(){
        return this._orbs;
    }
    set orbs(value){
        this._orbs = value;
        updateTable(this._orbs);
    }
}
let info = new Info();

// info.orbs = [0,1,2,3,5,7,21,22,23,25,26,27,28,29,30,33,35,36,37,52,53,54,55,56,58,59,72,73,76,77,78,84,85,86,87];

ipcRenderer.on('orb-init',(event,obj,tabId)=>{
    info.orbs = getOrbs(obj);
    console.log(info.orbs);
});

ipcRenderer.on('quest-success',(event,obj,tabId)=>{
    if(obj.PAI === undefined) return;
    let orbs = info.orbs;
    for (let key in obj.PAI){
        let data = obj.PAI[key];
        if(key.length > 2) continue;
        let startIndex = key.charAt(0) === 'A' ? 0 : 52;
        startIndex += parseInt(key.charAt(1)) * 4;
        startIndex = startIndex + (parseInt(key.charAt(1)) > 1 ? 12 : 0)
        for(let i = 0; i < 4; i++){
            let d = data & 0xFF;
            data = data >> 8;
            let index = startIndex + i;
            let listIndex = orbsIndexs.indexOf(index);
            if(listIndex === -1) continue;
            orbs[listIndex] = d;
        }
    }
    info.orbs = orbs;
});

function getOrbs(obj){
    let orbs = [];
    for(let key in obj){
        let data = obj[key];
        for(let i = 0; i < 4; i++){
            let d = data & 0xFF;
            data = data >> 8;
            orbs.push(d);
        }
    }
    let result = orbs.filter((v,i)=>{
        if(orbsIndexs.indexOf(i) != -1) return true;
    });
    return result;
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function getDay() {
    let offset = 9;
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    let newDate = new Date(utc + (3600000*offset));
    return newDate.getDay();
}

function updateTable(obj){
    let mainTable = document.getElementById('mainTable');
    mainTable.innerHTML = "";
    for(let i = 0;i < obj.length; i += 4 ){
        let tr = document.createElement('tr');
        for(let j = 0;j < 4;j++){
            let index = i + j
            if(index >= obj.length) continue;
            let td = document.createElement('td');
            if(days[getDay()] == orbDays[index]) td.className = 'active';
            //单元格
            let icon = document.createElement('div');
            icon.style.backgroundImage = "url('img/class/" + (index+1) + ".png')";
            icon.className = 'icon';

            let div_center = document.createElement('div');
            div_center.className = 'center';
            let div_name = document.createElement('div');
            div_name.innerHTML = orbsNames[index];
            let div_day = document.createElement('div');
            div_day.innerHTML = orbDays[index];
            div_center.appendChild(div_name);
            div_center.appendChild(div_day);

            let div2 = document.createElement('div');
            div2.innerHTML = obj[index];
            div2.className = 'right number';

            let div_extend = document.createElement('div');
            div_extend.className = 'extend';
            let div_extend_content = document.createElement('span');
            div_extend_content.innerHTML = '[' + extendClassNames[index].join('/') + ']';
            div_extend_content.className = 'extend-content';
            div_extend.appendChild(div_extend_content);

            td.appendChild(icon);
            td.appendChild(div_center);
            td.appendChild(div2);
            td.appendChild(div_extend);
            tr.appendChild(td);
        }
        mainTable.appendChild(tr);
    }
}
const currentwindow = require('electron').remote.getCurrentWindow();
// currentwindow.openDevTools();
