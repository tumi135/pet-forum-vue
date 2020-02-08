import tool from '../my_config/tool';

export const changePraise = {
  methods:{
    changePraise: tool.debounce(function() {
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
      this.changePraiseStyle(data);
    },
    async deletePraise() {
      let data = await this.$api
        .deletePraise(this.articleItem.id)
        .catch(err => {
          console.log(err);
          this.$message.error('数据获取失败');
          return 'err';
        });
      this.changePraiseStyle(data);
    },
  }
}