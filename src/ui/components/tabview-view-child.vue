<template>
    <div class="container" v-if='isrender'>
        <webview preload='./static/js/inject.js' src="about:blank" v-show='show' disablewebsecurity> </webview>
        <game-select @select="selectFunction" v-show='!show'> </game-select>
    </div>
</template>

<script>
    import gameSelect from './game-select.vue'
    import gameInfo from '../js/gameinfo.js'
    import decipher from '../js/decipher'
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
            let frames = [];
            let webcontents = null;
            webview.addEventListener('dom-ready', () => {
                webcontents = webview.getWebContents();
                //webview.openDevTools();
                //17/4/5 因为DMM修改链接，所以此处匹配规则也要相应修改
                if((webview.getURL().indexOf('app_id') != -1) || webview.getURL().indexOf('/play/') != -1)
                {
                    webview.send("catch");  //通知页面进行调整
                    decipher.attach(webview.getWebContents(),this.$root.eventHub,this.numid); //通知处理
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
            webview.addEventListener('ipc-message',(event)=>{
                console.log(event.channel);
                if(event.channel === "start-add-frames"){
                    frames = []
                }
                if(event.channel === "add-new-frame"){
                    frames.push(event.args[0]);
                }
                if(event.channel === "finish-add-frames"){
                    console.log('Finished');
                    console.log(frames);
                }
            });
            this.$root.$on('refresh',()=>{
                if(this.active) webview.reload();
            });
            this.$root.eventHub.$on('deepFresh',()=>{
                if(this.active) webview.loadURL(gameInfo[this.game].logoutURL);
            })
            this.$root.eventHub.$on('start-record',()=>{
                webcontents.endFrameSubscription();
                let lasttime = 0;
                frames = [];
                webcontents.beginFrameSubscription((frameBuffer,dirtyRect)=>{
                    //先采集后处理，靴靴
                    frames.push({
                        frameBuffer:frameBuffer,
                        width:dirtyRect.width,
                        height:dirtyRect.height
                    });
                });
            });
            this.$root.eventHub.$on('stop-record',()=>{
                if(frames.length === 0) return;
                let length = frames.length
                webcontents.endFrameSubscription();
                //frameBuffer BGRA <-Fuck
                //Use WebWorker --Use workers to convert not one ;It would make electron crash
                workerHandle(frames,0,this,[]);

                /*let w = new Worker('./static/js/BGRA-RGBA.worker.js');
                let self = this;
                w.onmessage = (event)=>{
                    if(event.data.type === "progress") console.log(event.data.data,length);
                    if(event.data.type === "result") {
                        self.$root.imgDatas = event.data.data;
                        self.$root.openGifEditor();
                    }
                }
                w.postMessage(frames);
                frames = [];*/
            });
            eventHub.$on('zoom-change',(zoom)=>{
                if(webview.setZoomFactor == undefined) return;
                webview.setZoomFactor(zoom);
            });

        }
    }

    function workerHandle(frames,index,vm,imgDatas){
        let w = new Worker('./static/js/BGRA-RGBA.worker.js');
        w.onmessage = (event)=>{
            console.log(index + 1,frames.length);
            imgDatas.push(event.data);
            index++;
            if(index === frames.length){
                vm.$root.imgDatas = imgDatas;
                vm.$root.openGifEditor();
            }
            else{
                workerHandle(frames,index,vm,imgDatas);
            }
        }
        w.postMessage(frames[index]);
    }
</script>

<style scoped>
    .container{
        height:100%;
    }
    webview{
        height:inherit;
    }
</style>