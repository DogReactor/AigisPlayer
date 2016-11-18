import Vue from 'vue'
import VueRouter from 'vue-router'
import navbar from '../components/navbar.vue'
import tabview from '../components/tabview.vue'

Vue.use(VueRouter);

const vm = new Vue({
  el: '#playermain',
  components : {navbar,tabview},
  data:{
    //Navbar上可爱的按钮们
    Buttons:[
      //Options
      {
        img:"./static/img/config.png",
        isRight:false,
        enabled:true,
        clickFunction:function(){
          console.log("Options!");
        }
      },
      //ReFresh
      {
        img:"./static/img/small-refresh.png",
        isRight:false,
        enabled:true,
        clickFunction:function(){
          console.log("ReFresh!!!!!!!");
        }
      },
      //Lock
      {
        img:"./static/img/small-lock.png",
        isRight:true,
        enabled:true,
        clickFunction:function(){
          console.log("L!O!C!K!");
        }
      },
      //Zoom
      {
        img:"./static/img/small-search.png",
        isRight:true,
        enabled:true,
        clickFunction:function(){
          console.log("Zooooom!!!");
        }
      },
      //Mute
      {
        img:"./static/img/small-music.png",
        isRight:true,
        enabled:true,
        clickFunction:function(index){
          console.log("Mute!!!!!!!!",index);
          vm.Buttons[index].enabled = !vm.Buttons[index].enabled;
        }
      }
    ],
    //默认标签们
    tabs:[
      {
        numid:0,
        title:'百度'
      }
    ],
    views:[
      {
        numid:0,
        src:'http://www.baidu.com',
        show : true
      }
    ]
  }
})