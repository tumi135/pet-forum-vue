<template>
  <div class="home">
    <announcement-list/>
    <my-swiper type="0" />
    <funny-img/>
    <div class="tuijian">
      <header class="van-hairline--bottom">推荐</header>
      <article-list :article-list-info.sync="listInfo"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data(){
    return {
      listInfo: {
        page: 1,
        perpage: 5,
        type_id: null,
        online: 0,
        order: "tuijian"
      },
      from: {
        info: "wode"
      }
    }
  },
  watch:{
  },
  components: {
    'announcement-list':() => import('../components/home/announcementList'),
    'my-swiper':() => import('../components/swipe'),
    'funny-img':() => import('../components/home/funnyImg'),
    'article-list':() => import('../components/articleList'),
  }
};
</script>
<style scoped>
.tuijian{
  
}
header{
    padding: 5px;
    font-size: 18px;
    background: #fff;
  }
</style>
