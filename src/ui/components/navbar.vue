<template>
    <div>
        <p>{{title}}</p>
        <navbarButton :img='imgs[1]' :is-right='true' @click.native="close"> </navbarButton>
        <navbarButton :img='imgs[0]' :is-right='true' @click.native="min"> </navbarButton>
        <navbarButton v-for="(item,index) in customButtons" :id=\"item.id\" :img="item.img" :is-right="item.isRight" :enabled="item.enabled" @click.native="item.clickFunction(index)"> </navbarbutton>
    </div>
</template>

<script>
    import navbarbutton from './navbar-button.vue'
    export default {
        props:{
            title:String,
            customButtons:{
                type:Array,
                required: true
            }
        },
        data: function(){
            return {
                imgs:["./static/img/small-min.png","./static/img/close.png"],
                close:function(){
                    app.exit(0);
                },
                min:function(){
                    currentwindow.minimize();
                }
            }
        },
        components:{
            navbarbutton
        }
    }
</script>

<style scoped>
div{
    height:30px;
    background:white;
    -webkit-app-region:drag;
}
p{
    float:left;
    margin:0px;
    padding:5px;
    padding-left:10px;
    padding-bottom:0px;
    width:150px;
    height:20px;
    text-align:center;
    color:black;
}
</style>