<template>
  <div class="blank">
    <van-nav-bar
      :title="title"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <h1 title="宠萌宠物交流平台">
      <router-link class="logo-title" :to="{ path: '/home' }">
        <img class="logo" src="../assets/images/logo.png" alt="宠萌logo" />
        <span class="titles">宠萌宠物交流平台</span>
      </router-link>
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: '',
  data() {
    return {
      title: ''
    };
  },
  created() {
    this.changetitle();
  },
  methods: {
    onReturn() {
      this.$router.push('/');
    },
    changetitle() {
      let title = this.$route.name;
      if (title === 'login') {
        this.title = '登录';
      } else if (title == 'register') {
        this.title = '注册';
      }
    }
  },
  watch: {
    $route() {
      this.changetitle();
    }
  },
  components: {
    'van-nav-bar': NavBar
  }
};
</script>

<style lang="scss" scoped>
.blank {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.logo-title {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  .logo {
    width: 20%;
    height: 20%;
  }
  .titles {
    font-size: 28px;
    font-weight: 600;
    color: #000;
  }
}
</style>
