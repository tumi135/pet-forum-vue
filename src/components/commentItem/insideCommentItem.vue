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
      <span class="time">{{ commentItem.add_time }}</span>
      <van-button
        class="toReplyComment"
        @click="toReplyComment"
      >
        回复评论>>
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'; //, ImagePreview, Button

export default {
  props: ['commentItem', 'type','replyName','commentShow'],
  data() {
    return {
      pic: []
    };
  },
  created() {},
  methods:{
    toReplyComment(){
      this.$emit("update:replyName", this.commentItem.create_name);
      this.$emit('update:commentShow', true);
    }
  },
  watch: {},
  components: {
    'van-button': Button
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
    width: 40px;
    height: 40px;
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
  .toReplyComment {
    color: #0080ff;
    border: 0px;
    outline: 0px;
    background: transparent;
  }
}
.van-icon {
  margin-right: 8px;
}
</style>
