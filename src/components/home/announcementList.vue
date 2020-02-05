<template>
<div>
  <div class="announcement-lit" v-if="announcementLit.length>0">
  <span>公告：</span>
    <van-swipe
      class="my-swiper"
      style="height: 30px; width: 100%"
      :show-indicators="false"
      :autoplay="2000"
      vertical
    >
      <van-swipe-item
        v-for="item in announcementLit"
        :key="item.id"
        @click="toLink(item)"
        >{{ item.title }}</van-swipe-item
      >
</van-swipe>
</div>
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  data() { 
    return {
      announcementLit: []
    }
  },
  created(){
    this.init()
  },
  methods: {
    async init(){
      let data = await this.$api.announcementsFreeQuery(1,10,0).catch(err => {
          console.log(err);
          this.$message.error("数据获取失败");
          return "公告获取失败";
        });
        this.announcementLit = data.data.list || [{id:"",title:data.data.err_msg}] || [{id:"",title:data}]
    },
    toLink (item){
      if(item.id){
        this.$router.push({name:"announcements",query:{id:item.id}})
      }
      
    }
  },
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  }
 }
</script>

<style lang="scss" scoped>
.announcement-lit {
  display: flex;
  align-items: center;
  padding: 5px;
  background: #fff;
  margin-bottom: 5px;
  span {
    width: 60px;
  }
  .my-swiper {
    flex: 1;
    line-height: 30px;
    .van-swipe-item{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
  }
}
</style>
