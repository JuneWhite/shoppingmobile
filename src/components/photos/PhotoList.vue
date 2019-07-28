<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in cateList"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link tag='li' :to="'/home/photoinfo/'+item.id" v-for="item in photoList" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="wenzi-content">
            <h1 class="title">{{item.title}}</h1>
            <div class="body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
      cateList: [],
      photoList: [],
      cateid: 0,
    };
  },
  created() {
    this.getCateList();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCateList() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status == 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cateList = result.body.message;
        } else {
          Toast("服务器繁忙，请稍后重试");
        }
      });
    },
    getPhotoListByCateId(cateid) {
      this.$http.get("api/getimages/"+cateid).then(result => {
        if (result.body.status == 0) {
          this.photoList = result.body.message;
        } else {
          Toast("服务器繁忙，请稍后重试");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        position: relative;
        text-align: center;
        background-color: #cccccc;
        margin-top: 10px;
        box-shadow: 0 0 9px #999;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .wenzi-content{
            position: absolute;
            bottom: 0;
            right: 0;
            background-color:rgba($color: #000000, $alpha: 0.4);
            color: white;
            text-align: left;
            max-height: 88px;
            padding: 3px;
            .title{
                font-size: 14px;
            }
            .body{
                font-size: 13px;
            }
        }
    }
    

}
</style>
