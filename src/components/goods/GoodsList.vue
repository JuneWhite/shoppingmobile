<template>
  <div class="goods-content">
    <!-- <router-link :to="'/home/goodsinfo/'+item.id" tag='div' class="goods-item" v-for="item in goodList" :key="item.id">
      <div class="image">
        <img :src="item.img_url" />
      </div>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->
    <!-- 在网页中，有两种路由跳转方式 -->
    <!-- 方式一：使用a标签的形式 叫做标签跳转 -->
    <!-- 方式二：使用 window.location.href 的形式，叫做 编程导航 -->
    <div  class="goods-item" v-for="item in goodList" :key="item.id" @click="goDetail(item.id)">
      <div class="image">
        <img :src="item.img_url" />
      </div>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type='danger' size='large' @click="moreGoods">加载更多</mt-button>
  </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
  data() {
    return {
        pageIndex:1,//分页的页数
        goodList:[],
    };
  },
  created(){
      this.getGoodList()
  },
  methods:{
    // 获取渲染商品列表的方法
      getGoodList(){
          this.$http.get("api/getgoods?pageindex="+this.pageIndex).then(result=>{
              if(result.body.status==0){
                  this.goodList=this.goodList.concat(result.body.message);
              }else{
                  Toast("请稍后重试！")
              }
          })
      },
    //   加载更多方法
      moreGoods(){
          this.pageIndex+=1;
          this.getGoodList();
      },
      goDetail(id){
        // 使用JS的形式进行路由导航
        // 注意：一定要区分this.$router和this.$route这两个对象
        // 其中：this.$route 是路由参数对象， params 和 query都属于他
        // 其中：this.$router 是路由导航对象，用它可以方便的使用JS代码，实现路由的前进、后退、跳转到新的url地址
        //   1.最简单的方式
        //   this.$router.push('/home/goodsinfo/'+ id)
        //   2.传递对象的方式
        //   this.$router.push({path:'/home/goodsinfo/'+ id})  
        //   3.传递一个命名的路由
          this.$router.push({name:'goodsinfo',params:{id}})
      }
  }
};
</script>
<style lang="scss" scoped>
.goods-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
     width: 49%;
     border: 1px solid #ccc;
     box-shadow: 0 0 8px #cccccc;
     margin: 3px 0;
     padding: 3px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     min-height: 293px;
    .image {
      img {
        width: 100%;
        min-height: 190px;
      }
    }
    .title {
        font-size: 14px;
    }
    .info {
        p{
            margin: 0;
            padding: 5px;
        }
      .price {
        .now {
            color: red;
            font-weight: bold;
            font-size: 14px;
        }
        .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
        }
      }
      .sell {
          display: flex;
          justify-content: space-between;
      }
    }
  }
}
</style>

