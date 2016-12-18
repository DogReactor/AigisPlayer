<template>
    <div>
        <collpase :title="tag" :show="isShow">
            <inputbar title="备注" :text="tag" @change="tagFunction"></inputbar>
            <inputbar title="用户名" :text="username" @change="usernameFunction"></inputbar>
            <inputbar title="密码" type="password" :text="password" @change="passwordFunction"></inputbar>
            <switcher text="是否作为默认账户" :is-active="isDefault" @click="defaultClickFunction"></switcher>
            <div class="btns-box">
                <div class="btn"><a @click="okFunction" class="button okbtn" :class="{okbtnactive:okActive}">确认</a></div>
                <div class="btn"><a @click="deleteFunction" class="button deletebtn">删除</a></div>
            </div>
        </collpase>
    </div>
</template>

<script>
    import inputbar from "./slide-menu-inputbar.vue"
    import collpase from "./slide-menu-collpase.vue"
    import switcher from "./slide-menu-switch.vue"
    export default {
        components:{
            inputbar,
            collpase,
            switcher
        },
        data:function(){
            return {
                tag:"",
                username:"",
                password:"",
                isDefault:false,
                isShow:false,
                okActive:false
            }
        },
        props:{
            index:Number,
            info:Object,
            defaultActive:Boolean
        },
        methods:{
            okFunction:function(){
                if(this.okActive == false) return;
                let obj = {
                    index:this.index,
                    tag:this.tag,
                    username:this.username,
                    password:this.password,
                    default:this.isDefault
                }
                this.$root.eventHub.$emit('account-changed',obj);
                this.$emit('close');
                this.okActive=false;
            },
            deleteFunction:function(){
                this.$root.eventHub.$emit('account-delete',this.index);
                this.isShow = false;
                this.$emit('close');
            },
            usernameFunction:function(val){
                this.okActive = true;
                this.username = val;
            },
            passwordFunction:function(val){
                this.okActive = true;
                this.password = val;
            },
            tagFunction:function(val){
                this.okActive = true;
                this.tag = val;
            },
            defaultClickFunction: function(){
                this.okActive = true;
                this.isDefault = !this.isDefault;
            }
        },
        watch:{
            info: function(){
                this.tag = this.info.tag;
                this.username = this.info.username;
                this.password = this.info.password;
                this.isDefault = this.info.default;
                this.okActive = false;
            },
            defaultActive: function(){
                this.isDefault = this.defaultActive;
            }
        },
        created:function(){
            this.tag = this.info.tag;
            this.username = this.info.username;
            this.password = this.info.password;
            this.isDefault = this.info.default;
            if(this.tag == "新账户" && this.username == "" && this.password == "") this.$emit('open');
            this.okActive = false;
        }
    }
</script>

<style scoped>
    .btns-box{
        text-align: center;
    }
    .btn{
        width:50%;
        float:left;
        position:relative;
    }
    .okbtn{
        background-color:#EEE;
        color:gray;
        cursor:default;
    }
    .okbtnactive{
        background-color:#2798eb;
        color:white;
    }
    .okbtnactive:hover{
        background-color:#4cb0f9;
    }
    .deletebtn{
        background-color:#FF4351;
        border-color:#FF4351;
        color:#FFF;
    }
    .deletebtn:hover{
        background-color:#ff7680;
        border-color:#ff7680;
    }
    .button{
        margin:auto;
        border-color:#EEE;
        font-weight:300;
        text-align:center;
        display:inline-block;
        border:none;
        transition:all .3s;
        border-radius:200px;
        font-size:12px;
        height:24px;
        line-height:24px;
        padding:0 24px;
        margin:5px;
    }
</style>