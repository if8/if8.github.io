!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/static",n(n.s=11)}([function(t,e){function n(){return t.exports=n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n.apply(this,arguments)}t.exports=n},function(t,e,n){},function(t,e,n){},function(t,e){t.exports=Vue},function(t,e,n){var r,o;
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */void 0===(o="function"==typeof(r=function(){var t,e,n={version:"0.2.0"},r=n.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function o(t,e,n){return t<e?e:t>n?n:t}function i(t){return 100*(-1+t)}n.configure=function(t){var e,n;for(e in t)void 0!==(n=t[e])&&t.hasOwnProperty(e)&&(r[e]=n);return this},n.status=null,n.set=function(t){var e=n.isStarted();t=o(t,r.minimum,1),n.status=1===t?null:t;var u=n.render(!e),c=u.querySelector(r.barSelector),l=r.speed,f=r.easing;return u.offsetWidth,s((function(e){""===r.positionUsing&&(r.positionUsing=n.getPositioningCSS()),a(c,function(t,e,n){var o;return(o="translate3d"===r.positionUsing?{transform:"translate3d("+i(t)+"%,0,0)"}:"translate"===r.positionUsing?{transform:"translate("+i(t)+"%,0)"}:{"margin-left":i(t)+"%"}).transition="all "+e+"ms "+n,o}(t,l,f)),1===t?(a(u,{transition:"none",opacity:1}),u.offsetWidth,setTimeout((function(){a(u,{transition:"all "+l+"ms linear",opacity:0}),setTimeout((function(){n.remove(),e()}),l)}),l)):setTimeout(e,l)})),this},n.isStarted=function(){return"number"==typeof n.status},n.start=function(){n.status||n.set(0);var t=function(){setTimeout((function(){n.status&&(n.trickle(),t())}),r.trickleSpeed)};return r.trickle&&t(),this},n.done=function(t){return t||n.status?n.inc(.3+.5*Math.random()).set(1):this},n.inc=function(t){var e=n.status;return e?("number"!=typeof t&&(t=(1-e)*o(Math.random()*e,.1,.95)),e=o(e+t,0,.994),n.set(e)):n.start()},n.trickle=function(){return n.inc(Math.random()*r.trickleRate)},t=0,e=0,n.promise=function(r){return r&&"resolved"!==r.state()?(0===e&&n.start(),t++,e++,r.always((function(){0==--e?(t=0,n.done()):n.set((t-e)/t)})),this):this},n.render=function(t){if(n.isRendered())return document.getElementById("nprogress");c(document.documentElement,"nprogress-busy");var e=document.createElement("div");e.id="nprogress",e.innerHTML=r.template;var o,s=e.querySelector(r.barSelector),u=t?"-100":i(n.status||0),l=document.querySelector(r.parent);return a(s,{transition:"all 0 linear",transform:"translate3d("+u+"%,0,0)"}),r.showSpinner||(o=e.querySelector(r.spinnerSelector))&&d(o),l!=document.body&&c(l,"nprogress-custom-parent"),l.appendChild(e),e},n.remove=function(){l(document.documentElement,"nprogress-busy"),l(document.querySelector(r.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&d(t)},n.isRendered=function(){return!!document.getElementById("nprogress")},n.getPositioningCSS=function(){var t=document.body.style,e="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return e+"Perspective"in t?"translate3d":e+"Transform"in t?"translate":"margin"};var s=function(){var t=[];function e(){var n=t.shift();n&&n(e)}return function(n){t.push(n),1==t.length&&e()}}(),a=function(){var t=["Webkit","O","Moz","ms"],e={};function n(n){return n=n.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(t,e){return e.toUpperCase()})),e[n]||(e[n]=function(e){var n=document.body.style;if(e in n)return e;for(var r,o=t.length,i=e.charAt(0).toUpperCase()+e.slice(1);o--;)if((r=t[o]+i)in n)return r;return e}(n))}function r(t,e,r){e=n(e),t.style[e]=r}return function(t,e){var n,o,i=arguments;if(2==i.length)for(n in e)void 0!==(o=e[n])&&e.hasOwnProperty(n)&&r(t,n,o);else r(t,i[1],i[2])}}();function u(t,e){return("string"==typeof t?t:f(t)).indexOf(" "+e+" ")>=0}function c(t,e){var n=f(t),r=n+e;u(n,e)||(t.className=r.substring(1))}function l(t,e){var n,r=f(t);u(t,e)&&(n=r.replace(" "+e+" "," "),t.className=n.substring(1,n.length-1))}function f(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function d(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return n})?r.call(e,n,e,t):r)||(t.exports=o)},function(t,e){t.exports=Vuex},function(t,e){t.exports=VueRouter},function(t,e,n){"use strict";var r=n(1);n.n(r).a},function(t,e,n){"use strict";var r=n(2);n.n(r).a},function(t,e){function n(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=9},function(t,e){function n(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=10},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=n(3),s=n.n(i),a=n(5),u=n.n(a),c=n(6),l=n.n(c);function f(t,e,n,r,o,i,s,a){var u,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=u):o&&(u=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,e){return u.call(e),l(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,u):[u]}return{exports:t,options:c}}var d=f({name:"app"},(function(){var t=this.$createElement;return(this._self._c||t)("router-view")}),[],!1,null,"7f38ff8a",null).exports;f({},void 0,void 0,!1,null,null,null).exports,f({name:"CompLoading"},(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"comp-loading"},[this._v("组件加载中...")])}),[],!1,null,"88e26218",null).exports;var p={name:"NotFound",metaInfo:{title:"被UFO带走",titleTemplate:"%s | AimWhy"}},m=(n(7),f(p,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found"},[n("div",{staticClass:"_404"},[t._v("404")]),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"_1"},[t._v("THE PAGE")]),t._v(" "),n("div",{staticClass:"_2"},[t._v("WAS NOT FOUND")]),t._v(" "),n("a",{staticClass:"btn",attrs:{href:"#"}},[t._v("BACK TO MARS")])])}],!1,null,"8f3e71a8",null).exports),v={name:"HomeIndex"};n(8);var h=[{path:"/",name:"home",component:f(v,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"home-index"},[e("div",{staticClass:"test"},[this._v("home-index")]),this._v(" "),e("router-view")],1)}),[],!1,null,"30437fed",null).exports},{path:"/404",name:"404",component:m},{path:"*",redirect:"/404"}],g=n(9),y=g.keys().reduce((function(t,e){return t.concat(g(e).default)}),[]);function _(t){var e=t.to,n=t.next,r=location.search.match(/channel=([0-9]+)/);return r||(r=String(e.query.channel).match(/^[0-9]+$/)),r&&(localStorage.channel=r[1]),n()}var S=n(4),b=n.n(S);var w={state:{isShow:!1},getters:{},mutations:{setShowAlert:function(t,e){t.isShow=e}},actions:{fetchShowAlert:function(t,e){t.commit("setShowAlert",e)}}},x=n(10),O=x.keys().reduce((function(t,e){var n=e.split("/");return t[n[n.length-2]]=x(e).default,t}),{});var C=function(t,e){return t.use(e),new e.Store(o()({},w,{modules:O,strict:!1,plugins:[]}))}(s.a,u.a),E=function(t,e){t.use(e);var n=new e({mode:"hash",base:"/",linkActiveClass:"active",scrollBehavior:function(){return{y:0}},routes:y.concat(h)});return n.beforeEach((function(t,e,r){null!==e.name&&b.a.start();var i=[_];t.matched.reduce((function(t,e){return Array.isArray(e.meta.middleware)?t.push.apply(t,e.meta.middleware):e.meta.middleware&&t.push(e.meta.middleware),t}),i);var s={to:t,from:e,next:r,router:n},a=function t(e,n,r){var i=n[r];return i?function(s){if(void 0!==s)return e.next(s);var a=t(e,n,r+1);i(o()({},e,{next:a}))}:e.next}(s,i,1);return i[0](o()({},s,{next:a}))})),n.afterEach((function(t,e){b.a.done()})),n}(s.a,l.a);window.$store=E.$store=C,window.$router=C.$router=E,window.App=new s.a(o()({el:"#app",router:E,store:C},d))}]);