<template>
    <div @click="clickFunction">
        <textbar :title="title" text="" :class="{active:active}"> </textbar>
    </div>
</template>

<script>
    import textbar from "./slide-menu-text.vue"
    export default {
        components:{
            textbar
        },
        props:{
            title:String,
            active:Boolean
        },
        methods:{
            clickFunction: function(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .active{
        background-color:#2798eb;
        color:white;
    }
</style>