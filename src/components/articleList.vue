<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :offset="100"
        @load="onLoad"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
      >
        <article-item
          v-for="(item, index) in articleList"
          :key="item.id"
          @changePriceSon="changePriceFater"
          :article-item="item"
          :item-index="index"
          :article-type="type"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh } from "vant";
export default {
  props: ["articleListInfo", "type"],
  data() {
    return {
      articleList: [],
      refreshing: false,
      loading: false,
      finished: false,
      myPraise: []
    };
  },
  created() {
    this.init();
    this.getPraise();
  },
  methods: {
    async init() {
      let data = await this.$api
        .articleFreeQuery(...Object.values(this.articleListInfo))
        .catch(err => {
          console.log(err);
          return "文章获取失败";
        });
      let newData = data.data.list || [];
      this.refreshing = false;
      if (newData.length < this.articleListInfo.perpage) {
        this.finished = true;
      }
      if (data.data.list) {
        let uuids = data.data.list.map(item => {
          return item.user_id;
        });
        this.condonAvatarAndPraise(uuids, newData);
      }
    },
    async condonAvatarAndPraise(uuids, newData) {
      let data = await this.$api.userMultiProfile(uuids).catch(err => {
        console.log(err);
        return "获取失败";
      });
      if (data.data.info_list) {
        let avatarList = data.data.info_list;
        newData.forEach(item => {
          let avatarInfo = avatarList.filter(oItem => {
            return oItem.uuid == item.user_id;
          });
          if (avatarInfo[0]) {
            let praise = this.myPraise.includes(item.id);
            item.praise = praise;
            item.avatar = avatarInfo[0].ext_info.yesapi_avatar || "";
          }
        });
      }

      this.articleList = this.articleList.concat(newData);
      this.loading = false;
    },
    onLoad() {
      let newInfo = JSON.parse(JSON.stringify(this.articleListInfo));
      newInfo.page += 1;
      this.$emit("update:articleListInfo", newInfo);
    },
    onRefresh() {
      let newInfo = JSON.parse(JSON.stringify(this.articleListInfo));
      newInfo.page = 1;
      this.articleList = [];
      this.$emit("update:articleListInfo", newInfo);
    },
    async getPraise() {
      let data = await this.$api.praiseFreeQuery(1, 500).catch(err => {
        console.log(err);
        return "文章获取失败";
      });
      let dataArry = data.data.list || [];
      this.myPraise = dataArry.map(item => {
        return item.articleId;
      });
    },
    changePriceFater(val, index) {
      let num;
      if (val) {
        num = this.articleList[index].praise_num + 1;
      } else {
        num = this.articleList[index].praise_num - 1;
      }
      this.$set(this.articleList[index], `praise`, val);
      this.$set(this.articleList[index], `praise_num`, num);
    }
  },
  watch: {
    articleListInfo: {
      handler(n) {
        if (n.page == 1) {
          this.articleList = [];
          this.loading = false;
          this.finished = false;
          // return
        }
        this.init();
      },
      // immediate: true,
      deep: true
    }
  },
  components: {
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "article-item": () => import("../components/articleItem")
  }
};
</script>

<style scoped>
.article-list {
  padding-bottom: 60px;
}
</style>
