function pluginManager(eventHub){
    this.eventHub = eventHub;
    this.pluginsInfo = [];
}

pluginManager.prototype.readPluginsInfo = function(fs,callback){
    fs.readdir('plugins',(err,files)=>{
        if(err){
            fs.mkdirSync('plugins');
            return;
        }
        files.forEach((value,index)=>{
            let data;
            try{ data = fs.readFileSync('./plugins/' + value + '/manifest.json','utf8'); } catch(e){ return; }
            try{
                let obj = JSON.parse(data);
                obj.path = value;
                obj.actived = false;
                this.pluginsInfo.push(obj);
            }
            catch(e){
                return;
            }
        });
        callback();
    });
}

pluginManager.prototype.activePlugin = function(index){
    if(this.pluginsInfo[index] == undefined) return;
    if(this.pluginsInfo[index].actived == true) return;
    let opt = this.pluginsInfo[index].windowOption == undefined ? 
    {
        height:300,
        width:300,
        title:this.pluginsInfo[index].pluginName
    } : this.pluginsInfo[index].windowOption;
    opt.webPreferences = {webSecurity:false};
    //打开插件窗口
    let win = new BrowserWindow(opt);
    this.pluginsInfo[index].actived = true;
    this.pluginsInfo[index].win = win;
    let dirname = app.getAppPath();
    dirname = dirname.slice(0,dirname.lastIndexOf('\\'));
    let url = require('url').format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(dirname, 'plugins',  this.pluginsInfo[index].path , this.pluginsInfo[index].entry)
    });
    win.webContents.openDevTools();
    win.setMenu(null);
    win.loadURL(url);
    let webcontent = win.webContents;
    //注册事件
    function newDataFunction(e){
        let type = e.type;
        let obj = e.obj;
        let tabId = e.tabId;
        if(webcontent == null) return;
        webcontent.send(type,obj,tabId);
    }
    this.eventHub.$on('new-game-data',newDataFunction);
    //释放灵魂
    win.on('close',()=>{
        this.pluginsInfo[index].actived = false;
        this.pluginsInfo[index].win = null;
        this.eventHub.$off('new-game-data',newDataFunction);
        webcontent = null;
    });
}

module.exports = pluginManager;