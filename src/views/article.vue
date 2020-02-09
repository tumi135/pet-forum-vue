<template>
  <div>
    <van-nav-bar
      title="文章正文"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <article-item
      @changePriceSon="changePriceFater"
      :article-item="articleItem"
      :comment-show.sync="commentOpen"
      type="article"
    />
    <div class="list">
      <p>评论列表</p>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          class="commentList"
          :offset="100"
          @load="initCommentList"
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
        >
          <outside-comment
            v-for="item in commentList"
            :key="item.id + 'comment'"
            :comment-item="item"
          ></outside-comment>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="footer van-hairline--top">
      <van-button @click="commentOpen = true">
        <van-icon name="chat-o" />评论
      </van-button>
      <van-button @click="changePraise">
        <van-icon v-if="articleItem.praise" name="good-job" color="#FFA500" />
        <van-icon v-else name="good-job-o" />
        点赞
      </van-button>
    </div>
    <write-comment
      :comment-show.sync="commentOpen"
      :reply-tid="articleId"
    ></write-comment>
  </div>
</template>

<script>
import { List, NavBar, Button, PullRefresh } from 'vant';
import { mapState } from 'vuex';
import { changePraise } from '../mixins/changePraise';
export default {
  mixins: [changePraise],
  data() {
    return {
      articleId: null,
      articleItem: {},
      refreshing: false,
      loading: false,
      finished: false,
      commentOpen: false,
      commentList: [],
      page: 1,
      perpage: 5
    };
  },
  created() {
    this.articleId = this.$route.query.article_id;
    this.commentOpen =
      this.$route.query.comment && this.$route.query.comment == 'true'
        ? true
        : false;
    this.initArticle();
    this.initCommentList();
  },
  methods: {
    async initArticle() {
      if (this.articleId == this.clickArticle.id) {
        this.articleItem = this.clickArticle;
        return;
      }
      let data = await this.$api.getArticle(this.articleId).catch(err => {
        console.log(err);
        this.$message.error('数据获取失败');
        return '文章获取失败';
      });
      this.condonAvatarAndPraise(data.data.data); //
    },
    //获取评论列表
    async initCommentList() {
      this.loading = true;
      let data = await this.$api
        .commentFreeQuery(this.page, this.perpage, this.articleId)
        .catch(err => {
          console.log(err);
          return '评论获取失败';
        });
      let newData = data.data.list || [];
      this.refreshing = false;
      if (newData.length < this.perpage) {
        this.finished = true;
      }
      if (data.data.list) {
        this.page += 1;
        let uuids = data.data.list.map(item => {
          return item.uid;
        });
        this.condonAvatar(uuids, newData);
      }
    },
    //连接文章的头像及点赞
    async condonAvatarAndPraise(thisArticle) {
      if (thisArticle == '文章获取失败') {
        return;
      }
      let data = await this.$api
        .praiseFreeQuery(1, 500, this.articleId)
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return '获取失败';
        });
      let data2 = await this.$api
        .userMultiProfile([thisArticle.user_id])
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return '获取失败';
        });
      if (data.data.list.length >= 1) {
        thisArticle.praise = true;
      } else {
        thisArticle.praise = false;
      }
      if (data2.data.info_list.length >= 1) {
        thisArticle.avatar = data2.data.info_list[0].ext_info.yesapi_avatar;
      }
      this.articleItem = thisArticle;
    },
    //连接评论的头像
    async condonAvatar(uuids, newData) {
      let data = await this.$api.userMultiProfile(uuids).catch(err => {
        console.log(err);
        this.$message.error('数据获取失败');
        return '获取失败';
      });

      if (data.data.info_list) {
        let avatarList = data.data.info_list;
        console.log(avatarList);
        newData.forEach(item => {
          let avatarInfo = avatarList.filter(oItem => {
            return oItem.uid == item.user_id;
          });
          item.avatar = avatarInfo[0].ext_info.yesapi_avatar;
        });
      }
      this.commentList = this.commentList.concat(newData);
      this.loading = false;
    },
    changePriceFater(val) {
      if (val) {
        this.articleItem.praise_num += 1;
      } else {
        this.articleItem.praise_num -= 1;
      }
      this.articleItem.praise = val;
    },
    changePraiseStyle(val) {
      if (val === 'success') {
        if (!this.articleItem.praise) {
          this.articleItem.praise_num += 1;
          this.articleItem.praise = true;
        } else {
          this.articleItem.praise_num -= 1;
          this.articleItem.praise = false;
        }
      }
    },
    onRefresh() {
      this.page = 1;
      this.commentList = [];
      this.initCommentList();
    },
    onReturn() {
      // if()
        this.$router.push('/');
      
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    if (to.name != 'commentItemList') {
      from.meta.keepAlive = false;
    }

    next();
  },
  computed: {
    ...mapState(['clickArticle'])
  },
  components: {
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'van-nav-bar': NavBar,
    'article-item': () => import('../components/articleItem'),
    'write-comment': () => import('../components/writeComment'),
    'outside-comment': () => import('../components/outsideComment'),
    'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-top: 1px solid #efefef;
  background: #fff;

  button {
    width: 50%;
    height: 30px;
    background: #fff;
    border: none;
    outline: none;
    &:last-of-type {
      border-left: 1px solid #efefef;
    }
  }
}
.van-icon {
  margin-right: 8px;
}
.list {
  p {
    font-size: 18px;
    height: 28px;
    line-height: 28px;
    border-bottom: 1px solid #636363;
    padding-left: 10px;
  }
  .commentList {
    padding-bottom: 60px;
  }
}
</style>
