<template>
    <div>
        <titlebar title="插件管理"> </titlebar>
        <collpase v-for="(item,index) in pluginsinfo" :title="item.pluginName">
            <textbar title="作者" :text="item.author"> </textbar>
            <textbar title="版本" :text="item.version"> </textbar>
            <textbar title="介绍" :text="item.description"> </textbar>
            <btn text="启动" :is-active="!item.actived" @click="btnClickFunction(index)"> </btn>
        </collpase>
    </div>
</template>

<script>
    import collpase from './slide-menu-collpase.vue'
    import textbar from './slide-menu-text.vue'
    import switcher from './slide-menu-switch.vue'
    import titlebar from './slide-menu-title.vue'
    import btn from './slide-menu-button.vue'
    export default {
        components:{
            collpase,
            textbar,
            switcher,
            titlebar,
            btn
        },
        props:{
            pluginsinfo:Array
        },
        methods:{
            btnClickFunction:function(index){
                this.$root.eventHub.$emit('active-plugin',index);
            }
        }
    }
</script>

<style scoped>

</style>