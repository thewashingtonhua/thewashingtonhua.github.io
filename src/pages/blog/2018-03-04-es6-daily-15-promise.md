---
title: '每天一点ES6(15)：Promise'
description: '对你的承诺，永远不变'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'promise']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
---

## 写在前面

Promise 大概是 ES6 中最为人熟知的内容之一了，时至今日它已经成为了异步操作中事实上的新标准。

## 什么是 Promise

Promise 和它的字面意思一样，代表着某种承诺，承诺未来某个时间会发生的事。Promise 被用来执行异步操作，等异步操作完成后（无论成败），执行后续的内容。

Promise 的出现解决了一个长期被开发者诟病的问题——回调地狱。Promise 使用链式调用的方式代替回调，使得代码看上去更加像是同步的代码，语义上也更加直观。

一个 Promise 实例有三种可能的状态：pending（进行中）、resolved（已成功）、rejected（已失败）。当 Promise 发起时进入 pending 状态，执行后进入后两者中的其中一个状态，有且只有这两条路可走，而且状态的改变完全由操作本身决定，且一旦改变就不会再变，不受外界影响。

Promise 也有一些缺点：

- Promise 无法取消，一旦创建就会执行，且无法中断。
- Promise 内部抛出的错误，除非设置了回调函数，否则不会反应到外部。
- Promise 在 pending 状态下时，无法得知具体的进度，即到底是刚开始还是快要结束了。

## Promise 的基本使用

Promise 本身是一个构造函数，接收一个函数作为参数，创建一个 Promise 实例。作为参数的函数包含两个参数： `resolve` 和 `reject` 。这两个参数都是函数，分别用于将 Promise 对象的状态从 pending 改为 resolved 和 rejected，并将异步操作的结果/错误以参数的形式传递出去。

Promise 对象在被创建后会立即执行，但其执行后的回调一定是异步的，即便其所做的事只包含同步的代码。

```javascript
const promise = new Promise(function(resolve, reject) {
  console.log('Promise'); // Promise 创建后立即执行
  resolve();              // 但即便只有同步操作
});

promise.then(function() {
  console.log('resolved.'); // 回调依然是异步的，会在当前脚本所有同步操作执行完之后执行。
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

Promise 实例通过 `then()` 方法指定异步操作成功/失败后的后续操作， `then()` 接受两个回调函数作为参数，分别指定异步操作成功/失败后要执行的内容，其中操作成功时的回调为必选，操作失败时的回调可选。两个回调函数都接受 Promise 对象传出的值作为参数。 `reject()` 的参数通常是一个 Error 对象的实例，尽管这并非强制的，但大部分的 Lint 工具都会提示你这么做。 `resolve()` 的参数除了常规的值以外，还可能是另一个 Promise 实例，这时候，父级 Promise 的状态就依赖于子 Promise 的影响。举个例子：父 Promise 操作完成后返回子 Promise，这时父 Promise 的状态发生改变；正常情况下应该是变为 resolved 或者 rejected 的其中之一，但因为这里返回的是另一个 Promise，父 Promise 的状态就完全被返回的子 Promise 所替代。子 Promise 刚创建，状态为 pending，因此父 Promise 的状态被覆盖为子 Promise 的 pending 状态；直到子 Promise 状态变为 resolved 或者 rejected，父 Promise 的状态才相应地变为 resolved 或者 rejected，然后执行对应的回调。注意，在这种情况下，父 Promise 执行哪个回调完全取决于子 Promise 最后的状态，如果父 Promise resolve 返回了子 Promise，子 Promise 最终 reject 了，父 Promise 的 resolve 回调不会执行，只会执行 reject 回调。

按照正常的逻辑来讲， `resolve()` 和 `reject()` 应该表示一个 Promise 的结束，之后不应该再有别的代码。尽管不推荐这么做，但是语法上是允许在这后面继续执行内容的，而且如果是同步的代码，还会先于回调执行。一般来说后续的操作应该放到 `then()` 里， `resolve()` 和 `reject()` 前面最好加上 `return` 。

## Promise.prorotype.then()

`then()` 是 Promise 实例的方法，用于给 Promise 实例添加状态改变时的回调函数。

`then()` 支持链式调用，可以连续执行多个 `then()` ，前一个 `then()` 的返回会作为后一个 `then()` 的参数。

## Promise.prototype.catch()

`catch()` 是 `then(null, reject)` 的别名，用于处理错误，无论是异步操作过程出错，还是 `catch()` 之前的 `then()` 出错，都会进入到 `catch()` 里，有点类似 `try...catch` ， `rejcet()` 就是在抛出错误。Promise 一旦状态变为 resolve，再抛出错误是无效的，如果要 reject，，请及早 reject。

Promise 抛出的错误会一直冒泡，直到被捕获， `catch()` 会捕获其之前的所有错误，无论是来自异步操作还是回调。一般我们不通过 `then()` 的第二个参数来处理 reject，而是直接在 `catch()` 里处理。

与 `try...catch` 不同，Promise 对象如果不使用 `catch()` 指定错误处理的回调，其一步操作过程中抛出的错误就不会传递到外层代码，发生的错误会抛出但不会中断程序的运行，直接在内部就消化掉了。不过让人费解的是，Node.js 计划在未来不这么做，如果 Promise 内部有未捕获的错误，将会直接终止进程。

如果错误发生在 resolve 之后，这样的错误属于 Promise 函数体之外抛出的，会冒泡到最外层，成为未捕获的异常：

```javascript
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
  // 错误将在下一轮时间循环抛出
  // 届时 Promise 已经进入 resolved 状态，不会再变了
  // 错误冒泡至最外层
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

