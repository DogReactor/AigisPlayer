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
    tags.forEach(function(item,index){
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
            default:
                tagObjs[name] = xml2json(data.slice(item.start,item.end));
                break;
        }
    });
    return tagObjs;
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
                end:tagend+1
            });
            break;
        }
        //处理标签中的参数
        if(tagname.indexOf(' ') != -1) tagname = tagname.slice(0,tagname.indexOf(' '));
        //寻找标签尾
        let tagtailname = '</' + tagname +'>';
        let tagtailstart = data.indexOf(tagtailname,lastend);
        //这里找到的tagend+1 和 tagtailstart 就是该标签的内容部分的起止索引
        tags.push({
            name:tagname,
            start:tagend+1,
            end:tagtailstart
        });
        lastend = tagtailstart + tagtailname.length;
    }
    return tags;
}