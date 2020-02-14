<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  async created() {
    console.log('app')
    let checkLogin = await this.$api.userProfile();
    if (checkLogin.ret == 200 && checkLogin.data.err_code == 0) {
      this.$store.commit('saveUserInfo', checkLogin.data.info);
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html {
  background: #e7e7e7;
}
/* #app{
  background: #e7e7e7;
} */
</style>
