<template>
  <div>
      <mt-swipe :auto="2000">
          <!-- 谁用谁传值给 lunbotuList，应该是父组件传值给子组件-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 分析：为什么商品详情中的轮播图那么丑？ -->
        <!-- 1. 首页中的图片，它的宽和高，都是100% -->
        <!-- 2. 在商品详情页面中，轮播图的图片如果也是用宽高100%的画，页面不好看 -->
        <!-- 3. 商品详情页中的轮播图，期望高度为100%，宽度为自适应 -->
        <!-- 4. 经过分析，问题出现原因，首页中的轮播图和商品详情中的轮播图，分歧点是 宽度到底是100% 还是自适应 -->
        <!-- 5. 既然两个轮播图其他方面都是没有冲突的，只是宽度有分歧，那么我们可以定义一个属性，让使用轮播图调用者，手动指定是否为100%宽度 -->
  </div>
</template>

<script>
export default {
    name:"swiper",
    props:["lunbotuList","isfull"]
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    text-align: center;
    height: 200px;
    .mint-swipe-item{
        // &:nth-child(1){
        //     background-color: yellow;
        // }
        // &:nth-child(2){
        //     background-color: pink;
        // }
        // &:nth-child(3){
        //     background-color: greenyellow;
        // }
        img{
            height: 100%;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
}
.full{
    width: 100%;
}
</style>