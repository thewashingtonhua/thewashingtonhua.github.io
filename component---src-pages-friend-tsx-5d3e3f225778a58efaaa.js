(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{125:function(e,t,a){e.exports=a.p+"static/lucode-e50e71e8fc5159d4e778450ef8fa9587.jpg"},126:function(e,t,a){e.exports=a.p+"static/infinite-script-db738904a4645afa4e66e39eb035745e.jpg"},127:function(e,t,a){e.exports=a.p+"static/everain-b0357834ff85d4e7ca795016e7281d9e.jpg"},128:function(e,t,a){e.exports=a.p+"static/silvermac-4da8b87e6388f6ed9e694eaf40dc5055.jpg"},73:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return E});var n=a(0),r=a.n(n),c=a(91),i=a(89),o=(a(124),a(125)),l=a.n(o),s=a(126),m=a.n(s),u=a(127),d=a.n(u),p=a(128),f=a.n(p),v=[{url:"http://www.lucode.net",cover:l.a,name:"LuCode",desc:["CodeSun，中科大研究生","主攻编译技术、形式化验证","服务器资深玩家"]},{url:"https://infinitescript.com/",cover:m.a,name:"InfiniteScript",desc:["Dr.Xie，哈工大博士","主攻计算机视觉、机器,学习","Github 老司机"]},{url:"https://everain.me/",cover:d.a,name:"Everain",desc:["Everain，网易前端开发","主攻 JavaScript 大前端,生态","猪厂大前端接班人"]},{url:"https://silvermac.io/",cover:f.a,name:"Silvermac",desc:["Sam，Autodesk 研发大佬","主攻各种我听不懂的黑科技,","各大厂抢着要的香饽饽"]}];t.default=function(e){var t=e.data;return r.a.createElement(c.a,null,r.a.createElement(i.a,{title:"朋友",keywords:t.site.siteMetadata.keywords}),r.a.createElement("div",{className:"mf-content",id:"friends"},r.a.createElement("h1",{className:"title"},"未来，就在这里"),r.a.createElement("div",{className:"friends"},v.map(function(e){return r.a.createElement("a",{key:e.name,className:"friend",id:"friend__".concat(e.name.toLowerCase()),target:"_blank",href:e.url,rel:"noopener noreferrer"},r.a.createElement("div",{className:"cover fix-ratio ratio-16-9"},r.a.createElement("img",{src:e.cover,alt:""})),r.a.createElement("div",{className:"intro"},r.a.createElement("h2",null,e.name),r.a.createElement("ul",null,e.desc.map(function(e){return r.a.createElement("li",{key:"item"},e)}))))}))))};var E="3336653186"},86:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=!0},87:function(e){e.exports={data:{site:{siteMetadata:{title:"童话说"}}}}},88:function(e,t,a){e.exports=a.p+"static/logo-8503f6989dba3ce27939964a48c8b787.png"},89:function(e,t,a){"use strict";var n=a(90),r=a(0),c=a.n(r),i=a(97),o=a.n(i),l=a(25);t.a=function(e){var t=e.description,a=void 0===t?"":t,r=e.lang,i=void 0===r?"zh":r,m=e.meta,u=void 0===m?[]:m,d=e.keywords,p=void 0===d?[]:d,f=e.title,v=void 0===f?"":f,E=e.exactTitle,g=void 0!==E&&E;return c.a.createElement(l.StaticQuery,{query:s,render:function(e){var t=a||e.site.siteMetadata.description;return c.a.createElement(o.a,{htmlAttributes:{lang:i},title:v,titleTemplate:g?"":"%s | ".concat(e.site.siteMetadata.title),meta:[{name:"description",content:t},{property:"og:title",content:v},{property:"og:description",content:t},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:v},{name:"twitter:description",content:t}].concat(p.length>0?{name:"keywords",content:p.join(", ")}:[]).concat(u)})},data:n})};var s="1025518380"},90:function(e){e.exports={data:{site:{siteMetadata:{title:"童话说",description:"Washington Hua 的个人博客，专注大前端技术",author:"Washington Hua"}}}}},91:function(e,t,a){"use strict";var n=a(87),r=a(0),c=a.n(r),i=a(25),o=a(141),l=(a(94),a(95),a(15)),s=a(88),m=a.n(s),u=(a(96),[{to:"/blog",text:"博客"},{to:"/project",text:"代表作"},{to:"/lab",text:"实验室"},{to:"/friend",text:"朋友"},{to:"/about",text:"我"}]),d=function(){var e=Object(r.useState)(!1),t=Object(l.a)(e,2),a=t[0],n=t[1];function o(e){e&&e.stopPropagation(),n(!1)}function s(e){return e.isPartiallyCurrent?{className:"menu-link active"}:{className:"menu-link"}}return c.a.createElement(c.a.Fragment,null,c.a.createElement("header",{id:"mf-header"},c.a.createElement("div",{className:"mf-header-wrapper"},c.a.createElement(i.Link,{to:"/",className:"logo"},c.a.createElement("img",{src:m.a,alt:""}),c.a.createElement("span",null,"童话说")),c.a.createElement("div",{className:"hamberger"+(a?" open":""),onClick:function(e){e&&e.stopPropagation(),n(!a)}},c.a.createElement("div",{className:"bar"}),c.a.createElement("div",{className:"bar"}),c.a.createElement("div",{className:"bar"})),c.a.createElement("nav",{className:"nav-menu"+(a?" open":"")},c.a.createElement("ul",{className:"menus"},u.map(function(e){return c.a.createElement("li",{className:"menu",key:e.to},c.a.createElement(i.Link,{to:e.to,getProps:s,onClick:o},e.text))}))))),c.a.createElement("section",{id:"mf-header-placeholder"}))};a(86).a&&o.a({dsn:"https://9638de4372be4acebf892d0732a86a4a@sentry.io/1450204"});t.a=function(e){var t=e.children;return c.a.createElement(i.StaticQuery,{query:"755544856",render:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(d,null),c.a.createElement("main",null,t))},data:n})}}}]);
//# sourceMappingURL=component---src-pages-friend-tsx-5d3e3f225778a58efaaa.js.map