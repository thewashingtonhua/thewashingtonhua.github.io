---
title: '如何 Think in Hooks'
description: '来吧，换换脑子'
tags: ['react', 'hooks']
cover: '../../images/blog/think-in-hooks.jpg'
series: ''
draft: true
---

## 喜迎 Hooks

正当中国人民还沉浸在过年的忙碌中，在世界的另一头，React 团队的小伙伴们一点也没闲着，他们写了 <a target='_blank' href='https://reactjs.org/blog/2019/02/06/react-v16.8.0.html'>一篇博客</a> ，并借此正式发布了 Hooks —— 一个官方宣传了好久、开发者们也期待了好久的新特性。

Hooks 正式发布于 v16.8.0，但由于官方团队的 <a target='_blank' href='https://reactjs.org/blog/2018/12/19/react-v-16-7.html'>一点点小失误</a>，在 v16.7.0-alpha.1 中就已经包含了 Hooks 的部分代码。好在 Dan Abramov 之前在 React Conf 上一再强调这还只是实验特性，API 随时有可能会改，欢迎早期反馈，但不建议用于生产环境；官方在出事后也及时发文说明了事情的原委，并表示“以后注意”。算是一个小插曲吧，无伤大雅。

## 别急，慢慢来

最近把 Hooks 部分的文档通读了一遍，加上去年 React Conf 上几个关于 Hooks 的演讲，对 Hooks 的概念及用法有了基本的了解。

作为可能是 React 继 Fiber 之后最大的改变，官方团队真的是慎之又慎。下面这些话摘自 React 官方文档中关于 Hooks 的部分：

> You don’t have to learn Hooks right now.
>
> 你不必现在就学习 Hooks。

> There is no rush to migrate to Hooks. It takes a bit of a mindshift to start “thinking in Hooks”.
>
> 不用着急马上迁移到 Hooks，开始“以 Hooks 的方式思考”需要一点点思维上的转变。

> We intend for Hooks to cover all existing use cases for classes, but we will keep supporting class components for the foreseeable future.
>
> 我们计划让 Hooks 覆盖 class 的所有现有使用场景，但在可见的未来里我们还是会继续支持 class 组件。

> There are no plans to remove classes from React.
>
> 我们不打算把 class 从 React 中移除。

> Conceptually, React components have always been closer to functions.
>
> 从概念上讲，React 组件一直以来都更接近函数。

类似的表述在官方文档中随处可见。可以看出，官方对 Hooks 的态度非常明确：***未来是属于 Hooks 的***。

但路得一步一步走，官方对开发者也是一再表示：

1. Hooks 是可选的，老代码不用动。
2. Hooks 的概念很新，别着急用。
3. 放心，Class 还在。（至少短期内）