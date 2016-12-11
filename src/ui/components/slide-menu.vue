<template>
    <div class="top">
        <div :is="currentView" @zoom-change="zoomChangeFunction">
        </div>
    </div>
</template>
<script>
    import slideMenuConfig from './slide-menu-config.vue'
    export default {
        data:function(){
            return {
                currentView : 'config'
            }
        },
        components:{
            config : slideMenuConfig
        },
        methods:{
            zoomChangeFunction: function(zoom){
                this.$emit("zoom-change",zoom);
            }
        }
    }
</script>
<style scoped>
    .top{
        height:100%;
        width:300px;
        top:0;
        position:absolute;
        left:-290px;
        transition:all 1s;
        z-index:50;
        background:lightslategray;
    }
    .top:hover{
        left:0px;
    }
</style>