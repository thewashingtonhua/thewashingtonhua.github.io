(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{153:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return s});var n=a(0),r=a.n(n),i=a(55),o=a(174),c=a(172);a(192);t.default=function(e){var t=e.data,a=t.markdownRemark;return r.a.createElement(o.a,null,r.a.createElement(c.a,{title:a.frontmatter.title+" | 代表作",keywords:t.site.siteMetadata.keywords}),r.a.createElement("div",{className:"mf-content project-detail"},r.a.createElement("p",{className:"back-to-parent"},r.a.createElement(i.Link,{to:"/project"},"« 回到项目列表")),r.a.createElement("article",{className:"content",id:"project__"+a.fields.id,dangerouslySetInnerHTML:{__html:a.html}})))};var s="1825693558"},170:function(e){e.exports={data:{site:{siteMetadata:{title:"童话说"}}}}},171:function(e,t,a){e.exports=a.p+"static/logo-8503f6989dba3ce27939964a48c8b787.png"},172:function(e,t,a){"use strict";var n=a(173),r=a(0),i=a.n(r),o=a(1),c=a.n(o),s=a(178),l=a.n(s),m=a(55);function u(e){var t=e.description,a=e.lang,r=e.meta,o=e.keywords,c=e.title,s=e.exactTitle;return i.a.createElement(m.StaticQuery,{query:d,render:function(e){var n=t||e.site.siteMetadata.description;return i.a.createElement(l.a,{htmlAttributes:{lang:a},title:c,titleTemplate:s?"":"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:c},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:c},{name:"twitter:description",content:n}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:n})}u.defaultProps={lang:"zh",meta:[],keywords:[]},u.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.array,keywords:c.a.arrayOf(c.a.string),title:c.a.string.isRequired},t.a=u;var d="1025518380"},173:function(e){e.exports={data:{site:{siteMetadata:{title:"童话说",description:"Washington Hua 的个人博客，专注大前端技术",author:"Washington Hua"}}}}},174:function(e,t,a){"use strict";var n=a(170),r=a(0),i=a.n(r),o=a(1),c=a.n(o),s=a(55),l=a(8),m=a.n(l),u=a(171),d=a.n(u),p=(a(175),function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).menus=[{to:"/blog",text:"博客"},{to:"/project",text:"代表作"},{to:"/lab",text:"实验室"},{to:"/friend",text:"朋友"},{to:"/about",text:"我"}],t.state={navMenuOpen:!1},t.toggle=function(e){e&&e.stopPropagation(),t.setState({navMenuOpen:!t.state.navMenuOpen})},t.close=function(e){e&&e.stopPropagation(),t.setState({navMenuOpen:!1})},t.isMenuActive=function(e){return e.isPartiallyCurrent?{className:"menu active"}:{className:"menu"}},t}return m()(t,e),t.prototype.render=function(){var e=this,t=this.state.navMenuOpen;return i.a.createElement(i.a.Fragment,null,i.a.createElement("header",{id:"mf-header"},i.a.createElement("div",{className:"mf-header-wrapper"},i.a.createElement(s.Link,{to:"/",className:"logo"},i.a.createElement("img",{src:d.a,alt:""}),i.a.createElement("span",null,"童话说")),i.a.createElement("div",{className:"hamberger"+(t?" open":""),onClick:this.toggle},i.a.createElement("div",{className:"bar"}),i.a.createElement("div",{className:"bar"}),i.a.createElement("div",{className:"bar"})),i.a.createElement("nav",{className:"nav-menu"+(t?" open":"")},i.a.createElement("div",{className:"menus"},this.menus.map(function(t){return i.a.createElement(s.Link,{key:t.to,to:t.to,getProps:e.isMenuActive,onClick:e.close},t.text)}))))),i.a.createElement("section",{id:"mf-header-placeholder"}))},t}(r.PureComponent)),f=(a(176),a(177),function(e){var t=e.children;return i.a.createElement(s.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(p,null),i.a.createElement("main",null,t))},data:n})});f.propTypes={children:c.a.node.isRequired};t.a=f}}]);
//# sourceMappingURL=component---src-templates-project-detail-js-5fc7c20145e54fe136f4.js.map