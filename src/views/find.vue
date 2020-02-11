<template>
  <div>
    <div class="nav-box">
      <nav class="top-nav">
        <ul>
          <li :class="{ active: !listInfo.order }" @click="changeOrder(null)">
            全部
          </li>
          <li
            :class="{ active: listInfo.order == 'comment_num' }"
            @click="changeOrder('comment_num')"
          >
            热评
          </li>
          <li
            :class="{ active: listInfo.order == 'praise_num' }"
            @click="changeOrder('praise_num')"
          >
            多赞
          </li>
        </ul>
      </nav>
      <nav class="buttom-nav">
        <ul>
          <li :class="{ active: !listInfo.type_id }" @click="changeType(null)">
            <img src="../assets/images/logo.png" />
            <span>全部</span>
          </li>
          <li
            v-for="item in articleTypeList"
            :key="item.id"
            :class="{ active: listInfo.type_id == item.id }"
            @click="changeType(item.id)"
          >
            <img class="type-icon" :src="item.litpic" />
            <span class="type-name">{{ item.type_name }}</span>
          </li>
        </ul>
      </nav>
    </div>
    <article-list :article-list-info.sync="listInfo" type="find" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleTypeList: [],
      listInfo: {
        page: 1,
        perpage: 5,
        type_id: null,
        online: 0,
        order: null
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
        this.$message.error('数据获取失败');
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
    }
  },
  components: {
    'article-list': () => import('../components/articleList')
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/border1px.scss';
.nav-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
.top-nav {
  width: 100%;
  background: #f6f6f6;
  ul {
    display: flex;
    align-items: center;
    height: 40px;

    line-height: 40px;
    li {
      height: 25px;
      line-height: 25px;
      list-style: none;
      flex: 1;
      text-align: center;
      color: #636363;
      @include borderCreator('left', solid, #636363);
      &:first-of-type {
        border: none;
      }
      &.active {
        color: #ffa500;
      }
    }
  }
}
.buttom-nav {
  background: #fff;
  margin-bottom: 5px;
  ul {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    li {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 45px;
      padding: 0 8px;
      list-style: none;
      text-align: center;
      color: #636363;
      font-size: 14px;
      // @include borderCreator('left', solid, #636363);
      // &:first-of-type {
      //   border: none;
      // }
      &.active {
        border-bottom: 2px solid #ffa500;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
