import Vue from 'vue';
import Vuex from 'vuex';
import storages from '../my_config/storages'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uuid: '',
    clickArticle: {},
    clickComment: {},
    login: false,
    token: null,
    // uuid: null,
    username: null,
    avatar: null,
    // userInfo: null
    userInfo: {},
    numInfo:{
      articleNum: null,
      praiseNum: null,
      funnyImgleNum: null
    }

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
      state.login = true
    },
    saveUserInfo: (state, data) => {
      state.token = storages.sessionGet("token");
      state.uuid = storages.sessionGet("uuid");
      state.userInfo = data
      state.login = true

    },
    saveNumInfo: (state, data) => {
      state.numInfo = data

    },
    saveUserextInfo: (state, data) => {
      let oldState = JSON.parse(JSON.stringify(state.userInfo));
      oldState.ext_info = data;
      state.userInfo = oldState;
    },
    logout: (state) => {
      storages.sessionRemove('token')
      storages.sessionRemove('uuid')
      state.login = false
      state.userInfo = {}
      state.token = null
      state.uuid = null
    }
  },
  actions: {},
  modules: {}
});
