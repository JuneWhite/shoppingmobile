<template>
    <div class="mui-numbox" data-numbox-min="1" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    name:'numberbox',
    props:["max"],
    mounted(){
        // 初始化数字输入框组件
        // mui('.mui-numbox').numbox()
    },
    watch:{
       max:function(newVal,oldVal){
        // 使用 JS API 设置 numbox 的最大值
        mui('.mui-numbox').numbox().setOption('max',newVal)
       }
    },
    methods:{
        countChanged(){
            console.log(this.$refs.numbox.value);
            this.$emit('getCount',parseInt(this.$refs.numbox.value))
        }
    }
};
</script>
<style>
</style>