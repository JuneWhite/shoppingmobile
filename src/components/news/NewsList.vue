<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{item.add_time | dataFormat}}</span>
                                <span>点击：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            newsList:[],
        }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){
            this.$http.get("api/getnewslist").then(result=>{
                // console.log(result.body);
                if(result.body.status==0){
                    this.newsList=result.body.message
                }else{
                    Toast('后台系统忙碌，请稍后再试');
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    h1{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #226af2;
        display: flex;
        justify-content: space-between;
    }
}
</style>

