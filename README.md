## App组件

### 制作首页App组件

1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

### 配置首页APP组件路由
1. 改tabbar为router-link
2. 点击tabbar中的路由连接，展示对应的路由组件
3. 设置路由高亮：路由中除了routes属性外，还有一个linkActiveClass属性，可以设置类型，可以覆盖默认的类

### 设置首页App组件中router-view切换动画
1. 使用transition标签包裹要切换的动画；

2. 设置动画；

3. 动画存在问题更正：
    3.1 水平生成滚动条：大盒子设置overflow-x：hidden；
    3.2 右进右出：出去设置成-100%
    3.3 页面从下面出来，不是同时出来：position：absolute
    
4. ```javascript
    //1.使用transtion标签包裹router-view，进行动画切换区域选定
    <transition>
        <router-view></router-view>
    </transition>
    //2.设置动画css样式
    .app-container{
      padding-top: 40px;
      padding-bottom: 50px;
      overflow-x: hidden;//问题一：水平生成滚动条：大盒子设置overflow-x：hidden；
    }
    .v-enter{
    	opacity: 0;
    	transform: translateX(100%);
    }
    .v-leave-to{
    	opacity: 0;
    	transform: translateX(-100%);//问题二：右进右出：出去设置成-100%,即右进左出
    	position: absolute;//问题三：页面从下面出来，不是同时出来：position：absolute
    }
    .v-enter-active,
    .v-leave-active{
    	transition: all 0.8s ease;
    }
    ```

### 刷新页面路由跳转

```javascript
//如果要实现每次刷新页面，页面固定跳转到home界面，在需要在app.vue钩子函数中做以下路由设置
created(){
    this.$router.push('/home')
},
```

### 头部返回按钮的设置

1.初始化页面为home页面时，无返回按钮，否则显示返回按钮

2.页面跳转到其他页面时，返回按钮显示

3.点击返回按钮，页面返回到前一界面

```javascript
<span slot="left" @click="goback" v-show="flag">
    <mt-button icon="back">返回</mt-button>
</span>
data(){
    return{
        flag:false,//设置是否显示，false为不显示，true为显示
    }
},
created(){
    this.flag=this.$route.path==='/home'?false:true//初始化页面为home页面时，无返回按钮，否则显示返回按钮
},
watch:{//监听路由：页面跳转到其他页面时，返回按钮显示
    "$route.path":function(newVal){
        if(newVal=='/home'){
            this.flag=false
        }else{
            this.flag=true
        }
    }
},
methods:{
    goback(){
        this.$router.go(-1);//点击返回按钮，页面返回到前一界面
    }

}
```

## home组件

### home首页轮播图
1. 布局

2. 加载首页轮播图数据
    2.1 获取数据， 如何获取呢， 使用 vue-resource
    2.2 使用 vue-resource 的 this.$http.get 获取数据
    2.3 获取到的数据，要保存到 data 身上
    2.4 使用 v-for 循环渲染 每个 item 项
    
3. vue-resource配置请求根路径

    ```javascript
    //2.1 导入vue-resource
    import VueResouce from 'vue-resource'
    //2.2 安装vue-resource
    Vue.use(VueResouce)
    //2.3 设置请求的根路径,注意：请求根路径最后不要写“/”，之后组件请求的部分前面也不要写“/”，否则会出现异常
    Vue.http.options.root = 'http://www.liulongbin.top:3005';
    //2.4 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
    Vue.http.options.emulateJSON =true;
    ```

4. 现在vue-resource官网已不更新，建议使用axios

### 改造九宫格区域的样式

在改造样式过程中学习了九宫格border样式的最佳画法

1.在外盒子上设置右边和上边的border；

2.在内部的盒子上设置下边和左边的border；

经分析，以上为目前所知道的最佳的设置方案；

## “新闻资讯”组件

