<template>
  <div>
    <van-nav-bar
      title="修改密码"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <form>
      <van-field
        v-model="form.oldPassword"
        :error="rule.oldPassword"
        required
        type="password"
        label="旧密码"
        placeholder="请输入旧密码"
        @focus="rule.oldPassword = false"
      />
      <van-field
        v-model="form.newPassword"
        :error-message="rule.newPassword"
        required
        type="password"
        label="新密码"
        placeholder="请输入6-12位小写字母或数字"
        @focus="rule.newPassword = ''"
      />
      <van-field
        v-model="form.checkPassword"
        :error-message="rule.checkPassword"
        required
        type="password"
        label="确认密码"
        placeholder="请输入6-12位小写字母或数字"
        @focus="rule.checkPassword = ''"
      />
    </form>
    <footer>
      <van-button type="info" @click="changePassword" loading-text="发布中..."
        >修改密码</van-button
      >
    </footer>
  </div>
</template>

<script>
import { Button, NavBar, Field, Dialog } from 'vant';
import { mapMutations } from 'vuex';

export default {
  name: '',
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rule: {
        oldPassword: false,
        newPassword: '',
        checkPassword: ''
      }
    };
  },
  methods: {
    ...mapMutations(['logout']),
    //检测表单
    checkRule() {
      var passwordReg = /^[0-9a-z]{6,12}$/;
      if (!this.form.oldPassword) {
        this.rule.oldPassword = true;
        return false;
      }

      if (!this.form.newPassword) {
        this.rule.newPassword = '请输入密码!';
        return false;
      }
      if (!passwordReg.test(this.form.newPassword)) {
        this.rule.newPassword = '密码格式不对!!';
        return false;
      }
      if (!this.form.checkPassword) {
        this.rule.checkPassword = '请再次输入密码';
        return false;
      }
      if (this.form.checkPassword !== this.form.newPassword) {
        this.rule.checkPassword = '两次输入密码不一致!';
        return false;
      }
      return true;
    },
    changePassword() {
      let checkRule = this.checkRule();
      let that = this;
      if (!checkRule) {
        return;
      }
      Dialog.confirm({
        title: '确定修改密码？'
      }).then(() => {
        that.submitForm();
      });
    },
    //发送
    async submitForm() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '发送中...'
      });
      let changeInfo = await this.$api
        .alterPassword(
          this.$store.state.userInfo.username,
          this.form.oldPassword,
          this.form.newPassword
        )
        .catch(err => {
          return err;
        });
      this.$toast.clear();
      if (changeInfo.ret == 200 && changeInfo.data.err_code == 0) {
        Dialog.alert({
          title: '修改密码成功,请重新登录！'
        }).then(() => {
          this.logout();
          this.$router.push({ name: 'login' });
        });
      } else {
        this.$toast.fail(changeInfo.data.err_msg);
      }
    },
    onReturn() {
      this.$router.push('/');
    }
  },
  components: {
    'van-nav-bar': NavBar,
    'van-field': Field,
    'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
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
