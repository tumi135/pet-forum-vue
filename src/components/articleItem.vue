<template>
  <div class="articleItem">
    <div class="top">
      <div class="avatar">
        <img :src="articleItem.avatar" />
      </div>
      <div class="info">
        <p>{{ articleItem.writer }}</p>
        <p>{{ articleItem.add_time }}</p>
      </div>
    </div>
    <div>{{ articleItem.content }}</div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item
        v-for="(item, index) in pic"
        :key="index"
        @click="toImg(index)"
      >
        <van-image :src="item.url" />
      </van-grid-item>
    </van-grid>
    <div class="footer van-hairline--top">
      <button>
        <van-icon name="chat-o" />{{ articleItem.comment_num }}
      </button>
      <button >
        <van-icon v-if="articleItem.praise" name="good-job" color="#FFA500"/>
        <van-icon v-else name="good-job-o" />
        {{articleItem.praise_num}}</button>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Image, ImagePreview } from 'vant'; //, ImagePreview, Button
export default {
  props: ['articleItem'],
  data() {
    return {
      pic: []
    };
  },
  created() {
    this.piclist()
  },
  methods: {
    toImg(index) {
      let myPic = this.pic.map(item => {
        return item.url
      })
      
        ImagePreview({
          images: myPic,
          startPosition: index,
          onClose() {
            // do something  articleItem.litpic
          }
        });
    },
    piclist(){
      let litpic = JSON.parse(this.articleItem.litpic);
      var pics;
      if (litpic) {
        pics = litpic.pic;
      } else {
        pics = [];
      }
      console.log(pics)
      this.pic = pics
    }
  },
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-image': Image,
    // 'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
.articleItem{
  background:#fff;
  margin-bottom: 5px;
  padding: 5px 10px;
}
.top{
  height: 100px;
  display: flex;
  align-items: center;
  
  .avatar{
    width: 80px;
    height: 80px;
    margin-right: 10px;
  
    img{
      width: 100%;
      height: 100%;
        border-radius: 50%;
    }
  }
}
.footer{
  margin-top: 10px;
  button{
    width: 50%;
    height: 60px;
    background: #fff;
    border: none;
    outline: none;
  }
}
.van-icon{
  margin-right: 8px;
}
</style>
