import Vue from 'vue';
import Vuex from 'vuex';
import storages from '../my_config/storages'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uuid: '0FA4F3F67FFA8AE2F99738F754D097E4',
    clickArticle: {},
    clickComment: {},
    token: null,
    // uuid: null,
    username: null,
    avatar: null,
    // userInfo: null
    userInfo: {username: "admin"}

  },
  mutations: {
    saveClickArticle(state, data) {
      state.clickArticle = data;
    },
    login: (state, data) => {
      storages.sessionSet('token', data.token)
      storages.sessionSet('uuid', data.uuid)
      state.token = data.token
      state.uuid = data.uuid
    },
    saveUserInfo: (state, data) => {
      state.token = storages.sessionGet("token");
      state.uuid = storages.sessionGet("uuid");
      state.userInfo = data
    },
    saveUserextInfo: (state, data) => {
      let oldState = JSON.parse(JSON.stringify(state.userInfo));
      oldState.ext_info = data;
      state.userInfo = oldState;
    },
    logout: (state) => {
      storages.sessionRemove('token')
      storages.sessionRemove('uuid')
      state.token = null
      state.uuid = null
    }
  },
  actions: {},
  modules: {}
});
