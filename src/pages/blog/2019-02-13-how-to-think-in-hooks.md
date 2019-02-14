---
title: '如何 Think in Hooks'
description: '差不多是时候该换换脑子了'
tags: ['react', 'hooks']
cover: '../../images/blog/think-in-hooks.jpg'
series: ''
draft: true
---

## 喜迎 Hooks

正当中国人民还沉浸在过年的忙碌中，在世界的另一头，React 团队的小伙伴们一点也没闲着，他们写了 <a target='_blank' href='https://reactjs.org/blog/2019/02/06/react-v16.8.0.html'>一篇博客</a> ，并借此正式发布了 Hooks —— 一个官方宣传了好久、开发者们也期待了好久的新特性。

Hooks 正式发布于 v16.8.0，但由于官方团队的 <a target='_blank' href='https://reactjs.org/blog/2018/12/19/react-v-16-7.html'>一点点小失误</a>，在 v16.7.0-alpha.1 中就已经包含了 Hooks 的部分代码。好在 Dan Abramov 之前在 React Conf 上一再强调这还只是实验特性，API 随时有可能会改，欢迎早期反馈，但不建议用于生产环境；官方在出事后也及时发文说明了事情的原委，并表示“以后注意”。算是一个小插曲吧，无伤大雅。

## 稳住，别急

最近把 Hooks 部分的文档通读了一遍，加上去年 React Conf 上几个关于 Hooks 的演讲，对 Hooks 的概念及用法有了基本的了解。

作为可能是 React 继 Fiber 之后最大的改变，官方团队真的是慎之又慎。下面这些话摘自 React 官方文档中关于 Hooks 的部分：

> You don’t have to learn Hooks right now.
>
> 你不必现在就学习 Hooks。

> There is no rush to migrate to Hooks. It takes a bit of a mindshift to start “thinking in Hooks”.
>
> 不用着急马上迁移到 Hooks，开始“以 Hooks 的方式思考”需要一点点思维上的转变。

> It is an early time for Hooks, and some third-party libraries might not be compatible with Hooks at the moment.
>
> Hooks 目前尚处于早期阶段，一些第三方库目前可能还不兼容 Hooks。

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

1. Hooks 是可选的，老代码不用改。
2. Hooks 的概念很新，别着急用。
3. 放心，Class 还在。（至少短期内）

## 迁移到 Hooks

相信大部分人在学习 Hooks 时都想过：我已经有一个函数组件 / class 组件了，要怎么把它改造成用 Hooks 实现呢？这个弯要是转不过来，后面的事情就很难办了。

Hooks 的方案，可以简单理解为把 class 独有的东西全都整合到函数组件中去，最终让所有组件变成函数，主要涉及几个方面：

### state

定义一个组件时，到底应该用函数还是用 Class，这是过去大家一致非常关心的问题，最核心的一点就是：组件是否包含 state。

Hooks 通过 `useState()` 把 state 引进了函数，并且相比在 Class 中的语法还更加简洁。

### 生命周期

使用 Class 的另一个原因就是生命周期函数，Hooks 去掉了生命周期函数，改为用 `useEffect()` 等方法实现。因此如何我们能够给每个生命周期函数都找到对应的解决办法，问题不就解决了嘛。让我们按照这个思路来试一下：

> 这里我们只考虑 React 16 开始的新的生命周期方法，`UNSAFE_` 开头的方法由于要被废除了，就不再讨论了。

#### 1. `componentDidMount`、`componentDidUpdate`

这两个方法都是紧跟在 render 之后触发，区别在于一个仅在第一次，一个在后续每一次都触发。只要能够区分这一点，那就可以把这两个方法合并到一起，通过一个 `useEffect()` 实现。

#### 2. `componentWillUnmount`



#### `getDerivedStateFromProps`

用update

#### `shouldComponentUpdate`

`React.memo(renderFn, compareFn)`

#### `getSnapshotBeforeUpdate`、`componentDidCatch`

暂无，会有

### `forceUpdate`

严格说来，这个函数不属于生命周期，但 React 保留了这个函数，用于在实在没办法的情况下强制触发一次 update。

Hooks 目前还没有针对这两个生命周期函数的替代方案

## 为什么要用 Hooks？是 Class 不行了吗？

这点在官方文档中 <a target='_blank' href='https://reactjs.org/docs/hooks-intro.html#motivation'>Motivation</a> 一节解释得很清楚。

### 组件间难以复用逻辑。

渲染属性（Render Props）、高阶组件（High-Order Component）组件之间层层嵌套过深，形成包裹器地狱（wrapper hell）。

### 互相关联的逻辑被拆散至不同地方，维护不便。