<template>
  <div class="goodsinfo-containner">
    <!-- 加入购物车小球 -->
    <transition
    @before-enter="beforeEnter"
    @enter='enter'
    @after-enter='afterEnter'>
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
              <swiper :lunbotuList='lunbotuList' :isfull="false"></swiper>
					</div>
				</div>
			</div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:<del>{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
            销售价:<span class="now_price">{{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量：<numberbox @getCount='getSelectedCount' :max='goodsInfo.stock_quantity'></numberbox></p>
          <p>
            <mt-button type="primary" size='small'>立即购买</mt-button>
            <mt-button type="danger" size='small' @click='addToShopCar'>加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品编号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}} 件</p>
          <p>上架时间：{{goodsInfo.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type='primary' size='large' plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type='danger' size='large' plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
import numberbox from './goodinfo_numberbox.vue'
export default {
  data(){
    return{
      id:this.$route.params.id,
      lunbotuList:[],
      goodsInfo:{},
      ballFlag:false,
      selectedCount:1,//保存用户选中的商品数量，默认，认为用户买1个
    }
  },
  components:{swiper,numberbox},
  created(){
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods:{
    getLunbotu(){
      // 获取轮播图数据
      this.$http.get("api/getthumimages/"+this.id).then(result=>{
        if(result.body.status==0){
          result.body.message.forEach(item => {
            this.lunbotuList.push({img:item.src})
          });
        }else{
          Toast('请稍后重试')
        }
      })
    },
    getGoodsInfo(){
      // 获取商品详细信息
      this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
        if(result.body.status==0){
          this.goodsInfo=result.body.message[0];
        }else{
          Toast('请稍后重试')
        }
      })
    },
    goDesc(id){
      // 点击使用编程式导航，跳转到图文介绍
      this.$router.push({name:"goodsdesc",params:{id:this.id}})
    },
    goComment(id){
      // 点击跳转到评论页面
      this.$router.push({name:'goodscomment',params:{id:this.id}})
    },
    addToShopCar(){
      // 添加到购物车
      this.ballFlag=!this.ballFlag;
       // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
       let goodsInfo={
         id:this.id,
         count:this.selectedCount,
         price:this.goodsInfo.sell_price,
         selected:true,
        }
        this.$store.commit('addToCar',goodsInfo);
    },
    beforeEnter(el){
      el.style.transform='translate(0,0)'
    },
    enter(el,done){
      el.offsetWidth;
      // 获取小球在页面中的位置
      const ballPosition=this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition=document.getElementById('badge').getBoundingClientRect();
      // 计算小球和徽标在页面中的距离
      const xDist=badgePosition.left-ballPosition.left;
      const yDist=badgePosition.top-ballPosition.top;
      
      el.style.transform=`translate(${xDist}px,${yDist}px)`
      el.style.transition='all 1s cubic-bezier(.39,-0.16,.89,.6)'
      done()
    },
    afterEnter(el){
      this.ballFlag=!this.ballFlag;
    },
    getSelectedCount(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保留到data上
      this.selectedCount=count;
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-containner {
  background-color: #eee;
  overflow: hidden;
  .now_price{
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer{
    display: block;
    button{
      margin: 15px 0;
    }
  }
  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 149px;
  }
}
</style>
