# AigisPlayer
千年战争Aigis On Desktop

Use Electron+Vue+Webpack

Installation

    git clone https://github.com/huazhu111/AigisPlayer.git
    cd AigisPlayer
    npm install
    webpack
    cd dist
    cd app
    npm install
    cd ..
    electron app


关于插件

    插件系统现在为Alpha版，支持的功能和事件都非常少，且只能通过manifest设置来启动。今后会逐步更新。

    插件放置于程序目录下的plugins文件夹内，现阶段插件将以独立窗口的方式呈现，通过ipcRender事件监听接收数据。

目录结构为

    -Plugins
    |
     -PluginName
     |
      -manifest.json
      -...(其他的文件)

manifest.json:

    {
        "pluginName":"statusMonitor",
        "author":"huazhu111",
        "version":"1.0.0",
        "description":"状态监控",
        "enable":true,              //enable设置为true的插件将会在程序启动时立刻打开 --开发用--
        "entry":"index.html",       //插件入口点，必须为.html文件
        "windowOption":{            //插件窗口配置，详见 http://electron.atom.io/docs/api/browser-window
            "width":800,
            "height":600,
            "title":"状态监控"
        }
    }

index.html:

    在script段插入
        const {ipcRenderer} = require('electron');

    通过ipnRenderer监听事件
    事件带有两个参数：obj(数据主体) tabId(数据来源的标签编号)

        ipcRenderer.on('quest-start',(event,obj,tabId)=>{   
        }
        
现在支持的事件：

    'quest-success' : 任务成功后结算时触发
    'quest-start' ：任务开始时触发
    'login-status' ： 游戏进入时触发
    'login-status2' ： 游戏进入时触发
    'inin-result' ： 委任出击结算时触发
    'base-gacha-result' ： 基础抽卡时触发
    'unit-move' ： 单位在兵营之间移动时触发
    'allunits-info' ： 游戏进入时触发，内容为玩家拥有的所有单位的信息
    'unit-sell' ： 单位隐退时触发
    'buy-charisma' ： 购买魅力时触发
