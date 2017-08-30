<template>
    <div @click="clickFunction" @mousedown="mouseDownFunction($event)" :style='styleObject' @dblclick="dbclickFunction" v-if='isrender'>
        <p>{{title}}<button class="close-botton" @click.stop="closeTabFunction">×</button></p>
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
            mouseDownFunction: function(event) {
                // 低版本vue无法接受@click.middle所以只能这么干
                if(event.button === 1) {
                    this.closeTabFunction();
                }
            },
            dbclickFunction:function(){
                this.closeTabFunction();
            },
            closeTabFunction: function(){
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
        font-size:13px;
        margin:0px;
        margin-top:7px;
        text-align: center;
    }
    button.close-botton {
        background: none;
        border: none;
        font-size: 1em;
        height: 1em;
        width: 1em;
        padding: 0;
        line-height: 1em;
        border-radius: 50%;
    }
    button.close-botton:hover {
        background: rgba(0, 0, 0, 0.1);
    }
</style>