---
title: '小剧透'
description: 'Web 版「剧情连拍」'
cover: '../../images/project/blank.jpg'
from: '2019-06-01'
to: '2019-07-01'
category: 'personal'
draft: true
---

# The · Spoiler「小剧透」

## 简介

FBC 会员服务 Web App，设计用于微信端，会员可通过该 App 进行会议室预约、吧台自助消费等会员服务。

基于 Vue 2.x 开发的 SPA，基于 Axios 封装了 HTTP 客户端，使用 SCSS + PostCSS 编写样式，使用 Karma + Mocha 进行单元测试，使用 Webpack 进行构建，使用 ESLint 统一代码风格。

项目整体量级较轻，交互也不复杂，因此我并没有采用 Vuex，而是直接使用 LocalStorage 来进行数据缓存。利用 `<transition>` 组件实现路由切换时的动效，模拟了原生 App 的页面切换逻辑。利用 Webpack 的 Code Split 特性实现了组件的异步加载，优化加载时间。

## 周期

2019 年 6 月 - 2019 年 7 月

## 相关链接

[线上地址](http://app.futurebusinesslab.com/wap)


## 项目截图
![项目截图](../../images/project/thumb/unreleased.jpg)
