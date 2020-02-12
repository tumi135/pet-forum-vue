import { Toast } from 'vant';

const loginAndRegister = {
  created() {
    Toast.setDefaultOptions({ duration: 2000 });
    Toast.setDefaultOptions('loading', { forbidClick: true, overlay: true });
    this.getCaptchaInfo();
  },
  methods: {
    async getCaptchaInfo() {
      let captchaInfo = await this.$api.captchaCreate().catch(() => {
        Toast.fail('验证码获取失败！');
        return ''
      });
      if (captchaInfo.ret == 200 && captchaInfo.data.err_code == 0) {
        this.captcha_img = captchaInfo.data.captcha_img;
        this.captcha_id = captchaInfo.data.captcha_id;
      }
    },
    //检验验证码，正确则发送登录
    async checkChaInfo() {
      let checkRule = this.checkRule()
      if(!checkRule){
        return
      }

      let captchaCheckInfo = await this.$api
        .captchaVerify(this.captcha_id, this.form.captcha_code)
        .catch(() => {
          return '网络错误';
        });
      if (captchaCheckInfo.ret == 200 && captchaCheckInfo.data.err_code == 0) {
        if(this.$route.name == 'login'){
          this.goLogin();
        }else if(this.$route.name == 'register'){
          this.goRrgister();
        }
      } else if (captchaCheckInfo == '网络错误') {
        Toast.fail(captchaCheckInfo);

      } else {
        Toast.fail(captchaCheckInfo.data.err_msg);
      }
    }
  }
};
export default loginAndRegister;
