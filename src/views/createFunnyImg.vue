<template>
  <div>
    <van-nav-bar
      title="创建趣图"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />

    <form class="forms">
      <van-field
        v-model="form.image_desc"
        rows="3"
        autosize
        required
        label="描述"
        type="textarea"
        maxlength="30"
        placeholder="请输入描述内容"
        :error-message="formRules.image_desc"
        show-word-limit
      />
      <van-field label="分类" :value="form.image_title" readonly />
      <div class="my-upload van-cell--required">
        <div class="van-cell__title van-field__label">
          <span>图片上传</span>
        </div>

        <van-uploader
          v-model="picList"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="1"
          @delete="deleteImg"
        />
        <p class="error-message">{{ formRules.litpic }}</p>
      </div>
    </form>
    <footer>
      <van-button
        type="info"
        @click="submitForm"
        :loading="flag"
        loading-text="发布中..."
        >创建趣图</van-button
      >
    </footer>
  </div>
</template>

<script>
import { Button, NavBar, Field, Uploader } from 'vant';

export default {
  name: '',
  data() {
    return {
      showPicker: false,
      typeName: '',
      form: {
        image_title: '用户个人',
        litpic: '',
        image_desc: ''
      },
      formRules: {
        image_desc: '',
        litpic: ''
      },
      picList: [],
      columns: [],
      flag: false
    };
  },
  created() {},
  methods: {
    onReturn() {
      this.$router.push('/');
    },
    //图片上传前校验
    beforeRead(file) {
      var isLt1M, big;
      isLt1M = file.size / 1024 / 1024 < 0.5;
      big = 500;
      if (!isLt1M) {
        this.$toast.fail(`上传文件大小不能超过 ${big}k!`);
        return false;
      }
      return true;
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      file.status = 'uploading';
      file.message = '上传中...';

      let myImg = await this.$api
        .uploadImgByBase64(file.content, 'funny_img')
        .catch(err => {
          return err;
        });
      if (myImg.ret == 200 && myImg.data.err_code == 0) {
        this.form.litpic = myImg.data.url;
        this.formRules.litpic = '';
        file.status = 'done';
        file.message = '';
      } else {
        file.status = 'failed';
        file.message = '上传失败';
      }
    },
    //删除图片
    deleteImg() {
      this.form.litpic = '';
    },
    //发布
    async submitForm() {
      var reg = /^\s*$/g;
      var test = reg.test(this.form.image_desc);
      if (test) {
        this.formRules.image_desc = '请输入文章内容';
        return;
      }
      if (!this.form.litpic) {
        this.formRules.litpic = '请上传图片';
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      let data = await this.$api
        .createFunnyImg(
          this.form.image_title,
          this.form.litpic,
          this.form.image_desc
        )
        .catch(err => {
          return err;
        });
      this.$toast.clear();
      if (data.ret == 200 && data.data.err_code == 0) {
        this.$toast.success('发布成功');
        this.form = {
          image_title: '用户个人',
          litpic: '',
          image_desc: ''
        };
        this.picList = [];
        this.typeName = '';
      } else {
        this.$toast.fail(`发布失败！`);
      }
    }
  },
  components: {
    'van-nav-bar': NavBar,
    'van-field': Field,
    'van-button': Button,
    'van-uploader': Uploader
  }
};
</script>

<style lang="scss" scoped>
.forms {
  background: #fff;
}
.my-upload {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
footer {
  position: relative;
  margin-top: 20px;
  button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.error-message {
  color: #ee0a24;
  font-size: 12px;
  text-align: left;
}
</style>
