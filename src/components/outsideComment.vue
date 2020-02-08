<template>
  <div class="commentItem">
    <div class="top">
      <div class="avatar">
        <img :src="commentItem.avatar" />
      </div>
      <div class="info">
        <p>{{ commentItem.writer }}</p>
        <p>{{ commentItem.create_name }}</p>
      </div>
    </div>
    <div>{{ commentItem.content }}</div>
    <div class="footer van-hairline--top">
      <span class="time">{{ commentItem.add_time }}</span>
      <router-link class="toCommentItem" :to="{name: 'commentItem', query: {comment_tid: commentItem.tid,comment_rid: commentItem.id}}">
        查看回复>>
      </router-link>
    </div>
  </div>
</template>

<script>
// import { Button } from 'vant'; //, ImagePreview, Button

export default {
  props: ['commentItem', 'type'],
  data() {
    return {
      pic: []
    };
  },
  created() {},
  watch: {},
  components: {
    // 'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
.commentItem {
  margin-bottom: 5px;
  padding: 5px 10px;
  border-bottom: 1px solid #636363;
}
.top {
  height: 80px;
  display: flex;
  align-items: center;

  .avatar {
    width: 60px;
    height: 60px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time {
    font-size: 10px;
    color: #636363;
  }
  .toCommentItem {
    color: #0080ff;
  }
}
.van-icon {
  margin-right: 8px;
}
</style>
