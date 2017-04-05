import Vue from 'vue'
import VueRouter from 'vue-router'
import navbar from '../components/navbar.vue'
import tabview from '../components/tabview.vue'
import gameInfo from './gameinfo.js'
import slideMenu from '../components/slide-menu.vue'
import gifEditor from '../components/gif-editor.vue'
import xml2json from './xml2json'
import pluginManager from './pluginManager.js'

const pluginEvent = {
  'EeLcL7hN':'quest-success',  //statusUpdate
  'uD69xeaG':'quest-start',    //statusUpdate
  'shxnpXtj':'login-status',   //statusUpdate
  'qX5kSDt2':'login-status2',  //statusUpdate
  '0kR1cNJJ':'inin-result',    //statusUpdate
  'udh6JQRa':'base-gacha-result',
  'btcntJ9k':'sp-gacha-result',
  'yObCmn3i':'premium1-gacha-result',
  'plXgfdjN':'premium2-gacha-result',
  'bnz8xWXB':'unit-move',
  'oS5aZ5ll':'allunits-info',
  'pP8JgbjO':'unit-sell',
  'igmn1XCf':'buy-charisma',
  'QxZpjdfV':'all-quest-info',
  'uE23SxBr':'none',
  'd4YRCAQa':'none',
  'GRs733a4':'allcards-info',           //全单位信息
  'foi6moes':'none',
  'TPCta1SK':'time-init',
  'R5FHPbQb':'watch',
  'i4u2L2LJ':'orb-init',
  'Y0d4Yhj1':'none',
  'E935RTof':'none',
  'PeMDvjps':'test',
  'jWbtv5NR':'heart', //心跳
  'AekvKZk6':'none',
  'zzdfsknw':'present-info',
  'eZ5wrQTH':'crystal-change',
  'kgiqvp4a':'crystal-init'
}

const eventHub = new Vue();
Vue.use(VueRouter);

