---
title: '说起 React 的生命周期，你或许还不知道……'
description: '事情好像没那么简单'
tags: ['react', 'lifecycle']
cover: '../../images/blog/react-lifecycle.jpg'
series: ''
draft: true
original: true
---

## 写在前面

React 组件的生命周期，相信大家都非常熟悉了，无非那么几个函数，官方文档也都写得非常清楚了。

那还有什么好说的？这么基础的东西。

一般我们所知道的，只是单个组件的生命周期。如果是父子组件呢？各个周期怎么走？同步路由呢？异步路由呢？前阵子新出的 Hooks 呢？有几个人敢站出来说我全知道的？（反正我是不敢）

刚好也是最近遇到一些关于生命周期的问题，项目涉及到大量的异步操作，需要清楚地知道各部分的执行顺序。正好借此机会整理一下。

## 父子组件

子组件先 didMount，父组件再 didMount

## 同步路由

父路由先 didMount，子路由再 didMount

## 异步路由

父路由先 didMount，子路由再 didMount

## Hooks

严格说来 Hooks 并不是组件，只是一种代码复用逻辑。这里讨论的本体是函数式组件。

函数式组件的生命周期和 Class 不太一样，它没有生命周期钩子函数，只管执行函数。

具体到 Hooks 相关的部分，主要就是 useEffect、useLayout 的调用时机的问题。
