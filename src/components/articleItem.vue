<template>
  <div
    class="articleItem"
    @click="toArticleItem()"
    :class="{ chose: articleItem.id == choseId }"
  >
    <div class="delete" v-if="articleType == 'myArticle'">
      <van-button
        type="danger"
        @click.stop="handleDelete(articleItem.id)"
        size="small"
        >删除</van-button
      >
    </div>
    <div class="top">
      <div class="avatar">
        <img :src="articleItem.avatar" />
      </div>
      <div class="info">
        <p>{{ articleItem.writer }}</p>
        <p class="time">{{ articleItem.add_time }}</p>
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
      <van-button @click.stop="changePraise">
        <van-icon v-if="articleItem.praise" name="good-job" color="#FFA500" />
        <van-icon v-else name="good-job-o" />
        {{ articleItem.praise_num }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Grid, GridItem, Image, ImagePreview, Button, Dialog } from "vant"; //, ImagePreview, Button
import { changePraise } from "../mixins/changePraise";

export default {
  props: ["articleItem", "itemIndex", "articleType", "commentShow"],
  mixins: [changePraise],
  data() {
    return {
      pic: [],
      choseId: 0
    };
  },
  created() {
    this.piclist();
  },
  methods: {
    ...mapMutations(["saveClickArticle"]),
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
      if (this.type == "article") {
        this.$emit("update:commentShow", true);
        return;
      }
      this.saveClickArticle(this.articleItem);
      if (type == "comment") {
        this.$router.push({
          name: "article",
          query: { article_id: this.articleItem.id, comment: "true" }
        });
      } else {
        this.$router.push({
          name: "article",
          query: { article_id: this.articleItem.id }
        });
      }
    },
    changePraiseStyle(val) {
      if (val === "success") {
        this.$emit("changePriceSon", !this.articleItem.praise, this.itemIndex);
      }
    },
    //删除选中的
    handleDelete(deleteId) {
      let that = this;
      this.choseId = deleteId;
      Dialog.confirm({
        title: "确定删除该趣图？"
      })
        .then(async () => {
          let deletearticle = await this.$api
            .deletearticle(deleteId)
            .catch(err => {
              console.log(err);
              that.$toast.fail("数据获取失败");
              return "";
            });
          if (deletearticle.ret == 200 && deletearticle.data.err_code == 0) {
            that.$router.go(0);
          }
        })
        .catch(() => {
          this.choseId = 0;
        });
    }
  },
  watch: {
    articleItem() {
      this.piclist();
    }
  },
  components: {
    "van-grid": Grid,
    "van-grid-item": GridItem,
    "van-image": Image,
    "van-button": Button
  }
};
</script>

<style lang="scss" scoped>
.articleItem {
  background: #fff;
  margin-bottom: 5px;
  padding: 5px 10px;
}
.chose {
  background: rgba(253, 41, 41, 0.2);
}
.delete {
  text-align: right;
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
  .time {
    font-size: 10px;
    color: #636363;
  }
}
.footer {
  margin-top: 10px;
  button {
    width: 50%;
    height: 40px;
    background: #fff;
    border: none;
    outline: none;
  }
}
.van-icon {
  margin-right: 8px;
}
</style>