### “新闻资讯”页面路由配置
问题点：路由配置不能使用子路由方式，因为会显示不出来，而应该直接路由方式，且mode:'history'在此处使用会出现bug，此处先暂停使用，后续需追溯原因

### “新闻资讯”页面制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

### 定义全局过滤器-时间过滤器，使用moment格式化时间插件

```javascript
//3.1导入格式化时间插件
import moment from 'moment'
//3.2 定义全局过滤器，时间过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern);
})
```

### 实现 新闻资讯 列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue， NewsInfo.vue根据从路由中获取到的id标志符获取对应的数据，渲染到页面
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

### 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可
5. 封装的组件需要满足所有引入模块的使用
   1. 根据页面获取到的id获取对应的页面评论；
   2. 根据评论组件中pageIndex数值，显示相应的数据；

### 获取所有的评论数据显示到页面中

```javascript
created(){
	this.getComments()
},
methods：{
 getComments(){
    this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>		{
           if(result.body.status==0){
               this.commonts=this.commonts.concat(result.body.message)
           }else{
               Toast("后台服务器加载中，请稍后重试")
           }
     })
 },
}
```

### 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组

```javascript
moreComments(){
    this.pageIndex+=1;
    this.getComments();
},
```

### 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 comments 的开头；这样，就能 完美实现刷新评论列表的需求；

```javascript
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
```

 ## “图片分享”组件

 ### 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
 ### 制作顶部滑动条的坑们：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 

 2. 需要把 slider 区域的 .mui-fullscreen 类去掉

    ```css
    //mui-fullscreen导致全屏显示
    .mui-fullscreen {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    ```

 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 去初始化：
  ```javascript
  // 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.js";
  //2. 初始化滑动控件
mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
},
  ```
 4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，我们选择了 **移除严格模式**： 插件[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode) 
 5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；

      1. 当处理完滑块滑动问题后，发现仍有警告错误`[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL>`,这是由于chrome为了提高页面的滑动流畅度而新折腾出来的一个东西，https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action，解决方法，可以加上* { touch-action: none; } 这句样式去掉。

    ```css
    * {
      touch-action: pan-y;
    }
    ```

 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；

 7. 获取所有分类，并渲染 分类列表；

 ### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据
4. 懒加载过程中需要注意mui必须全部导入才可以，按需导入出不来加载的小圆圈

### 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

### 实现 详情页面的布局和美化，同时获取数据渲染页面

