(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71cbf046"],{"0c6f":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"top"},[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:t.nowuserInfo.ext_info.yesapi_avatar}})]),n("div",{staticClass:"name-email-sex"},[n("p",{staticClass:"name"},[t._v(t._s(t.nowuserInfo.username))]),n("p",[t._v("邮箱："+t._s(t.nowuserInfo.ext_info.yesapi_email||"暂无"))]),n("p",[t._v("性别："+t._s(t.nowuserInfo.ext_info.yesapi_sex||"暂无"))])]),n("div",{staticClass:"rolename"},["管理员"==t.nowuserInfo.rolename?n("van-tag",{attrs:{mark:"",color:"#ffe1e1","text-color":"#ad0000"}},[t._v("管理员")]):n("van-tag",{attrs:{mark:""}},[t._v("普通会员")])],1)]),n("ul",{staticClass:"center"},[n("li",{on:{click:function(e){return t.changeRouter("myArticle")}}},[n("p",[t._v(t._s(t.articleNum))]),n("p",[t._v("我的文章")])]),n("li",{on:{click:function(e){return t.changeRouter("myFunnyImg")}}},[n("p",[t._v(t._s(t.funnyImgleNum))]),n("p",[t._v("我的趣图")])])]),n("div",{staticClass:"buttom"},[n("van-cell",{attrs:{title:"创建趣图","is-link":"",to:{name:"createFunnyImg"}}}),n("van-cell",{attrs:{title:"发布文章","is-link":"",to:{name:"createArticle"}}}),n("van-cell",{attrs:{title:"设置","is-link":"",to:{name:"set"}}})],1),n("my-swiper",{attrs:{type:"2"}})],1)},a=[],i=(n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("159b"),n("c194"),n("7744")),o=(n("68ef"),n("9d70"),n("3743"),n("9b7e"),n("2638")),c=n.n(o),l=n("d282"),u=n("ba31"),s=n("b1d2"),f=n("ad06"),d=Object(l["a"])("tag"),b=d[0],p=d[1];function v(t,e,n,r){var a,i,o=e.type,l=e.mark,d=e.plain,b=e.color,v=e.round,m=e.size,h=d?"color":"backgroundColor",g=(a={},a[h]=b,a);e.textColor&&(g.color=e.textColor);var y={mark:l,plain:d,round:v};m&&(y[m]=m);var O=e.closeable&&t(f["a"],{attrs:{name:"cross"},class:p("close"),on:{click:function(t){t.stopPropagation(),Object(u["a"])(r,"close")}}});return t("transition",{attrs:{name:e.closeable?"van-fade":null}},[t("span",c()([{key:"content",style:g,class:[p([y,o]),(i={},i[s["d"]]=d,i)]},Object(u["b"])(r,!0)]),[null==n.default?void 0:n.default(),O])])}v.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}};var m=b(v),h=(n("96cf"),n("1da1")),g=n("ade3"),y=n("2f62");function O(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?O(Object(n),!0).forEach((function(e){Object(g["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var j={name:"",data:function(){return{articleNum:null,praiseNum:null,funnyImgleNum:null,nowuserInfo:{}}},created:function(){this.initUserInfo()},methods:w({},Object(y["b"])(["saveUserInfo"]),{initUserInfo:function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(){var e,n,r,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.userInfo,e.username){t.next=6;break}return t.next=4,this.$api.userProfile();case 4:n=t.sent,200==n.ret&&0==n.data.err_code?(e=n.data.info,this.saveUserInfo(e)):this.$toast("个信息获取失败，请刷新！");case 6:return this.nowuserInfo=e,t.next=9,this.$api.freeCount("yesapi_fl_article",["writer='"+e.username+"'"]).catch((function(){return"失败"}));case 9:return r=t.sent,t.next=12,this.$api.freeCount("yesapi_praise",["userid='"+e.uuid+"'"]).catch((function(){return"失败"}));case 12:return a=t.sent,t.next=15,this.$api.freeCount("okayapi_image",["create_by='"+e.username+"'"]).catch((function(){return"失败"}));case 15:i=t.sent,this.articleNum=r.data.total||"0",this.praiseNum=a.data.total||"0",this.funnyImgleNum=i.data.total||"0";case 19:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),changeRouter:function(t){this.$router.push({name:t})}}),computed:w({},Object(y["c"])(["userInfo"])),beforeRouteEnter:function(t,e,n){n((function(t){t.initUserInfo()}))},components:{"van-tag":m,"van-cell":i["a"],"my-swiper":function(){return n.e("chunk-607c93c2").then(n.bind(null,"6344"))}}},k=j,_=(n("e321"),n("2877")),C=Object(_["a"])(k,r,a,!1,null,"75ac8ac1",null);e["default"]=C.exports},"1a04":function(t,e,n){},"48f4":function(t,e,n){"use strict";function r(t,e){var n=e.to,r=e.url,a=e.replace;if(n&&t){var i=t[a?"replace":"push"](n);i&&i.catch&&i.catch((function(t){if(t&&"NavigationDuplicated"!==t.name)throw t}))}else r&&(a?location.replace(r):location.href=r)}function a(t){r(t.parent&&t.parent.$router,t.props)}n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return i}));var i={url:String,replace:Boolean,to:[String,Object]}},7744:function(t,e,n){"use strict";var r=n("c31d"),a=n("2638"),i=n.n(a),o=n("d282"),c=n("a142"),l=n("ba31"),u=n("48f4"),s=n("dfaf"),f=n("ad06"),d=Object(o["a"])("cell"),b=d[0],p=d[1];function v(t,e,n,r){var a=e.icon,o=e.size,s=e.title,d=e.label,b=e.value,v=e.isLink,m=n.title||Object(c["b"])(s);function h(){var r=n.label||Object(c["b"])(d);if(r)return t("div",{class:[p("label"),e.labelClass]},[n.label?n.label():d])}function g(){if(m)return t("div",{class:[p("title"),e.titleClass],style:e.titleStyle},[n.title?n.title():t("span",[s]),h()])}function y(){var r=n.default||Object(c["b"])(b);if(r)return t("div",{class:[p("value",{alone:!m}),e.valueClass]},[n.default?n.default():t("span",[b])])}function O(){return n.icon?n.icon():a?t(f["a"],{class:p("left-icon"),attrs:{name:a}}):void 0}function w(){var r=n["right-icon"];if(r)return r();if(v){var a=e.arrowDirection;return t(f["a"],{class:p("right-icon"),attrs:{name:a?"arrow-"+a:"arrow"}})}}function j(t){Object(l["a"])(r,"click",t),Object(u["a"])(r)}var k=v||e.clickable,_={clickable:k,center:e.center,required:e.required,borderless:!e.border};return o&&(_[o]=o),t("div",i()([{class:p(_),attrs:{role:k?"button":null,tabindex:k?0:null},on:{click:j}},Object(l["b"])(r)]),[O(),g(),y(),w(),null==n.extra?void 0:n.extra()])}v.props=Object(r["a"])({},s["a"],{},u["c"]),e["a"]=b(v)},"7cda":function(t,e,n){},"9b7e":function(t,e,n){},b1d2:function(t,e,n){"use strict";n.d(e,"h",(function(){return r})),n.d(e,"a",(function(){return a})),n.d(e,"e",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"d",(function(){return l})),n.d(e,"f",(function(){return u})),n.d(e,"g",(function(){return s}));var r="#fff",a="van-hairline",i=a+"--top",o=a+"--left",c=a+"--bottom",l=a+"--surround",u=a+"--top-bottom",s=a+"-unset--top-bottom"},c194:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("1a04")},dfaf:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,clickable:Boolean,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0}}},e321:function(t,e,n){"use strict";var r=n("7cda"),a=n.n(r);a.a}}]);
//# sourceMappingURL=chunk-71cbf046.d546b810.js.map