<template>
    <div @click="clickFunction" :style='styleObject' @dblclick="dbclickFunction" v-if='isrender'>
        <p>{{title}}</p>
    </div>
</template>
<script>
    export default {
        props:{
            title:String,
            numid:Number,
            selected:Number,
            isrender:Boolean
        },
        data:function(){
            return{
                styleObject:{
                    'border-bottom' : this.numid == this.selected ? '1px solid #D2E9FF':'0px',
                    'background' : this.numid == this.selected ? '#D2E9FF':'white'
                }
            }
        },
        methods:{
            clickFunction:function(){
                this.$emit('select');
            },
            dbclickFunction:function(){
                this.$emit('close');
            }
        },
        watch:{
            selected: function(newValue){
                this.styleObject['border-bottom'] = this.numid == newValue ? '1px solid #D2E9FF':'0px';
                this.styleObject['background'] = this.numid == newValue ? '#D2E9FF':'white';
            }
        }
    }
</script>

<style scoped>
    div {
        float:left;
        width:100px;
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