---
title: 'Think in Hooks, Again'
description: '忘记过去之所学，我们从头来过'
tags: ['react', 'hooks']
cover: '../../images/blog/think-in-hooks-again.jpg'
series: ''
draft: true
original: true
---

## Again？Why？

在 Hooks 刚刚发布之际，官方曾明确表示：

1. 我们不打算移除 Class。（至少短期内不会）。
2. 大家也不用着急现在就迁移到 Hooks（毕竟变化很大，给大家适应的时间）
3. 但未来是属于 Hooks 的。（所以最终你还是会迁移到 Hooks）

因此在这个阶段，大家最关心的问题，就是怎么把现有的 Class 组件改造成 Hooks 的方式。我之前写过 [一篇博客](/blog/2019/02/15/how-to-think-in-hooks)，讲的就是 Class 组件的各个生命周期在 Hooks 中对应的方案。

在亲自踩了 1 个多月的坑，并且掺和了一脚 [React 官网的翻译工作](https://github.com/reactjs/zh-hans.reactjs.org/pull/121) 之后，我发现，事情似乎没那么简单。单纯用这个思维来考虑问题，并不能很好地解释 Hooks 的一些行为，比如 `useEffect` 中的变量没有按预期的方式去更新、命令式与声明式的冲突等。

相信 React 的老用户们对 overreacted.io 这个网站都已经非常熟悉了，这是 React 核心开发者 Dan Abramov 的个人博客，博客内容主要围绕 React 的一些深入解读，是除了官网之外，了解 React 的最佳去处。近期 Dan 更新了 [几篇](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) [博客](https://overreacted.io/a-complete-guide-to-useeffect/)，拜读之后，我豁然醒悟，对「如何 Think in Hooks」有了新的认识。

## 欲练此功，必先……忘记过去之所学

Hooks 正确打开方式，