### 实现 图片详情中 缩略图的功能
1. 使用 插件 [vue-preview](https://github.com/LS1231/vue-preview) 这个缩略图插件

2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据

3. 注意： img标签上的class不能去掉

4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性

5. 在导入新的vue-preview标签时，图片太大，需要重新设置样式，这个时候scoped不可以使用，否则样式无效，或者样式加上`/deep/`

   ```css
   <div id="thumbs">
         <vue-preview :slides="slideList" height='100' ></vue-preview>
   </div>
   
   /deep/#thumbs{
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
   ```

### vue样式加scoped后不能覆盖组件的原有样式解决方法

1. 为了vue页面样式模块化，不对全局造成污染，建议每个页面的style标签加上scoped，表示他的样式只属于当前的页面，父组件的样式不会泄漏到子组件中。但是scoped也会造成一些额外的负担，如无法覆盖原有组件的样式。

2. 解决方法：样式上加上 深度选择器  **/deep/**或者 **‘ >>>’**

   ```
   .el-table >>> .red-row {
   	background: #ffc2c2;
   }
   ```

##  单独封装swiper轮播图组件

 分析：为什么商品详情中的轮播图那么丑？

1. 首页中的图片，它的宽和高，都是100% 
2. 在商品详情页面中，轮播图的图片如果也是用宽高100%的画，页面不好看 

3. 商品详情页中的轮播图，期望高度为100%，宽度为自适应
4. 经过分析，问题出现原因，首页中的轮播图和商品详情中的轮播图，分歧点是 宽度到底是100% 还是自适应
5. 既然两个轮播图其他方面都是没有冲突的，只是宽度有分歧，那么我们可以定义一个属性，让使用轮播图调用者，手动指定是否为100%宽度 

```javascript
<template>
  <div>
      <mt-swipe :auto="2000">
          <!-- 谁用谁传值给 lunbotuList，应该是父组件传值给子组件-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
               <img :src="item.img" :class="{full:isfull}"><!--绑定class样式，手动指定样式-->
            </mt-swipe-item>
        </mt-swipe>
  </div>
</template>
props:["lunbotuList","isfull"]//父组件引用swiper组件时，需要绑定的值
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
    width: 100%;//手动绑定的样式 true生效，false不生效
}
</style>
```

## ”商品购买“组件

### 渲染商品明细页

### 两种路由跳转方式

 1. 方式一：使用a标签的形式 叫做标签跳转，例如router-link

 2. 方式二：使用 window.location.href 的形式，叫做 编程导航

    ```javascript
    <div  class="goods-item" v-for="item in goodList" :key="item.id" @click="goDetail(item.id)">***</div>
    
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
    ```

### 购物车小球动画优化思路
1. 先分析导致动画不准确的本质原因：我们把小球最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下
2. 只要分辨率 和测试的时候不一样，或者 滚动条有一定的滚动之后，问题就出现了；
3. 因此，经分析得出结论：不能把唯一的横纵坐标， 直接写死了，而是应该 根据不同情况，动态计算这个坐标值。
4. 经过分析，解题思路如下：先得到 徽标的 横纵坐标，在得到 小球的横纵坐标，然后让y值求差，x值求差，得到的结果就是横纵坐标要唯一的距离
5. 如何获取徽标和小球的位置？ domObject.getBoundingClientRect()

```javascript
<transition
@before-enter="beforeEnter"
@enter='enter'
@after-enter='afterEnter'>
    <div class="ball" v-show="ballFlag" ref="ball"></div>
</transition>
//此处需要使用动画钩子函数
beforeEnter(el){
	el.style.transform='translate(0,0)'
},
enter(el,done){
    el.offsetWidth;//这句话，没有实际的作用，但是，如果不写，出不来动画效果；可以认为 el.offsetWidth 会强制动画刷新
    // 获取小球在页面中的位置
    const ballPosition=this.$refs.ball.getBoundingClientRect();
    // 获取 徽标 在页面中的位置
    const badgePosition=document.getElementById('badge').getBoundingClientRect();
    // 计算小球和徽标在页面中的距离
    const xDist=badgePosition.left-ballPosition.left;
    const yDist=badgePosition.top-ballPosition.top;

    el.style.transform=`translate(${xDist}px,${yDist}px)`
    el.style.transition='all 1s cubic-bezier(.39,-0.16,.89,.6)'
    done()//这里的 done， 其实就是 afterEnter 这个函数，也就是说：done 是 afterEnter 函数的引用
},
afterEnter(el){
    this.ballFlag=!this.ballFlag;
},
```

### 实现加入购物车时候，拿到 选择的数量
1. 经过分析发现，按钮属于goodsinfo页面 数字属于numberbox组件
2. 由于涉及到了父子组件的嵌套，所以无法直接在goodsinfo页面中获取选中的商品数量值
3. 怎么解决问题？涉及到了子组件向父组件传值（事件调用机制）
4. 事件调用的本质：父向子传递方法，自调用这个方法，同时把值传递给这个方法

### 父组件将获取到的 库存值 传给 numberbox 子组件过程中，发现子组件获取到的值是个undefined，怎么解决
1. 因为我们获取库存值是通过异步获取的，.then 获取，我们不知道具体什么时候可以获取到max值，但终归有一刻会得到一个真正的max值
2. 我们可以使用watch属性监听来监听父组件传递过来的max值，不管max会被触发几次，但是，最后一次肯定是个合法的max值
3. 使用 JS API 设置 numbox 的最大值

