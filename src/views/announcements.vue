<template>
  <div>
    <van-nav-bar
      title="公告"
      left-text="首页"
      left-arrow
      @click-left="onReturn"
    />
    <article class="myarticle">
      <header>
        <h2 class="title">{{ announcement.title }}</h2>
        <p class="info">
          <span>发布者：{{ announcement.create_by }}</span>
        <time>{{ announcement.update_time || announcement.add_time }}</time>
        </p>
      </header>
      <p class="content">{{ announcement.content }}</p>
      <p class="s-e" v-if="announcement.end_time && announcement.start_time">
        生效日期： {{ announcement.start_time }} - {{ announcement.end_time }}
      </p>
    </article>
    <div class="announcement-list">
      <span class="announcementlabel">最新公告：</span>
      <ul>
        <li
          v-for="item in announcementLit"
          :key="item.id"
          @click="toOtherAnnouncement(item)"
        >
          {{ item.title }}>>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";

export default {
  name: "",
  data() {
    return {
      announcementId: "",
      announcementLit: [],
      announcement: {}
    };
  },
  created() {
    this.announcementId = this.$route.query.id;
    this.init();
    this.initList();
  },
  methods: {
    async init() {
      let data = await this.$api
        .announcementOneFreeQuery(this.announcementId)
        .catch(err => {
          console.log(err);
          this.$toast.fail("数据获取失败");
          return "公告获取失败";
        });
      this.announcement = data.data.data;
      console.log(this.announcement);
    },
    async initList() {
      let data = await this.$api.announcementsFreeQuery(1, 20, 0).catch(err => {
        console.log(err);
        this.$toast.fail("数据获取失败");
        return "公告获取失败";
      });
      this.announcementLit = data.data.list || [];
    },
    toOtherAnnouncement(item) {
      if (item.id) {
        this.$router.push({ name: "announcements", query: { id: item.id } });
      }
    },
    onReturn() {
      // if()
        this.$router.push("/");
      
    }
  },
  watch: {
    '$route.query.id'(){
      this.announcementId = this.$route.query.id;
    this.init();
    }
  },
  components: {
    "van-nav-bar": NavBar
  }
};
</script>

<style lang="scss" scoped>
.myarticle{
  background: #fff;
  padding: 10px;
}
.title{
  text-align: center;
  padding: 10px;
}
.info{
  text-align: center;
  font-size: 12px;
  color: #636363;
  span{
    margin-right: 15px;
  }
}
.content{
  padding: 10px 0px;
  
}
.announcementlabel{
  padding: 10px;
  display: inline-block;

}
.s-e{
  text-align: right;
  font-size: 12px;
  color: #636363;
}
.announcement-list{
  background: #fff;
  margin-top: 5px;
}
ul{
  li{
    list-style: none;
    padding: 5px 10px;
    color: #0000ff;
  }
}
</style>
