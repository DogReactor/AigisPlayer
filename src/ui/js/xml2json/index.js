function xml2json(data){
    let tags = getAllTags(data);
    //如果tags为空，说明里面是数据，直接return
    if(tags.length == 0) return data;
    //如果是带有XML头的
    if(tags[0].name == '-1') {
        let jsonObj = xml2json(data.slice(tags[0].end));
        return jsonObj;
    }
    //其他情况
    //遍历tags，并且将每个标签里的内容交给xml2js递归处理
    let tagObjs = {};
    tags.every(function(item,index){
        let name = item.name;
        switch(name){
            //KET-VALUE是键值对 ID-STATUS是数组
            case 'KEY':case 'ID':
                let kData = data.slice(item.start,item.end);
                let vData = tags[index+1] != undefined ? data.slice(tags[index+1].start,tags[index+1].end) : "";
                tagObjs = getVs(kData,vData);
                break;
            case 'VALUE':case 'STATUS':
                break;
            case 'A1':
                tagObjs = getObj(data,tags);
                return false;
                break;
            default:
                if(item.arg != null) {
                    tagObjs[name] = getArray(data.slice(item.start,item.end),item.arg);
                }
                else {
                    tagObjs[name] = xml2json(data.slice(item.start,item.end));
                };
                break;
        }
        return true;
    });
    return tagObjs;
}

function getObj(data,tags){
    let arr = [];
    let objTagsInfo = tags;
    objTagsInfo.forEach((item,index)=>{
        //A1,A2,A3,A4
        let childType = item.arg;
        let childName = item.name;
        let childData = data.slice(item.start,item.end);
        let childTags = getAllTags(childData);
        childTags.forEach((citem,cindex)=>{
            //A1.1 A1.2 A1.3
            let value = childData.slice(citem.start,citem.end);
            if(arr[cindex] == undefined) arr[cindex] = {};
            arr[cindex][childName] = applyType(value,childType);
        });
    });
    if(arr.length == 1) return arr[0];
    return arr;
}

function getArray(data,type){
    let arr = [];
    let arrTagsInfo = getAllTags(data);
    arrTagsInfo.forEach((item,index)=>{
        let value = data.slice(item.start,item.end);
        arr.push(applyType(value,type));
    });
    if(arr.length == 1) return arr[0];
    return arr;
}

function applyType(value,type){
    switch(type){
        case 'S':
            value = value.toString();
            break;
        case 'I':
            value = parseInt(value);
            break;
    }
    return value;
}

function getVs(kData,vData){
    let objs = {};
    let kInfo = getAllTags(kData);
    let vInfo = vData == "" ? [] : getAllTags(vData);
    kInfo.forEach(function(item,index){
        let key = kData.slice(item.start,item.end);
        let value = vInfo[index] == undefined ? key : vData.slice(vInfo[index].start,vInfo[index].end);
        objs[key] = value;
    });
    return objs;
}

function getAllTags(data){
    let tags = [];
    let lastend = 0;
    while(true){
        //处理标签头
        let tagname = "";
        let tagstart = data.indexOf('<',lastend) + 1;
        let tagend = data.indexOf('>',lastend);
        //tagstart == -1说明遍历到最后，跳出循环
        if(tagend == -1) break;
        //获取标签名
        tagname = data.slice(tagstart,tagend);
        //判断是否是XML头
        if(tagname[0] == '?'){
            tags.push({
                name:'-1',
                start:tagstart - 1,
                end:tagend+1,
                arg:null
            });
            break;
        }
        let arg = null;
        //处理标签中的参数
        if(tagname.indexOf(' ') != -1) {
            //<xxx T="S">
            arg = tagname.slice(tagname.indexOf(' '));
            arg = arg.split("=")[1].replace(/"/g,"");
            tagname = tagname.slice(0,tagname.indexOf(' '));
        } 
        //寻找标签尾
        let tagtailname = '</' + tagname +'>';
        let tagtailstart = data.indexOf(tagtailname,lastend);
        //这里找到的tagend+1 和 tagtailstart 就是该标签的内容部分的起止索引
        tags.push({
            name:tagname,
            start:tagend+1,
            end:tagtailstart,
            arg:arg
        });
        lastend = tagtailstart + tagtailname.length;
    }
    return tags;
}

module.exports = xml2json;