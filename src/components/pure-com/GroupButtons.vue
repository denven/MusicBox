<template>
	<div class="gp-buttons">
		<span class="play">
			<el-button size="mini" type="danger"> <i class="iconfont icon-bofang">Play</i> </el-button>
			<el-button size="mini" type="danger"> <i class="iconfont icon-Add"></i> </el-button>
		</span>
		<el-button size="mini">
			<i class="iconfont icon-shoucangjia2"> {{ subCount }}</i>
		</el-button>
		<el-button size="mini">
			<i class="iconfont icon-ArtboardCopy"> {{ shareCount }}</i>
		</el-button>
		<el-button size="mini">
			<i class="iconfont icon-Clouddownload"> </i>
		</el-button>
		<el-button size="mini">
			<i class="iconfont icon-message">{{ commentCount }}</i>
		</el-button>
	</div>
</template>

<script>
export default {
	name: "GroupButtons",
	props: ["subCount", "shareCount", "commentCount"],
};
</script>

<style lang="scss" scoped>
.gp-buttons > span > button {
	padding: 7px 5px;
}
.gp-buttons > span > button:nth-child(1) {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.gp-buttons > span > button:nth-child(2) {
	margin-left: 0.8px;
	margin-right: 10px;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
</style>
