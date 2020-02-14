<template>
  <div>
    <van-cell title="修改个人信息" is-link :to="{ name: 'changeUserInfo' }" />
    <van-cell title="修改密码" is-link :to="{ name: 'changePassword' }" />
    <van-cell title="退出" is-link @click="toLogout" />
  </div>
</template>

<script>
import { Cell, Dialog } from 'vant';
import { mapMutations } from 'vuex';

export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['logout']),
    toLogout() {
      Dialog.confirm({
        title: '确定退出登录？'
      }).then(() => {
        this.logout();
        this.$router.push({ name: 'login' });
      });
    }
  },
  components: {
    'van-cell': Cell
  }
};
</script>

<style lang="" scoped></style>
