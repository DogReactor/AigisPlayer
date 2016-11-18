<template>
    <div>
        <tabview-bar-button v-for="(item,index) in tabs" :title='item.title' @select='selectFunction(index)' :numid='item.numid' :selected='selected' @close='closeFunction(index)'> </tabview-bar-button>
        <tabview-bar-addbutton @add="addFunction"></tabview-bar-addbutton>
    </div>
</template>

<script>
    import tabviewBarButton from './tabview-bar-button.vue'
    import tabviewBarAddbutton from './tabview-bar-addbutton.vue'
    export default {
        props:{
            'tabs' : Array,
            'focus' : Number
        },
        components:{
            "tabview-bar-button" : tabviewBarButton,
            "tabview-bar-addbutton" : tabviewBarAddbutton
        },
        data: function(){
            return {
                selected : 0
            }
        },
        watch:{
            focus : function(newValue){
                this.selected = newValue;
            }
        },
        methods:{
            selectFunction: function(index){
                //调整选择项的样式
                this.selected = this.tabs[index].numid;
                //通知父组件
                this.$emit('select',index);
            },
            addFunction: function(index){
                this.$emit('add');
            },
            closeFunction: function(index){
                this.$emit('close',index);
            }
        }
    }
</script>

<style scoped>
    div{
        height:30px;
        border-bottom:1px solid lightgray;
    }
</style>