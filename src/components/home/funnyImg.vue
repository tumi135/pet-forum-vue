<template>
  <div>
    <div class="funny-imgs" v-if="swiper.length > 0">
      <header>趣图</header>
      <ul class="funny-img-list">
        <li class="funny-img-item"
          v-for="(item, index) in swiper"
          :key="item.id"
          @click="toImg(item, index)"
        >
          <van-image
          class="my-img"
          fit="cover"
            :src="
              item.image_link ||
                'http://cd7.yesapi.net/C6FB2E902F9FDA74101B4887AF935333_20200204165338_dfdd6e64f94f1ee17d7993ef417a1e09.jpeg'
            "
          />
          <span class="swiper-title" v-if="item.image_desc">{{ item.image_desc }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { Swipe, SwipeItem } from "vant";
import { Image, ImagePreview } from 'vant';

export default {
  data() {
    return {
      swiper: [],
      imagePreview: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let data = await this.$api
        .funnyImgFreeQuery(1, 10)
        .catch(err => {
          console.log(err);
          this.$message.error("数据获取失败");
          return "趣图获取失败";
        });
      this.swiper = data.data.list || [];
      if(data.data.list){
        this.imagePreview = data.data.list.map(item => {
          return item.image_link
        })
      }
    },
    toImg(item, index) {
      if (item.image_link) {
        ImagePreview({
          images: this.imagePreview,
          startPosition: index,
          onClose() {
            // do something
          }
        });
      }
    }
  },
  components: {
    // "van-swipe": Swipe,
    // "van-swipe-item": SwipeItem
    "van-image": Image
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.funny-imgs {
  margin-bottom: 6px;
  background: #fff;
  header{
    padding: 5px;
    font-size: 18px;
  }
  .funny-img-list {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    .funny-img-item {
      position: relative;
      display: inline-block;
      list-style: none;
      width: 40vw;
      height: 40vw;
      margin-left: 5px;
      .swiper-title {
        position: absolute;
        bottom: 0;
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
      .my-img{
        width: 100%;
        height: 100%;
      }
      &:first-of-type{
        margin-left: 0px;
      }
    }
    
    
  }
}
</style>

