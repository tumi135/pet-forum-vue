<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="我的文章"
        left-text="首页"
        left-arrow
        @click-left="onReturn"
      />
    </van-sticky>
    <article-list class="list" :article-list-info.sync="listInfo" />
    <router-link class="changeRouter" tag="div" :to="{name: 'createArticle'}">
      发布文章
    </router-link>
  </div>
</template>

<script>
import { NavBar, Sticky } from 'vant';

export default {
  data() {
    return {
      articleTypeList: [],
      listInfo: {
        page: 1,
        perpage: 5,
        type_id: null,
        online: 0,
        order: null,
        user_id: true
      }
    };
  },
  created() {
    this.initArticle();
  },
  methods: {
    async initArticle() {
      let data = await this.$api.articleTypeFreeQuery(1, 40).catch(err => {
        console.log(err);
        return '文章获取失败';
      });
      this.articleTypeList = data.data.list || [];
    },
    changeOrder(val) {
      this.listInfo.order = val;
      this.listInfo.page = 1;
    },
    changeType(val) {
      this.listInfo.type_id = val;
      this.listInfo.page = 1;
    },
    onReturn() {
      this.$router.push('/');
    }
  },
  components: {
    'van-nav-bar': NavBar,
    'article-list': () => import('../components/articleList'),
    'van-sticky': Sticky
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 60px;
}
.changeRouter{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #fff;
  box-shadow: 0px -1px 3px #888888;

}
</style>
