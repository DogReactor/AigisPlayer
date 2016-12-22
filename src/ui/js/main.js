import Vue from 'vue'
import VueRouter from 'vue-router'
import navbar from '../components/navbar.vue'
import tabview from '../components/tabview.vue'
import gameInfo from './gameinfo.js'
import slideMenu from '../components/slide-menu.vue'
import xml2json from './xml2json'

Vue.use(VueRouter);
const eventHub = new Vue();
const vm = new Vue({
  el: '#playermain',
  components : {navbar,tabview,slideMenu},
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
      proxy:{
        address:"",
        port:"",
        enabled:false
      }
    },
    activeGameInfo:{
      id:0
    },
    eventHub,
    accounts:[]
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
      this.globalSetting.proxy.address = address;
      this.globalSetting.proxy.port = port;
      fs.writeFileSync('proxy.conf',JSON.stringify(this.globalSetting.proxy));
      if(this.globalSetting.proxy.enabled == false) return;
      let proxyaddress = this.globalSetting.proxy.address + ":" + this.globalSetting.proxy.port;
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
      fs.writeFileSync('proxy.conf',JSON.stringify(this.globalSetting.proxy));
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
      let arr = [];
      if(this.accounts.length == 0) return;
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
      fs.writeFileSync('user.conf',JSON.stringify(arr));
    }
  },
  created: function(){
    //这么早？？？
    //加载代理配置文件
    try{
      let proxyjson = fs.readFileSync('proxy.conf',{encoding:'utf8'});
      let proxy = JSON.parse(proxyjson);
      this.globalSetting.proxy.address = proxy.address != undefined ? proxy.address : "";
      this.globalSetting.proxy.port = proxy.port != undefined ? proxy.port : "";
      this.globalSetting.proxy.enabled = typeof proxy.enabled == "boolean" ? proxy.enabled : false;
      this.setProxyEnabled();
    }
    catch(e){
      console.log(e);
      console.log("代理信息读取失败");
    }
    //加载用户信息
    try{
      let userjson = fs.readFileSync('user.conf',{encoding:'utf8'});
      this.accounts = JSON.parse(userjson);
    }
    catch(e){
      console.log(e);
      console.log("用户信息读取失败");
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
      eventHub.$emit('deepFresh');
      //通知侧边栏
      eventHub.$emit('main-account-selected',this.activeGameInfo.id);
    });
    eventHub.$on('cache-clear',()=>{
      ses.clearCache(()=>{
        alert("清理缓存成功");
      });
    });

    eventHub.$on('XHR-xml-data',function(path,body){
      console.log(path);
      console.log(body);
    });

  },
  mounted: function(){
    eventHub.$emit('tabChanged',0);
  }
});