<template>
    <div>
        <div class="textbox">
            <div class="addressbox">
                <p>代理服务器地址</p>
                <input type="text" v-model="address" class="address"/>
            </div>
            <div class="portbox">
                <p>端口</p>
                <input type="text" v-model="port" class="port"/>
            </div>
        </div>
        <div>
            <switcher text="启用" @click="clickFunction" :isActive="this.$root.globalSetting.proxy.enabled"></switcher>
        </div>
    </div>
</template>

<script>
    import switcher from "./slide-menu-switch.vue"
    export default {
        components:{
            switcher
        },
        data: function(){
            return {
                address:"",
                port:""
            }
        },
        methods:{
            clickFunction: function(){
                this.$root.globalSetting.proxy.enabled = !this.$root.globalSetting.proxy.enabled;
                this.$root.setProxyEnabled();
            }
        },
        watch:{
            address: function(newValue){
                this.$root.setProxy(this.address,this.port);
            },
            port: function(newValue){
                this.$root.setProxy(this.address,this.port);
            }
        },
        mounted:function(){
            this.address = this.$root.globalSetting.proxy.address;
            this.port = this.$root.globalSetting.proxy.port;
        }
    }
</script>
<style>
    p {
        text-align: center;
    }
    .textbox{
        margin-top:5px;
    }
    .addressbox{
        float:left;
    }
    .portbox{
        float:left;
        margin-left:25px;
    }
    .savebox{
        float:left;
        margin-left:15px;
    }
    .savebtn{
        height:30px;
        width:30px;
        margin-top:50px;
    }
    .address{
        width:150px;
        text-align:center;
    }
    .port{
        width:70px;
        text-align: center;
    }
</style>