<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <router-view class="vueview" />
    </transition>
    <van-tabbar route active-color="#FFA500" safe-area-inset-bottom>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'wap-home' : 'wap-home-o'"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/find" icon="search">
        发现
      </van-tabbar-item>
      <van-tabbar-item to="/createArticle">
        <span>发布</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'add' : 'add-o'"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/feedback">
        <span>留言板</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'smile-comment' : 'smile-comment-o'"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'manager' : 'manager-o'"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
// import 'vant/lib/tabbar/style';
// import 'vant/lib/tabbar-item/style';
export default {
  data() {
    return {};
  },
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.vueview {
  // width: 100vw;
  // height: 100vh;
  // background: #ff8080;
}
</style>
