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
  name: 'App'
};
</script>

<style>
html {
  background: #e7e7e7;
}
/* #app{
  background: #e7e7e7;
} */
</style>
