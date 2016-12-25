<template>
    <div><a @click="clickFunction" class="button btn" :class="{btnactive:isActive}">{{text}}</a></div>
</template>

<script>
    export default {
        props:{
            text:String,
            isActive:Boolean
        },
        methods:{
            clickFunction:function(){
                if(this.isActive)  this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .btn{
        background-color:#EEE;
        color:gray;
        cursor:default;
    }
    .btnactive{
        background-color:#2798eb;
        color:white;
    }
    .btnactive:hover{
        background-color:#4cb0f9;
    }
    .button{
        margin:auto;
        border-color:#EEE;
        font-weight:300;
        text-align:center;
        display:inline-block;
        border:none;
        transition:all .3s;
        border-radius:200px;
        font-size:12px;
        height:24px;
        line-height:24px;
        padding:0 24px;
        margin:5px;
    }
    div{
        text-align:center
    }
</style>