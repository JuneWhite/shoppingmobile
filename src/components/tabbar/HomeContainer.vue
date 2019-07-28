<template>
    <div>
        <!-- 轮播图区域 -->
        <swiper :lunbotuList='lunbotuList' :isfull="true"></swiper>
        <!-- 九宫格到六宫格的改造工程 -->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/goodslist">
		                    <img src="../../image/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <img src="../../image/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photolist">
		                    <img src="../../image/menu2.png" alt="">
		                    <div class="mui-media-body">生活娱乐</div></router-link></li>
		           
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/musicList">
		                    <img src="../../image/menu7.png" alt="">
		                    <div class="mui-media-body">音乐欣赏</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/moveList">
		                    <img src="../../image/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/lianxi">
                            <img src="../../image/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		            
		        </ul> 
		</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return{
            lunbotuList:[],
        }
    },
    components:{swiper},
    created(){
        this.getLunbotu();
    },
    methods:{
        getLunbotu(){
            this.$http.get("api/getlunbo").then(result=>{
                if(result.body.status==0){
                    this.lunbotuList=result.body.message;
                }else{
                    Toast('后台系统忙碌，请稍后再试');
                }
            })
        }
    }    
}
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
    border: none;
    background-color: white;
    img{
        height: 60px;
        width: 60px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0px;
}
</style>

