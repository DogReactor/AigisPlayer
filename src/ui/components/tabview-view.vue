<template>
    <div class="view-container">
        <tabview-view-child v-for='item in views' :src='item.src' v-show="item.show" :numid='item.numid' :isrender='item.isrender' @select-game='selectFunction' :muted="!item.show" :active="item.show" :globalmuted="globalmuted" :game="item.selectedGame" :account="item.account"> </tabview-view-child>
    </div>
</template>
<script>
    import tabviewViewChild from './tabview-view-child.vue'
    export default {
        props:{
            views:Array,
            globalmuted:Boolean
        },
        methods:{
            selectFunction:function(game,id){
                this.$emit('select-game',game,id);
            }
        },
        components:{
            "tabview-view-child": tabviewViewChild
        }
    }
</script>

<style scoped>
    .view-container {
        position:absolute;
        width:100%;
        top:30px;
        bottom:0px;
    }
</style>