<template>
  <div>
    <van-overlay class="overlays" :show="commentShow" @click="closeOverlay">
      <div class="comment-input" @click.stop>
        <header class="overlays-top">
          <span>评论</span>
          <van-button plain size="small" @click="sendComment">发布</van-button>
        </header>
        <van-field
          v-if="replyName"
          label="回复"
          :value="'@' + replyName"
          readonly
        />
        <van-field
          v-model="form.content"
          rows="5"
          autosize
          type="textarea"
          maxlength="140"
          placeholder="请输入评论"
          show-word-limit
        />
        <div class="my-upload">
          <div class="van-cell__title van-field__label">
            <span>图片上传</span>
          </div>

          <van-uploader
            v-model="picList"
            multiple
            :before-read="beforeRead"
            :after-read="afterRead"
            :max-count="9"
          />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay, Field, Button, Toast, Uploader } from "vant";
export default {
  name: "",
  props: ["commentShow", "replyName"],
  data() {
    return {
      message: "",
      flag: false,
      picList: [],
      form: {
        content: "",
        pic: []
      }
    };
  },
  created() {
    Toast.setDefaultOptions({ duration: 2000 });
    Toast.setDefaultOptions("loading", { forbidClick: true });
  },
  methods: {
    closeOverlay() {
      this.$emit("update:commentShow", false);
    },
    async sendComment() {
      var reg = /^\s*$/g;
      var test = reg.test(this.form.content);

      let pics = JSON.stringify({ pic: this.form.pic });
      if (!test) {
        if (!this.flag) {
          this.flag = true;
          let data = await this.$api
            .createFeedback(this.form.content, this.replyName, pics)
            .catch(err => {
              console.log(err);
              return "获取失败";
            });
          this.flag = false;
          if (data.ret == 200 && data.data.err_code == 0) {
            this.message = "";
            Toast.success("发布成功");
            this.$emit("update:commentShow", false);
          } else {
            Toast.fail("发布出错");
          }
        }
      } else {
        Toast("请填写评论内容！");
      }
    },
    //图片上传前校验
    beforeRead(file) {
      var isLt1M, big;
      isLt1M = file.size / 1024 / 1024 < 0.5;
      big = 500;
      if (!isLt1M) {
        Toast.fail(`上传文件大小不能超过 ${big}k!`);
        return false;
      }
      return true;
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      file.status = "uploading";
      file.message = "上传中...";

      let myImg = await this.$api
        .uploadImgByBase64(file.content, "article_type")
        .catch(err => {
          return err;
        });
      if (myImg.ret == 200 && myImg.data.err_code == 0) {
        this.form.pic.push({
          url: myImg.data.url,
          name: file.file.name
        });
        file.status = "done";
        file.message = "";
      } else {
        file.status = "failed";
        file.message = "上传失败";
      }
    }
  },
  watch: {},
  components: {
    "van-overlay": Overlay,
    "van-field": Field,
    "van-button": Button,
    "van-uploader": Uploader
  }
};
</script>

<style lang="scss" scoped>
.overlays {
  // position: relative;
  z-index: 999;
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
