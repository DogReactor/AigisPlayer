<template>
    <div id="gameselect" style="height:452px; background-color:black;margin-top:-2">
             <div style="background-image:url(./static/img/aigis.jpg)" @click='selectFunction("aigis")'></div>
             <div style="background-image:url(./static/img/aigisr.jpg)" @click='selectFunction("aigisR")'></div>
             <div style="background-image:url(./static/img/oshirore.jpg)" @click='selectFunction("oshirore")'></div>
    </div>
</template>
<script>
    export default {
        methods:{
            selectFunction:function(game){
                this.$emit('select',game);
                
            }
        }
    }
</script>
<style scoped>
    div div{
        height:150px;
        background-color: white;
        border-top: 1px solid;
        opacity:0.4;
        transition: all 0.5s;
    }
    div div:hover{
        opacity:1.0;
    }
</style>