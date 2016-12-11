<template>
    <div class="switch" @click="clickFunction">
        <div class="text">
            {{text}}
        </div>
        <div class="button-box">
            <div class="plate">
                <div class="button" :class="{active:isActive}"> </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            text:String,
            isActive:Boolean
        },
        methods:{
            clickFunction:function(){
                this.$emit("click");
            }
        }
    }
</script>

<style scoped>
    .switch{
        padding:10px;
        position:relative;
        color:white;
        height:30px;
    }
    .text{
        float:left;
        margin-top:5px;
    }
    .button-box{
        float:right;
        margin-top:7.5px;
    }
    .plate{
        background-color:white;
        height:15px;
        width:50px;
    }
    .button{
        padding:0;
        margin:0;
        background-color:lightgray;
        height:15px;
        width:25px;
        transition:all 0.8s;
    }
    .active{
        background-color:#00bfff;
        margin-left:25px;
    }
</style>