<template>
  <div class="article-list">
    <van-list
      :offset="100"
      @load="onLoad"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
    >
      <article-item v-for="item in articleList" :key="item.id" :article-item="item"/>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant';
export default {
  props: ['articleListInfo'],
  data() {
    return {
      articleList: [],
      loading: false,
      finished: false,
      myPraise: []
    };
  },
  created() {
    this.init();
    this.getPraise()
  },
  methods: {
    async init() {
      console.log(this.articleListInfo.page)
      let data = await this.$api
        .articleFreeQuery(...Object.values(this.articleListInfo))
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return '文章获取失败';
        });
      let newData = data.data.list || [];
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
        this.$message.error('数据获取失败');
        return '文章获取失败';
      });
      if (data.data.info_list) {
        let avatarList = data.data.info_list;
        newData.forEach(item => {
          let avatarInfo = avatarList.filter(oItem => {
            return oItem.uuid == item.user_id;
          });
          let praise = this.myPraise.includes(item.id)
          item.praise = praise
          item.avatar = avatarInfo[0].ext_info.yesapi_avatar;
        });
      }
      if(newData.length < this.articleListInfo.perpage){
        this.finished = true;
      }
      this.articleList = this.articleList.concat(newData);
      this.loading = false;
      console.log(this.articleList)
    },
    onLoad() {
      let newInfo = JSON.parse(JSON.stringify(this.articleListInfo));
      newInfo.page += 1;
      this.$emit('update:articleListInfo', newInfo);
    },
    async getPraise(){
      let data = await this.$api.praiseFreeQuery(1,500).catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return '文章获取失败';
        });
        let dataArry = data.data.list || []
        this.myPraise = dataArry.map(item => {
          return item.articleId
        })
        console.log(this.myPraise)
    }
  },
  watch: {
    articleListInfo: {
      handler() {
        this.init()
      },
      // immediate: true,
      deep: true
    }
  },
  components: {
    'van-list': List,
    'article-item': () => import('../components/articleItem'),
  }
};
</script>

<style lang="" scoped></style>
