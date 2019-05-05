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

我之前写过 [一篇博客](/blog/2019/02/15/how-to-think-in-hooks)，介绍了 Class 组件的各个生命周期钩子函数在 Hooks 中对应的方案。那是 Hooks 刚刚发布，开发者最关心的莫过于代码的迁移问题，也就是怎么把现有的 Class 组件改造成 Hooks 的方式。

尽管这种方式非常的直观有效，但很快我们就开始发现，事情似乎没那么简单。单纯用这个思维来考虑问题，并不能很好地解释 Hooks 的一些行为，比如 `useEffect` 中的变量有时候无法获取最新的值、命令式的事件处理函数也不总是按照我们的预期工作。

在亲自踩了 2 个多月的坑，参与了一些 [React 官网的翻译工作](https://github.com/reactjs/zh-hans.reactjs.org/pull/121)，拜读了 [几篇](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) [博客](https://overreacted.io/a-complete-guide-to-useeffect/) 之后，我豁然醒悟，对「如何 Think in Hooks」有了新的认识。

因此这篇博客，我们来重新 Think in Hooks。

## 欲练此功，必先……忘记过去之所学

Hooks 正确打开方式，
