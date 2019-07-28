<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.data.id == 1 ? 'mui-active' : '']" v-for="(item,index) in cates" :key="item.data.id" @click="getMoves(item.data.id)">
						{{ item.data.title.replace(/#/g,"") }}
					</a>
				</div>
			</div>
		</div>
		<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in moveList" :key="item.id">
						<img class="mui-media-object mui-pull-left" :src="item.data.content.data.cover.detail">
						<div class="mui-media-body">
							<h1>{{item.data.content.data.title}}</h1>
							<p class='mui-ellipsis'>
								内容概述：<span>{{item.data.content.data.description}}</span>
							</p>
							<p class='read'>
								<span>发布时间：{{ item.data.content.data.releaseTime/1000|dataFormat}}</span>
							</p>
						</div>
						<div class="moves">
							<video :src="item.data.content.data.playUrl" controls="controls"></video>
						</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.min.js";
	export default {
		data() {
			return {
				cates: [],
				moveList: [],
			}
		},
		methods: {
			getMoveList() {
				this.$http.get("https://api.apiopen.top/videoCategory").then(res => {
					this.cates = res.body.result.itemList
				})
			},
			getMoves(str) {
				this.$http.get("https://api.apiopen.top/videoCategoryDetails?id=" + str).then(res => {
					this.moveList = res.body.result
				})
			}
		},
		created() {
			this.getMoveList();
			this.getMoves(14);
		},
		mounted() {
			mui(".mui-scroll-wrapper").scroll({
				deceleration: 0.0005
			})
		},
	}
</script>

<style lang="less" scoped="scoped">
	* {
		touch-action: pan-y;
	}
	
	.mui-table-view .mui-media-object {
		max-width: 60px;
		height: 60px;
	}
	
	.mui-table-view {
		.moves {
			margin: 0 auto;
			video {
				width: 100%;
			}
		}
		li {
			h1 {
				font-size: 14px;
				color: #333;
			}
			.mui-ellipsis {
				font-size: 12px;
				color: #666;
			}
			.read {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				color: #0062CC;
			}
		}
	}
</style>