<template>
    <div v-if='isrender'>
        <webview preload='./static/js/inject.js' src="about:blank" v-show='show'> </webview>
        <game-select @select="selectFunction" v-show='!show'> </game-select>
    </div>
</template>

<script>
    import gameSelect from './game-select.vue'
    import gameInfo from '../js/gameinfo.js'
    export default {
        props:{
            src:String,
            numid:Number,
            isrender:Boolean,
            muted:Boolean,
            globalmuted:Boolean,
            active:Boolean,
            game:String,
            account:{
                default:null    
            }
        },
        data:function(){
            return {
                show:false
            }
        },
        components:{
            'game-select':gameSelect
        },
        methods:{
            selectFunction:function(game){
                this.show = !this.show;
                setTimeout(()=>{
                    this.$emit('select-game',game,this.numid);
                },500);
            }
        },
        watch:{
            muted:function(muted){
                muted = !muted && !this.globalmuted;
                let webview = this.$el.children[0];
                webview.setAudioMuted(!muted);
            },
            globalmuted:function(muted){
                if(this.$el.children != undefined){
                    muted = !muted && !this.muted;
                    let webview = this.$el.children[0];
                    webview.setAudioMuted(!muted);
                }
            },
            src:function(v){
                let webview = this.$el.children[0];
                console.log(v);
                if(webview.loadURL != undefined) webview.loadURL(v);
            }
        },
        mounted: function(){
            let webview = this.$el.children[0];
            let eventHub = this.$root.eventHub;
            webview.addEventListener('dom-ready', () => {
                //webview.openDevTools();
                if((webview.getURL().indexOf('app_id') != -1) || webview.getURL().indexOf('/play/') != -1)
                {
                    webview.send("catch");  //通知页面进行调整
                }
                //自动输入用户名密码
                if(webview.getURL().indexOf('login')!=-1 && webview.getURL().indexOf('logout')==-1){
                    if(this.account == null) return;
                    webview.send('login',{username:this.account.username,password:this.account.password});
                }
            });
            webview.addEventListener('did-finish-load',()=>{
                let zoom = this.$root.globalSetting.zoom;
                webview.setZoomFactor(zoom);
            });
            webview.addEventListener('did-fail-load',(event)=>{
                console.log(event);
                if(event.errorDescription == "" || event.errorDescription == "ok" || event.isMainFrame == false) return;
                alert("页面加载失败 " + "\n错误描述：" + event.errorDescription +"\n" + "请检查网络连接和代理是否配置正确。");
            });
            this.$root.$on('refresh',()=>{
                if(this.active) webview.reload();
            });
            this.$root.eventHub.$on('deepFresh',()=>{
                if(this.active) webview.loadURL(gameInfo[this.game].logoutURL);
            })
            eventHub.$on('zoom-change',(zoom)=>{
                if(webview.setZoomFactor == undefined) return;
                webview.setZoomFactor(zoom);
            });

        }
    }
</script>

<style scoped>
    webview{
        height:inherit;
    }
</style>