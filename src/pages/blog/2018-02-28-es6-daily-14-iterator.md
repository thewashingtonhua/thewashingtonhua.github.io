---
title: '每天一点ES6(14)：Iterator'
description: '遍历也能搞出花来，怎么遍历你说了算'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'iterator', 'generator']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 写在前面

这次轮到遍历了。其实 ES5 中就已经有好多种用于遍历的方法：

- `while`
- `do-while`
- `for`
- `for-in`
- `forEach`
- `map`

那么这次 ES6 又打算在遍历上搞什么花样劲？

## Iterator

算上 ES6 新引入的数据类型，JavaScript 原生用于表示集合的数据结构就有：Array、Object、Map、Set 四种，开发者还可以自定义由各种数据结构组成的集合。面对众多的数据结构，我们需要一个统一的方式来遍历各种数据结构，Iterator 就是为此而生。

Iterator 是 ES6 新引入的接口，为各种不同的数据结构提供了一种统一的访问机制。任何数据结构只要部署了 Iterator 接口，就可以执行遍历操作。ES6 为此提供了 `for...of` 语法来遍历部署了 Iterator 接口的数据结构。只要数据结构部署了 Iterator 接口，我们就称之为“可遍历的”。

在 ES6 的规范中，以下数据结构原生就具备 Iterator 接口：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

Iterator 本质是一个遍历器对象，它向数据结构中部署了一个指针，默认指向其开始开始位置，然后提供了 `next()` 方法用来依次访问下一个元素。每次调用 `next()` 会返回一个对象，对象具有 `value` 和 `done` 两个属性，分别表示当前项的取值，和是否还有下一项。

以下代码实现了一个简单的遍历器对象：

```javascript
const it = makeIterator(['a', 'b'])

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

const makeIterator = array => {
  let nextIndex = 0
  return {
    next: () => nextIndex < array.length
      ? { value: array[nextIndex++], done: false }
      : { value: undefined, done: true }
  }
}
```

Iterator 只是把接口应用到数据结构上，和数据结构本身没有关联。

ES6 规定，默认的 Iterator 接口部署在 `Symbol.iterator` 属性，具备这个属性的接口就是“可遍历的”。 `Symbol.iterator` 的值是一个函数，执行该函数会返回一个遍历器。属性名 `Symbol.iterator` 本身是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以必须要放在方括号内。

```javascript
const obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        return index < self.data.length
          ? { value: self.data[index++], done: false }
          : { value: undefined, done: true }
      }
    }
  }
}
```

对于类似数组的对象（存在数值键名和 length 属性），可以直接将 `Array.prototype[Symbol.iterator]` 赋值给对象的 `[Symbol.iterator]` 属性。

```javascript
Obj.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Obj.prototype[Symbol.iterator] = [][Symbol.iterator]; // 效果相同

const iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for (const item of iterable) {
  console.log(item) // 'a', 'b', 'c'
}
```

字符串某种程度上也可以看作是数组，因此也默认部署了 Iterator 接口，可以使用 `for...of` 遍历。

## Iterator 的调用

以下情况下会调用 Iterator 接口：

- `for...of`
- 解构赋值
- 扩展运算符
- `yield*`
- `Array.from`
- `Map()` 、 `Set()` 、 `WeekMap()` 、 `WeekSet()` ，例如： `new Map([['a', 1], ['b', 2]])`
- `Promise.all()` 、 `Promise.race()`

## Iterator 和 Generator

日常使用中和 Iterator 关系最大的，要数 Generator —— ES6 中新引入的一种异步解决方案，后面会讲到。通过 Generator，我们可以非常快捷的部署 Iterator 接口，只需一步步写出每次要输出的 value 即可，不用费心去管理 done。

```javascript
const obj = {
  * [Symbol.iterator]() {
    yield 'hello'
    yield 'world'
  }
}

[...obj] // ["hello", "world"]
```

## 遍历器对象的 return() 和 throw()

除了  `next()` ，遍历器对象还包含了 `return()` 和 `throw()` 两个可选的方法。

如果 `for...of` 提前退出（异常，或者遇到 `break` 、 `continue` 语句）， `return()` 会被调用，通常用于在对象完成遍历前释放资源占用。

举个例子：

```javascript
// readLinesSync 接受一个文件对象作为参数，返回一个遍历器对象
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

// 情况一，输出文件的第一行以后，执行 return 方法，关闭这个文件
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二，输出所有行以后，执行 return 方法，关闭该文件
for (let line of readLinesSync(fileName)) {
  console.log(line);
  continue;
}

// 情况三，执行 return 方法关闭文件之后，再抛出错误
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```

需要注意的是， `return()` 必须返回一个对象，z合适 Generator 的规格决定的。 `throw()` 主要是配合 Generator 使用，一般的遍历器用不到，后面会具体讲。

## for...of

配合 Iterator，ES6 新增了一个新的循环操作： `for...of` ，只要是正确部署了 `Symbol.iterator` 属性的数据结构都可以使用它。

`for...of` 在使用上和 `for...in` 非常相似，最大区别在于 `for...in` 每次得到的是对象的属性键，如果用于数组就是返回的下标，而 `for...of` 每次得到的是对象的属性值，如果用于数组就是返回的元素值。

Map 和 Set 也可以通过 `for...of` 来遍历，不过是按照元素的添加顺序进行遍历。另外 Set 在遍历时返回的是值，Map 在遍历时返回的是键值数组。

对象、数组、Map、Set 都支持 `keys()` 、 `values()` 、 `entries()` ，其返回的内容也是遍历器对象，可以通过 `for...of` 遍历。

## 小结

有了 Iterator，我们可以自由地定义数据结构的遍历方式。这一部分的两个关键点，一个是 `[Symbol.iterator]` 属性是个函数，包含必须的 `next()` 函数，在一个就是新的循环语法 `for...of` 。至于文中提到的 Generator，我们会在该系列之后的文章中进行介绍。

## 该系列的其他文章

上一篇：[每天一点ES6(13)：Proxy 和 Reflect](/blog/2017/12/20/es6-daily-13-proxy-and-reflect)

下一篇：[每天一点ES6(15)：Promise](/blog/2018/03/04/es6-daily-15-promise)
