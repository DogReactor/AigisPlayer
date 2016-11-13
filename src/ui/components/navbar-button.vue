<template>
    <button v-bind:style="styleObject" v-on:click="clickFunction"></button>
</template>

<script>
    export default {
        props:['img','isRight'],
        data: function(){
            return {
                styleObject:{
                    backgroundImage : 'url(' + this.img + ')',
                    float : this.isRight ? 'left':'right'
                }
            }
        },
        methods:{
            clickFunction:function(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>

button{
    -webkit-app-region : no-drag;
    height:20px;
    width:20px;
    background-size:contain;
    background-color:transparent;
    border:0px;
    background-repeat: no-repeat;
    padding:0px;
    margin:5px;
    outline:none;
}

</style>