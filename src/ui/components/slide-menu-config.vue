<template>
    <div id='config'>
        <collpase title="代理设置"> 
            <config-proxy></config-proxy>
        </collpase>
        <collpase title="缩放">
            <div>
                <div style="float:left">（{{parseInt(zoom)+parseInt('100')}}％）</div>
                <range style="float:left" @change="zoomChangeFunction"></range>
            </div>
        </collpase>
        <switcher text="静音" :isActive="this.$root.globalSetting.muted" @click="muteFunction"> </switcher>
        <switcher text="保持在最前端" :isActive="this.$root.globalSetting.locked" @click="lockFunction" > </switcher>
    </div>
</template>

<script>
    import collpase from './slide-menu-collpase.vue'
    import switcher from './slide-menu-switch.vue'
    import range from './slide-menu-range.vue'
    import configProxy from './config-proxy.vue'
    import gameInfo from '../js/gameinfo.js'
    export default {
        components:{
            collpase,
            switcher,
            range,
            configProxy
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
                let height = gameInfo[game].height * zoom + 60;
                let width = gameInfo[game].width * zoom + 10;
                currentwindow.setSize(width,height);
            },
            muteFunction: function(){
                this.$root.globalSetting.muted = !this.$root.globalSetting.muted;
            },
            lockFunction: function(){
                this.$root.globalSetting.locked = !this.$root.globalSetting.locked;
                currentwindow.setAlwaysOnTop(this.$root.globalSetting.locked);
            }
        }
    }
</script>

<style>
</style>