综上，最好养成习惯在 Promise 的最后始终带上 `catch()` 。

Promise 的 `catch()` 后面还可以跟 `then()` 和 `catch()` 。如果没有报错， `catch()` 会被跳过。

Promise 的 `catch()` 会处理到自己为止之前所有未处理的错误，错误一旦被 `catch()` 捕获，就会到此为止，不再继续向后传递；之后发生的新错误会在遇到下一个 `catch()` 时被处理，或直到最后也没被处理，被“内部消化”。

## Promise.prototype.finally

这是 ES2018 引入的内容，位于 Promise 对象的最后。无论 Promise 对象最后的状态如何，都会执行其中的代码。 `finally()` 不接受任何参数，也就意味着 `finally()` 无法得知 Promise 最终的状态，也就是说 `finally()` 中的操作应该是与 Promise 的状态无关的，例如释放资源占用、关闭连接等。

`finally()` 本质上还是 `then()` 的语法糖，如果 `then()` 的两个参数执行的是完全相同的内容，并且返回传入的值，那么就和用 `finally()` 执行一次是一样的。需要注意的是， `finally()` 总是会返回上一步的结果，因此尽管从语义上看它应该位于 Promise 的最后，但是语法上是允许其后继续接 `then()` 或 `catch()` 等语句的，毕竟本质上这就只是一个 `then()` 而已。

## Promise.all()、Promise.race()

这两个是 Promise 的静态方法，接受一个 Promise 数组作为参数，将其包装为一个新的 Promise。如果数组中的元素不是 Promise 实例，就会通过 `Promise.resolve()` 将其转换成 Promise 实例。事实上只要是具有 Iterator 接口的数据结构都可以，只是数组最常用。

`Promise.all()` 包装出来的新 Promise 仅当数组中的 Promise 全都被 resolve 后才会进入 resolved 状态，各 Promise 的返回值以数组形式传递给新 Promise 的回调函数；数组中任何一个 Promise 被 reject，新 Promise 就被 reject，其中第一个被 reject 的 Promise 的返回值被传递给新 Promise 的回调函数。

