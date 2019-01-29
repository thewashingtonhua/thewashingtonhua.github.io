---
title: '新阅'
description: '在线视频协作平台'
cover: '../images/project/thumb/xinyue.jpg'
from: '2017-08-01'
to: '2017-10-01'
---

# 新阅

## 简介

一个专为视频行业设计的在线协同平台。

该项目使用 React 全家桶进行开发，我作为前端技术负责人带领同事共同开发。项目其中一个功能点为对视频关键帧进行手绘标注，并支持撤销/重绘等操作，还有出血线、画面比例预览等功能，我们通过创建多个离屏 Canvas 进行绘图，在实现各功能的同时，确保各组件的性能得到保障。我们通过 Redux 记录绘制历史实现 Time Travel。我们还自定义了一款视频播放器，以满足项目中的一些自定义功能，除了常规的播放控制，还实现了清晰度切换、悬浮进度条显示视频预览、多格式时间码等功能。为实现文件管理，我们在前端实现了一整套的文件系统，包括完整的目录结构、自定义右键菜单、拖拽操作、键鼠配合的快捷操作等。

项目严格按照 React 官方文档推荐的方式进行组件化开发，使用 PropTypes 配合 Flow 进行类型检查。使用 standard.js 来统一开发组成员之间的代码风格。使用高阶组件和函数式组件来优化结构，借助 shouldComponentUpdate 函数精简不必要的渲染。样式方面以 SCSS 为主，配合 PostCSS 补齐兼容代码，部分公共组件，如 Tooltip、Dropdown、Toast 等尝试性地使用了 CSS Modules 技术。

项目充分利用 ES2015+ 语法的新特性，自行封装了基于 fetch 的 HTTP 客户端。使用 Yarn 进行依赖管理，Webpack 进行构建，Gulp 进行自动化部署，Git 进行版本控制。

## 周期

2017 年 8 月 - 2017 年 10 月

## 相关链接

线上地址：<a target="_blank" href="https://www.uxinyue.com">这里</a>

## 项目截图

![截图](../images/project/xinyue/screenshot.jpg)