<template>
    <div>
        <tabview-bar :tabs = 'tabsData' @select='selectFunction' @add='addFunction' @close='closeFunction' :focus="selected"> </tabview-bar>
        <tabview-view :views = 'viewsData'> </tabview-view>
    </div>
</template>

<script>
    import tabviewBar from './tabview-bar.vue';
    import tabviewView from './tabview-view.vue'

    export default {
        props:{
            tabsData:Array,
            viewsData:Array,
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
                this.selected = this.tabsData[index].numid;
                //切换view
                for(let i = 0;i<this.viewsData.length;i++){
                    if(this.viewsData[i].show == true && this.viewsData[i].numid == this.selected) break;
                    this.viewsData[i].show = false;
                    if(this.viewsData[i].numid == this.selected) this.viewsData[i].show = true;
                }
            },
            addFunction: function(){
                //添加新标签页
                //添加tab
                let newTab = {
                    numid: this.nextid,
                    title: this.nextid.toString()
                };
                this.tabsData.push(newTab);
                //添加View
                let newView = {
                    numid: this.nextid,
                    src: 'http://www.sogou.com',
                    show: false
                }
                this.viewsData.push(newView);
                //ID自增
                this.nextid++;
                //切换去新标签
                this.selectFunction(this.tabsData.length-1);
            },
            closeFunction: function(index){
                //关闭标签页
                if(this.tabsData.length == 1) return; //只有一个标签无法关闭
                let navi = index == this.tabsData.length-1 ? index-1 : index+1; //是否是最后一个标签，是的话删除后切换到前一个标签
                //切换到存在标签
                this.selectFunction(navi);
                //删除tabs和views中的数据
                console.log(this.viewsData[index].src)
                this.tabsData.splice(index,1);
                this.viewsData.splice(index,1);
            }
        }
    }
</script>