<template>
    <div class="top" :class="{active:isActive}">
        <page-info></page-info>
        <div :is="currentView" @zoom-change="zoomChangeFunction"></div>
    </div>
</template>
<script>
    import slideMenuConfig from './slide-menu-config.vue'
    import pageInfo from './slide-menu-pageinfo.vue'
    export default {
        data:function(){
            return {
                currentView : 'config',
                isActive : false
            }
        },
        components:{
            config : slideMenuConfig,
            pageInfo : pageInfo
        },
        methods:{
            zoomChangeFunction: function(zoom){
                this.$emit("zoom-change",zoom);
            }
        },
        mounted:function(){
            this.$root.eventHub.$on('slideMenuActive',()=>{
                this.isActive = !this.isActive;
            });
        }
    }
</script>
<style scoped>
    .top{
        height:100%;
        width:300px;
        top:0;
        position:absolute;
        visibility: hidden;
        left:-300px;
        transition:all 1s;
        z-index:50;
        background:lightslategray;
        overflow:auto;
        box-shadow:0px 0px 20px 1px black;
    }
    .active{
        left:0px;
        visibility: unset;
    }
    ::-webkit-scrollbar{
        width:0px;
    }
</style>