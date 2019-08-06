---
title: '大白话学习 RxJS'
description: '不用不知道——真香'
tags: ['rxjs']
cover: '../../images/blog/rxjs.jpg'
series: ''
draft: true
original: true
---

## 起源

最早接触 RxJS 的概念是在当初用 Angular 的时候，本着够用就好的原则（毕竟 Angular 本身还有好多知识点），当时并没有去系统地学习 RxJS 这门技术，只知道它是「流式」的概念，数据像水一样流经各种管道，可以像数组一样链式调用一些方法，还有类似订阅者模式的 `subscribe()` 函数。

后来 Angular 英雄末路，React 和 Vue 异军突起，无论 Redux 还是 VueX 都跟 RxJS 没什么关系，我也就没再和 RxJS 有任何交集。直到现在，因为工作原因，团队的技术栈使用了 RxJS，终于再续前缘，正式开始了解这位熟悉的陌生人。

## Why

## Reactive

## 什么叫「可被观察」

## 「观察者」又是谁

## 没错，就是观察者模式

## 对比

| | Function | Iterator / Generator | Promise | Observable |
|-|-|-|-|-|
| 数据获取方式 | 拉取| 拉取 | 推送 | 推送 |
| 随时间返回值数量 | 单个值| 多个值 | 单个值 | 多个值 |
| 同步/异步 | 同步| 同步 | 异步 | 同步 |


### Observable vs. Function

拉取和推送，只能返回单个值 vs 可返回多个值

### Observable vs. Iterator / Generator

同样可返回多个值，拉取和推送的区别

### Observable vs. Promise

同样是推送，只能返回单个值 vs 可返回多个值，同步和异步的区别

## Subject
