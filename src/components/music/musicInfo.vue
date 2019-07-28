<template>
	<div>
		<div class="musicInfo">
			<h2>{{musicinfo.album_title}}</h2>
			<h3>歌手：{{musicinfo.author}}</h3>
			<p class="musicInfo_reader">
				<span>格式：{{music.file_extension}}</span>
			</p>
			<p class="musicInfo_reader">
				唱片公司：{{musicinfo.si_proxycompany}}
			</p>
			<hr />
			<div class="imgs">
				<img :src="musicinfo.pic_huge" />
			</div>
			<div class="bofang">
				<audio :src="music.file_link" autoplay="autoplay" controls="controls" loop="loop"></audio>
			</div>
			<!--<div class="musiclrc">				
				<p class="lrc" v-html="musiclrc.lrcContent"></p>
			</div>-->
			<div class="musicInfo_content">{{musicinfo.desc}}</div>
			<comment :id="this.id"></comment>
		</div>
	</div>
</template>

<script>
	import comment from "../subcomponents/comment.vue"
	export default {
		data() {
			return {
				id: this.$route.params.song_id,
				music: {},
				musicinfo: {},
				musiclrc:{},
			}
		},
		methods: {
			getMusicInfo() {
				this.$http.jsonp("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.id).then(res => {
					this.music = res.body.bitrate;
					this.musicinfo = res.body.songinfo;
				})
			},
			getlrc(){
				this.$http.jsonp("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid="+this.id).then(res=>{
					this.musiclrc=res.body
					
				})
			}
		},
		components: {
			comment
		},
		created() {
			this.getMusicInfo();
			this.getlrc();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.musicInfo {
		padding: 10px 0;
		.bofang {
			text-align: center;
		}
		h2 {
			line-height: 25px;
			color: red;
			text-align: center;
			font-size: 20px;
		}
		h3 {
			padding: 0 60px;
			line-height: 20px;
			color: #333;
			font-size: 14px;
			text-align: center;
			margin-bottom: 10px;
		}
		.musicInfo_reader {
			font-size: 14px;
			margin-left: 10px;
			color: darkslategrey;
		}
		.imgs {
			text-align: center;
			img {
				width: 90%;
			}
		}
		.musicInfo_content {
			padding: 0 20px;
			text-align: justify;
			color: #333;
			font-size: 13px !important;
			text-indent: 2rem;
			img {
				width: 345px;
			}
		}
		.musiclrc p{
			width: 90%;
			margin: 0 auto;
			color: #333;
			font-size: 13px;
			text-align: justify;
		}
	}
</style>