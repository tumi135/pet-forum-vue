<template>
  <div>
    <div class="announcement-lit" v-if="swiper.length > 0">
      <van-swipe class="my-swiper" style="height: 31.3vw; width: 100vw" :autoplay="6000">
        <van-swipe-item
          v-for="item in swiper"
          :key="item.id"
          @click="toLink(item)"
        >
          <img
            :src="
              item.pic ||
                'http://cd7.yesapi.net/C6FB2E902F9FDA74101B4887AF935333_20200204165338_dfdd6e64f94f1ee17d7993ef417a1e09.jpeg'
            "
          />
          <span class="swiper-title" v-if="item.title">{{ item.title }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";

export default {
  props: ["type"],
  data() {
    return {
      swiper: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let data = await this.$api
        .carouselImgFreeQuery(1, 10, null, this.type, 0)
        .catch(err => {
          console.log(err);
          this.$message.error("数据获取失败");
          return "轮播图获取失败";
        });
      this.swiper = data.data.list || [
          { id: "", title: data.data.err_msg }
        ] || [{ id: "", title: data }];
    },
    toLink(item) {
      if (item.url) {
        window.location = item.url;
      }
    }
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.announcement-lit {
  margin-bottom: 10px;
  span {
    width: 60px;
  }
  .my-swiper {
    .van-swipe-item {
      position: relative;
      .swiper-title {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        @include one-line-ellipsis;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    
  }
}
</style>
<style>
.van-swipe__indicator {
      border: 1px solid #000000;
      width: 2vw;
      height: 2vw;
    }
    .van-swipe__indicator--active{
      border: 1px solid #f3e4e4;
      width: 2.5vw;
      height: 2.5vw;
    }
</style>
