<template>
    <div v-if='isrender'>
        <webview preload='./static/js/inject.js' :src.sync='src' v-show='show'> </webview>
        <game-select @select="selectFunction" v-show='!show'> </game-select>
    </div>
</template>

<script>
    import gameSelect from './game-select.vue'
    export default {
        props:{
            src:String,
            numid:Number,
            isrender:Boolean,
            muted:Boolean,
            globalmuted:Boolean,
            active:Boolean
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
                this.$emit('select-game',game,this.numid);
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
            }
        },
        mounted: function(){
            let webview = this.$el.children[0];
            let eventHub = this.$root.eventHub;
            webview.addEventListener('dom-ready', () => {
                if(webview.getURL().indexOf('app_id')!=-1)
                {
                    console.log("Done",webview.getURL());
                    webview.send("catch");  //通知页面进行调整
                }
                //自动输入用户名密码（暂时封印）
                /*if(webview.getURL().indexOf('login')!=-1 && webview.getURL().indexOf('logout')==-1){
                    console.log('sent');
                    if(usinguser != -1){
                        webview.send('login',{username:userlist[usinguser].username,password:userlist[usinguser].password});
                    }
                    else{
                        replaceClass(webview,'hidden','show');
                    }
                }*/
            });
            webview.addEventListener('did-finish-load',()=>{
                let zoom = this.$root.globalSetting.zoom;
                webview.setZoomFactor(zoom);
            });
            webview.addEventListener('did-fail-load',(event)=>{
                alert("页面加载失败 " + "\n错误描述：" + event.errorDescription +"\n" + "请检查网络连接和代理是否配置正确。");
            });
            this.$root.$on('refresh',()=>{
                if(this.active) webview.reload();
            });
            eventHub.$on('zoom-change',(zoom)=>{
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