---
title: '【译】我们为什么要写 super(props)?'
description: '好像知道，又好像不知道'
tags: ['react']
cover: '../../images/blog/overreacted.jpg'
series: 'overreacted'
draft: true
original: false
---

> 原文地址：<a target='_blank' href=https://overreacted.io/why-do-we-write-super-props/>Why Do We Write super(props)?</a>
>
> 原文作者：<a target='_blank' href=https://twitter.com/dan_abramov>Dan Abramov</a>

我听说 <a target='_blank' href='https://reactjs.org/docs/hooks-intro.html'>Hooks</a> 最近很火。讽刺的是，我想以一些关于 class 组件的有趣故事来开始这个博客。怎样！（皮一下很开心）

这些小坑并不会影响你高效的使用 React，但如果你愿意深入了解下背后的工作原理，你会发现它们非常有意思。

这是第一个。

------

我这辈子写过的 `super(props)` 比我想象的要多得多

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

当然，<a target='_blank' href='https://github.com/tc39/proposal-class-fields'>class fields proposal</a> 允许我们跳过这个仪式。

```jsx
class Checkbox extends React.Component {
  state = { isOn: true };
  // ...
}
```

这样的语法是在 2015 年 React 0.13 增加对纯 Class 的支持的时候加入 <a target='_blank' href='https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers'>计划</a> 的. 定义 `constructor` 和调用 `super(props)` 一直都只是 class fiels 出现之前的临时解决方案。

然而，让我们只用 ES2015  的特性来回顾一下这个例子。

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

**我们为什么要调用`super`？能不能不调用它？如果非要调用，如果不传 `props` 会怎样？还有其它参数吗？**让我们来看一下。

在 JavaScript 中，`super` 指代父类的构造函数。（在我们的案例中，它指向 `React.Component` 这个实现）

重点在于，在你调用父类构造函数之前，你无法在构造函数中使用 `this`。JavaScript 不会允许你这么做。

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```

JavaScript 强制你在使用 `this` 前运行父类构造函数有一个很好的理由。考虑这样一个类结构：

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
}

class PolitePerson extends Person {
  constructor(name) {
    this.greetColleagues(); // 🔴 This is disallowed, read below why
    super(name);
  }
  greetColleagues() {
    alert('Good morning folks!');
  }
}
```

想象一下如果在调用 `super` 前使用 `this` 是被允许的。一个月之后。我们或许会改变 `greetColleagues` 把 person 的 name 加到消息中。

```jsx
greetColleagues() {
  alert('Good morning folks!');
  alert('My name is ' + this.name + ', nice to meet you!');
}
```

但我们忘了 `this.greetColleagues()` 是在 `super()` 有机会设置 `this.name` 之前被调用的。`this.name` 甚至还没被定义！如你所见，像这样的代码理解起来会很困难。

为了避免这样的陷阱，**JavaScript 强制规定，如果你想在构造函数中只用`this`，就必须先调用 `super`**。让父类做它该做的事！这一限制也适用于定义成类的 React 组件。

```jsx
constructor(props) {
  super(props);
  // ✅ Okay to use `this` now
  this.state = { isOn: true };
}
```

这给我们留下了另一个问题：为什么要传 `props`？

------

你或许觉得把 `props` 传进 `super` 是必要的，这使得基类 `React.Component` 可以初始化 `this.props`：

```jsx
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```

很接近了——事实上，<a target='_blank' href='https://github.com/facebook/react/blob/1d25aa5787d4e19704c049c3cfa985d3b5190e0d/packages/react/src/ReactBaseClasses.js#L22'>它就是这么做的</a>。

然而，即便在调用 `super()` 时没有传入 `props` 参数，你依然能够在 `render` 和其它方法中访问 `this.props`。（你要是不相信我，可以自己试一试）

这是什么原理？其实 **React 在调用你的构造函数之后，马上又给实例设置了一遍 `props`**：

```jsx
// Inside React
const instance = new YourComponent(props);
instance.props = props;
```

因此，即便你忘了把 `props` 传入 `super()`，React 依然会在事后设置它们。这是有理由的。

当 React 添加对 Class 的支持时，它并不是只添加了对 ES6 的支持，而是希望能够支持尽可能广泛的 class 抽象。由于 <a target='_blank' href='https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#other-languages'>不是很确定</a> ClojureScript、CoffeeScript、ES6、Fable、Scala.js、TypeScript 或其他解决方案谁更适合用来定义组件，React 对于是否有必要调用 `super()` 刻意不表态。

那么这是否意味着你可以只写 `super()` 而不用 `super(props)`？

**或许并非如此，因为这依然让人困扰**。诚然，React 会在你的构造函数运行之后设置 `this.props`。但在 `super` 调用一直到构造函数结束之前，`this.props` 依然是未定义的。

```jsx
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// Inside your code
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 We forgot to pass props
    console.log(props);      // ✅ {}
    console.log(this.props); // 😬 undefined
  }
  // ...
}
```

如果这发生在某些从构造函数中调用的函数，调试起来会更加麻烦。**这也是为什么我推荐总是使用 `super(props)` 的写法，即便这是非必要的**：

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props); // ✅ We passed props
    console.log(props);      // ✅ {}
    console.log(this.props); // ✅ {}
  }
  // ...
}
```

这样的写法确保了 `this.props`即便在构造函数返回之前就被设置好了。

------

最后还有一点是 React 的长期用户或许会好奇的。

你或许已经注意到，当你在 Class 中使用 Context API 时（无论是旧版的语法还是 React 16.6 中新增的现代化语法），context 是被作为构造函数的第二个参数传入的。

那么我们为什么不写 `super(props, context)` 呢？当然我们可以这么做，但 context 的使用频率没那么高，所以这个陷阱影响还没那么大。

**伴随着 class fields proposal 的发布，这个问题也就不复存在了。**即便不显式调用构造函数，所有参数也会自动传入。这就允许像 `state = {}` 这样的表达式在必要时可以直接引用 `this.props.` 或 `this.context`。

在 Hooks 中，我们甚至都没有 `super` 或 `this`。这个话题我们择日再说。