<template>
  <div class="shopcar_container">
    <div class="goods_list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <shopcar_numberbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid='item.id'></shopcar_numberbox>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                <a href="#" @click.prevent='remove(item.id,i)'>删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
     <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品<span class="red">{{this.$store.getters.getGoodsCountAndAmount.count}}</span> 件， 
                总价<span class="red">￥{{this.$store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import shopcar_numberbox from "../subcomponents/shopcar_numberbox.vue";
export default {
    data(){
        return{
          goodslist:[],
        }
    },
    components: { shopcar_numberbox },
    created(){
      this.getGoodsList();
    },
    methods:{
      getGoodsList() {
        // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
        var idArr = [];
        this.$store.state.car.forEach(item => idArr.push(item.id));
        // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
        if (idArr.length <= 0) {
          return;
        }
        // 获取购物车商品列表
        this.$http
          .get("api/goods/getshopcarlist/" + idArr.join(","))
          .then(result => {
            if (result.body.status === 0) {
              this.goodslist = result.body.message;
            }
          });
      },
      remove(id,index){
        // 点击删除，把商品从state中根据传递的ID删除，同时 把当前组件中的goodList中 对应的那个商品删除，使用index来删除
        this.goodslist.splice(index,1);
        this.$store.commit('removeFromCar',id);
      },
      selectedChanged(id,val){
        console.log(id+'-----'+val);
        this.$store.commit('updateGoodsSelected',{id,selected:val})
      },
    },
};
</script>
<style lang="scss">
.shopcar_container {
  
  .goods_list {
      background-color: #eeeeee;
    overflow: hidden;
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>

