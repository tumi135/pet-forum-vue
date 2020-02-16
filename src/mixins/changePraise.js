import tool from '../my_config/tool';

export const changePraise = {
  methods: {
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
          return 'err';
        });
      if (data == "success") {
        this.changePraiseStyle(data);
      } else if (data.ret == 401) {
        this.$toast.fail(data.data.err_msg);
      }
    },
    async deletePraise() {
      let data = await this.$api
        .deletePraise(this.articleItem.id)
        .catch(err => {
          console.log(err);
          return 'err';
        });
      if (data == "success") {
        this.changePraiseStyle(data);
      } else if (data.ret == 401) {
        this.$toast.fail(data.data.err_msg);
      }
    }
  }
};
