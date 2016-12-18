<template>
    <h1>{{title}}</h1>
</template>

<script>
    export default {
        props:{
            title:String
        }
    }
</script>

<style scoped>
    h1{
        color:white;
        margin:10px;
        font-size:20px;
    }
</style>