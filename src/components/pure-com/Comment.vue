<template>
  <div class="comment">
    <div class="author-avatar">
      <img
        class="user-avarta"
        src="https://p1.music.126.net/ROGI7vt4jlH6i-Ue9cigZA==/109951164877283403.jpg?param=120y120"
        alt
      />
    </div>
    <div class="comment-detail">
      <div class="name-words">
        <span class="name">评论者:</span>
        <span>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容论内容评评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容论内容评评论内容评论内容评论内容评论内容评论内容评论内容评评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容论内容评评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容论内容</span>
      </div>
      <div class="date-likes">
        <span class="date">2020-10-22</span>
        <span class="likes">
          <i class="iconfont ziyuan">100</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments"
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.comment {
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
      border-bottom: 1px solid #bebebe;
    }
  }
}
</style>