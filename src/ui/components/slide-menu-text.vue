<template>
    <div class="box">
        <div class="title">{{title}}</div>
        <div class="text">{{text}}</div>
    </div>
</template>
<script>
    export default {
        props:{
            title:String,
            text:String
        }
    }
</script>

<style scoped>
    .title{
        color:white;
        float:left;
    }
    .text{
        color:white;
        float:right;
    }
    .box{
        padding:10px;
        width:auto;
    }
</style>