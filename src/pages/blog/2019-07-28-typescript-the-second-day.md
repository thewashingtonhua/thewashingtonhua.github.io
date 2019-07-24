---
title: 'TypeScript 次日指南'
description: '坑这种东西，是不会写在文档上的'
tags: ['typescript']
cover: '../../images/blog/typescript.jpg'
series: ''
draft: true
original: true
---

## 为什么是次日？

上手 TypeScript 并不难，有 JavaScript 基础的同学，花个一天时间过一遍文档，基本就都清楚了。如果你刚好还有 Java、C# 等后端语言的基础，那么相信你对「接口」、「枚举」、「泛型」等概念也不会陌生。毕竟 TypeScript 的设计结合了 JavaScript 和 C# 的特点。

如果你看过文档就准备开始把 TypeScript 用到项目中去，那么恭喜你，你很快就会遇到各种坑，而且你无法直接从文档中寻找到对应的解决方案。这篇文章的存在，就是希望能够填补这中间的空白，帮助各位顺利的把 TypeScript 落地到项目中。这便是标题中「次日」的由来。

如果你还没有看过 TypeScript 的文档，那么这篇文章现在还不适合你，建议先收藏起来，等看完了文档再回来。

如果你已经准备好了，那么我们开始吧。

## 什么时候该用 TypeScript？

TypeScript 的好不用我多言，不喜欢 TypeScript 的朋友也不会把这篇文章看到这里。

每个人接触 TypeScript 的原因不同，有的是被人安利，有的是因为团队在用，有的是因为用了 Angular。但不管因为什么入了这个坑，我们都需要明白：TypeScript 并非必须。

TypeScript 可以简单理解为 JavaScript + Types。从实现业务的角度，TypeScript 相比 JavaScript 并没有多大优势，反而增加了不少额外的工程化负担。这时候就要权衡一下成本，如果多出来的这部分代码并不能给项目带来足够的收益，那么这笔投入就不是很值得。因此决定是否需要使用 TypeScript 的关键，就在于项目是否需要类型系统。

如果只是做个官网之类的小型项目，类型不类型的并不重要，没必要为了这种简单的需求跟自己过不去。但随着项目的规模和复杂度的增加，代码质量、沟通成本等问题开始浮现，而这恰恰是类型系统能够解决的问题。通过类型检测，我们可以更早的发现潜在的类型错误，进行主动防御，进而提高代码质量；通过类型定义，我们可以更加直观的描述我们的数据结构，降低团队作业中的沟通成本。

因此，TypeScript 比较适合大型项目，尤其是需要团队开发的那种。小型项目就不推荐使用了，用 JavaScript 更加的快捷。

## 别忘了 jsDoc

很多人对 TypeScript 有一个误解，觉得有了静态类型的代码已经足够「自解释」，就不需要 jsDoc 一类的注释了。

静态类型描述的是数据的结构，而注释描述的是数据的作用，两者解决了不同的问题，彼此之间并不冲突。

比如下面这段 JavaScript 代码：

```js
function convert (val, config) {
  // some code
}
```

不难看出这是一个转换函数，接收一个待转换的值，以及一个配置对象，但我们并不是这个函数用来转换什么，配置对象又有哪些参数。

现在我们用 TypeScript 来重写一下，补充一些类型定义。

```ts
function convert (val: string, config: { x: string, y? :boolean}): string {
  // some code
}
```

现在我们知道了这是一个用于处理字符串的转换函数，配置对象有两个参数，一个是必选的字符串，一个是可选的布尔值，最后返回的也是一个字符串。但具体到业务中，这个函数用来转换什么样的字符串，我们还是不太清楚。

```ts
/**
 * @description 对手机号进行编码，隐藏其中一部分，如：13812345678 -> 138****5678
 * @param val 待编码的手机号
 * @param config 配置选项
 */
function convert (val: string, config: { x: string, y? :boolean}): string {
  // some code
}
```

加上注释之后，一切就都清楚了：这是一个对手机号进行编码，将其中一部分替换成其他字符，以保护用户隐私的函数。

所以你看，TypeScript 并不能完全替代 jsDoc 的作用，该写的注释还是得写。

当然，有了 TypeScript 的类型系统，`@param` 不需要再指定数据类型了，只要对变量的用途进行描述就好了。如果你配置了 Lint 工具，它也会提醒你优先使用 TypeScript 来定义类型，不要重复定义。

## TSX 和 JSX

TS 中写 React 必须用 `*.tsx`

## 常见 Type（DOM、React）

### 节点类型

Node -> ELement -> HTMLElement -> HTMLInputElement

### 事件类型

onClick, onChange 等的类型

## 标准 lib 也会出错

比如 classList

## FAQ

### 多重 extends

当一个类型 `extends` 了多个其它类型，重复属性左边覆盖右边

### obj[param]无法访问怎么办

定义 index

### OptionBag

介绍这种形式
