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

React 组件的生命周期，相信大家都非常熟悉了，无非那么几个函数，官方文档已经写得非常清楚了。

（那还有什么好说的？这么基础的东西，合上！）

一般我们所讨论的，都是单个组件的生命周期。如果是父子组件呢？各个周期又是什么样的？异步路由的情况呢？前阵子新出的 Hooks 呢？有几个人敢站出来说我全知道的？（反正我是不敢）

刚好也是最近遇到一些关于生命周期的问题，项目中涉及到大量的异步操作，需要清楚地知道各部分的执行顺序，正好借此机会整理一下。

## 那么我们就来做个实验吧

为了一探究竟，我写了一个 [Demo](https://tonghuashuo.github.io/react-lifecycle) 来模拟一些常见的用例，主要研究下面这几个问题：

- 父子组件各阶段的执行顺序
- 异步路由对加载顺序是否有影响
- Hooks 的生命周期


## TL,DR;

我知道大家时间都很宝贵，赶时间的朋友可以直接看结论，细节我们放到后面讲：

1. 父组件 `render` 时创建子组件
    1. 同步路由，子组件 `didMount` 之后，父路由才算 `didMount`。
    2. 异步路由，父路自己先 `didMount`，然后才会开始创建子路由的内容。
    3. Hooks 的加载过程并无例外，但是 Effect 会在父组件 `didMount` / `didUpdate` 之后执行。
2. 父组件更新导致子组件更新时：
    1. 子组件 `getSnapshotBeforeUpdate` 之后，并不是直接进入到自身的 `didUpdate`，而是先触发父组件的 `getSnapshotBeforeUpdate`。
    2. 上述过程之后，子组件先 `didUpdate`，然后才是父组件 `didUpdate`。
3. 组件切换的具体过程：
    1. 父组件触发更新过程，执行 `getDerivedStateFromProps` 和 `render`.
    2. 在父组件的 `getSnapshotBeforeUpdate` 之前调用新子组件的 render.
    3. 在父组件的 `getSnapshotBeforeUpdate` 之后，`componentDidUpdate` 之前，卸载旧的子组件。
    4. 如果新组件使用了 useEffect，在父组件 `componentDidUpdate` 之后执行 Effect。

## 同步路由

子组件先 didMount，父组件再 didMount

## 异步路由

父路由先 didMount，子路由再 didMount

## Hooks

确切地说，Hooks 并不是一种新的组件写法，它只是一种代码复用的方式。这里讨论的本体其实是函数式组件。

在 Hooks 之前，函数式组件是没有 state 的概念的，因此也就不存在生命周期一说，调用的时候只管执行就完了。但伴随着 Hooks 的到来，函数式组件也拥有了 state，因此讨论函数式组件的生命周期也便成了新的研究对象。

> 严格说来，函数式组件本质是函数，「函数」是没有生命周期的，Hooks 的出现也并没有改变这一原理。这里我们讨论的是「组件」，「组件」是可以有生命周期的。

函数式组件的生命周期和 Class 不太一样，它没有生命周期钩子函数，只管执行函数。

具体到 Hooks 相关的部分，主要就是 useEffect、useLayout 的调用时机的问题。
