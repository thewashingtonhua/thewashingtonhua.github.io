---
title: '每天一点ES6(13)：Proxy 和 Reflect'
description: '对不起，有代理真就是可以为所欲为'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'proxy', 'reflect']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 写在前面

又好久没更了，这次来讲的是 ES6 中比较冷门的一块内容：元编程。大部分时候其实我们不会接触到这一块，日常的业务开发通常不会涉及这么高级的操作，但元编程对于一门语言来说可谓是瑞士军刀，一旦掌握，便可以施展出强大的法力。

## 元编程是个什么鬼？

一般我们编程都是为了实现一些业务上的需求，直接使用语言原生提供的内容即可，最多在其上做一层简单的封装。而元编程则是对编程语言本身进行编程，去修改其原本的行为，实现一些原生方法做不到的事，但实际编写起来又是原生的语法，非常神奇。

## Proxy

Proxy 本意是代理，一般我们在计算机网络中经常听到这个词。使用 Proxy 我们可以通过编程来接管外界对对象的操作，改变其原本的行为。有点类似于中间件的概念。

```js
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

如上的代码就对对象 obj 的读取和设置操作进行了接管，在其原有行为之前加上了一些内容。

Proxy 的基本使用为： `const proxy = new Proxy(target, handler)` ，target 为被代理的对象，handler 中定义了拦截的行为。

Proxy 实例可以作为对象的原型：

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

这里 obj 本身并没有 time 属性，因此沿原型链向上寻找，找到 proxy 的 time 属性，proxy 虽然也没有 time 属性，但其拦截了所有属性访问操作并固定返回 35，因此依然能拿到结果。

### Proxy 支持的拦截操作
| 操作 | 作用 |
|-|-|
| get(target, key, receiver) | 拦截对象属性的读取，三个参数分别为：目标对象、属性名、proxy 实例本身（即 this 所指），其中最后一个参数可选 |
| set(target, key, value, receiver) | 拦截对象属性的设置，返回布尔值 |
| has(target, key) | 拦截 `key in obj` 的操作，返回布尔值 |
| deleteProperty(target, key) | 拦截 `delete obj[key]` 操作，返回一个布尔值 |
| ownKeys(target) | 拦截 `Object.getOwnPropertyNames(obj)` 、 `Object.getOwnPropertySymbols(obj)` 、 `Object.keys(obj)` 操作，返回一个数组，包含目标对象所有自身的属性的属性名。 `Object.keys()` 的返回结果仅包括目标对象自身的可遍历属性。 |
| getOwnPropertyDescriptor(target, key) | 拦截 `Object.getOwnPropertyDescriptor(obj, key)` ，返回属性的描述对象 |
| defineProperty(target, key) | 拦截 `Object.defineProperty(obj, key, desc)` 、 `Object.defineProperties(obj, key, descs)` ，返回一个布尔值 |
| preventExtensions(target) | 拦截 `Object.preventExtensions(obj)` ，返回一个布尔值 |
| getPrototypeOf(target) | 拦截 `Object.getPrototypeOf(obj)` ，返回一个对象 |
| isExtensible(target) | 拦截 `Object.isExtensible(obj)` ，返回一个布尔值 |
| setPrototypeOf(target, prototype) | 拦截 `Object.setPrototypeOf(obj, prototype)` ，返回一个布尔值，如果目标对象是函数那么还有两种额外操作可以拦截。 |
| apply(target, obj, args) | 拦截 Proxy 实例作为函数调用的操作，例如： `proxy(...args)` 、 `proxy.call(object, ...args)` 、 `proxy.apply(...)`  |
| construct(target, args) | 拦截 Proxy 实例作为构造函数调用的操作，例如： `new proxy(...args)`  |

### Proxy.revocable()
 `Proxy.revocable()` 返回一个对象，该对象的 `proxy` 属性是 Proxy 实例， `revoke`  是一个用于取消 Proxy 实例的函数。被取消的 Proxy 实例不可再被访问。

```js
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

 `Proxy.revocable()` 的一个使用场景就是临时授权对象访问。一个对象不允许直接访问，但允许通过代理临时访问，访问结束后收回代理权，之后不再允许访问。

### Proxy 中的 this
在使用了 Proxy 的情况下，目标对象内部的 `this` 关键字会指向 Proxy 代理，而非原本的对象。使用时要时刻注意这一点，Proxy 内部的 `this` 未必是我们以为的那一个

## Reflect

字面意思解叫“反射”，熟悉 Java 的朋友应该也有接触过这个词。它和 Proxy 一样，都是 ES6 引入的用于操作对象的新 API。

Reflect 的设计目的有以下几个：

1. 将 `Object` 中一些明显属于语言内部的方法放到 `Reflect` 对象上，例如： `Object.defineProperty` 。
2. 合理化一些 `Object` 方法的返回结果，例如： `Object.defineProperty` 在无法定义属性是会抛出错误，而 `Reflect.defineProperty` 只是返回 `false` 。
3. 让 `Object` 中命令式的操作都变成函数式。例如： `key in obj` 、 `delete obj[key]` 是命令式的， `Reflect.has(obj, key)` 、 `Reflect.deleteProperty(obj, key)` 就是函数式的。
4. `Reflect` 中的方法与<spanc class='code'>Proxy</spanc>中的一一对应，在 `Proxy` 中始终可以通过 `Reflect` 获取默认行为。

简而言之， `Reflect` 的存在意义有两点：一是把一些原本捆绑在 `Object` 对象上但实际上更应该属于语言内部的方法提取出来，并加以合理化，让 `Object` 更纯粹作为一种数据结构。二是和 `Proxy` 组 CP，用于在 `Proxy` 中始终指向默认行为，防止加了代理之后回不去。

### Reflect 的静态方法

如前面所说的， `Reflect` 的静态方法和 `Proxy` 支持的拦截操作一一对应。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

## 小结

通过 Proxy 和 Reflect，我们可以进一步控制对象的行为，甚至改变其默认行为。这可以说是对 JavaScript 能力的又一次提升。
