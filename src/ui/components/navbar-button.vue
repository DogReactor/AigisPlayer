<template>
    <button v-bind:style="styleObject"></button>
</template>

<script>
    export default {
        props:{
            'img':String,
            'isRight':Boolean,
            'enabled':Boolean,
        },
        data: function(){
            return {
                styleObject:{
                    backgroundImage : 'url(' + this.img + ')',
                    float : this.isRight ? 'right':'left',
                    opacity: '1'
                },
            }
        },
        watch:{
            enabled: function(newValue){
                this.styleObject.opacity = newValue ? '1':'0.5';
            }
        },
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