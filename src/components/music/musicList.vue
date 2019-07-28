<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id == 1 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getmusicList(item.id)">
						{{ item.str }}
					</a>
				</div>
			</div>
		</div>
		
		<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in musicList" :key="item.song_id">
					<router-link :to="'/home/musicInfo/' + item.song_id">
					<img class="mui-media-object mui-pull-left" :src="item.pic_big">
					<div class="mui-media-body">
						<h1>{{item.album_title}}</h1>
						<p class='mui-ellipsis'>
							歌手：<span>{{item.artist_name}}</span>
						</p>
						<p class='read'>
							<span>唱片公司：{{ item.si_proxycompany}}</span><br />
							<span>发行时间：{{ item.publishtime}}</span>
						</p>
					</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.min.js";
	import Vue from "vue";
	Vue.directive('focus',{
				inserted:function(el,binding){
					el.focus();
				}
			});
	export default {
		data() {
			return {
				musicList: [],
				keywords:"",
				cates: [{
						str: "新歌榜",
						id: 1
					},
					{
						str: "热歌榜",
						id: 2
					},
					{
						str: "摇滚音乐",
						id: 11
					},
					{
						str: "爵士音乐",
						id: 12
					},
					{
						str: "流行音乐",
						id: 16
					},
					{
						str: "欧美金曲榜",
						id: 21
					},
					{
						str: "国语经典",
						id: 22
					},
					{
						str: "情歌对唱",
						id: 23
					},
					{
						str: "影视金曲",
						id: 24
					},
					{
						str: "网络歌曲",
						id: 25
					},
				],
			}
		},
		methods: {
			getmusicList(types,keywords) {
				this.$http.jsonp("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+types).then(res => {
					var newArry = [];
					this.musicList = res.body.song_list
					var result = this.musicList
					for(var i=0; i<result.length; i++){
						var itemtitle = result[i].title
						if(itemtitle.indexOf(this.keywords)!=-1){
							newArry.push(result[i])
						}
					}
					this.musicList=newArry
				})
			}
		},
		created() {
			this.getmusicList(1);
		},
		mounted() {
			mui(".mui-scroll-wrapper").scroll({
				deceleration: 0.0005
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	* {
		touch-action: pan-y;
	}
	.search{
		display: flex;
		input{
			border-radius:20px;
			height: 40px;
		}
	}
	.mui-table-view .mui-media-object {
		max-width: 95px;
		height: 95px;
	}
	
	.mui-table-view {
		li{
			h1{
				font-size: 14px;
			}
			.mui-ellipsis {
				font-size: 12px;
				color: #333;
			}
			.read {
				font-size: 12px;
				color: #0062bb;
			}
		}
	}
</style>