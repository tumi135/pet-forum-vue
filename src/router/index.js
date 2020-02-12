import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import api from '../request/api.js';

const Layout = () => import('../components/layout.vue');
const Blank = () => import('../components/blank.vue');
const Login = () => import('../views/login.vue');
const Register = () => import('../views/register');
const Home = () => import('../views/home');
const My = () => import('../views/my');
const Feedback = () => import('../views/feedback');
const Find = () => import('../views/find');
const CreateArticle = () => import('../views/createArticle');
const Announcements = () => import('../views/announcements');
const Article = () => import('../views/article');
const CommentItemList = () => import('../views/commentItemList');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          index: 0,
          keepAlive: true //该字段表示该页面需要缓存
        },
        component: Home
      },
      {
        path: 'my',
        name: 'my',
        meta: { index: 4, requireAuth: true },
        component: My
      },
      {
        path: 'feedback',
        name: 'feedback',
        meta: { index: 3 },
        component: Feedback
      },
      {
        path: 'find',
        name: 'find',
        meta: { index: 1 },
        component: Find
      }
    ]
  },
  {
    path: '/blank',
    name: 'blank',
    component: Blank,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/createArticle',
    name: 'createArticle',
    meta: { index: 2 },
    component: CreateArticle
  },
  {
    path: '/announcements',
    name: 'announcements',
    component: Announcements
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  },
  {
    path: '/commentItemList',
    name: 'commentItemList',
    component: CommentItemList
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (store.state.login) {
      // 通过vuex state获取当前的登录状态
      next();
    } else {
      let checkLogin = await api.userCheck();

      if (checkLogin.ret == 200 && checkLogin.data.err_code == 0) {
        next();
      } else {
        next({
          path: '/blank/login',
          query: {
            redirect: to.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    }
  } else {
    //已登录的，跳回首页

    if (to.name == 'login' || to.name == 'register') {
      if (store.state.login) {
        // 通过vuex state获取当前的登录状态
        next('/home');
      } else {
        let checkLogin = await api.userCheck();
        if (checkLogin.ret == 200 && checkLogin.data.err_code == 0) {
          next('/home');
        } else {
          next();
        }
      }
    } else {
      next();
    }
  }
});

export default router;
