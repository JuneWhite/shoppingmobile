//入口文件
import Vue from 'vue'

//导入app根组件
import app from './App.vue'

// 导入store
import store from './store/index.js'

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// import { Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 全部导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)
//1.3 导入自己的router.js路由模块
import router from "./router.js"

//2.1 导入vue-resource
import VueResouce from 'vue-resource'
//2.2 安装vue-resource
Vue.use(VueResouce)
//2.3 设置请求的根路径,注意：请求根路径最后不要写“/”，之后组件请求的部分前面也不要写“/”
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//2.4 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//3.1导入格式化时间插件
import moment from 'moment'
//3.2 定义全局过滤器，时间过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern);
})

// 4.1 导入图片预览插件
import VuePreview from 'vue-preview'
// 4.2 安装插件
Vue.use(VuePreview)


var vm=new Vue({
  el:'#app',
  render:c=>c(app),
  router,
  store,
})