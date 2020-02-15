<template>
  <div>
    <van-nav-bar
      title="修改个人资料"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <form>
      <van-field
        v-model="form.email"
        label="邮箱"
        placeholder="请输入邮箱"
        :error-message="rule.email"
        @focus="rule.email = ''"
      />
      <div class="my-sex">
        <div class="van-cell__title van-field__label">
          <span>性别</span>
        </div>
        <van-radio-group v-model="form.sex">
          <van-radio class="radio-item" name="保密">保密</van-radio>
          <van-radio class="radio-item" name="男">男</van-radio>
          <van-radio class="radio-item" name="女">女</van-radio>
        </van-radio-group>
      </div>
      <div class="my-upload">
        <div class="van-cell__title van-field__label">
          <span>头像上传</span>
        </div>
        <van-uploader
          v-model="form.avatar"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="1"
        />
      </div>
    </form>
    <footer>
      <van-button type="info" @click="changeUserInfo" loading-text="发布中..."
        >修改个人信息</van-button
      >
    </footer>
    <keep-alive>
      <cut-avatar
        class="cut-avatar"
        v-if="show"
        :cut-my-avatar="avatarImg"
        :cut-avatar-show.sync="show"
        :avatar-url.sync="avatarImgUrl"
        @myOriginAvatar="tomyOriginAvatar"
      ></cut-avatar>
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  Button,
  NavBar,
  Field,
  Dialog,
  RadioGroup,
  Radio,
  Uploader
} from 'vant';

export default {
  name: '',
  data() {
    return {
      avatarImg: '',
      avatarImgUrl: '',
      nowuserInfo: {},
      form: {
        avatar: [],
        email: '',
        sex: ''
      },
      rule: {
        email: ''
      },
      show: false
    };
  },
  created() {
    this.initUserInfo();
  },
  methods: {
    ...mapMutations(['saveUserInfo','saveUserextInfo']),
    //获取用户个人信息
    async initUserInfo() {
      let userInfo = this.userInfo;
      if (!userInfo.username) {
        let data = await this.$api.userProfile();
        if (data.ret == 200 && data.data.err_code == 0) {
          userInfo = data.data.info;
          this.saveUserInfo(userInfo);
        } else {
          this.$toast('个信息获取失败，请刷新！');
        }
      }
      this.nowuserInfo = userInfo;
      this.form = {
        avatar: [{ url: this.nowuserInfo.ext_info.yesapi_avatar }],
        email: this.nowuserInfo.ext_info.yesapi_email,
        sex: this.nowuserInfo.ext_info.yesapi_sex
      };
      this.avatarImgUrl = this.nowuserInfo.ext_info.yesapi_avatar;
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
    //读取图片后打开截图工具
    async afterRead(file) {
      this.$nextTick(() => {
        this.avatarImg = file.content;
        this.show = true;
      });
    },
    //改变图片地址
    tomyOriginAvatar(url) {
      this.avatarImgUrl = url;
      this.form.avatar = [{ url: url }];
    },
    //检测表单
    checkRule() {
      var emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.form.email && !emailReg.test(this.form.email)) {
        this.rule.email = '邮箱格式不正确';
        return false;
      }

      return true;
    },
    changeUserInfo() {
      let checkRule = this.checkRule();
      let that = this;
      if (!checkRule) {
        return;
      }
      Dialog.confirm({
        title: '确定修改个人资料？'
      }).then(() => {
        that.submitForm();
      });
    },
    async submitForm() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '发送中...'
      });
      let userUpdateExtInfo = await this.$api
        .userUpdateExtInfo(this.avatarImgUrl, this.form.sex, this.form.email)
        .catch(err => {
          return err;
        });
      this.$toast.clear();

      if (
        userUpdateExtInfo.ret == 200 &&
        userUpdateExtInfo.data.err_code == 0
      ) {
        this.$toast.success('修改成功!');
        this.saveUserextInfo(userUpdateExtInfo.data.ext_info);
      } else {
        this.$toast.fail('修改失败!');
      }
    },
    onReturn() {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initUserInfo();
    });
  },
  components: {
    'van-nav-bar': NavBar,
    'van-field': Field,
    'van-button': Button,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-uploader': Uploader,
    'cut-avatar': () => import('../components/changeUserInfo/cutAvatar')
  }
};
</script>

<style lang="scss" scoped>
.my-sex,
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
.radio-item {
  margin-bottom: 8px;
}
.cut-avatar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: #fff;
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
</style>
