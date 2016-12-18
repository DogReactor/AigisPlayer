<template>
    <div class="collpase" :class={collpaseactive:isActive}>
        <div class="title" @click="titleClickFunction">
            <div class="titletext">{{title}}</div>
            <div class="arrowbox">
                <div class="arrow"></div>
            </div>
        </div>
        <div class="contentbox" v-bind:class="{active:isActive}" style="position:relative">
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:String
        },
        data:function(){
            return {
                isActive:false
            }
        },
        methods:{
            titleClickFunction:function(){
                this.isActive = !this.isActive;
                this.$emit("fuck","fuck");
            }
        },
        mounted:function(){
            this.$parent.$on('close',()=>{
                this.isActive = false;
            });
            this.$parent.$on('open',()=>{
                this.isActive = true;
            });
        }
    }
</script>

<style scoped>
    .collpase{
        padding:10px;
        transition:background-color 0.8s;
        position:relative;
    }
    .titletext{
        float:left;
        position:absolute;
        top:0;
        bottom:0;
        margin-top:5px;
    }
    .arrowbox{
        float:right;
        height:100%;
    }
    .arrow{
        border-right:1px white solid;
        border-bottom:1px white solid;
        transform:rotate(45deg);
        width:15px;
        height:15px;
        transition:all 0.8ms
    }
    .title{
        color:white;
        background-color:transparent;
        height:30px;
        position:relative;
        transition:all 0.8s;
    }
    .collpaseactive{
        background-color:darkslategray;
    }
    .collpaseactive .collpaseactive{
        background-color:darkslategray;
    }
    .contentbox{
        max-height:0px;
        color:white;
        transition:all 0.8s;
        margin-left:10px;
    }
    .active{
        max-height:1000px;
    }
</style>