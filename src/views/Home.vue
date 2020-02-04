<template>
  <div class="home">
    <announcement-list/>
    <my-swiper type="0" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data(){
    return {
      from: {
        info: "wode"
      }
    }
  },
  watch:{
  },
  components: {
    'announcement-list':() => import('../components/home/announcementList'),
    'my-swiper':() => import('../components/swipe')
  }
};
</script>
