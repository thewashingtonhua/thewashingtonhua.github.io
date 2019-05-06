---
title: '重新 Think in Hooks'
description: '忘记过去之所学，我们从头来过'
tags: ['react', 'hooks']
cover: '../../images/blog/think-in-hooks-again.jpg'
series: ''
draft: true
original: true
---

## 为什么要重新来过？

我之前写过 [一篇博客](/blog/2019/02/15/how-to-think-in-hooks)，介绍了 Class 组件的各个生命周期钩子函数在 Hooks 中对应的方案。那时 Hooks 刚刚发布，开发者最关心的莫过于代码的迁移问题，也就是怎么把现有的 Class 组件改造成 Hooks 的方式。

尽管这种方式非常的直观有效，但很快我们就发现，事情似乎没那么简单。单纯用这个思维来考虑问题，并不能很好地解释 Hooks 的一些行为，比如 `useEffect` 中的变量有时候无法获取最新的值、命令式的回调函数也不总是按照我们的预期工作，`useEffect` 的依赖数组好像总是缺点什么。

在亲自踩了 2 个多月的坑，参与了一些 [React 官网的翻译工作](https://github.com/reactjs/zh-hans.reactjs.org/pull/121)，拜读了 [几篇](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) [非常好的](https://overreacted.io/react-as-a-ui-runtime/) [博客](https://overreacted.io/a-complete-guide-to-useeffect/) 之后，我豁然醒悟，对「如何 Think in Hooks」有了新的认识。

因此这篇博客，我们来「重新 Think in Hooks」。

## 当我们讨论 Hooks 时，我们到底在讨论什么？

要理解 Hooks，我们得先回到 Hooks 的本质 —— 一种逻辑复用的方式。

Hooks 并不是新的组件类型，当我们讨论 Hooks 时，我们讨论的其实是函数组件 —— 就是那种没有 state、没有生命周期、只是根据 props 返回相应的 JSX 的函数。Hooks 的出现让函数组件可以拥有和 Class 组件一样可以拥有 state（是可以，不是必须），相应的也就有了生命周期。因此确切的说，我们是在讨论使用了 Hooks 的函数组件。

但是「使用了 Hooks 的函数组件」这个词太长了，而下文我又将经常提到这个词，所以在后面的文字中，我将简单用 Hooks 来表示。

## 欲练此功，必先……忘记过去之所学

当我们在使用 Class 组件时，每当 props 或 state 有更新，只有 `render()` 函数会重新执行，其它成员函数（生命周期函数除外）并不会因此而重新执行。这个逻辑放到 Hooks 里是行不通的，这也是很多问题产生的根源。Hooks 基本上就是一个渲染函数。每次更新都会

## 小结

当初第一次看到官方文档中的「It takes a bit of a mindshift to start “thinking in Hooks”」这句话，我并没有太当回事，觉得无非就是有一样新东西要学而已。
