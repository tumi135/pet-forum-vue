<template>
  <div class="commentItem" :class="type=='commentItemList'?'bg':''">
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
      <span class="time" @click="to">{{ commentItem.add_time }}</span>
      <button
        v-if="type !== 'commentItemList'"
        class="toCommentItem"
        @click="to"
      >
        查看回复>>
      </button>
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
  methods:{
    to(){
      this.$router.push({
          path: '/commentItemList',
          query: { comment_tid: this.commentItem.tid, comment_id: this.commentItem.id }
        })
    }
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
.bg{
  background: #fff;
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
    border: none;
    outline: none;
    background: transparent;
  }
}
.van-icon {
  margin-right: 8px;
}
</style>
