<template>
  <div>
    <van-nav-bar
      title="评论"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <outside-comment
        :comment-item="outsideCommentItem"
        type="commentItemList"
      ></outside-comment>
      <div class="commentList">
        <van-list
          :offset="100"
          @load="initCommentList"
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
        >
          <inside-comment
            v-for="item in commentList"
            :key="item.id + 'comment'"
            :comment-item="item"
            :reply-name.sync="replyName"
            :comment-show.sync="commentOpen"
          />
        </van-list>
      </div>
    </van-pull-refresh>
    <footer class="replyButton" @click="openWriteComment">
      <div class="replytext ">回复评论</div>
    </footer>
    <write-comment
      :comment-show.sync="commentOpen"
      :reply-cid="replyId"
      :reply-name="replyName"
      :reply-tid="outsideCommentTid"
      :reply-rid="outsideCommentItem.id"
      :reply-rname="outsideCommentItem.create_name"
    ></write-comment>
  </div>
</template>

<script>
import { List, NavBar, PullRefresh } from 'vant';
import { mapState } from 'vuex';
export default {
  name: '',
  data() {
    return {
      outsideCommentItem: {},
      outsideCommentRid: null,
      outsideCommentTid: null,
      refreshing: false,
      loading: false,
      finished: false,
      commentOpen: false,
      commentList: [],
      page: 1,
      perpage: 5,
      replyId: null,
      replyName: ''
    };
  },
  created() {
    this.outsideCommentId = this.$route.query.comment_id;
    this.outsideCommentTid = this.$route.query.comment_tid;
    this.replyId = this.$route.query.comment_id;
    this.initOutsideCommentItem();
    this.initCommentList();
  },
  methods: {
    async initOutsideCommentItem() {
      if (this.outsideCommentId == this.clickComment.id) {
        this.outsideCommentItem = this.clickComment;
        return;
      }
      let data = await this.$api
        .commentsOneFreeQuery(this.outsideCommentId)
        .catch(err => {
          console.log(err);
          return '文章获取失败';
        });

      this.condonAvatar(data.data.data); //
    },
    //获取评论列表
    async initCommentList() {
      // console.log(8888888)
      // if (this.loading) {
      //   return;
      // }

      this.loading = true;
      let data = await this.$api
        .commentFreeQuery2(this.page, this.perpage, this.outsideCommentId)
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
        this.condonListAvatar(uuids, newData);
      }
    },
    //连接主评论的头像
    async condonAvatar(thisComment) {
      if (thisComment == '文章获取失败') {
        return;
      }
      let data = await this.$api
        .userMultiProfile([thisComment.uid])
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return '获取失败';
        });

      if (data.data.info_list.length >= 1) {
        thisComment.avatar = data.data.info_list[0].ext_info.yesapi_avatar;
      }
      this.outsideCommentItem = thisComment;
    },
    //连接评论列表的头像
    async condonListAvatar(uuids, newData) {
      let data = await this.$api.userMultiProfile(uuids).catch(err => {
        console.log(err);
        this.$message.error('数据获取失败');
        return '获取失败';
      });

      if (data.data.info_list) {
        let avatarList = data.data.info_list;

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
    onReturn() {
      this.$router.push('/');
    },
    onRefresh() {
      this.page = 1;
      this.commentList = [];
      this.initCommentList();
      this.refreshing = false;
    },
    openWriteComment() {
      this.replyId = this.$route.query.comment_id;
      this.commentOpen = true;
    }
  },
  watch: {
    $route() {
      this.outsideCommentId = this.$route.query.comment_id;
      this.outsideCommentTid = this.$route.query.comment_tid;
      this.replyId = this.$route.query.comment_id;
      this.initOutsideCommentItem();
      this.initCommentList();
    }
  },

  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  computed: {
    ...mapState(['clickComment'])
  },
  components: {
    'van-list': List,
    'van-nav-bar': NavBar,
    'van-pull-refresh': PullRefresh,
    'write-comment': () => import('../components/writeComment'),
    'outside-comment': () => import('../components/outsideComment'),
    'inside-comment': () =>
      import('../components/commentItem/insideCommentItem')
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/border1px.scss';

.van-icon {
  margin-right: 8px;
}
.commentList {
  padding-bottom: 60px;
}
.replyButton {
  position: fixed;
  bottom: 0;
  height: 30px;
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  @include borderCreator('top', solid, #636363);
  background: #e7e7e7;
  .replytext {
    box-sizing: border-box;
    height: 20px;
    width: 100%;
    line-height: 20px;
    padding-left: 5px;
    font-size: 12px;
    color: #636363;
    background: #fff;
    // border: 1px solid #636363;
    @include borderCreator('', solid, #636363);
    border-radius: 5px;
  }
}
</style>
