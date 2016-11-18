<template>
    <div @click="clickFunction">
        <p>+</p>
    </div>
</template>
<script>
    export default {
        methods:{
            clickFunction:function(){
                this.$emit('add');
            }
        }
    }
</script>
<style scoped>
    div {
        float:left;
        width:50px;
        border-right: 1px solid lightgray;
        border-bottom:0px;
        border-top:0px;
    }
    p {
        margin:0px;
        margin-top:4px;
        text-align: center;
    }
</style>