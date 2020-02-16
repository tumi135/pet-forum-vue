<template>
  <div>
    <div class="top">
      <div class="avatar">
        <img :src="nowuserInfo.ext_info.yesapi_avatar" />
      </div>
      <div class="name-email-sex">
        <p class="name">{{ nowuserInfo.username }}</p>
        <p>邮箱：{{ nowuserInfo.ext_info.yesapi_email || '暂无' }}</p>
        <p>性别：{{ nowuserInfo.ext_info.yesapi_sex || '暂无' }}</p>
      </div>
      <div class="rolename">
        <van-tag
          v-if="nowuserInfo.rolename == '管理员'"
          mark
          color="#ffe1e1"
          text-color="#ad0000"
          >管理员</van-tag
        >
        <van-tag v-else mark>普通会员</van-tag>
      </div>
    </div>
    <ul class="center">
      <li @click="changeRouter('myArticle')">
        <p>{{ articleNum }}</p>
        <p>我的文章</p>
      </li>
      <!-- <li @click="changeRouter('myPraise')">
        <p>{{ praiseNum }}</p>
        <p>我点的赞</p>
      </li> -->
      <li @click="changeRouter('myFunnyImg')">
        <p>{{ funnyImgleNum }}</p>
        <p>我的趣图</p>
      </li>
    </ul>
    <div class="buttom">
      <van-cell title="创建趣图" is-link :to="{ name: 'createFunnyImg' }" />
      <van-cell title="发布文章" is-link :to="{ name: 'createArticle' }" />
      <van-cell title="设置" is-link :to="{ name: 'set' }" />
    </div>
    <my-swiper type="2" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Tag, Cell } from 'vant';
export default {
  name: '',
  data() {
    return {
      articleNum: null,
      praiseNum: null,
      funnyImgleNum: null,
      nowuserInfo: {}
    };
  },
  created() {
    this.initUserInfo();
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    //获取用户个人信息
    async initUserInfo() {
      let userInfo = this.userInfo;
      if (!userInfo.username) {
        let data = await this.$api.userProfile();
        if (data.ret == 200 && data.data.err_code == 0) {
          userInfo = data.data.info;
          this.saveUserInfo(userInfo);
        } else {
          this.$toast('个信息获取失败，请刷新！');
        }
      }
      this.nowuserInfo = userInfo;
      //文章数
      let data = await this.$api
        .freeCount('yesapi_fl_article', [
          'writer=' + "'" + userInfo.username + "'"
        ])
        .catch(() => {
          return '失败';
        });
      //点赞的文章数
      let data2 = await this.$api
        .freeCount('yesapi_praise', ['userid=' + "'" + userInfo.uuid + "'"])
        .catch(() => {
          return '失败';
        });
      //趣图数
      let data3 = await this.$api
        .freeCount('okayapi_image', [
          'create_by=' + "'" + userInfo.username + "'"
        ])
        .catch(() => {
          return '失败';
        });
      this.articleNum = data.data.total || '0';
      this.praiseNum = data2.data.total || '0';
      this.funnyImgleNum = data3.data.total || '0';
    },
    changeRouter(val) {
      this.$router.push({ name: val });
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initUserInfo();
    });
  },
  components: {
    'van-tag': Tag,
    'van-cell': Cell,
    'my-swiper': () => import('../components/swipe')
  }
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  padding: 5px;
  background: #fff;
  margin-bottom: 5px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 80px;
    height: 80px;
  }
}
.name-email-sex {
  flex: 1;
  margin-left: 10px;
  p {
    font-size: 12px;
  }
  .name {
    font-size: 1em;
    font-weight: 600;
  }
}
.rolename {
  // width: 30px;
}
.center {
  display: flex;
  align-items: center;
  background: #fff;
  margin-top: 5px;
  li {
    flex: 1;
    list-style: none;
    padding: 10px 0px;

    p {
      text-align: center;
      height: 22px;
      line-height: 22px;
    }
  }
}
.buttom {
  margin-top: 5px;
}
</style>
