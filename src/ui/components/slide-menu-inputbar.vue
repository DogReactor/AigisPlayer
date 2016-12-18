<template>
    <div class="box">
        <div class="title">{{title}}</div>
        <input class="text" type="text" v-model="Atext"></div>
    </div>
</template>
<script>
    export default {
        props:{
            title:String,
            text:String
        },
        data:function(){
            return {
                Atext:this.text
            }
        },
        watch:{
            text: function(val){
                this.Atext = val;
            },
            Atext: function(val){
                this.$emit("change",val);
            }
        }
    }
</script>

<style scoped>
    .title{
        color:white;
        float:left;
    }
    .box{
        padding:10px;
        width:auto;
    }
    .text{
        float:right;
        text-align: right;
        width:130px;
    }
</style>