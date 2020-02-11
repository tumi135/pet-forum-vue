<template>
  <div>
    <van-nav-bar
      title="写文章"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <article class="feedbackTips">
        <div v-html="feedbackTips.content"></div>
      </article>
      <p style="padding:10px 5px 0px">回复列表：</p>
      <van-list
        class="list"
        :offset="100"
        @load="initFeedbackComments"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
      >
        <feeback-comment
          v-for="(item, index) in feedbackComments"
          :key="item.id"
          :feeback-comment-item="item"
          :reply-name.sync="replyName"
          :comment-show.sync="commentOpen"
          :item-index="index"
        />
      </van-list>
    </van-pull-refresh>
    <write-feeback-comment
      :comment-show.sync="commentOpen"
      :reply-name="replyName"
    />
    <button class="open-button" @click="openWriteFeeback">回复</button>
  </div>
</template>

<script>
import { List, NavBar, PullRefresh } from 'vant';

export default {
  data() {
    return {
      feedbackTips: {},
      feedbackComments: [],
      refreshing: false,
      loading: false,
      finished: false,
      commentOpen: false,
      page: 1,
      perpage: 5,
      replyName: ''
    };
  },
  created() {
    this.initFeedbackTips();
    this.initFeedbackComments();
  },
  methods: {
    async initFeedbackTips() {
      let data = await this.$api.feedbackTipsFreeQuery().catch(err => {
        console.log(err);
        this.$message.error('数据获取失败');
        return '';
      });
      this.feedbackTips = data.data.list[0] || { content: '<P>无内容</P>' };
    },
    async initFeedbackComments() {
      let data = await this.$api
        .feedbackFreeQuery(this.page, this.perpage)
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return '';
        });
        this.refreshing = false;
      let newData = data.data.list || [];
      if (newData.length < this.perpage) {
        this.finished = true;
      }
      this.page += 1;
      this.loading = false;
      this.feedbackComments = this.feedbackComments.concat(newData);
    },
    onRefresh() {
      this.page = 1
      this.feedbackComments = []
      this.loading = false;
      this.finished = false;
    },
    onReturn() {
      this.$router.push('/');
    },
    openWriteFeeback() {
      this.replyName = '';
      this.commentOpen = true;
    }
  },
  components: {
    'van-list': List,
    'van-nav-bar': NavBar,
    'van-pull-refresh': PullRefresh,
    'feeback-comment': () => import('../components/feeback/feebackComment'),
    'write-feeback-comment': () =>
      import('../components/feeback/writeFeebackComment')
  }
};
</script>

<style lang="scss" scoped>
.feedbackTips {
  padding: 5px;
  box-sizing: border-box;
}
.feedbackTips > div {
  padding: 5px;
  background: #fff;
  border-radius: 10px;
}
.list {
  padding: 10px 5px 60px;
}
.open-button {
  position: fixed;
  top: 60%;
  left: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
