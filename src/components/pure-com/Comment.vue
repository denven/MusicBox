<template>
	<div class="comment">
		<div class="author-avatar">
			<img class="user-avarta" :src="avatar" alt />
		</div>
		<div class="comment-detail">
			<div class="name-words">
				<span class="name">{{ name + ": " }}</span>
				<span>{{ content }}</span>
			</div>
			<div class="date-likes">
				<span class="date">{{ $helpers.formatTime(time) }}</span>
				<span class="likes">
					<i class="iconfont icon-like">{{ likedCount }}</i>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "comment",
	props: ["name", "avatar", "content", "time", "likedCount"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.comment {
	margin: 20px 0;
	@include flex-align(row, space-between, flex-start);
	.author-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		img {
			width: 100%;
		}
	}

	.comment-detail {
		flex: 1;
		padding-left: 10px;
		font-size: 14px;

		.name-words {
			line-height: 1.5;
			.name {
				color: #517eaf;
			}
		}
		.date-likes {
			@include flex-align(row, space-between);
			padding: 20px 0;
			color: #bebebe;
			border-bottom: 1px solid lightgrey;
		}
	}
}
</style>
