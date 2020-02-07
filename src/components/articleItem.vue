<template>
  <div class="articleItem" @click="toArticleItem()">
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
        @click.stop="toImg(index)"
      >
        <van-image :src="item.url" />
      </van-grid-item>
    </van-grid>
    <div class="footer van-hairline--top">
      <van-button @click.stop="toArticleItem('comment')">
        <van-icon name="chat-o" />{{ articleItem.comment_num }}
      </van-button>
      <van-button @click.stop="changePrice">
        <van-icon v-if="articleItem.praise" name="good-job" color="#FFA500" />
        <van-icon v-else name="good-job-o" />
        {{ articleItem.praise_num }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Grid, GridItem, Image, ImagePreview, Button } from 'vant'; //, ImagePreview, Button
import tool from '../my_config/tool';
export default {
  props: ['articleItem', 'itemIndex', 'type'],
  data() {
    return {
      pic: []
    };
  },
  created() {
    this.piclist();
  },
  methods: {
    ...mapMutations(['saveClickArticle']),
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
    piclist() {
      // console.log(this.articleItem)
      if (this.articleItem.litpic) {
        let litpic = JSON.parse(this.articleItem.litpic);
        var pics;
        if (litpic) {
          pics = litpic.pic;
        } else {
          pics = [];
        }
        this.pic = pics;
      }
    },
    toArticleItem(type) {
      this.saveClickArticle(this.articleItem);
      if(type == "comment"){
        this.$router.push({
        name: 'article',
        query: { article_id: this.articleItem.id, comment: "true" }
      });
      }else{
        this.$router.push({
        name: 'article',
        query: { article_id: this.articleItem.id }
      });
      }
      
      
    },
    changePrice: tool.debounce(function() {
      if (!this.articleItem.praise) {
        this.createPraise();
      } else {
        this.deletePraise();
      }
    }, 1000),
    async createPraise() {
      let data = await this.$api
        .createPraise(this.articleItem.id)
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return 'err';
        });
      this.changeArticleList(data);
    },
    async deletePraise() {
      let data = await this.$api
        .deletePraise(this.articleItem.id)
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return 'err';
        });
      this.changeArticleList(data);
    },
    changeArticleList(val) {
      if (val === 'success') {
        this.$emit('changePriceSon', !this.articleItem.praise, this.itemIndex);
      }
    }
  },
  watch: {
    articleItem() {
      this.piclist();
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
.articleItem {
  background: #fff;
  margin-bottom: 5px;
  padding: 5px 10px;
}
.top {
  height: 100px;
  display: flex;
  align-items: center;

  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.footer {
  margin-top: 10px;
  button {
    width: 50%;
    height: 60px;
    background: #fff;
    border: none;
    outline: none;
  }
}
.van-icon {
  margin-right: 8px;
}
</style>
