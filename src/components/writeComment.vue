<template>
  <div>
    <van-overlay class="overlays" :show="commentShow" @click="closeOverlay">
      <div class="comment-input" @click.stop>
        <header class="overlays-top">
          <span>评论</span>
          <van-button plain size="small" @click="sendComment">发布</van-button>
        </header>
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          maxlength="140"
          placeholder="请输入评论"
          show-word-limit
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay, Field, Button, Toast } from 'vant';
export default {
  name: '',
  props: ['commentShow', 'replyTid', 'replyRname', 'replyRid'],
  data() {
    return {
      message: '',
      flag: false
    };
  },
  methods: {
    closeOverlay() {
      this.$emit('update:commentShow', false);
    },
    async sendComment() {
      var reg = /^\s*$/g;
      var test = reg.test(this.message);
      if (!test) {
        if (!this.flag) {
          this.flag = true;
          let data = await this.$api
            .createComment(
              this.replyTid,
              this.message,
              this.replyRid || null,
              this.replyRname || null
            )
            .catch(err => {
              console.log(err);
              this.$message.error('数据获取失败');
              return '获取失败';
            });
          this.flag = false;
          if (data == 'success') {
            this.message = '';
            Toast.success('发布成功');
            this.$emit('update:commentShow', false);
          } else {
            Toast.fail('发布出错');
          }
        }
      } else {
        Toast('请填写评论内容！');
      }
    }
  },
  watch: {
    // commentShow(){
    //   console.log(555)
    // }
  },
  components: {
    'van-overlay': Overlay,
    'van-field': Field,
    'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
.overlays {
  // position: relative;
  .comment-input {
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 5px 0px 5px;
    background: #fff;
  }
}
.overlays-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #efefef;
}
</style>
