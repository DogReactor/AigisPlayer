<template>
    <div>
        <tabview-view-child v-for='item in views' :src='item.src' v-show="item.show" :numid='item.numid'> </tabview-view-child>
    </div>
</template>
<script>
    import tabviewViewChild from './tabview-view-child.vue'
    export default {
        props:{
            views:Array
        },
        components:{
            "tabview-view-child": tabviewViewChild
        }
    }
</script>

<style scoped>
    div {
        height:900px;
    }
</style>