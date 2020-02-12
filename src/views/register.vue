<template>
  <div>
    <form>
      <van-field
        v-model="form.name"
        :error-message="rule.name"
        required
        label="用户名"
        placeholder="请输入4-8位字母或数字"
        @focus="rule.name = ''"
      />
      <van-field
        v-model="form.password"
        :error-message="rule.password"
        required
        type="password"
        label="密码"
        placeholder="请输入6-12位小写字母或数字"
        @focus="rule.password = ''"
      />
      <van-field
        v-model="form.checkPassword"
        :error-message="rule.checkPassword"
        required
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        @focus="rule.checkPassword = ''"
      />
      <van-field
        v-model="form.captcha_code"
        :error="rule.captcha_code"
        required
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        @focus="rule.captcha_code = false"
      >
        <img
          class="captcha_img"
          slot="button"
          @click="getCaptchaInfo"
          :src="'data:image/jpeg;base64,' + captcha_img"
        />
      </van-field>
      <div class="button-box">
        <van-button @click="checkChaInfo" type="info">注册</van-button>
        <van-button type="default" @click="toLoginRouter">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { Button, Field, Toast } from "vant";
import loginAndRegister from "../mixins/loginAndRegister.js";
export default {
  mixins: [loginAndRegister],
  data() {
    return {
      form: {
        name: "",
        password: "",
        checkPassword: "",
        captcha_code: ""
      },
      rule: {
        name: "",
        password: "",
        checkPassword: "",
        captcha_code: false
      },
      captcha_id: "",
      captcha_img: ""
    };
  },
  created() {},
  methods: {
    //检测表单
    checkRule() {
      var nameReg = /^[0-9a-zA-Z]{4,6}$/;
      var passwordReg = /^[0-9a-z]{6,12}$/;
      if (!this.form.name) {
        this.rule.name = "请输入用户名";
        return false;
      }
      if (!nameReg.test(this.form.name)) {
        this.rule.name = "账号格式不对!";
        return false;
      }
      if (!this.form.password) {
        this.rule.password = "请输入密码!";
        return false;
      }
      if (!passwordReg.test(this.form.password)) {
        this.rule.password = "密码格式不对!!";
        return false;
      }
      if (!this.form.checkPassword) {
        this.rule.checkPassword = "请再次输入密码";
        return false;
      }
      if (this.form.checkPassword !== this.form.password) {
        this.rule.checkPassword = "两次输入密码不一致!";
        return false;
      }
      if (!this.form.captcha_code) {
        this.rule.captcha_code = true;
        return false;
      }
      return true;
    },
    //发送注册
    async goRrgister() {
      let loginInfo = await this.$api
        .userRegister(this.form.name, this.form.password)
        .catch(() => {
          return "网络错误";
        });
      this.fullscreenLoading = false;
      if (loginInfo.ret == 200 && loginInfo.data.err_code == 0) {
        Toast.success({ duration: 3, message: "注册成功" });
        this.$router.push({ name: "login" });
      } else {
        Toast.fail(loginInfo.data.err_msg);
      }
    },
    toLoginRouter() {
      this.$router.push({ name: "login" });
    }
  },
  components: {
    "van-field": Field,
    "van-button": Button
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/loginAndRegister.scss";
</style>
