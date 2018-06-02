# AigisPlayer
千年戦争Aigis On Desktop

## Install
    git clone https://github.com/Yukimir/AigisPlayer
    cd AigisPlayer
    npm install
    npm start
## Plugin
### 运行方式

1、独立窗口：Chrome称之为popup，在AP2中通过右下角插件菜单呼出。运行于独立进程中。

2、后台脚本：在程序启动时自动运行。同主窗口运行于同一进程中。

3、注入脚本：指定游戏的页面读取时注入的脚本。与游戏运行于同一进程中。


### 插件文件结构
插件存放于plugins目录下的目录中。如"dropShow"插件存放于plugins/dropShow目录中

除了必须有manifest.json文件来说明插件信息以外，其他可以随意。

### manifest.json 范例

```typescript
    // plugins/dropshow/manifest.json

    {
    "pluginName":"dropShow",
    "author":"Yukimir",
    "version":"0.0.1",
    "description":"掉落查看",
    "entry":"src/popup/popup.html", // 独立窗口的入口html文件
    "background":"background.js",   // 后台脚本的入口点
    "game":["aigis"],    // 注入脚本要注入的游戏
    "inject":"inject.js",   // 注入脚本的入口点
    "windowOption":{    // 独立窗口的窗口设置，详见https://electronjs.org/docs/api/browser-window
        "width":288,
        "height":340,
        "title":"掉落查看",
        "minimizable":true,
        "maximizable":false,
        "transparent":true
        }
    }
```
### 脚本要求
后台脚本和注入脚本都必须使用module.exports的方式导出一个包含run(pluginHelper:PluginHelper)的对象，例如
```javascript
    // background.js

    module.exports = {
        run: function(pluginHelper){
            console.log(pluginHelper)
        }
    }
```
独立窗口必须提供一个run()函数作为入口点，比如
```html
    // index.html

    <html>
        <body>
            <script>
                function run(pluginHelper){
                    console.log(pluginHelper)
                }
            </script>
        </body>
    </html>
```
### PluginHelper
PluginHelper分为两个版本

#### 后台脚本用PluginHelper:

##### onMessage(callback: (msg: any, sendResponse?: (msg: any) => void) => void)
用来监听注入脚本和独立窗口发送的同步和异步消息

同步消息可以直接使用return来回复消息
异步消息可以用sendResponse方法来回复消息

※sendResponse只能使用一次

##### sendMessage(message:any, callback?: (message: any) => void)
用来向注入脚本及独立窗口发送信息，提供的callback参数用来接收回复。

※callback只会被触发一次

##### insertCssFileToGame(path:string)
用来向游戏注入CSS文件，提供的path为绝对路径（可以使用__dirname来获取）

※你应该在dom-ready之后执行此方法

##### insertCssToGame(css:string)
用来向游戏注入CSS规则

※你应该在dom-ready之后执行此方法

##### electronService: ElectronService/gameService: GameService
参考app/core/electron.service.ts | app/core/game.service.ts

##### plugin:Plugin
参考app/core/plugin.service.ts::Plugin


#### 注入/独立窗口用PluginHelper

##### onMessage(callback: (msg: any, sendResponse?: (msg: any) => void) => void)
用来监听后台脚本发送的消息

可以用sendResponse方法来回复消息

##### sendMessage(message:any, callback?: (message: any) => void)
用来向后台脚本发送消息，提供的callback参数用来接收回复。

##### sendMessageSync(message: any) => any
用来向后台脚本发送同步消息，返回值为回复

##### createWindow(file: string, option: WindowOption):BrowserWindow
file为绝对路径，option为窗口选项，参考https://electronjs.org/docs/api/browser-window

创建的新窗口以当前窗口为父窗口，并需要提供run函数来获得pluginHelper

### 生命周期
后台脚本，注入脚本在dom-ready之前执行run(pluginHelper)函数

独立窗口在dom-ready之后执行run(pluginHelper)函数

因为electron本身的缺陷，在dom-ready事件之前，有概率会无法接收到异步的message。所以在dom-ready事件之前请尽量用sendMessageSync来进行通信。

### 通信示例
```javascript  
    // background.js

    pluginHelper.onMessage((msg,sendResponse)=>{
        console.log(msg); // print: ping from inject/popup
        if(sendResponse) sendResponse('pong from back async') //asnyc
        else return 'pong from back sync' //sync
    })
    pluginHelper.sendMessage('ping from back', (msg)=>{
        console.log(msg); // print: pong from inject/popup
    });


    // inject.js / index.html

    pluginHelper.onMessage((msg,sendResponse)=>{
        console.log(msg); // print: ping from back
        sendResponse('pong from inject/popup')
    })
    
    pluginHelper.sendMessage('ping from inject/popup', (msg)=>{
        console.log(msg); // print: pong from back async
    })

    console.log(pluginHelper.sendMessageSync('ping from inject/popup')) // print: pong from back sync
```
### 游戏数据
目前暂时只支持 千年战争aigis

后台脚本通过实现newGameResponse方法来获取游戏数据

```javascript
    // background.js

    module.exports={
        run:run,
        newGameResponse:function(event, data) {
            console.log(event,data);
        }
    }
```
其中event参考app/core/pluginEventList.ts