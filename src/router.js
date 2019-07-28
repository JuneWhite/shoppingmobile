import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import MusicList from './components/music/musicList.vue'
import MusicInfo from './components/music/MusicInfo.vue'
import MoveList from './components/moves/moveList.vue'
import Lianxi from './components/lianxi/lianxi.vue'

//创建路由对象
var router = new VueRouter({
  // mode:'history',
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsinfo/:id',component:NewsInfo},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
    {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    {path:'/home/musicList',component:MusicList},
    {path:'/home/musicInfo/:song_id',component:MusicInfo},
    {path:'/home/moveList',component:MoveList},
    {path:'/home/lianxi',component:Lianxi},
  ],
  linkActiveClass:'mui-active'//覆盖默认的路由高亮的类，默认的类叫做router-link-active
})

// 把路由对象暴露出去
export default router