`Promise.race()` 包装出来的新 Promise 的状态取决于数组中最早发生状态变化的那一个，一旦数组中有成员状态发生了变化，它的结果就会被传递给新 Promise 的回调，其它的 Promise 依然会继续执行，但结果会被丢弃。通常用 `Promise.race()` 来模拟给请求设置超时。

如果作为参数的 Promise 实例自己定义了 `then()` ，那么它的 resolve 会先经过自己的 `then()` 的处理，再交给 `Promise.all()` 和 `Promise.race()` 的 `then()` 。

如果作为参数的 Promise 实例自己定义了 `catch()` ，那么它的 reject 会被自己的 `catch()` 处理，而不会传递到 `Promise.all()` 和 `Promise.race()` 的 `catch()` 。

## Promise.resolve()、Promise.reject()

这两个也是 Promise 的静态函数，接受一个对象，并将其转为对应状态的 Promise 对象。相比之下，这两个函数可能比 `Promise.all()` 和 `Promise.race()` 还要更常用一些。

`Promise.resolve()` 的参数可能有几种情况：

- Promise实例：这种情况直接返回，不做修改。
- thenable 对象：具有 `then(resolve, reject)` 方法的对象，以这个函数作为 Promise 构造函数的参数，创建 Promise。
- 非 thenable 对象，或非对象原始值：返回一个状态为 resolved 的 Promise 对象，参数值直接用于回调。
- 不带任何参数：获得一个状态为 resolved 的 Promise 对象，没有回调的参数

需要注意的是，通过 `Promise.resolve()` 创建的 Promise 对象，其 resolve 的时机在本轮事件循环，而不是下一轮事件循环。

```javascript
setTimeout(function () {
  console.log('three'); // 下一轮事件循环
}, 0);

Promise.resolve().then(function () {
  console.log('two'); // 本轮事件循环
});

console.log('one'); // 立即执行

// one
// two
// three
```

`Promise.reject()` 的参数没有那么复杂，不管是什么类型，都会原封不动的作为 reject 的理由传递给后续的方法。通常来说，reject 的理由会是一个 Error 的实例。

## Promise.try()

这是一个非标准的函数，还在提案阶段。但是一些主流的 Promise 库（Bluebird、Q、when）早就已经提供了这个方法，背后也确实有实际需求存在，未来还是很可能进入标准的。

这个函数背后的需求，就是 Promise 执行的内容是异步的，但是我们希望同步的代码也可以使用 `then()` 的方式来写，这样语义上更符合直觉。目前的方案只有通过改造成立即执行函数来实现，而且同步代码报错需要用 JS 本身的 `try...catch` 来捕获，而异步的用 Promise 的 `catch()` ，一个 try 对应两种 catch 的方式非常混乱。

`Promise.try` 被设计为可以容纳同步和异步的代码，不管哪种类型的异常，都可以交给 `Promise.prototype.catch` 去捕获，这样一来 Promise 就具备了完整的 `try...catch` 机制，不再只有 catch 却没有 try 了。

## 小结

Promise 是 ES6 带来的重要特性之一，也是最为广大开发者熟知的 ES6 新特性之一。从我对应聘者的面试情况来看，当我问及 ES6 有哪些新特性时，应聘者可能未必能说出 ES6 为对象、数组、字符串等添加了什么新的方法，也未必能讲清楚 Symbol、Proxy、Reflect 都是个啥，甚至可能都不知道 Map 和 Set 的存在，但说到 Promise，每个人都可以说上一两句，即便没有专门研究过 ES6，在使用 Axios、Fetch API、Q 等的过程中也会顺带学习到 `then()` 的用法，可见 Promise 在前端圈子的普及度。

当然，在异步流程控制这一块，ES6 的贡献远不止 Promise，还包括 Generator、Async/Await 等方案，别着急，我们马上就会讲到。

## 该系列的其他文章

上一篇：[每天一点ES6(14)：Iterator](/blog/2018/02/08/es6-daily-14-iterator)

下一篇：[每天一点ES6(16)：Generator](/blog/2018/06/14/es6-daily-16-generator)
