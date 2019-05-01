---
title: '如何 Think in Hooks'
description: '差不多是时候该换换脑子了'
tags: ['react', 'hooks']
cover: '../../images/blog/think-in-hooks.jpg'
series: ''
draft: false
original: true
---

## 喜迎 Hooks

正当中国人民还沉浸在过年的忙碌中，在世界的另一头，React 团队的小伙伴们一点也没闲着，他们写了 <a target='_blank' href='https://reactjs.org/blog/2019/02/06/react-v16.8.0.html'>一篇博客</a> ，并借此正式发布了 Hooks —— 一个官方宣传了好久、开发者们也期待了好久的新特性。

Hooks 正式发布于 v16.8.0，但由于官方团队的 <a target='_blank' href='https://reactjs.org/blog/2018/12/19/react-v-16-7.html'>一点点小失误</a>，在 v16.7.0-alpha.1 中就已经包含了 Hooks 的部分代码。好在 Dan Abramov 之前在 React Conf 上一再强调这还只是实验特性，API 随时有可能会改，欢迎早期反馈，但不建议用于生产环境；官方在事后也及时发文说明了原委，并表示“以后注意”。算是一个小插曲吧，无伤大雅。

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

### 1. state

定义一个组件时，到底应该用函数还是用 Class，这是过去大家一直非常关心的问题，最核心的一点就是：组件是否包含 state。

Hooks 通过 `useState()` 把 state 引进了函数，并且相比在 Class 中的语法还更加简洁。

### 2. 生命周期

使用 Class 的另一个原因就是生命周期函数，Hooks 去掉了生命周期函数，改为用 `useEffect()` 等方法实现。因此如果我们能够给每个生命周期函数都找到对应的解决办法，问题不就解决了嘛。让我们按照这个思路来试一下：

> 这里我们只讨论 React 16 开始的新的生命周期方法，`UNSAFE_` 开头的方法由于要被废除了，就不再讨论了。

#### 2.1. `componentDidUpdate()`

Hooks 使用 `useEffect(callback[, depends])` 替代 `componentDidUpdate()` 来处理“副作用（Side Effect，简称 Effect）”。

Effect 会在每次 render 完成之后被执行，刚好就是 `componentDidUpdate()` 触发的时机。可以在 callback 中通过条件判断来决定具体要执行哪些逻辑，也可以通过 `useEffect()` 的第二个参数，传入一个数组，数组中放入需要检查的属性，只有当数组里的属性和上一次不同时，callback 才会被执行。

Hooks 的设计目的之一，就是让相关的逻辑靠得更近，让不相关的逻辑独立开来，因此如果组件中包含有多种不同的副作用，最好交给不同的 `useEffect()` 去处理。

#### 2.2. `componentDidMount()`

`componentDidMount()` 同样也用于处理副作用，因此也是通过 `useEffect()` 实现。

`componentDidMount()` 和 `componentDidUpdate()` 都是在 render 之后被触发，最大的不同在于前者仅在第一次触发，后者从第二次开始往后都会触发。因此只要能够区分触发的时机，就能够用同样的函数来完成两个阶段的任务。

> Instead of thinking in terms of “mounting” and “updating”, you might find it easier to think that effects happen “after render”.
>
> 不用纠结“挂载”还是“更新”，你只需要简单认为“副作用发生在 render 之后”就好了。

只需要在第二个参数位置传入一个空数组，告知该 Effect 不依赖任何属性的变化，即可将其和 `componentDidUpdate()` 区分开来。

同样的，不同的副作用应该交给不同的 `useEffect()` 去处理。

#### 2.3. `componentWillUnmount()`

`useEffect()` 默认不需要返回任何东西，但如果你希望某个副作用在下一次执行之前先做点什么（比如清理一些旧数据），可以在 `useEffect()` 的 callback 中返回一个 cleanup 函数，在这个函数中定义的内容会在 Effect 下一次被调用之前执行。

如果此时 `useEffect()` 的第二个参数刚好是个空数组，那么就只会在组件销毁时被触发，起到 `componentWillUnMount()` 的作用，否则就相当于是 `componentDidUpdate()` 的一部分。

#### 2.4. `getDerivedStateFromProps()`

在 Hooks 的设计中，是没有这个环节的，相关逻辑全部通过用 `useEffect()` 触发 update 来实现。

#### 2.5. `shouldComponentUpdate()`

函数式组件可以使用 `React.memo(renderFn, areEqualFn)` 来进行性能优化。

`React.memo()` 默认相当于 `React.PureComponent`，通过对 props 进行浅比较来决定是否要更新。但我们可以通过其中的 `areEqualFn` 来自定义判断的方式，起到 `shouldComponentUpdate()` 的作用。

需要注意的是， `areEqualFn` 如果返回 true 表示两次的 props 相同，不更新，这一点和 `shouldComponentUpdate()` 刚好相反。从函数命名上也能看出来。

另外，由于 `React.memo()` 仅适用于函数式组件，因此只比较 props，不比较 state。

#### 2.6. `getSnapshotBeforeUpdate()`、`componentDidCatch()`

目前还没有针对这两个生命周期函数的替代方案，但官方表示未来会有的。

前者用的比较少，影响不大；后者意味着 Error Boundary 在 Hooks 中暂时还用不了，不过如果组件设计的合理的话，不用也没问题。

#### 2.7. `forceUpdate()`

严格说来，这个函数不属于生命周期，但是因为和生命周期息息相关，所以放了进来。

React 保留了这个函数，用于在实在没办法的情况下强制触发一次 update。注意使用时候前面不用加 `this.`，直接调用即可。

## Thinking in Hooks

除了语法上的变化，Hooks 在代码设计思想上也有不小的变化。如果你已经决定要开始使用 Hooks，那么有些观念需要转变一下：

### 1. 用自定义 Hook 代替 Render Props 和 HOC

在 Hooks 出现之前，想要在组件之间复用一段逻辑通常会使用 Render Props 和 High-Order Component 来解决。

在 React “一切皆组件”的思想下，我们早已习惯了这样的思维模式。与此同时，我们也习惯了另一件事：包裹器地狱（wrapper hell），组件层层嵌套，子子孙孙无穷无尽。

Hooks 通过自定义 Hook 把可复用的逻辑抽取出来，成为一个普通函数。组件间复用逻辑就像复用一个工具函数一样。

### 2. 按业务逻辑拆分代码，而不是生命周期

在 Class 中，我们按生命周期来拆分代码，这就导致一些紧密相关的业务被拆分到不同函数中，同一函数中可能包含了多个不相关的业务。

从计算机的角度，生命周期固然非常重要，必须熟练掌握；但从写代码的目的来看，业务逻辑才是我们关心的重点。

Hooks 把代码按照业务逻辑的相关性进行拆分，把同一业务的代码集中在一起，不同的业务的代码独立开来，维护起来就清楚很多。

## 最后

Hooks 从设计思路上讲，确实会比 Class 更符合直觉一点。具体在使用上还会不会有别的坑，等大家再使用一段时间看看吧。

Happy Hooking !