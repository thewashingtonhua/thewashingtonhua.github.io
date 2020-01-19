---
title: '每天一点ES6(11)：Symbol'
description: '原始类型家族的新成员'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'symbol']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 什么是 Symbol

Symbol 是 ES6 中新增的一种原始数据类型，至此 JavsScript 共有 7 种原始数据类型：`object`、`number`、`string`、`boolean`、`null`、`undefined`、`symbol`。

> 注意 array 不是原始数据类型，不要因为可以直接用 `[]` 定义数组就以为它也是原始数据类型。
>
> 数组是一种常见的基本数据结构。

```js
let s = Symbol();
typeof s; // symbol
s // Symbol()
```

创建 Symbol 不需要 `new` 关键字，因为它是原始数据类型，不是对象。但由于不像其他原始数据类型有直接量的写法，一开始很容易忘记这点，习惯了就好。

## 为什么需要 Symbol

Symbol 的本意是独一无二的，ES6 引入它用于解决一些命名冲突的问题，此前对象的属性名都是字符串，如果试图给一个现有对象定义一个新的属性，很有可能会因为命名冲突而导致覆盖原有属性，这并不总是我们希望得到的结果，但又在所难免。

## 创建 Symbol

创建 Symbol 时可以传入一个字符串，用以给 Symbol 添加描述，如果传入的是对象，则会对其调用 `toString()` 转成字符串后再生成。

```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol('foo')
s2 // Symbol('bar')
```

注意这里的参数只适用于描述，和 Symbol 的取值没有任何关系，两个参数相等的 Symbol 并不相等，事实上，就不存在任何两个 Symbol 是相等的。

## 转换

Symbol 不能参与数值运算和字符串拼接，会报错。

但可以显式地把 Symbol 转换成字符串或布尔值（不能转换为数值）。

## Symbol 用作对象属性名

Symbol 最常见的用途就是解决对象属性名冲突的问题，因为 Symbol 绝对不会冲突

```js
let mySymbol = Symbol();

// 第一种写法
let o = {};
o[mySymbol] = 'hello';

// 第二种写法
let o = {
  [mySymbol]: 'hello'
};

// 第三种写法
let o = {};
Object.defineProperty(o, mySymbol, {
  value: 'hello'
});

// 以上写法均得到此结果
o[mySymbol] // hello
```

用 Symbol 定义属性时，只能用 `[]` 的方式，不能用 `.` ，否则会和不同字符串属性冲突，这很容易被忽略。无论是外部定义（ `o[prop] = val` ）还是内部定义（ `o = {[prop]: val}` ）都是如此。

## Symbol 用于定义常量

Symbol 也可用于定义一组枚举常量，尤其当枚举变量仅用于区分，其取值并不重要时，Symbol 就可以作为不冲突的值赋给它们。

```js
const DEBUG = Symbol('debug');
const WARN = Symbol('warn');
const INFO = Symbol('info');
const ERROR = Symbol('error');
```

## 属性名的遍历

Symbol 作为属性名时，不会出现在常规的循环或 `Object.keys()` 等方法中，必须用 `Object.getOwnPropertySymbols()` 进行获取。

ES6 中还有个新的 API  `Reflect.ownKeys()` 可以返回对象多有类型的键名，包括常规的和 Symbol。

利用该特性，可以给对象定义一些不想暴露为接口的非私有内部方法，以防意外被卷入遍历中。

## Symbol.for()

 `Symbol.for()` 接受一个字符串参数，搜索是否已有以此为描述的 Symbol 存在，有则返回已有的，没有则新建并返回。

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

## Symbol.keyFor()

 `Symbol.for()` 在创建的同时会在全局进行登记，以进行检查，而普通的 Symbol 并不会登记， `Symbol.keyFor()` 用于检查 Symbol 是否被注册过，注册过的正常返回注册用的参数，否则返回 `undefined` 。

```js
let s1 = Symbol.for('foo');
let s2 = Symbol('foo');

Symbol.keyFor(s1) // 'foo'
Symbol.keyFor(s2) // undefined
```

## 内置的 Symbol 值

ES6 内置了 11 个 Symbol 值，指向语言内部使用的方法：

### Symbol.hasInstance

 `foo instanceof Foo` 实际上调用的是 `Foo[Symbol.hasInstance](foo)` ，需要时可以重写以修改判断实例的规则。（虽然一般不建议这么做，就像不建议直接修改原生数据结构的属性，这里只是提供了一种可能性）

### Symbol.isConcatSpreadable

当该属性为 `true` 或 `undefined` 时，表示对该对象使用 `Array.prototype.concat` 时是否可以展开。

```js
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

数组的默认行为是可展开，我们可以手动干预让它不可展开。类数组对象同理

### Symbol.species

这个属性指向对象的真实构造函数。创建实例时会调用该方法，返回一个函数作为真正的构造函数，此构造函数和类名可以不一样。（虽然我目前还想不到什么时候会需要这么干，反正人家允许这种操作就是了）

```js
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

mapped instanceof MyArray // false
mapped instanceof Array // true
```

上述代码中构造函数被替换，因此类型检测的结果就变了。

### Symbol.unscopables

该属性指向一个对象，知名使用 `with` 关键字时哪些属性会被环境排除。（鉴于严格模式下 `with` 已经被禁用，因此该属性的使用价值似乎并不大，同样的，只是提供这种操作而已）

```js
// 没有 unscopables 时
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
} // 正常的改变作用域，调用了MyClass.foo()，返回1

// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  } // 改变作用域时，MyClass.foo()会被排除
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
} // 由于 MyClass.foo 被排除，因此 MyClass.prototype 对这里的 foo 没有影响，向上寻找到全局的 foo ，返回2
```

### Symbol.match / replace / search / split / iterator / toPrimitive / toStringTag

这些属性都是指向一个函数，可以自定义当这些方法被执行时的行为，重新定义规则。（虽然这么做似乎不是很合逻辑，但当你需要自行封装一些东西的时候们或许还是有用的，反正 JS 提供了这样的操作，用不用那是开发者自己的选择了）

由于这写些用法一般用不到，因此这里不浪费篇幅一一给出示例介绍具体用法了，需要时候去看阮大原文的实例，或者 MDN 上的文档就好了。

## 在我看来 Symbol 的价值

Symbol 最实际的作用，还是在定义对象属性时候用于解决命名冲突，以及配合做枚举类型的值。Symbol 不可被常规方法枚举的特点私以为优劣参半，看需求，用作内部方法时还是挺好的特性，但枚举对象的全部属性时会略麻烦一些。后面提到的这些内置 Symbol 值知道一下即可，一般用不到，用到时现查文档即可。

## 关于迟更

鉴于该系列迟更严重，完全对不起标题中“每天”的说法，我决定……以后就不吐槽这个梗了，每次都要自黑一遍，我都快词穷了。反正你们也知道在这件事上我有多不靠谱了……[/手动摊手]。

不过说实话，前端这两年变化太快，要学的东西太多，上个月刚把 NG4 和 TypeScript 看完，最近在看 React 全家桶，看着看着就把博客的事儿给忘了，好久才想起来：卧槽，博客好久没更了。ES6 在实战中倒是已经用了不少，但是博客更新的进度实在是落后，距离阮大这种级别的还差太多太多。（回过头看看阮大的《ES6 入门》系列第一版都啥时候的事了，黄花菜不光凉了都放馊了）
