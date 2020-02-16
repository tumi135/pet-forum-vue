<template>
  <div>
    <div class="cropper-content">
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="cutMyAvatar"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>
    </div>
    <div class="button-box">
      <van-button @click="finish" type="info">确定</van-button>
      <van-button type="default" @click="vclose">取消</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import { Button } from 'vant';

export default {
  props: ['cutMyAvatar', 'cutAvatarShow', 'avatarUrl'],
  name: '',
  data() {
    return {
      // 裁剪组件的基础配置option
      option: {
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    };
  },
  methods: {
    //获取base64格式截图,上传，获取地址
    finish() {
      this.$refs.cropper.getCropData(async data => {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '发送中...'
        });
        let newAvatar = await this.$api
          .uploadImgByBase64(data, 'avatar')
          .catch(err => {
            return err;
          });
        this.$toast.clear();
        if (newAvatar.ret == 200 && newAvatar.data.err_code == 0) {
          this.$emit('update:cutAvatarShow', false);
          this.$emit('myOriginAvatar', newAvatar.data.url);
        } else if (newAvatar.ret == 401) {
          this.$toast.fail(newAvatar.data.err_msg);
        } else {
          this.$toast('头像修改失败,刷新或换图片！');
        }
      });
    },
    vclose() {
      this.$emit('update:cutAvatarShow', false);
      this.$emit('myOriginAvatar', this.avatarUrl);
    }
  },
  watch: {
    cutMyAvatar() {
      this.option.img = this.cutMyAvatar;
    }
  },
  components: {
    'van-button': Button,
    VueCropper
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/loginAndRegister.scss';

.cropper {
  width: 100vw;
  height: 100vw;
}
</style>
