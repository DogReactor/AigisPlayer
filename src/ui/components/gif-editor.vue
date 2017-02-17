<template>
    <div v-if="show" class="container">
        <canvas id="editorCanvas" height="640" width="960"></canvas>
        <div class="editorbar">
            <div class="time-line item">
                {{nowFrame}}/{{imgdatas.length}}
            </div>
            <div class="item">
                <input type="text" placeholder="From" v-model="from"/>
                 ：
                <input type="text" placeholder="To" v-model="to"/>
            </div>
            <div class="item">
                <input type="text" placeholder="FPS" v-model="fps"/>
            </div>
            <div class="itemright">
                <button class="deletebtn" @click="destoryEditor">关闭</button>
            </div>
            <div class="itemright">
                <button class="okbtnactive" @click="getGif">生成GIF</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            imgdatas:Array,
            show:Boolean
        },
        data:function(){
            return {
                playerTimer:null,
                nowFrame:0,
                lastshow:false,
                timer:-1,
                x1:-1,
                y1:-1,
                x2:-1,
                y2:-1,
                fps:'',
                from:'',
                to:''
            }
        },
        methods:{
            loadImgs:function(){
                let c = this.$el.children[0];
                let ctx = c.getContext('2d');
                this.nowFrame = 0;
                let mouseDownFlag = false;
                this.x1 = -1;
                this.y1 = -1;
                this.x2 = -1;
                this.y2 = -1;
                if(this.playerTimer !== null) clearInterval(this.playerTimer);
                this.playerTimer = setInterval(()=>{
                    ctx.clearRect(0,0,960,640);
                    ctx.putImageData(this.imgdatas[this.nowFrame],0,0);
                    //绘制截取框
                    if(this.x1!==-1 && this.y1!==-1 && this.x2!==-1 && this.y2!== -1){
                        ctx.beginPath();
                        ctx.moveTo(this.x1,this.y1);
                        ctx.lineTo(this.x2,this.y1);
                        ctx.lineTo(this.x2,this.y2);
                        ctx.lineTo(this.x1,this.y2);
                        ctx.lineTo(this.x1,this.y1);
                        ctx.stroke();
                        ctx.closePath();
                    }
                    this.nowFrame++;
                    if(this.nowFrame === this.imgdatas.length) this.nowFrame = 0;
                },17);
                c.addEventListener('mousedown',(e)=>{
                    this.x1 = -1;
                    this.y1 = -1;
                    this.x2 = -1;
                    this.y2 = -1;
                    mouseDownFlag = true;
                    this.x1 = e.offsetX;
                    this.y1 = e.offsetY;
                });
                c.addEventListener('mouseup',(e)=>{
                    mouseDownFlag = false;
                    this.x2 = e.offsetX;
                    this.y2 = e.offsetY;
                });
                c.addEventListener('mousemove',(e)=>{
                    if(mouseDownFlag){
                        this.x2 = e.offsetX;
                        this.y2 = e.offsetY;
                    }
                });
            },
            destoryEditor:function(){
                clearInterval(this.playerTimer);
                this.playerTimer = null;
                this.$root.eventHub.$emit('editor-close');
            },
            getGif:function(){
                let renderFps = this.fps === "" ? 60 : parseInt(this.fps);
                renderFps = renderFps > 60 ? 60 : renderFps;
                let c = this.$el.children[0];
                let ctx = c.getContext('2d');
                clearInterval(this.playerTimer);
                let height = Math.abs(this.y2-this.y1) === 0 ? 640 : Math.abs(this.y2-this.y1);
                let width = Math.abs(this.x2-this.x1) === 0 ? 960 : Math.abs(this.x2-this.x1);
                //获取左上角坐标点
                let leftUpPoint = {
                    x : Math.min(this.x1,this.x2),
                    y : Math.min(this.y1,this.y2)
                };
                let gif = new GIF({
                    workerScript: './static/js/gif/gif.worker.js',
                    width: width,
                    height:height
                })
                gif.on('progress',(p)=>{
                    console.log(p);
                })
                gif.on('finished',(blob)=>{
                    let url = URL.createObjectURL(blob);
                    contents.downloadURL(url);
                    this.destoryEditor();
                })
                this.imgdatas.forEach((v,i)=>{
                    if(i % Math.round(60/renderFps) !== 0) return;
                    if(i < (this.from === "" ? 0 : parseInt(this.from)) || i > (this.to === "" ? this.imgdatas.length : parseInt(this.to))) return;
                    //裁剪
                    let newImageData = null;
                    if(Math.abs(this.x2-this.x1) !== 0){
                        ctx.putImageData(v,0 - leftUpPoint.x,0 - leftUpPoint.y,leftUpPoint.x,leftUpPoint.y,width,height);
                        newImageData = ctx.getImageData(0,0,width,height);
                    }
                    else newImageData = v;
                    gif.addFrame(newImageData,{delay:Math.round(1000/renderFps)});
                });
                gif.render();
            }
        },
        updated:function(){
            if(this.show === this.lastshow) return;
            this.lastshow = this.show;
            if(this.show){
                if(this.imgdatas.length !== 0){
                    this.loadImgs();
                }
            }
        }
    }
</script>

<style scoped>
    .time-line{
        width:100px;
    }
    .container{
        position:absolute;
        z-index:1000;
    }
    .editorbar{
        background-color:white;
        height:30px;
    }
    .item{
        float:left;
        margin:5px;
        margin-right:15px;
    }
    .itemright{
        float:right;
        margin:5px;
        margin-left:15px;
    }
    input {
        -webkit-appearance:none;
        font-size:13px;
        border-radius:4px;
        border:1px solid #c8cccf;
        width:45px;
        outline:0;
    }
    button{
        margin:auto;
        border-color:#EEE;
        font-weight:300;
        text-align:center;
        display:inline-block;
        border:none;
        transition:all .3s;
        border-radius:200px;
        font-size:11px;
        height:22px;
        line-height:24px;
        padding:0 24px;
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
</style>