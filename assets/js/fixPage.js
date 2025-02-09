// fuck confirm
// TODO: 只针对特定的frame有效
const { ipcRenderer, remote } = require('electron');
window['confirm'] = () => {
  return false;
};

var delay = (time) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove();
    }, time);
  })
}

var getWebFrame = async () => {
  let frame;
  while (!frame) {
    frame = document.getElementById('game_frame');
    console.log(frame);
    await delay(10);
  }
  return frame;
}

ipcRenderer.on('catch', async (event, message) => {
  // GBF
  if (window.location.href.indexOf('game.granbluefantasy.jp') !== -1) {
    require('./gbf/fixSlideBar');
    return;
  }
  if (message === 'bravegirl') {
    var bottomFrame = document.getElementById('bottomFrame');
    if (bottomFrame) {
      bottomFrame.style.position = 'fixed';
      bottomFrame.style.top = '0px';
      bottomFrame.style.left = '-8px';
      bottomFrame.style.width = '1032px';
      bottomFrame.style.zIndex = '10001';
    }
    return;
  }
  var gameFrame = await getWebFrame();
  if (gameFrame === null) {
    console.error("game Frame not found");
    ipcRenderer.sendToHost('url', 'error');
  }
  else {
    gameFrame.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    gameFrame.style.zIndex = '10';
    if (message === 'kamihime') {
      gameFrame.style.top = '-28px';
      gameFrame.style.left = '-150px';
    }
    if (message === 'fkg') {
      gameFrame.style.top = '-6px';
      gameFrame.style.left = '-60px';
    }
    if (message === 'aigis' || message === 'oshiro') {
      gameFrame.style.top = '1px';
      gameFrame.style.left = '0';
      gameFrame.style.marginLeft = '-6px';
    }
    if (message === 'kankore') {
      gameFrame.style.top = '-16px';
      gameFrame.style.left = '0';
    }
    if (message === 'unitia') {
      gameFrame.style.top = '-52px';
      gameFrame.style.left = '0';
    }
    if (message === 'necro') {
      gameFrame.style.top = '-35px';
      gameFrame.style.left = '-22px';
    }
    if (message === 'kyoshin') {
      gameFrame.style.top = '-30px';
      gameFrame.style.left = '0px';
    }
    if (message === 'clover') {
      gameFrame.style.top = '-39px';
      gameFrame.style.left = '-109px'
    }
    if (message === 'misttraingirls') {
      gameFrame.style.top = '-15px';
      gameFrame.style.left = '0px';
    }
    if (message === 'angelic') {
      gameFrame.style.top = '-17px';
      gameFrame.style.left = '-11px';
    }
    if (message === 'minashigo') {
      gameFrame.style.top = '-16px';
      gameFrame.style.left = '-5px';
    }
    if (message === 'fruful') {
      gameFrame.style.top = '-7px';
      gameFrame.style.left = '-5px';
    }
    if (message === 'monster') {
      gameFrame.style.top = '-23px';
      gameFrame.style.left = '-137px';
    }
  }
});

ipcRenderer.on('change', (event, message) => {
  document.getElementById('content').style.position = 'fixed';
  ipcRenderer.sendToHost('changesuccess');
});

ipcRenderer.on('frame', (event, message) => {
  const { webFrame } = require('electron');
  const frame = webFrame.findFrameByRoutingId(message);
  frame.executeJavaScript('Module.TOTAL_MEMORY = 2000000000;0');
});

// TODO: 这俩抽到别的文件里去
// 减速
var slow = false;

var fps = 15;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var draw;
// 劫持reqeustAnimationFrame
window['oldRequestAnimationFrame'] = window.requestAnimationFrame;
function genSkipFrame(func) {
  return () => {
    window['oldRequestAnimationFrame'](func);
  };
}
function tick(func) {
  if (slow) {
    if (typeof (func) === "function") draw = func;
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      var temp = draw;
      draw = null;
      window['oldRequestAnimationFrame'](temp);
    } else {
      window['oldRequestAnimationFrame'](tick);
    }
  } else {
    if (draw) func = draw;
    window['oldRequestAnimationFrame'](func);
  }
}
window.requestAnimationFrame = tick;

// 暂停
var pauseElement = document.createElement('div');
pauseElement.style.position = 'fixed';
pauseElement.style.top = '0';
pauseElement.style.left = '0';
pauseElement.style.zIndex = '10000';
pauseElement.style.height = '100%';
pauseElement.style.width = '100%';
pauseElement.style.backgroundColor = 'black';
pauseElement.style.opacity = '0.5';
var pause = false;
ipcRenderer.on('who-am-i', (event, message) => {
  console.log(location);
})
ipcRenderer.on('aigis-pause', (event, message) => {
  if (Module) {
    if (!pause) {
      Module.pauseMainLoop();
      document.body.appendChild(pauseElement);
      pause = true;
    } else {
      Module.resumeMainLoop();
      document.body.removeChild(pauseElement);
      pause = false;
    }
  }
});
ipcRenderer.on('aigis-tick', (event, message) => {
  slow = message;
});

var allMeta = {};
window.process = undefined;
window.require = undefined;
if (location.hostname === 'r.kamihimeproject.net') {
  window.require = undefined;
}
// if (location.hostname === 'assets.millennium-war.net') {
//   // 暂时屏蔽全年龄版
//   if (parent.parent.location.pathname.indexOf('aigisc') !== -1) {
//     // 全年龄
//   } else {
//     // R18
//     window.onload = () => {
//       /////////////////////////////
//       /// 魔改Live2D或者别的一些什么东西
//       /////////////////////////////
//       require('./aigisAnimate');
//       window[r18Meta.create] = function(d, c, b) {
//         var e;
//         e = 0 < tTb.length ? tTb.pop() : new Image();
//         e.src = A8(b);
//         // 在这里通过e.src来处理testCanvas的相应显示
//         var result = loadAnimate(e.src);
//         // G8[d] = e;
//         G8[d] = result || e;
//         sTb[c] = e;
//       };
//       window[r18Meta.remove] = function(d) {
//         // 在这里处理终止targetCanvas动画的相应工作
//         img = sTb[d];
//         img.src = '';
//         img.width = 0;
//         img.height = 0;
//         delete sTb[d];
//       };

//       window[r18Meta.delete] = function(d) {
//         if (G8[d].isCustomedCanvas) {
//           stopAnimate();
//         }
//         delete G8[d];
//       };
//     };
//   }
// }
