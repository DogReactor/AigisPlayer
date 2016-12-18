<template>
    <div class ='box'>
        <titlebar title="全局设置"></titlebar>
        <collpase title="代理设置"> 
            <config-proxy></config-proxy>
        </collpase>
        <collpase title="缩放">
            <div>
                <div style="float:left">（{{parseInt(zoom)+parseInt('100')}}％）</div>
                <range style="float:left" @change="zoomChangeFunction"></range>
            </div>
        </collpase>
        <switcher text="静音" :is-active="this.$root.globalSetting.muted" @click="muteFunction"> </switcher>
        <switcher text="保持在最前端" :is-active="this.$root.globalSetting.locked" @click="lockFunction" > </switcher>
        <selectbar title="清理缓存" @click="cacheClearFunction"> </selectbar>
        <collpase title="账号管理">
            <account-modify> </account-modify>
        </collpase>
    </div>
</template>

<script>
    import collpase from './slide-menu-collpase.vue'
    import switcher from './slide-menu-switch.vue'
    import range from './slide-menu-range.vue'
    import configProxy from './config-proxy.vue'
    import accountModify from './account-modify.vue'
    import gameInfo from '../js/gameinfo.js'
    import titlebar from './slide-menu-title.vue'
    import selectbar from './slide-menu-selectbar.vue'
    export default {
        components:{
            collpase,
            switcher,
            range,
            configProxy,
            titlebar,
            accountModify,
            selectbar
        },
        data:function(){
            return {
                zoom:0
            }
        },
        methods:{
            zoomChangeFunction: function(value){
                this.zoom = value;
                this.$root.globalSetting.zoom = (parseInt(value) + 100) / 100;
                let zoom = this.$root.globalSetting.zoom;
                this.$root.eventHub.$emit("zoom-change",this.$root.globalSetting.zoom);
                let id = this.$root.activeGameInfo.id;
                let game = this.$root.tabviewData[id].selectedGame;
                if(game == "none") return;
                let height = parseInt(gameInfo[game].height * zoom + 60);
                let width = parseInt(gameInfo[game].width * zoom);
                currentwindow.setSize(width,height);
            },
            muteFunction: function(){
                this.$root.globalSetting.muted = !this.$root.globalSetting.muted;
            },
            lockFunction: function(){
                this.$root.globalSetting.locked = !this.$root.globalSetting.locked;
                currentwindow.setAlwaysOnTop(this.$root.globalSetting.locked);
            },
            cacheClearFunction: function(){
                this.$root.eventHub.$emit('cache-clear');
            }
        }
    }
</script>

<style scoped>
</style>