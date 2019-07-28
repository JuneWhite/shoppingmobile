<template>
    <div class="photoinfo-content">
        <h3>{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoInfo.add_time | dataFormat}}</span>
            <span>点击：{{photoInfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div id="thumbs">
             <vue-preview :slides="slideList" height='100' ></vue-preview>
        </div>
       
        <!-- <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in slideList" :src="item.msrc" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div> -->
        <!-- 图片内容区 -->
        <div class="content" v-html="photoInfo.content"></div>
        <!-- 评论子组件 可放置现成的 -->
        <comment :id="id"></comment>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
// 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            photoInfo:[],
            slideList:[],
        }
    },
    components:{comment},
    created(){
        this.getPhotoInfo();
        this.getSlideList();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status==0){
                    this.photoInfo=result.body.message[0]
                }else{
                    Toast("请重新加载")
                }
            })
        },
        getSlideList(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status==0){
                    result.body.message.forEach(item=>{
                        item.msrc=item.src;
                        item.w=600;
                        item.h=400;
                        item.title='Image Caption';
                    })
                    this.slideList=result.body.message;
                }else{
                     Toast("请重新加载")
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.photoinfo-content{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    /deep/ #thumbs{
        /deep/.my-gallery{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            figure{
                display: inline-block;
                margin: 8px;
            }
            a{
                img{
                    height: 70px;
                    width: 70px;
                }
            }
        }
    }
    
}
</style>

