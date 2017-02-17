<template>
    <div>
        <tabview-bar :tabs = 'tabviewData' @select='selectFunction' @add='addFunction' @close='closeFunction' :focus="selected"> </tabview-bar>
        <tabview-view :views = 'tabviewData' @select-game='selectGameFunction' :globalmuted='this.$root.globalSetting.muted'> </tabview-view>
    </div>
</template>

<script>
    import tabviewBar from './tabview-bar.vue';
    import tabviewView from './tabview-view.vue'
    export default {
        props:{
            tabviewData:Array,
            tabviewData:Array
        },
        components:{
            'tabview-bar' : tabviewBar,
            'tabview-view' : tabviewView
        },
        data: function(){
            return {
                selected : 0,
                nextid: 1,
            }
        },
        methods:{
            selectFunction: function(index){
                this.selected = this.tabviewData[index].numid;
                //切换view
                for(let i = 0;i<this.tabviewData.length;i++){
                    if(this.tabviewData[i].show == true && this.tabviewData[i].numid == this.selected) break;
                    this.tabviewData[i].show = false;
                    if(this.tabviewData[i].numid == this.selected) {
                        this.tabviewData[i].show = true;
                        this.$emit('tab-change',index);
                    }
                }
            },
            addFunction: function(){
                //添加新标签页
                //添加tab
                let newTabview = {
                    numid: this.nextid,
                    title: 'NewTab',
                    isrender: true,
                    src: 'about:blank',
                    show: false,
                    selectedGame:'none',
                    usingUser:-1,
                    titleLock:false,
                    account:null
                }
                this.tabviewData.push(newTabview);
                //ID自增
                this.nextid++;
                //切换去新标签
                this.selectFunction(this.tabviewData.length-1);
            },
            closeFunction: function(index){
                console.log("Close");
                //关闭标签页
                let right = this.findNextRightRenderTab(index);
                let navi = right == -1 ? this.findNextLeftRenderTab(index) : right; //是否是最后一个标签，是的话删除后切换到前一个标签
                if(navi == -1) {
                    //最后一个标签的话，新建新标签并指向新标签
                    navi = this.nextid;
                    this.addFunction();
                }
                //切换到存在标签
                this.selectFunction(navi);
                //设置删除数据为不渲染
                this.tabviewData[index].isrender = false;
            },
            selectGameFunction:function(game,id){
                this.$emit('select-game',game,id);
            },
            findNextRightRenderTab: function(index){
                let nextIndex = -1;
                for(let i = index + 1;i<this.tabviewData.length;i++){
                    if(this.tabviewData[i].isrender) {
                        nextIndex = i;
                        break;
                    }
                }
                return nextIndex;
            },
            findNextLeftRenderTab: function(index){
                let nextIndex = -1;
                for(let i = index - 1;i>=0;i--){
                    if(this.tabviewData[i].isrender) {
                        nextIndex = i;
                        break;
                    }
                }
                return nextIndex;
            },
            getRenderTabsLength: function(){
                let count = 0;
                for(let item in this.tabviewData){
                    if(item.isrender) count++;
                }
                return count;
            }
        }
    }
</script>