---
title: 'Observable？真香！'
description: '不用不知道，一用是真香'
tags: ['rxjs']
cover: '../../images/blog/rxjs.jpg'
series: ''
draft: true
original: true
---

## 起源

久闻 Observable 的大名，但一直也没有特别强烈的意愿去深入了解它。直到最近，因为工作的关系正式接触到了这项技术。不用不知道，用过都说香。

## 说明

1. 本文并不是 Observable 的教程，想系统学习 Observable 的同学还请移步各大官网。
2. 本文基于 RxJS 的 API 讨论 Observable 在 JavaScript 中的应用，其他语言的实现在细节上可能有所不同，但不属于本文的讨论范围。

## 关于 RxJS 的版本

截止发稿时，RxJS 的最新稳定版是 6.5.3，其相比上个版本引入了不少的 Breaking Change，语法上也有较大差异，这里特别申明一下。

新版本在核心概念上没有本质的变化，但是对语法进行了统一，新语法也更加符合 ECMAScript 本身的发展方向，导出的目录结构也更加简洁。推荐有条件的小伙伴尽早迁移至新版。

## ReactiveX

Observable 源自一个叫做 [ReactiveX](http://reactivex.io/) 的项目，「RxJS」中的「Rx」就是它的缩写。

ReactiveX 提出了一种使用观察者模式进行异步编程的方法，按照其官网的描述：ReactiveX 是观察者模式、遍历器模式和函数式编程的集大成者。

> ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming

ReactiveX 本身只负责定义核心概念和语法标准，具体实现上，不同的编程语言可以有自己的语法规则。RxJS 就是 ReactiveX 的 JS 实现，同理还有 RxJava、RxGo、RxPY 等众多其他语言的实现，时下热门的 Dart 也有相应的 RxDart。

## 「观察」与「被观察」

「观察」这件事，需要观察者与被观察者两个方面的参与。被观察者主动产生变化，观察者被动的接收变化。

Observer 和 Observable 分别就「观察者」和「被观察者」


## 对比

在 JS 异步编程中，Observable 并不是唯一的选择，

### Observable vs. Function

拉取和推送，只能返回单个值 vs 可返回多个值

### Observable vs. Iterator / Generator

同样可返回多个值，拉取和推送的区别

### Observable vs. Promise

同样是推送，只能返回单个值 vs 可返回多个值，同步和异步的区别

### 汇总

| | Function | Iterator / Generator | Promise | Observable |
|-|-|-|-|-|
| 数据获取方式 | 拉取| 拉取 | 推送 | 推送 |
| 随时间返回值数量 | 单个值| 多个值 | 单个值 | 多个值 |
| 同步/异步 | 同步| 同步 | 异步 | 同步 |


## 没有观众，就没有演出
`subscribe()`

## 退票没戏，但退订可以
`unsubscribe()`

## 主题（Subject）

多播

### 观察者模式

### 订阅者模式

## Scheduler

用自己理解说明几种调度器的不同

## Operators

更好的分类方式？

Decision Tree ？

## 联想到 Hooks

```javascript
const observable = Rx.Observable.create(observer => {
  // 追踪 interval 资源
  const intervalID = setInterval(() => {
    observer.next('hi')
  }, 1000)

  // 提供取消和清理 interval 资源的方法
  return () => {
    clearInterval(intervalID)
  }
})
```

看，像不像 `React.useEffect()` 的写法。

```javascript
useEffect(() => {
  // 追踪 interval 资源
  const intervalID = setInterval(() => {
    console.log('hi')
  }, 1000)

  // 提供取消和清理 interval 资源的方法
  return () => {
    clearInterval(intervalID)
  }
})
```

## 标准化

社区已经[提案将 Observable 纳入 ECMAScript 标准](https://github.com/tc39/proposal-observable)，但目前该提案仍处于 Stage 1，且已经有日子没动静了。或许是 RxJS 作为目前众多 Observable 实现中事实上的标准，已经做得太好了，大家也已经习惯用它了，觉得有的用就好了，进不进标准影响不大。

就像我曾经所说的 —— ECMAScript 标准的存在更像是一个“年度优秀特性合集”
