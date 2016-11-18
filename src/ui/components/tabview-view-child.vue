<template>
    <webview preload='./static/js/inject.js' :src='src' :yellow='numid'> </webview>
</template>

<script>
    export default {
        props:{
            src:String,
            numid:Number
        }
    }
</script>

<style scoped>
    webview{
        height:900px;
    }
</style>