const vm = new Vue({
  el: '#playermain',
  components : {navbar,tabview,slideMenu,gifEditor},
  data:{
    //Navbar上可爱的按钮们
    Buttons:[
      //Options
      {
        img:"./static/img/config.png",
        isRight:false,
        enabled:true,
        clickFunction:function(){
          eventHub.$emit('slideMenuActive');
        }
      },
      //ReFresh
      {
        img:"./static/img/small-refresh.png",
        isRight:false,
        enabled:true,
        clickFunction:function(){
          //通知当前标签页刷新
          vm.$emit("refresh");
        }
      },
      {
        img:"./static/img/record.png",
        isRight:false,
        enabled:true,
        clickFunction:()=>{
          //vm.openGifEditor();
          eventHub.$emit('start-record');
        }
      },
      {
        img:"./static/img/stop.png",
        isRight:false,
        enabled:true,
        clickFunction:function(){
          //停止录制
          eventHub.$emit('stop-record');
          //if(vm.$data.gif !== null) vm.$data.gif.render();
        }
      },
      //muted
      {
        img:"./static/img/small-music.png",
        isRight:true,
        enabled:true,
        clickFunction:()=>{
          //Slience！
          vm.globalSetting.muted = !vm.globalSetting.muted;
        }
      }
    ],
    tabviewData:[
      {
          numid:0,
          title:'新标签页',
          src:'about:blank',
          show : true,
          isrender : true,
          selectedGame : "none",
          usingUser : -1,
          titleLock:false,
          account:null
      }
    ],
    globalSetting:{
      muted:false,
      locked:false,
      zoom:1,
      disableAccelerated:false,
      proxy:{
        address:"",
        port:"",
        enabled:false,
        socks5:false
      }
    },
    activeGameInfo:{
      id:0
    },
    eventHub,
    accounts:[],
    pluginsInfo:undefined,
    gif:null,
    imgDatas:[],
    isEditorShow: false
  },
  methods:{
    //切换标签时调整窗口大小
    tabChangeFunction:function(index){
      this.activeGameInfo.id = index;
      let zoom = this.globalSetting.zoom;
      let game = this.tabviewData[index].selectedGame;
      let height = game != "none" ? gameInfo[game].height * zoom + 60 : gameInfo[game].height + 60;
      let width =  game != "none" ? gameInfo[game].width * zoom : gameInfo[game].width;
      currentwindow.setSize(parseInt(width),parseInt(height));
      //通知
      eventHub.$emit('tabChanged',index);
    },
    //选择游戏
    selectGameFunction:function(game,id){
      this.activeGameInfo.id = id;
      let tabview = this.tabviewData[id];
      let zoom = this.globalSetting.zoom;
      tabview.selectedGame = game;
      if(!tabview.titleLock) tabview.title = gameInfo[game].title;
      //调整窗口大小
      let height = game != "none" ? gameInfo[game].height * zoom + 60 : gameInfo[game].height + 60;
      let width =  game != "none" ? gameInfo[game].width * zoom : gameInfo[game].width;
      currentwindow.setSize(parseInt(width),parseInt(height));
      //设置自动登录账号（在该账号没有使用及没有选择账号的情况下）
      if(this.tabviewData[this.activeGameInfo.id].account == null){
        for(let i in this.accounts){
          if(this.accounts[i].default == true && this.accounts[i].usedOn == null){
                let thistab = this.tabviewData[this.activeGameInfo.id];
                thistab.account = {
                  index:i,
                  tag:this.accounts[i].tag,
                  username:this.accounts[i].username,
                  password:this.accounts[i].password
                };
                this.accounts[i].usedOn = this.activeGameInfo.id;
          }
        }
      }
      //读取游戏
      tabview.src = gameInfo[game].logoutURL;
      //通知
      eventHub.$emit('gameSelected',id);
    },
    setProxy:function(address,port){
      if(this.saveConfigFile == undefined) return;
      this.globalSetting.proxy.address = address;
      this.globalSetting.proxy.port = port;
      this.saveConfigFile();
      if(this.globalSetting.proxy.enabled == false) return;
      //let proxyaddress = this.globalSetting.proxy.address + ":" + this.globalSetting.proxy.port;
      let proxyaddress = this.globalSetting.proxy.address + ":" + this.globalSetting.proxy.port;
      if(this.globalSetting.proxy.socks5) proxyaddress = "socks5://" + proxyaddress;
			ses.setProxy(
        {
            proxyRules:proxyaddress,
            proxyBypassRules:"127.0.0.1"
        },
        ()=>{
          console.log("设置代理成功!",proxyaddress);
        }
			);
    },
    setProxyEnabled:function(){
      let proxyaddress = this.globalSetting.proxy.enabled ? this.globalSetting.proxy.address + ":" + this.globalSetting.proxy.port : "direct://";
      if(this.globalSetting.proxy.socks5 && proxyaddress != "direct://") proxyaddress = "socks5://" + proxyaddress;
      if(this.saveConfigFile != undefined) this.saveConfigFile();
			ses.setProxy(
        {
            proxyRules:proxyaddress,
            proxyBypassRules:"127.0.0.1"
        },
        ()=>{
          console.log("设置代理成功!",proxyaddress);
        }
			);
    },
    saveAccountList:function(){
      this.saveConfigFile();
    },
    saveConfigFile:function(){
      let obj = this.globalSetting;
      let arr = [];
      for(let index in this.accounts){
        //跳过空的
        if(this.accounts[index].username == "" && this.accounts[index].password == "") continue;
        let obj = {
          tag : this.accounts[index].tag,
          username : this.accounts[index].username,
          password : this.accounts[index].password,
          default : this.accounts[index].default
        };
        arr.push(obj);
      }

      obj.accounts = arr;
      fs.writeFileSync('config.conf',JSON.stringify(obj));
      console.log('保存成功');
    },
    openGifEditor:function(){
      this.isEditorShow = true;
    }
  },
  created: function(){
    //这么早？？？
    //加载配置文件
    try{
      let settingjson = fs.readFileSync('config.conf',{encoding:'utf8'});
      let setting = JSON.parse(settingjson);
      let proxy = setting.proxy;
      this.globalSetting.proxy.address = proxy.address != undefined ? proxy.address : "";
      this.globalSetting.proxy.port = proxy.port != undefined ? proxy.port : "";
      this.globalSetting.proxy.enabled = typeof proxy.enabled == "boolean" ? proxy.enabled : false;
      this.globalSetting.proxy.socks5 = typeof proxy.socks5 == "boolean" ? proxy.socks5 : false;
      this.setProxyEnabled();

      this.globalSetting.disableAccelerated = typeof setting.disableAccelerated == "boolean" ? setting.disableAccelerated : false;
      this.globalSetting.zoom = setting.zoom != undefined ? setting.zoom : 1;
      this.accounts = setting.accounts instanceof Array ? setting.accounts : [];
    }
    catch(e){
      console.log(e);
      console.log("设置读取失败");
    }
    //绑定监听事件
    eventHub.$on('pageinfo-tagname-change',(e)=>{
      this.tabviewData[this.activeGameInfo.id].title = e;
      this.tabviewData[this.activeGameInfo.id].titleLock = true;
    });

    eventHub.$on('account-changed',(e)=>{
      this.accounts[e.index].tag = e.tag;
      this.accounts[e.index].username = e.username;
      this.accounts[e.index].password = e.password;
      if(this.accounts[e.index].default == false && e.default == true){
        //将其他用户设定为非默认
        for(let i in this.accounts){
          if(i == e.index) this.accounts[i].default = true;
          else this.accounts[i].default = false;
        }
      }
      else this.accounts[e.index].default = e.default;
      this.saveAccountList();
      for(let i in this.tabviewData){
        if(this.tabviewData[i].account == null) continue;
        if(this.tabviewData[i].account.index == e.index){
          this.tabviewData[i].account.username = e.username;
          this.tabviewData[i].account.username = e.password;
        }
      }
    });

    eventHub.$on('account-delete',(index)=>{
      this.accounts.splice(index,1);
      this.saveAccountList();
      for(let i in this.tabviewData){
        if(this.tabviewData[i].accounts.index == index){
          this.tabviewData[i].accounts = null;
        }
      }

    });
    eventHub.$on('account-create',()=>{
      this.accounts.push({
        tag:"新账户",
        username:"",
        password:"",
        default:false
      });
      eventHub.$emit('account-modify-open-last-one');
    });

    eventHub.$on('pageinfo-account-select',(index)=>{
      let thistab = this.tabviewData[this.activeGameInfo.id];
      thistab.account = {
        index:index,
        tag:this.accounts[index].tag,
        username:this.accounts[index].username,
        password:this.accounts[index].password
      };
      this.accounts[index].usedOn = this.activeGameInfo.id;

      //呼叫页面刷新
      if(thistab.selectedGame !== 'none') ventHub.$emit('deepFresh');
      //通知侧边栏
      eventHub.$emit('main-account-selected',this.activeGameInfo.id);
    });
    eventHub.$on('cache-clear',()=>{
      ses.clearCache(()=>{
        alert("清理缓存成功");
      });
    });

    eventHub.$on('XHR-xml-data',function(path,body,id){
      path = path.slice(path.lastIndexOf('/')+1);
      let type = pluginEvent[path];
      if(type == undefined || type == 'none') return;
      let obj = xml2json(body);
      if(obj.DA != undefined) obj = obj.DA;
      console.log(path,obj);
      eventHub.$emit('new-game-data',{
        type:type,
        obj:obj,
        tabId:id
      });
    });

    eventHub.$on('active-plugin',function(index){
      plugin.activePlugin(index);
    })

    //GIF录制事件
    eventHub.$on('add-new-frame',(data)=>{
      if(this.gif === null) return;
      //转换数组
      let pxData = Uint8ClampedArray.from(data.data);
      let imageData = new ImageData(pxData,data.width,data.height);
      this.gif.addFrame(imageData,{delay: 200});
    });
    //GIF编辑器
    eventHub.$on('editor-close',()=>{
      this.isEditorShow = false;
    })
  },
  mounted: function(){
    eventHub.$emit('tabChanged',0);
  }
});

const plugin = new pluginManager(eventHub);
console.log(plugin);
plugin.readPluginsInfo(fs,()=>{
    vm.pluginsInfo = plugin.pluginsInfo;
});