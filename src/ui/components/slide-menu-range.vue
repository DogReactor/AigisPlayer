<template>
    <div class="box">
        <input type="range" v-model="value" min="-20" max="50" step="10"/>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                value:0
            }
        },
        watch:{
            value:function(newValue){
                this.$emit("change",newValue);
            }
        }
    }
</script>
<style>
    .box {
        height:30px;
        position:relative;
        width:100%;
    }
    input[type=range] {   
        -webkit-appearance: none;
        height:30px;
        width:100%;
        background-color:transparent;
        position:absolute;
        left:0;
        right:0;
        margin:auto;
    }
    input[type=range]::-webkit-slider-thumb {   
        -webkit-appearance: none; 
        border: 1.5px solid darkgray;   
        height: 25px;   
        width: 25px;   
        border-radius: 30px;   
        background:  #99e5ff;   
        cursor: pointer;   
        margin-top: -9.5px; /* 在Chrome下你需要定义一个margin值, 但在Firefox和IE下，是自动的 */  
    }
    input[type=range]:focus {   
        outline: none; /* 去掉默认蓝色边框 */  
    }
    input[type=range]::-webkit-slider-runnable-track {   
        width: 200px;   
        height: 7.5px;
        cursor: pointer;
        border-radius: 5px;   
        background: lightgray;    
        border: 0.2px solid darkgray;   
    }   
    input[type=range]:focus::-webkit-slider-runnable-track {   
        background: gray 
    }   
</style>