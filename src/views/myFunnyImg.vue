<template>
  <div>
    <van-sticky>
      <van-nav-bar
        class="mynavbar"
        title="我的趣图"
        left-text="首页"
        left-arrow
        @click-left="onReturn"
      />
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="list"
        :offset="100"
        @load="init"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
      >
        <div class="funnyImgItem" :class="{chose: item.id == choseId}" v-for="item in funnyImgList" :key="item.id">
          <van-image :src="item.image_link" @click="toImg(item)"></van-image>
          <div class="img-info">
            <div class="img-info-left">
              <p>描述:{{ item.image_desc }}</p>
              <p>分类：{{ item.image_title }}</p>
              <p>{{ item.add_time }}</p>
            </div>
            <van-button type="danger" @click="handleDelete(item.id)" size="small">删除</van-button>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <router-link
      class="changeRouter"
      tag="div"
      :to="{ name: 'createFunnyImg' }"
    >
      创建趣图
    </router-link>
  </div>
</template>

<script>
import {
  NavBar,
  ImagePreview,
  List,
  PullRefresh,
  Image,
  Sticky,
  Dialog,
  Button
} from "vant";

export default {
  name: "",
  data() {
    return {
      funnyImgList: [],
      imagePreview: [],
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      perpage: 5,
      choseId:0
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let data = await this.$api
        .funnyImgFreeQuery(this.page, this.perpage)
        .catch(err => {
          console.log(err);
          return "趣图获取失败";
        });
      this.refreshing = false;
      if (data.data.list.length < this.perpage) {
        this.finished = true;
      }
      this.page += 1;
      this.loading = false;
      let newData = data.data.list || [];
      this.funnyImgList = this.funnyImgList.concat(newData);
    },
    onRefresh() {
      this.page = 1;
      this.funnyImgList = [];
      this.loading = false;
      this.finished = false;
    },
    toImg(item) {
      if (item.image_link) {
        ImagePreview({
          images: [item.image_link],
          onClose() {
            // do something
          }
        });
      }
    },
    onReturn() {
      this.$router.push("/");
    },
    //删除选中的
    handleDelete(deleteId) {
      let that = this;
      this.choseId = deleteId
      Dialog.confirm({
        title: "确定删除该趣图？"
      })
        .then(async () => {
          let deleteFunnyImg = await that.$api
            .deleteFunnyImg(deleteId)
            .catch(err => {
              console.log(err);
              that.$toast.fail("数据获取失败");
              return "";
            });
          if (deleteFunnyImg.ret == 200 && deleteFunnyImg.data.err_code == 0) {
            that.$router.go(0);
          }
        })
        .catch(() => {
          this.choseId = 0
        });
    }
  },
  components: {
    "van-nav-bar": NavBar,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-image": Image,
    "van-sticky": Sticky,
    'van-button':Button
  }
};
</script>

<style lang="scss" scoped>
.funnyImgItem {
  background: #fff;
  margin-top: 5px;
  padding: 5px;
}
.chose{
  background: rgba(253, 41, 41, 0.2);
}
.list {
  padding-bottom: 60px;
}
.changeRouter {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #fff;
  box-shadow: 0px -1px 3px #888888;
}
.img-info{
  display: flex;
  align-items: flex-end;
  .img-info-left{
    flex: 1;
  }
}
</style>
