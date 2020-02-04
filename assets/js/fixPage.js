ipcrender.on('catch', (event, message) => {
  console.log = consoleLog;
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
  var gameFrame = document.getElementById('game_frame');
  if (gameFrame === null) ipcrender.sendToHost('url', 'error');
  else {
    gameFrame.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    if (message === 'kamihime') {
      gameFrame.style.top = '-28px';
      gameFrame.style.left = '-150px';
      gameFrame.style.zIndex = '25';
    }
    if (message === 'fkg') {
      gameFrame.style.top = '-6px';
      gameFrame.style.left = '-60px';
      gameFrame.style.zIndex = '25';
    }
    if (message === 'aigis' || message === 'oshiro') {
      gameFrame.style.top = '0';
      gameFrame.style.left = '0';
      gameFrame.style.zIndex = '25';
      gameFrame.style.marginLeft = '-5px';
    }
    if (message === 'kankore') {
      gameFrame.style.top = '-16px';
      gameFrame.style.left = '0';
      gameFrame.style.zIndex = '1000';
    }
    if (message === 'unitia') {
      gameFrame.style.top = '-52px';
      gameFrame.style.left = '0';
      gameFrame.style.zIndex = '5000';
    }
    if (message === 'necro') {
      gameFrame.style.top = '-35px';
      gameFrame.style.left = '-22px';
      gameFrame.style.zIndex = '5000';
    }
  }
});

ipcrender.on('change', (event, message) => {
  document.getElementById('content').style.position = 'fixed';
  ipcrender.sendToHost('changesuccess');
});

ipcrender.on('frame', (event, message) => {
  console.log(message);
  const { webFrame } = require('electron');
  const frame = webFrame.findFrameByRoutingId(message);
  frame.executeJavaScript('Module.TOTAL_MEMORY = 2000000000');
});

if (location.hostname === 'assets.millennium-war.net') {
  // 暂时屏蔽全年龄版
  if (parent.parent.location.pathname.indexOf('aigisc') !== -1) {
    // 全年龄
  } else {
    // R18
    window.onload = () => {
      /////////////////////////////
      /// 魔改Live2D或者别的一些什么东西
      /////////////////////////////
      require('./aigisAnimate');
      var oldHIb = HIb;
      var newHIb = function(d, c, b) {
        var e;
        e = 0 < tTb.length ? tTb.pop() : new Image();
        e.src = A8(b);
        // 在这里通过e.src来处理testCanvas的相应显示
        var result = loadAnimate(e.src);
        // G8[d] = e;
        G8[d] = result || e;
        sTb[c] = e;
      };
      HIb = newHIb;

      var old$Ib = $Ib;
      var new$Ib = function(d) {
        // 在这里处理终止targetCanvas动画的相应工作
        img = sTb[d];
        img.src = '';
        img.width = 0;
        img.height = 0;
        delete sTb[d];
      };
      $Ib = new$Ib;

      var olduTb = uTb;
      uTb = uTb = function(d) {
        if (G8[d].isCustomedCanvas) {
          stopAnimate();
        }
        delete G8[d];
      };
    };
  }
}
