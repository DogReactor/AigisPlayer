import Vue from 'vue'
import VueRouter from 'vue-router'
import navbar from '../components/navbar.vue'
import tabview from '../components/tabview.vue'
import gameInfo from './gameinfo.js'
import slideMenu from '../components/slide-menu.vue'

Vue.use(VueRouter);
const eventHub = new Vue();
const vm = new Vue({
  el: '#playermain',
  components : {navbar,tabview,slideMenu},
  data:{
    //Navbar上可爱的按钮们
    Buttons:[
      /*暂时不要你
      //Options
      {
        img:"./static/img/config.png",
        isRight:false,
        enabled:true,
        clickFunction:function(){
          console.log("Options!");
        }
      },*/
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
          usingUser : -1
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
    eventHub
  },
  methods:{
    //切换标签时调整窗口大小
    tabChangeFunction:function(index){
      this.activeGameInfo.id = index;
      let zoom = this.globalSetting.zoom;
      let game = this.tabviewData[index].selectedGame;
      let height = game != "none" ? gameInfo[game].height * zoom + 60 : gameInfo[game].height + 60;
      let width =  game != "none" ? gameInfo[game].width * zoom + 10 : gameInfo[game].width + 10;
      currentwindow.setSize(width,height);
    },
    //选择游戏
    selectGameFunction:function(game,id){
      this.activeGameInfo.id = id;
      let tabview = this.tabviewData[id];
      let zoom = this.globalSetting.zoom;
      tabview.selectedGame = game;
      tabview.title = gameInfo[game].title;
      //调整窗口大小
      let height = game != "none" ? gameInfo[game].height * zoom + 60 : gameInfo[game].height + 60;
      let width =  game != "none" ? gameInfo[game].width * zoom + 10 : gameInfo[game].width + 10;
      currentwindow.setSize(width,height);
      //读取游戏
      tabview.src = gameInfo[game].logoutURL;
    },
    setProxy:function(address,port){
      this.globalSetting.proxy.address = address;
      this.globalSetting.proxy.port = port;
      fs.writeFileSync('proxy.conf',JSON.stringify(this.globalSetting.proxy));
      if(this.globalSetting.proxy.enabled == false) return;
      let proxyaddress = this.globalSetting.proxy.address + ":" + this.globalSetting.proxy.port;
			ses.setProxy(
        {
            proxyRules:proxyaddress
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
            proxyRules:proxyaddress
        },
        ()=>{
          console.log("设置代理成功!",proxyaddress);
        }
			);
    }
  },
  created: function(){
    //这么早？？？
    //加载配置文件
    try{
      let proxyjson = fs.readFileSync('proxy.conf',{encoding:'utf8'});
      let proxy = JSON.parse(proxyjson);
      this.globalSetting.proxy.address = proxy.address != undefined ? proxy.address : "";
      this.globalSetting.proxy.port = proxy.port != undefined ? proxy.port : "";
      this.globalSetting.proxy.enabled = typeof proxy.enabled == "boolean" ? proxy.enabled : false;
    }
    catch(e){
      console.log(e);
      console.log("代理信息读取失败");
    }
  }
});