<template>
    <div>
        <titlebar title="页面信息"></titlebar>
        <textbar title="游戏" :text="gameTitle"></textbar>
        <inputbar title="标签名字" :text="tabTitle" @change="tagNameChangeFunction"></inputbar>
        <textbar title="使用账号" :text="usingAccount"></textbar>
        <account-select :accounts="this.$root.accounts" @select="accountSelectFunction"></account-select>
    </div>
</template>

<script>
    import collpase from "./slide-menu-collpase.vue"
    import titlebar from "./slide-menu-title.vue"
    import textbar from "./slide-menu-text.vue"
    import gameInfo from "../js/gameinfo.js"
    import inputbar from "./slide-menu-inputbar.vue"
    import accountSelect from "./account-select.vue"
    export default {
        components:{
            collpase,
            titlebar,
            textbar,
            inputbar,
            accountSelect
        },
        data:function(){
            return {
                gameTitle:"",
                tabTitle:"",
                usingAccount:"无"
            }
        },
        methods:{
            dataRefresh:function(id){
                this.gameTitle = gameInfo[this.$root.tabviewData[id].selectedGame].title;
                console.log(this.$root.tabviewData[id].title);
                this.tabTitle = this.$root.tabviewData[id].title;
                let account = this.$root.tabviewData[id].account;
                if(account == null) this.usingAccount = "无";
                else this.usingAccount = account.tag;
            },
            tagNameChangeFunction: function(text){
                this.$root.eventHub.$emit('pageinfo-tagname-change',text);
            },
            accountSelectFunction: function(index){
                this.selectIndex = index;
                this.$root.eventHub.$emit('pageinfo-account-select',index);
            }
        },
        created:function(){
            this.$root.eventHub.$on('tabChanged',this.dataRefresh);
            this.$root.eventHub.$on('gameSelected',this.dataRefresh);
            this.$root.eventHub.$on('main-account-selected',this.dataRefresh);
        }
    }
</script>

<style scoped>

</style>