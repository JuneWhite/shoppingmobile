import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{//this.$store.state.***
        // // 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
        car:JSON.parse(localStorage.getItem('car') || '[]'),//将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象， 咱们可以暂时将这个商品对象，设计成这个样子   
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations:{//this.$store.commit('方法名称','按需传递唯一的参数')
        addToCar(state,goodInfo){
            // 点击加入购物车，把商品信息保存到store中的car上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false;
            state.car.forEach(item=>{
                if(item.id==goodInfo.id){
                    item.count+=goodInfo.count;
                    flag=true;
                    return  true;
                }
            })
            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if(!flag){
                state.car.push(goodInfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsInfo){
            // 修改购物车中商品的数量值
            state.car.some(item=>{
                if(item.id==goodsInfo.id){
                    item.count=parseInt(goodsInfo.count)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            // 根据id从store中的购物车中删除对应的数据
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
              if (item.id == info.id) {
                item.selected = info.selected
              }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.***
        //相当于计算属性，也相当于filters
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count;
            })
            return c;
        },
        getGoodsCount(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
              o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,
                amount:0,
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.count*item.price
                }
            })
            return o;
        }
    },
});