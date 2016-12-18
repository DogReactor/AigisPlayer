<template>
    <collpase title="账户选择"> 
        <selectbar v-for="(item,index) in accounts" :title="item.tag" @click="clickFunction(index)"></selectbar>
    </collpase>
</template>

<script>
    import collpase from "./slide-menu-collpase.vue"
    import selectbar from "./slide-menu-selectbar.vue"
    export default {
        components:{
            collpase,
            selectbar
        },
        props:{
            accounts:Array,
            selectindex:Number
        },
        methods:{
            clickFunction:function(index){
                this.$emit("select",index);
            }
        }
    }
</script>

<style scoped>
</style>