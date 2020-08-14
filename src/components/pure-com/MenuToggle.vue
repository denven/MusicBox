<template>
	<div class="toggle" :class="{ 'nav-show': bShowMenu, 'nav-hide': !bShowMenu }" @click="toggleNavMenu">
		<i v-if="bShowMenu" class="el-icon-s-fold" title="Fold Menu"></i>
		<i v-else class="iconfont el-icon-s-unfold" title="Expand Menu"></i>
	</div>
</template>

<script>
export default {
	name: "MenuToggle",
	data() {
		return { bShowMenu: true };
	},
	methods: {
		toggleNavMenu() {
			this.bShowMenu = !this.bShowMenu;
			this.$emit("toggle", this.bShowMenu);
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle {
	position: absolute;
	width: 24px;
	height: 24px;
	top: 66px;
	z-index: 1000;
	i {
		width: 24px;
		height: 24px;
		font-size: 24px;
		color: #c33f18;
		opacity: 0.5;
		cursor: pointer;
	}
}

.nav-show {
	left: 170px;
	animation: horizonMoveLeft 1.5s infinite;
	-webkit-animation: horizonMoveLeft 1.5s infinite;
}

.nav-hide {
	left: -5px;
	animation: horizonMoveRight 1.5s infinite;
	-webkit-animation: horizonMoveRight 1.5s infinite;
	i {
		color: grey;
	}
}

@keyframes horizonMoveLeft {
	from {
		left: 175px;
	}
	to {
		left: 170px;
	}
}
@-webkit-keyframes horizonMoveLeft {
	from {
		left: 175px;
	}
	to {
		left: 170px;
	}
}

@keyframes horizonMoveRight {
	from {
		left: -5px;
	}
	to {
		left: 0px;
	}
}
@-webkit-keyframes horizonMoveRight {
	from {
		left: -5px;
	}
	to {
		left: 0px;
	}
}
</style>
