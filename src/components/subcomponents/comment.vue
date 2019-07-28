<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type='primary' size='large' @click="postComments">发表评论</mt-button>
        <div class="cmt-list" v-for="(item,index) in commonts" :key="index">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content=="undefined"?"此用户很懒，没有评论。":item.content}}
                </div>
            </div>
        </div>
        <mt-button type='danger' size='large' plain @click="moreComments">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    name:'comment',
    data(){
        return{
            pageIndex:1,//设置默认的评论显示页面为1
            commonts:[],//所有评论数据
            msg:'',//评论输入的内容
        }
    },
    props:["id"],
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                if(result.body.status==0){
                    this.commonts=this.commonts.concat(result.body.message)
                }else{
                    Toast("后台服务器加载中，请稍后重试")
                }
            })
        },
        moreComments(){
            this.pageIndex+=1;
            this.getComments();
        },
        postComments(){
            if(this.msg.trim().length===0){
                return Toast("输入内容不能为空，请重新输入")
            }
            this.$http.post("api/postcomment/"+this.id,{
                content:this.msg.trim()
            }).then(result=>{
                if(result.body.status==0){
                    let cmt={
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    }
                    this.commonts.unshift(cmt);
                    this.msg="";
                }else{
                    Toast("系统忙碌中，请稍后再试")
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>


