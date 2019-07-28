<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChanged" ref="numberbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    name:'shopcar_numberbox',
    props:["initCount","goodsid"],
    mounted(){
        mui('.mui-numbox').numbox()
    },
    methods:{
        countChanged(){
            // 数量改变时
            // console.log(this.$refs.numberbox.value);
            // 每当数量值发生变化时，立即把最新的数量同步到购物车的store中，覆盖之前的数量值
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count:this.$refs.numberbox.value,
            })
        }
    }
};
</script>
<style>
</style>