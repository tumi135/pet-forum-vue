<template>
  <div>
    <van-nav-bar
      title="文章正文"
      left-text="返回"
      left-arrow
      @click-left="onReturn"
    />
    <article-item
      @changePriceSon="changePriceFater"
      :article-item="article"
      type="article"
    />
    <van-list
      :offset="100"
      @load="onLoad"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
    ></van-list>
    <button v-show="commentOpen">hhhhh</button>
  </div>
</template>

<script>
import { List, NavBar } from 'vant';
import { mapState } from 'vuex';
export default {
  name: '',
  data() {
    return {
      articleId: null,
      article: {},
      loading: false,
      finished: false,
      commentOpen: false
    };
  },
  created() {
    this.articleId = this.$route.query.article_id;
    this.commentOpen = this.$route.query.comment == "true" ? true : false
    this.initArticle();
  },
  methods: {
    initArticle() {
      if (this.articleId == this.clickArticle.id) {
        this.article = this.clickArticle;
      }
    },
    changePriceFater(val) {
      if (val) {
        this.article.praise_num += 1;
      } else {
        this.article.praise_num -= 1;
      }
      this.article.praise = val;
    },
    onLoad() {},
    onReturn() {
      this.$router.go(-1);
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(9999)
    to.meta.keepAlive = true;
    next();
  },
  computed: {
    ...mapState(['clickArticle'])
  },
  components: {
    'van-list': List,
    'van-nav-bar': NavBar,
    'article-item': () => import('../components/articleItem')
  }
};
</script>

<style lang="" scoped></style>
