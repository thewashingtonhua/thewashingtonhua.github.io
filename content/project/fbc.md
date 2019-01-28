# FBC

## 简介

FBC 会员服务 Web App，设计用于微信端。

使用 Vue 2.x + vue-router 开发的 SPA，基于 Axios 封装了 HTTP 客户端，使用 SCSS + PostCSS 编写样式，使用 Karma + Mocha 进行单元测试，使用 Webpack 进行构建，使用 ESLint 统一代码风格。

项目整体量级较轻，交互也不复杂，因此我并没有采用 Vuex，而是直接使用 LocalStorage 来进行数据缓存。利用 <transition> 组件实现路由切换时的动效，模拟了原生 App 的页面切换逻辑。利用 Webpack 的 Code Split 特性实现了组件的异步加载，优化首次加载性能。

## 周期

2017 年 4 月 - 2017 年 6 月

## 技术栈
<div class="stacks">
  <div class="stack fix-ratio ratio-1-1 icon icon-html5" title="HTML5"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-css3" title="CSS3"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-javascript" title="JavaScript"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-es" title="ECMAScript 2015+"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-vue" title="vue"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-sass" title="SASS"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-karma" title="Karma"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-mocha" title="Mocha"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-webpack" title="webpack"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-yarn" title="Yarn"></div>
  <div class="stack fix-ratio ratio-1-1 icon icon-eslint" title="ESLint"></div>
</div>

## 相关链接

线上地址：<a target="_blank" href="http://app.futurebusinesslab.com/wap">这里</a>


## 项目截图
![项目截图](../images/project/fbc/screenshot.jpg)