# AigisPlayer

千年戦争 Aigis On Desktop

## Install

    git clone https://github.com/Yukimir/AigisPlayer
    cd AigisPlayer
    npm install
    npm start

## Plugin

### 运行方式

1、独立窗口：Chrome 称之为 popup，在 AP2 中通过右下角插件菜单呼出。运行于独立进程中。

2、后台脚本：在程序启动时自动运行。同主窗口运行于同一进程中。

3、注入脚本：指定游戏的页面读取时注入的脚本。与游戏运行于同一进程中。

### 插件文件结构

插件存放于 plugins 目录下的目录中。如"dropShow"插件存放于 plugins/dropShow 目录中

除了必须有 manifest.json 文件来说明插件信息以外，其他可以随意。

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

后台脚本和注入脚本都必须使用 module.exports 的方式导出一个包含 run(pluginHelper:PluginHelper)的对象，例如

```javascript
// background.js

module.exports = {
  run: function(pluginHelper) {
    console.log(pluginHelper);
  }
};
```

独立窗口必须提供一个 run()函数作为入口点，比如

```html
// index.html

<html>
  <body>
    <script>
      function run(pluginHelper) {
        console.log(pluginHelper);
      }
    </script>
  </body>
</html>
```

### PluginHelper

PluginHelper 分为两个版本

#### 后台脚本用 PluginHelper:

##### onMessage(callback: (msg: any, sendResponse?: (msg: any) => void) => void)

用来监听注入脚本和独立窗口发送的同步和异步消息

同步消息可以直接使用 return 来回复消息
异步消息可以用 sendResponse 方法来回复消息

※sendResponse 只能使用一次

##### sendMessage(message:any, callback?: (message: any) => void)

用来向注入脚本及独立窗口发送信息，提供的 callback 参数用来接收回复。

※callback 只会被触发一次

##### insertCssFileToGame(path:string)

用来向游戏注入 CSS 文件，提供的 path 为绝对路径（可以使用\_\_dirname 来获取）

※你应该在 dom-ready 之后执行此方法

##### insertCssToGame(css:string)

用来向游戏注入 CSS 规则

※你应该在 dom-ready 之后执行此方法

##### electronService: ElectronService/gameService: GameService

参考 app/core/electron.service.ts | app/core/game.service.ts

##### plugin:Plugin

参考 app/core/plugin.service.ts::Plugin

#### 注入/独立窗口用 PluginHelper

##### onMessage(callback: (msg: any, sendResponse?: (msg: any) => void) => void)

用来监听后台脚本发送的消息

可以用 sendResponse 方法来回复消息

##### sendMessage(message:any, callback?: (message: any) => void)

用来向后台脚本发送消息，提供的 callback 参数用来接收回复。

##### sendMessageSync(message: any) => any

用来向后台脚本发送同步消息，返回值为回复

##### createWindow(file: string, option: WindowOption):BrowserWindow

file 为绝对路径，option 为窗口选项，参考https://electronjs.org/docs/api/browser-window

创建的新窗口以当前窗口为父窗口，并需要提供 run 函数来获得 pluginHelper

### 生命周期

后台脚本，注入脚本在 dom-ready 之前执行 run(pluginHelper)函数

独立窗口在 dom-ready 之后执行 run(pluginHelper)函数

因为 electron 本身的缺陷，在 dom-ready 事件之前，有概率会无法接收到异步的 message。所以在 dom-ready 事件之前请尽量用 sendMessageSync 来进行通信。

### 通信示例

```javascript
// background.js

pluginHelper.onMessage((msg, sendResponse) => {
  console.log(msg); // print: ping from inject/popup
  if (sendResponse) sendResponse('pong from back async');
  //asnyc
  else return 'pong from back sync'; //sync
});
pluginHelper.sendMessage('ping from back', msg => {
  console.log(msg); // print: pong from inject/popup
});

// inject.js / index.html

pluginHelper.onMessage((msg, sendResponse) => {
  console.log(msg); // print: ping from back
  sendResponse('pong from inject/popup');
});

pluginHelper.sendMessage('ping from inject/popup', msg => {
  console.log(msg); // print: pong from back async
});

console.log(pluginHelper.sendMessageSync('ping from inject/popup')); // print: pong from back sync
```

### 游戏数据

目前暂时只支持 千年战争 aigis
或许会支持御城（等我哪天入坑的吧 x）

后台脚本通过调用 pluginHelper.aigisGameDataService.subscribe 方法来订阅游戏通信数据和静态资源文件

```javascript
// background.js

module.exports = {
  run: pluginHelper => {
    // 订阅通信数据
    // 事件名参考 app/gameData/aigis/EventList.ts
    pluginHelper.aigisGameDataService.subscribe('allcards-info', (url, data) => {
      // ....
    });

    // 订阅静态资源
    // 可以订阅fileList事件来获取文件列表
    pluginHelper.aigisGameDataService.subscribe('NameText.atb', (url, data) => {
      // ....
    });
  }
};
```
