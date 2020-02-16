<template>
  <div>
    <van-nav-bar
      title="写文章"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <form class="forms">
      <van-field
        v-model="form.content"
        rows="5"
        autosize
        required
        label="内容"
        type="textarea"
        maxlength="800"
        placeholder="请输入文章内容"
        :error-message="formRules.content"
        show-word-limit
      />
      <van-field
        readonly
        clickable
        required
        label="文章分类"
        :value="typeName"
        placeholder="选择分类"
        @click="showPicker = true"
        :error-message="formRules.type_id"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="my-upload">
        <div class="van-cell__title van-field__label">
          <span>图片上传</span>
        </div>

        <van-uploader
          v-model="picList"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="9"
        />
      </div>
    </form>
    <footer>
      <van-button
        type="info"
        @click="submitForm"
        :loading="flag"
        loading-text="发布中..."
        >发布文章</van-button
      >
    </footer>
  </div>
</template>

<script>
import { Button, NavBar, Field, Picker, Popup, Uploader } from 'vant';

export default {
  name: '',
  data() {
    return {
      showPicker: false,
      typeName: '',
      form: {
        type_id: '',
        content: '',
        pic: [],
        tuijian: 50,
        online: 0
      },
      formRules: {
        content: '',
        type_id: ''
      },
      picList: [],
      typeList: [],
      columns: [],
      flag: false
    };
  },
  created() {
    this.$toast.setDefaultOptions({ duration: 2000 });
    this.$toast.setDefaultOptions('loading', { forbidClick: true });
    this.initTypeList();
  },
  methods: {
    //初始化分类
    async initTypeList() {
      let datas = await this.$api.articleTypeFreeQuery(1, 30).catch(err => {
        console.log(err);
        this.$toast.fail(`数据获取失败！`);
        return '';
      });
      this.typeList = datas.data.list || [];
      this.columns = this.typeList.map(item => {
        return item.type_name;
      });
    },
    onReturn() {
      this.$router.push('/');
    },
    //分类选择事件
    onConfirm(val, index) {
      this.typeName = val;
      this.showPicker = false;
      this.form.type_id = this.typeList[index].id;
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
        .uploadImgByBase64(file.content, 'article_type')
        .catch(err => {
          return err;
        });
      if (myImg.ret == 200 && myImg.data.err_code == 0) {
        file.status = 'done';
        file.message = '';
        file.url = myImg.data.url;
      }else if(myImg.ret == 401){
        this.$toast.fail(myImg.data.err_msg)
        file.status = 'failed';
        file.message = '上传失败';
        file.url = '';
      } else {
        file.status = 'failed';
        file.message = '上传失败';
        file.url = '';
      }
    },
    
    getImgList() {
      let list = [];
      for (var item of this.picList) {
        if (item.url) {
          let imgInfo = {
            url: item.url,
            name: item.file.name
          };
          list.push(imgInfo);
        }
      }
      return list;
    },
    //发布文章
    async submitForm() {
      this.form.pic = this.getImgList();
      var reg = /^\s*$/g;
      var test = reg.test(this.form.content);
      let pics = JSON.stringify({ pic: this.form.pic });
      if (test) {
        this.formRules.content = '请输入文章内容';
        return;
      }
      if (!this.form.type_id) {
        this.formRules.type_id = '请选择文章分类';
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      let data = await this.$api
        .createArticle(
          this.form.type_id,
          this.form.content,
          this.online,
          this.form.tuijian,
          pics
        )
        .catch(err => {
          return err;
        });
      this.$toast.clear();
      if (data.ret == 200 && data.data.err_code == 0) {
        this.$toast.success('发布成功');
        this.form = {
          type_id: '',
          content: '',
          pic: [],
          tuijian: 50,
          online: 0
        };
        this.picList = [];
        this.typeName = '';
      }else if(data.ret == 401){
        this.$toast.fail(data.data.err_msg)
      }  else {
        this.$toast.fail(`发布失败！`);
      }
    }
  },
  components: {
    'van-nav-bar': NavBar,
    'van-field': Field,
    'van-picker': Picker,
    'van-popup': Popup,
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
</style>
