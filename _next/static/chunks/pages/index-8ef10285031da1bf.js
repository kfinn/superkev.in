(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(1430)}])},8418:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);o=!0);}catch(u){c=!0,i=u}finally{try{o||null==n.return||n.return()}finally{if(c)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.default=void 0;var a,o=(a=n(7294))&&a.__esModule?a:{default:a},c=n(6273),u=n(387),s=n(7190);var l={};function f(e,t,n,r){if(e&&c.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var i=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(i?"%"+i:"")]=!0}}var d=function(e){var t,n=!1!==e.prefetch,r=u.useRouter(),a=o.default.useMemo((function(){var t=i(c.resolveHref(r,e.href,!0),2),n=t[0],a=t[1];return{href:n,as:e.as?c.resolveHref(r,e.as):a||n}}),[r,e.href,e.as]),d=a.href,h=a.as,m=e.children,v=e.replace,p=e.shallow,y=e.scroll,g=e.locale;"string"===typeof m&&(m=o.default.createElement("a",null,m));var _=(t=o.default.Children.only(m))&&"object"===typeof t&&t.ref,b=i(s.useIntersection({rootMargin:"200px"}),2),j=b[0],w=b[1],k=o.default.useCallback((function(e){j(e),_&&("function"===typeof _?_(e):"object"===typeof _&&(_.current=e))}),[_,j]);o.default.useEffect((function(){var e=w&&n&&c.isLocalURL(d),t="undefined"!==typeof g?g:r&&r.locale,i=l[d+"%"+h+(t?"%"+t:"")];e&&!i&&f(r,d,h,{locale:t})}),[h,d,w,g,n,r]);var x={ref:k,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,i,a,o,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&c.isLocalURL(n))&&(e.preventDefault(),null==o&&r.indexOf("#")>=0&&(o=!1),t[i?"replace":"push"](n,r,{shallow:a,locale:u,scroll:o}))}(e,r,d,h,v,p,y,g)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),c.isLocalURL(d)&&f(r,d,h,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var E="undefined"!==typeof g?g:r&&r.locale,L=r&&r.isLocaleDomain&&c.getDomainLocale(h,E,r&&r.locales,r&&r.domainLocales);x.href=L||c.addBasePath(c.addLocale(h,E,r&&r.defaultLocale))}return o.default.cloneElement(t,x)};t.default=d},7190:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);o=!0);}catch(u){c=!0,i=u}finally{try{o||null==n.return||n.return()}finally{if(c)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,r=e.disabled||!c,s=a.useRef(),l=i(a.useState(!1),2),f=l[0],d=l[1],h=i(a.useState(t?t.current:null),2),m=h[0],v=h[1],p=a.useCallback((function(e){s.current&&(s.current(),s.current=void 0),r||f||e&&e.tagName&&(s.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=u.get(t);if(n)return n;var r=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return u.set(t,n={id:t,observer:i,elements:r}),n}(n),i=r.id,a=r.observer,o=r.elements;return o.set(e,t),a.observe(e),function(){o.delete(e),a.unobserve(e),0===o.size&&(a.disconnect(),u.delete(i))}}(e,(function(e){return e&&d(e)}),{root:m,rootMargin:n}))}),[r,m,n,f]);return a.useEffect((function(){if(!c&&!f){var e=o.requestIdleCallback((function(){return d(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[f]),a.useEffect((function(){t&&v(t.current)}),[t]),[p,f]};var a=n(7294),o=n(9311),c="undefined"!==typeof IntersectionObserver;var u=new Map},1430:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(5893),i=n(9008),a=n(1664),o=n(7294);function c(e,t){return e.matches[t]=!1,e.mediaQueries[t]={},e}function u(e){const t=Object.keys(e);return"undefined"===typeof window?t.reduce(c,{mediaQueries:{},matches:{}}):t.reduce(((t,n)=>{const r=window.matchMedia(e[n]);return t.mediaQueries[n]=r,t.matches[n]=r.matches,t}),{mediaQueries:{},matches:{}})}function s(e,t){switch(t.type){case"updateMatches":return{matches:Object.keys(e.mediaQueries).reduce((function(t,n){return t[n]=e.mediaQueries[n].matches,t}),{}),mediaQueries:e.mediaQueries};case"setQueries":return u(t.queries)}}function l(e){const t=o.useRef(e),[n,r]=o.useReducer(s,e,u);function i(){return r({type:"updateMatches"})}function a(e){const t=i;return"undefined"!==typeof e.addListener?e.addListener(t):e.addEventListener("change",t),t}o.useEffect((()=>{(function(e,t){if(t===e)return!1;const n=Object.values(t),r=Object.values(e);if(n.length!==r.length)return!0;if(n.some(((e,t)=>e!==r[t])))return!0;const i=Object.keys(e);return Object.keys(t).some(((e,t)=>e!==i[t]))})(e,t.current)&&(r({type:"setQueries",queries:e}),t.current=e)}),[e]),o.useEffect((()=>{const e=Object.values(n.mediaQueries),t=e.map(a);function r(e,n){"undefined"!==typeof e.addListener?e.removeListener(t[n]):e.removeEventListener("change",t[n])}return()=>{e.forEach(r)}}),[n.mediaQueries]);const{matches:c}=n,l=o.useMemo((()=>Object.values(c)),[c]);return{matches:c,matchesAny:l.some(Boolean),matchesAll:l.length>0&&l.every(Boolean)}}function f(e){return l(function(e){void 0===d[e]&&(d[e]={default:e});return d[e]}(e)).matchesAll}const d={};var h=function(){};var m=n(7528),v=n.n(m);function p(e,t){var n=f("(prefers-color-scheme: dark)");return(0,o.useMemo)((function(){var r=Math.round((e+t)%360),i=n?"15%":"75%";return{background:"radial-gradient(circle at center, hsla(".concat(r,", 100%, ").concat(i,", 1) 5%, hsla(").concat(r,", 100%, ").concat(i,", 0) 45%)")}}),[n,e,t])}function y(){var e=(0,o.useState)(0),t=e[0],n=e[1];!function(e,t,n){var r=(0,o.useRef)(h);(0,o.useEffect)((function(){r.current=e})),(0,o.useEffect)((function(){n&&null!==t&&!1!==t&&r.current()}),[n]),(0,o.useEffect)((function(){if(null!==t&&!1!==t){var e=setInterval((function(){return r.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){n((t+2)%360)}),60);var i=p(t,0),a=p(t,222),c=p(t,85),u=p(t,307);return(0,r.jsxs)("div",{className:v().container,children:[(0,r.jsx)("div",{className:v().light1,style:i}),(0,r.jsx)("div",{className:v().light2,style:a}),(0,r.jsx)("div",{className:v().light3,style:c}),(0,r.jsx)("div",{className:v().light4,style:u})]})}var g=n(6724),_=n.n(g),b=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(y,{}),(0,r.jsxs)("div",{className:_().container,children:[(0,r.jsxs)(i.default,{children:[(0,r.jsx)("title",{children:"superkev.in"}),(0,r.jsx)("meta",{name:"description",content:"superkev.in, the personal website of Kevin Finn"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)("main",{className:_().main,children:[(0,r.jsxs)("h1",{className:_().title,children:["Welcome to ",(0,r.jsx)(a.default,{href:"/",children:"superkev.in"})]}),(0,r.jsx)("div",{children:"The personal website of Kevin Finn"}),(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:[(0,r.jsx)(a.default,{href:"https://github.com/kfinn",children:"GitHub"}),": some code I've written"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(a.default,{href:"https://www.twitch.tv/superkevin627",children:"Twitch"}),": sometimes I stream myself programming here"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(a.default,{href:"https://www.youtube.com/channel/UCI1DoNclLMm03_ZA4ncasyg",children:"YouTube"}),": some past programming streams"]}),(0,r.jsxs)("li",{children:[(0,r.jsx)(a.default,{href:"https://linkedin.com/in/kevinhfinn",children:"LinkedIn"}),": my work history"]})]})]})]})]})}},7528:function(e){e.exports={container:"PartyBackground_container__kPT7r",light:"PartyBackground_light__gPCr_",light1:"PartyBackground_light1__z5gQG PartyBackground_light__gPCr_",light2:"PartyBackground_light2__0F5UC PartyBackground_light__gPCr_",light3:"PartyBackground_light3__wc9jM PartyBackground_light__gPCr_",light4:"PartyBackground_light4__TbVG2 PartyBackground_light__gPCr_"}},6724:function(e){e.exports={container:"index_container__Xi8tY",main:"index_main__3wZvj",domain:"index_domain__ZYBnL"}},9008:function(e,t,n){e.exports=n(5443)},1664:function(e,t,n){e.exports=n(8418)}},function(e){e.O(0,[774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);