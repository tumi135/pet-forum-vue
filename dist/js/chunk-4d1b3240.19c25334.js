(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d1b3240"],{"09fe":function(t,i,e){},"28a2":function(t,i,e){"use strict";var o=e("c31d"),s=e("2b0e"),n=e("d282"),a=e("482d"),r=e("1325"),c=e("6605"),h=e("3875"),u=e("44bf"),l=e("5596"),d=e("543e"),f=e("2bb1"),v=Object(n["a"])("image-preview"),m=v[0],g=v[1];function p(t){return Math.sqrt(Math.pow(t[0].clientX-t[1].clientX,2)+Math.pow(t[0].clientY-t[1].clientY,2))}var w,b=m({mixins:[Object(c["a"])({skipToggleEvent:!0}),h["a"]],props:{className:null,lazyLoad:Boolean,asyncClose:Boolean,showIndicators:Boolean,images:{type:Array,default:function(){return[]}},loop:{type:Boolean,default:!0},swipeDuration:{type:[Number,String],default:500},overlay:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!0},startPosition:{type:[Number,String],default:0},minZoom:{type:[Number,String],default:1/3},maxZoom:{type:[Number,String],default:3},overlayClass:{type:String,default:g("overlay")}},data:function(){return{scale:1,moveX:0,moveY:0,active:0,moving:!1,zooming:!1,doubleClickTimer:null}},computed:{imageStyle:function(){var t=this.scale,i={transitionDuration:this.zooming||this.moving?"0s":".3s"};return 1!==t&&(i.transform="scale3d("+t+", "+t+", 1) translate("+this.moveX/t+"px, "+this.moveY/t+"px)"),i}},watch:{value:function(t){var i=this;t?(this.setActive(+this.startPosition),this.$nextTick((function(){i.$refs.swipe.swipeTo(+i.startPosition,{immediate:!0})}))):this.$emit("close",{index:this.active,url:this.images[this.active]})},startPosition:function(t){this.setActive(t)},shouldRender:{handler:function(t){var i=this;t&&this.$nextTick((function(){var t=i.$refs.swipe.$el;Object(r["b"])(t,"touchstart",i.onWrapperTouchStart),Object(r["b"])(t,"touchmove",r["c"]),Object(r["b"])(t,"touchend",i.onWrapperTouchEnd),Object(r["b"])(t,"touchcancel",i.onWrapperTouchEnd)}))},immediate:!0}},methods:{onWrapperTouchStart:function(){this.touchStartTime=new Date},onWrapperTouchEnd:function(t){var i=this;Object(r["c"])(t);var e=new Date-this.touchStartTime,o=this.$refs.swipe||{},s=o.offsetX,n=void 0===s?0:s,a=o.offsetY,c=void 0===a?0:a;e<300&&n<10&&c<10&&(this.doubleClickTimer?(clearTimeout(this.doubleClickTimer),this.doubleClickTimer=null,this.toggleScale()):this.doubleClickTimer=setTimeout((function(){i.asyncClose||i.$emit("input",!1),i.doubleClickTimer=null}),300))},startMove:function(t){var i=t.currentTarget,e=i.getBoundingClientRect(),o=window.innerWidth,s=window.innerHeight;this.touchStart(t),this.moving=!0,this.startMoveX=this.moveX,this.startMoveY=this.moveY,this.maxMoveX=Math.max(0,(e.width-o)/2),this.maxMoveY=Math.max(0,(e.height-s)/2)},startZoom:function(t){this.moving=!1,this.zooming=!0,this.startScale=this.scale,this.startDistance=p(t.touches)},onImageTouchStart:function(t){var i=t.touches,e=this.$refs.swipe||{},o=e.offsetX,s=void 0===o?0:o;1===i.length&&1!==this.scale?this.startMove(t):2!==i.length||s||this.startZoom(t)},onImageTouchMove:function(t){var i=t.touches;if((this.moving||this.zooming)&&Object(r["c"])(t,!0),this.moving){this.touchMove(t);var e=this.deltaX+this.startMoveX,o=this.deltaY+this.startMoveY;this.moveX=Object(a["a"])(e,-this.maxMoveX,this.maxMoveX),this.moveY=Object(a["a"])(o,-this.maxMoveY,this.maxMoveY)}if(this.zooming&&2===i.length){var s=p(i),n=this.startScale*s/this.startDistance;this.setScale(n)}},onImageTouchEnd:function(t){if(this.moving||this.zooming){var i=!0;this.moving&&this.startMoveX===this.moveX&&this.startMoveY===this.moveY&&(i=!1),t.touches.length||(this.moving=!1,this.zooming=!1,this.startMoveX=0,this.startMoveY=0,this.startScale=1,this.scale<1&&this.resetScale()),i&&Object(r["c"])(t,!0)}},setActive:function(t){this.resetScale(),t!==this.active&&(this.active=t,this.$emit("change",t))},setScale:function(t){this.scale=Object(a["a"])(t,+this.minZoom,+this.maxZoom)},resetScale:function(){this.setScale(1),this.moveX=0,this.moveY=0},toggleScale:function(){var t=this.scale>1?1:2;this.setScale(t),this.moveX=0,this.moveY=0},genIndex:function(){var t=this.$createElement;if(this.showIndex)return t("div",{class:g("index")},[this.slots("index")||this.active+1+" / "+this.images.length])},genCover:function(){var t=this.$createElement,i=this.slots("cover");if(i)return t("div",{class:g("cover")},[i])},genImages:function(){var t=this,i=this.$createElement,e={loading:function(){return i(d["a"],{attrs:{type:"spinner"}})}};return i(l["a"],{ref:"swipe",attrs:{loop:this.loop,indicatorColor:"white",duration:this.swipeDuration,initialSwipe:this.startPosition,showIndicators:this.showIndicators},class:g("swipe"),on:{change:this.setActive}},[this.images.map((function(o,s){return i(f["a"],[i(u["a"],{attrs:{src:o,fit:"contain",lazyLoad:t.lazyLoad},class:g("image"),scopedSlots:e,style:s===t.active?t.imageStyle:null,nativeOn:{touchstart:t.onImageTouchStart,touchmove:t.onImageTouchMove,touchend:t.onImageTouchEnd,touchcancel:t.onImageTouchEnd}})])}))])}},render:function(){var t=arguments[0];if(this.shouldRender)return t("transition",{attrs:{name:"van-fade"}},[t("div",{directives:[{name:"show",value:this.value}],class:[g(),this.className]},[this.genImages(),this.genIndex(),this.genCover()])])}}),y=e("a142"),S={loop:!0,images:[],value:!0,minZoom:1/3,maxZoom:3,className:"",onClose:null,onChange:null,lazyLoad:!1,showIndex:!0,asyncClose:!1,startPosition:0,swipeDuration:500,showIndicators:!1,closeOnPopstate:!1},T=function(){w=new(s["a"].extend(b))({el:document.createElement("div")}),document.body.appendChild(w.$el),w.$on("change",(function(t){w.onChange&&w.onChange(t)}))},$=function(t,i){if(void 0===i&&(i=0),!y["e"]){w||T();var e=Array.isArray(t)?{images:t,startPosition:i}:t;return Object(o["a"])(w,S,e),w.$once("input",(function(t){w.value=t})),e.onClose&&(w.$off("close"),w.$once("close",e.onClose)),w}};$.install=function(){s["a"].use(b)};i["a"]=$},"2bb1":function(t,i,e){"use strict";var o=e("c31d"),s=e("d282"),n=Object(s["a"])("swipe-item"),a=n[0],r=n[1];i["a"]=a({data:function(){return{offset:0}},beforeCreate:function(){this.$parent.swipes.push(this)},destroyed:function(){this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)},render:function(){var t=arguments[0],i=this.$parent,e=i.vertical,s=i.computedWidth,n=i.computedHeight,a={width:s+"px",height:e?n+"px":"100%",transform:"translate"+(e?"Y":"X")+"("+this.offset+"px)"};return t("div",{class:r(),style:a,on:Object(o["a"])({},this.$listeners)},[this.slots()])}})},4056:function(t,i,e){"use strict";e("68ef"),e("9d70"),e("3743"),e("09fe")},"44bf":function(t,i,e){"use strict";var o=e("2638"),s=e.n(o),n=e("d282"),a=e("a142"),r=e("ea8e"),c=e("ad06"),h=Object(n["a"])("image"),u=h[0],l=h[1];i["a"]=u({props:{src:String,fit:String,alt:String,round:Boolean,width:[Number,String],height:[Number,String],radius:[Number,String],lazyLoad:Boolean,showError:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},errorIcon:{type:String,default:"warning-o"},loadingIcon:{type:String,default:"photo-o"}},data:function(){return{loading:!0,error:!1}},watch:{src:function(){this.loading=!0,this.error=!1}},computed:{style:function(){var t={};return Object(a["b"])(this.width)&&(t.width=Object(r["a"])(this.width)),Object(a["b"])(this.height)&&(t.height=Object(r["a"])(this.height)),Object(a["b"])(this.radius)&&(t.overflow="hidden",t.borderRadius=Object(r["a"])(this.radius)),t}},created:function(){var t=this.$Lazyload;t&&(t.$on("loaded",this.onLazyLoaded),t.$on("error",this.onLazyLoadError))},beforeDestroy:function(){var t=this.$Lazyload;t&&(t.$off("loaded",this.onLazyLoaded),t.$off("error",this.onLazyLoadError))},methods:{onLoad:function(t){this.loading=!1,this.$emit("load",t)},onLazyLoaded:function(t){var i=t.el;i===this.$refs.image&&this.loading&&this.onLoad()},onLazyLoadError:function(t){var i=t.el;i!==this.$refs.image||this.error||this.onError()},onError:function(t){this.error=!0,this.loading=!1,this.$emit("error",t)},onClick:function(t){this.$emit("click",t)},genPlaceholder:function(){var t=this.$createElement;return this.loading&&this.showLoading?t("div",{class:l("loading")},[this.slots("loading")||t(c["a"],{attrs:{name:this.loadingIcon},class:l("loading-icon")})]):this.error&&this.showError?t("div",{class:l("error")},[this.slots("error")||t(c["a"],{attrs:{name:this.errorIcon},class:l("error-icon")})]):void 0},genImage:function(){var t=this.$createElement,i={class:l("img"),attrs:{alt:this.alt},style:{objectFit:this.fit}};if(!this.error)return this.lazyLoad?t("img",s()([{ref:"image",directives:[{name:"lazy",value:this.src}]},i])):t("img",s()([{attrs:{src:this.src},on:{load:this.onLoad,error:this.onError}},i]))}},render:function(){var t=arguments[0];return t("div",{class:l({round:this.round}),style:this.style,on:{click:this.onClick}},[this.genImage(),this.genPlaceholder()])}})},4598:function(t,i,e){"use strict";(function(t){e.d(i,"a",(function(){return h}));var o=e("a142"),s=Date.now();function n(t){var i=Date.now(),e=Math.max(0,16-(i-s)),o=setTimeout(t,e);return s=i+e,o}var a=o["e"]?t:window,r=a.requestAnimationFrame||n;a.cancelAnimationFrame||a.clearTimeout;function c(t){return r.call(a,t)}function h(t){c((function(){c(t)}))}}).call(this,e("c8ba"))},4662:function(t,i,e){"use strict";e("68ef"),e("a71a"),e("9d70"),e("3743"),e("09fe"),e("4d75"),e("e3b3"),e("8270"),e("786d"),e("504b")},"482d":function(t,i,e){"use strict";function o(t,i,e){return Math.min(Math.max(t,i),e)}e.d(i,"a",(function(){return o}))},"504b":function(t,i,e){},5596:function(t,i,e){"use strict";var o=e("d282"),s=e("1325"),n=e("4598"),a=e("482d"),r=e("3875"),c=e("5fbe"),h=Object(o["a"])("swipe"),u=h[0],l=h[1];i["a"]=u({mixins:[r["a"],Object(c["a"])((function(t,i){t(window,"resize",this.resize,!0),t(window,"visibilitychange",this.onVisibilityChange),i?this.initialize():this.clear()}))],props:{width:[Number,String],height:[Number,String],autoplay:[Number,String],vertical:Boolean,indicatorColor:String,loop:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},touchable:{type:Boolean,default:!0},initialSwipe:{type:[Number,String],default:0},showIndicators:{type:Boolean,default:!0},stopPropagation:{type:Boolean,default:!0}},data:function(){return{computedWidth:0,computedHeight:0,offset:0,active:0,deltaX:0,deltaY:0,swipes:[],swiping:!1}},watch:{swipes:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t>0?this.autoPlay():this.clear()}},computed:{count:function(){return this.swipes.length},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,i=this.vertical?"height":"width",e=this.vertical?"width":"height";return t={},t[i]=this.trackSize+"px",t[e]=this[e]?this[e]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}},minOffset:function(){var t=this.$el.getBoundingClientRect();return(this.vertical?t.height:t.width)-this.size*this.count}},mounted:function(){this.bindTouchEvent(this.$refs.track)},methods:{initialize:function(t){if(void 0===t&&(t=+this.initialSwipe),clearTimeout(this.timer),this.$el){var i=this.$el.getBoundingClientRect();this.computedWidth=+this.width||i.width,this.computedHeight=+this.height||i.height}this.swiping=!0,this.active=t,this.offset=this.count>1?-this.size*this.active:0,this.swipes.forEach((function(t){t.offset=0})),this.autoPlay()},resize:function(){this.initialize(this.activeIndicator)},onVisibilityChange:function(){document.hidden?this.clear():this.autoPlay()},onTouchStart:function(t){this.touchable&&(this.clear(),this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(Object(s["c"])(t,this.stopPropagation),this.move({offset:this.delta})))},onTouchEnd:function(){if(this.touchable&&this.swiping){if(this.delta&&this.isCorrectDirection){var t=this.vertical?this.offsetY:this.offsetX;this.move({pace:t>0?this.delta>0?-1:1:0,emitChange:!0})}this.swiping=!1,this.autoPlay()}},getTargetActive:function(t){var i=this.active,e=this.count;return t?this.loop?Object(a["a"])(i+t,-1,e):Object(a["a"])(i+t,0,e-1):i},getTargetOffset:function(t,i){var e=t*this.size;this.loop||(e=Math.min(e,-this.minOffset));var o=Math.round(i-e);return this.loop||(o=Object(a["a"])(o,this.minOffset,0)),o},move:function(t){var i=t.pace,e=void 0===i?0:i,o=t.offset,s=void 0===o?0:o,n=t.emitChange,a=this.loop,r=this.count,c=this.active,h=this.swipes,u=this.trackSize,l=this.minOffset;if(!(r<=1)){var d=this.getTargetActive(e),f=this.getTargetOffset(d,s);if(a){if(h[0]){var v=f<l;h[0].offset=v?u:0}if(h[r-1]){var m=f>0;h[r-1].offset=m?-u:0}}this.active=d,this.offset=f,n&&d!==c&&this.$emit("change",this.activeIndicator)}},prev:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(n["a"])((function(){t.swiping=!1,t.move({pace:-1,emitChange:!0})}))},next:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(n["a"])((function(){t.swiping=!1,t.move({pace:1,emitChange:!0})}))},swipeTo:function(t,i){var e=this;void 0===i&&(i={}),this.correctPosition(),this.resetTouchStatus(),Object(n["a"])((function(){var o;o=e.loop&&t===e.count?0===e.active?0:t:t%e.count,i.immediate?Object(n["a"])((function(){e.swiping=!1})):e.swiping=!1,e.move({pace:o-e.active,emitChange:!0})}))},correctPosition:function(){this.swiping=!0,this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,i=this.autoplay;i>0&&this.count>1&&(this.clear(),this.timer=setTimeout((function(){t.next(),t.autoPlay()}),i))},genIndicator:function(){var t=this,i=this.$createElement,e=this.count,o=this.activeIndicator,s=this.slots("indicator");return s||(this.showIndicators&&e>1?i("div",{class:l("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(e)).map((function(e,s){return i("i",{class:l("indicator",{active:s===o}),style:s===o?t.indicatorStyle:null})}))]):void 0)}},render:function(){var t=arguments[0];return t("div",{class:l()},[t("div",{ref:"track",style:this.trackStyle,class:l("track")},[this.slots()]),this.genIndicator()])}})},"786d":function(t,i,e){},8270:function(t,i,e){}}]);
//# sourceMappingURL=chunk-4d1b3240.19c25334.js.map