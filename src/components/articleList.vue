<template>
<div class="article-list">
  快快快
  <van-list>

  </van-list>
</div>
</template>

<script>
import { List } from 'vant';
export default {
  props: ["articleListInfo"],
  data() { 
    return {

    }
  },
  created (){
    this.init()
  },
  methods: {
    init(){
      console.log(888)
      console.log(this.articleListInfo);
    }
  },
  components: {
    "van-list": List
  }
 }
</script>

<style lang="" scoped>
</style>