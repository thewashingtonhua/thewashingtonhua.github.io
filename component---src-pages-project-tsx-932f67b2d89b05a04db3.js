(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{c8up:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return m}));var r=a("q1tI"),n=a.n(r),l=a("Wbzz"),c=a("Nhdc"),i=(a("3XvI"),a("40ji")),o=a("LeJ0");t.default=function(e){var t=e.data,a=t.allMarkdownRemark.edges.map((function(e){return e.node})).filter((function(e){return e.fields.type===i.a.project})).filter((function(e){return!o.a||!e.frontmatter.draft})).sort((function(e,t){return new Date(t.frontmatter.from).getTime()-new Date(e.frontmatter.from).getTime()})),m=a.filter((function(e){return"commercial"===e.frontmatter.category})),u=a.filter((function(e){return"personal"===e.frontmatter.category})),f=[];m.length&&f.push({title:"商业作品",data:m}),u.length&&f.push({title:"个人作品",data:u});var s=f.map((function(e){return e.data.length})).reduce((function(e,t){return e+t}),0);return n.a.createElement(c.a,null,n.a.createElement(c.b,{title:"项目",keywords:t.site.siteMetadata.keywords}),n.a.createElement("div",{className:"mf-content project-catalog"},n.a.createElement("h1",{className:"title"},"代表作 (",s,")"),f.map((function(e){return n.a.createElement(r.Fragment,{key:e.title},n.a.createElement("h2",{className:"project-category-title"},e.title," (",e.data.length,")"),n.a.createElement("div",{className:"project-list"},e.data.map((function(e){var t,a=null===(t=e.frontmatter.cover)||void 0===t?void 0:t.publicURL;return n.a.createElement(l.Link,{className:"project"+(e.frontmatter.draft?" draft":""),to:e.fields.slug,key:e.fields.slug,id:e.fields.id},n.a.createElement("div",{className:"cover"},n.a.createElement("img",{src:a,alt:""})),n.a.createElement("div",{className:"intro"},n.a.createElement("h2",null,e.frontmatter.title),n.a.createElement("p",null,e.frontmatter.description)))}))))}))))};var m="1735142204"}}]);
//# sourceMappingURL=component---src-pages-project-tsx-932f67b2d89b05a04db3.js.map