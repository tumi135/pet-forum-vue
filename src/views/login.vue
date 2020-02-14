<template>
  <div>
    <form>
      <van-field
        v-model="form.name"
        :error="rule.name"
        required
        label="用户名"
        placeholder="请输入用户名"
        @focus="rule.name = false"
      />
      <van-field
        v-model="form.password"
        :error="rule.password"
        required
        type="password"
        label="密码"
        placeholder="请输入密码"
        @focus="rule.password = false"
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
        <van-button @click="checkChaInfo" type="info">登录</van-button>
        <van-button type="default" @click="toRegisterRouter">注册</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { Button, Field } from 'vant';
import { mapMutations } from 'vuex';
import loginAndRegister from '../mixins/loginAndRegister.js';
export default {
  name: '',
  mixins: [loginAndRegister],
  data() {
    return {
      form: {
        name: '',
        password: '',
        captcha_code: ''
      },
      rule: {
        name: false,
        password: false,
        captcha_code: false
      },
      username: '',
      password: '',
      captcha_id: '',
      captcha_img: '',
      redirect: ''
    };
  },
  created() {},
  methods: {
    ...mapMutations(['login']),
    checkRule() {
      if (!this.form.name) {
        this.rule.name = true;
        return false;
      }
      if (!this.form.password) {
        this.rule.password = true;
        return false;
      }
      if (!this.form.captcha_code) {
        this.rule.captcha_code = true;
        return false;
      }
      return true;
    },
    async goLogin() {
      let loginInfo = await this.$api
        .userLogin(this.form.name, this.form.password)
        .catch(() => {
          return '网络错误';
        });
      this.$toast.clear();

      if (loginInfo.ret == 200 && loginInfo.data.err_code == 0) {
        this.$toast.success('登录成功');
        this.login(loginInfo.data);
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push({ name: 'home' });
        }
      } else if (loginInfo == '网络错误') {
        this.$toast.fail('网络错误');
      } else {
        this.$toast.fail(loginInfo.data.err_msg);
      }
    },
    toRegisterRouter() {
      if (this.$route.query.redirect) {
        this.$router.push({
          name: 'register',
          query: { redirect: this.$route.query.redirect }
        });
      } else {
        this.$router.push({ name: 'register' });
      }
    }
  },
  components: {
    'van-field': Field,
    'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/loginAndRegister.scss';
</style>
