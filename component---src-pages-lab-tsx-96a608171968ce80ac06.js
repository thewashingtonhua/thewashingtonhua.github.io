(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{210:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return s});var n=a(0),r=a.n(n),o=a(89),c=a(225),i=a(223),l=(a(283),[{category:"Browser",url:"/lab/browser-ua",title:"User Agent"},{category:"Browser",url:"/lab/browser-viewport",title:"Viewport"},{category:"HTML5",url:"/lab/html5-canvas",title:"Canvas"},{category:"HTML5",url:"/lab/html5-geolocation",title:"Geolocation"},{category:"HTML5",url:"/lab/html5-input",title:"Input Type"},{category:"HTML5",url:"/lab/html5-connection",title:"Connection"},{category:"HTML5",url:"/lab/html5-online",title:"Online"}]);t.default=function(e){var t=e.data,a=Array.from(new Set(l.map(function(e){return e.category})));return r.a.createElement(c.a,null,r.a.createElement(i.a,{title:"实验室",keywords:t.site.siteMetadata.keywords}),r.a.createElement("div",{className:"mf-content lab-catalog"},a.map(function(e){return r.a.createElement(n.Fragment,{key:e},r.a.createElement("h1",null,e),r.a.createElement("div",{className:"category"},l.filter(function(t){return t.category===e}).map(function(e){return r.a.createElement(o.Link,{key:e.url,className:"item",to:e.url},e.title)})))})))};var s="3336653186"},220:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=!0},221:function(e){e.exports={data:{site:{siteMetadata:{title:"童话说"}}}}},222:function(e,t,a){e.exports=a.p+"static/logo-8503f6989dba3ce27939964a48c8b787.png"},223:function(e,t,a){"use strict";var n=a(224),r=a(0),o=a.n(r),c=a(231),i=a.n(c),l=a(89);t.a=function(e){var t=e.description,a=void 0===t?"":t,r=e.lang,c=void 0===r?"zh":r,u=e.meta,m=void 0===u?[]:u,d=e.keywords,p=void 0===d?[]:d,f=e.title,g=void 0===f?"":f,y=e.exactTitle,v=void 0!==y&&y;return o.a.createElement(l.StaticQuery,{query:s,render:function(e){var t=a||e.site.siteMetadata.description;return o.a.createElement(i.a,{htmlAttributes:{lang:c},title:g,titleTemplate:v?"":"%s | ".concat(e.site.siteMetadata.title),meta:[{name:"description",content:t},{property:"og:title",content:g},{property:"og:description",content:t},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:g},{name:"twitter:description",content:t}].concat(p.length>0?{name:"keywords",content:p.join(",")}:[]).concat(m)})},data:n})};var s="1025518380"},224:function(e){e.exports={data:{site:{siteMetadata:{title:"童话说",description:"Washington Hua 的个人博客，专注大前端技术",author:"Washington Hua"}}}}},225:function(e,t,a){"use strict";var n=a(221),r=a(0),o=a.n(r),c=a(89),i=a(294),l=(a(228),a(229),a(90)),s=a(222),u=a.n(s),m=(a(230),[{to:"/blog",text:"博客"},{to:"/project",text:"代表作"},{to:"/lab",text:"实验室"},{to:"/friend",text:"朋友"},{to:"/recruit",text:"招人"},{to:"/about",text:"我"}]),d=function(){var e=Object(r.useState)(!1),t=Object(l.a)(e,2),a=t[0],n=t[1];function i(e){e&&e.stopPropagation(),n(!1)}function s(e){return e.isPartiallyCurrent?{className:"menu-link active"}:{className:"menu-link"}}return o.a.createElement(o.a.Fragment,null,o.a.createElement("header",{id:"mf-header"},o.a.createElement("div",{className:"mf-header-wrapper"},o.a.createElement(c.Link,{to:"/",className:"logo"},o.a.createElement("img",{src:u.a,alt:""}),o.a.createElement("span",null,"童话说")),o.a.createElement("div",{className:"hamberger"+(a?" open":""),onClick:function(e){e&&e.stopPropagation(),n(!a)}},o.a.createElement("div",{className:"bar"}),o.a.createElement("div",{className:"bar"}),o.a.createElement("div",{className:"bar"})),o.a.createElement("nav",{className:"nav-menu"+(a?" open":"")},o.a.createElement("ul",{className:"menus"},m.map(function(e){return o.a.createElement("li",{className:"menu",key:e.to},o.a.createElement(c.Link,{to:e.to,getProps:s,onClick:i},e.text))}))))),o.a.createElement("section",{id:"mf-header-placeholder"}))};a(220).a&&i.a({dsn:"https://9638de4372be4acebf892d0732a86a4a@sentry.io/1450204"});t.a=function(e){var t=e.children;return o.a.createElement(c.StaticQuery,{query:"755544856",render:function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(d,null),o.a.createElement("main",null,t))},data:n})}}}]);
//# sourceMappingURL=component---src-pages-lab-tsx-96a608171968ce80ac06.js.map