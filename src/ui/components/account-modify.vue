<template>
    <div class="box">
        <panel v-for="(item,index) in this.$root.accounts" :info="item" :index="index" :default-active="item.default">
        </panel>
        <textbar title="添加新账户" text="+" @click.native="newFunction"></textbar>
    </div>
</template>

<script>
    import collpase from "./slide-menu-collpase.vue"
    import panel from "./account-modify-panel.vue"
    import textbar from "./slide-menu-text.vue"
    export default {
        components:{
            collpase,
            panel,
            textbar
        },
        methods:{
            newFunction:function(){
                this.$root.eventHub.$emit('account-create');
            }
        }
    }
</script>

<style scoped>
    .box{
        font-size:15px;
    }
</style>