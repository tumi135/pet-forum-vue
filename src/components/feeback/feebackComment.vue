<template>
  <div class="item">
    <header>
      <span>{{ itemIndex+1 }}楼 </span>
      <span class="time">{{
        feebackCommentItem.update_time || feebackCommentItem.add_time
      }} </span>|
      <span>{{ feebackCommentItem.user_name }}</span>
    </header>
    <div class="content">
      <p class="content-p">
        <span v-if="feebackCommentItem.r_name">
          回复
          <span class="reply">@{{feebackCommentItem.r_name}}</span>：
        </span>
        {{ feebackCommentItem.content }}
      </p>
      <van-grid :border="false" :column-num="3">
        <van-grid-item
          v-for="(item, index) in pic"
          :key="index"
          @click.stop="toImg(index)"
        >
          <van-image :src="item.url" />
        </van-grid-item>
      </van-grid>
    </div>

    <footer>
      <van-button size="small" @click="toReplyComment">回复</van-button>
    </footer>
  </div>
</template>

<script>
import { Grid, GridItem, Image, ImagePreview, Button } from 'vant';
export default {
  props: ['feebackCommentItem', 'itemIndex', 'commentShow', 'replyName'],
  data() {
    return {
      pic: []
    };
  },
  created() {
    this.piclist();
  },
  methods: {
    piclist() {
      // console.log(this.articleItem)
      if (this.feebackCommentItem.litpic) {
        let litpic = JSON.parse(this.feebackCommentItem.litpic);
        var pics;
        if (litpic) {
          pics = litpic.pic;
        } else {
          pics = [];
        }
        this.pic = pics;
      }
    },
    toImg(index) {
      let myPic = this.pic.map(item => {
        return item.url;
      });

      ImagePreview({
        images: myPic,
        startPosition: index,
        onClose() {
          // do something  articleItem.litpic
        }
      });
    },
    toReplyComment(){
      this.$emit("update:replyName", this.feebackCommentItem.user_name);
      this.$emit('update:commentShow', true);
    }
  },
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-image': Image,
    'van-button': Button
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/border1px.scss';

.item {
  background: #fff;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
}
header {
  padding: 5px 0px;
  p {
    display: flex;
    justify-content: space-between;
    span {
    }
  }
}
.time {
  font-size: 12px;
  color: #636363;
}
.content-p {
  @include borderCreator('top', solid, #b8b8b8);
  padding: 10px 0px;
}
.reply{
  color:blue;
}
footer {
  padding-top: 5px;
  text-align: right;
  @include borderCreator('top', solid, #b8b8b8);
}
</style>
