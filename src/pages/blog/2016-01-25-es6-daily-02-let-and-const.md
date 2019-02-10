---
title: '每天一点ES6(2)：let 和 const'
description: '终于，JavaScript 也能用上块级作用域和常量了'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'let', 'const']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
---

## let

ES6 新增了 `let` 命令，用于声明变量，和 `var` 类似，区别在于用 `let` 声明的变量只在 `let` 所在的代码块内有效，不存在声明提前。因此当用 `let` 声明变量时，必须像在 Java/C++ 中那样，先声明后使用。（其实即便是在 ES6 之前，从编程习惯上讲，也建议大家先声明后使用，避免自己给自己挖坑）

```javascript
{
  var a=1;
  let b=2;
}
console.log(a);    // 1
console.log(b);    // ReferenceError

console.log(c);    // undefined
console.log(d);    // ReferenceError
var c = 3;
let d = 4;
```

下面的代码是关于 JavaScript 中“闭包”的经典案例。可以看到，使用 `var` 时，由于变量声明提前，变量 `i` 实际上是一个全局变量，是共享的，因此无论数组的第几号索引，访问的都是 `i` 的最后的值 10。而使用 `let` 时，采用的是块级作用域，不存在声明提前，每一轮循环的 `j` 都是独立的新变量，只在本轮有效，因此各索引输出的值都不一样。因此对于循环计数，使用 `let` 更加严谨。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10


var b = [];
for (let j = 0; j < 10; j++) {
  b[j] = function () {
    console.log(j);
  };
}
b[6](); // 6
```


在 `for` 循环中，设置循环变量的部分是一个父级作用域，循环体内部是一个单独的子作用域。

## 块级作用域

引入 `let` 命令在事实上让 JavaScript 支持了“块级作用域”，在嵌套代码段外部不能访问内部的变量，在内部可以声明外部变量的同名变量且互不干扰。这给一直以来 JavaScript 中众多不合理的变量作用域问题给出了根本的解决方案。此前广泛使用的各种闭包以及立即执行匿名函数变得不再必要了（用还是可以用的，只不过不必专门为了构造块级作用域而用了）。

```javascript
let n = 5;
if (true) {
  let n = 10;
}
console.log(n);    // 5
```

对于函数也是一样。下面的代码在ES5中运行，会得到“I am inside!”，因为声明提升的存在，第二个函数声明语句会被提前到 if 判断之前（函数声明是一体的，不存在可分离的初始化，因此是整个 `function(){}` 语句提前），即便不进入 if 也照样会执行。但在ES6中，由于支持块级作用域，内部声明的函数在其作用域外是不存在的，第二个函数申明语句不会被提前，因此 if 条件不满足，内部代码不执行，执行外部定义的 `f()` ，得到“I am outside!”。

```javascript
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

## const

和 Java/C++ 一样， `const` 命令用于声明常量，常量一旦声明，除非手动修改代码，否则值是不会变的。对常量进行重新赋值不会有任何作用。 `const` 同样支持块级作用域，只在声明所在的块级作用域内有效，不存在声明提前，必须先声明后使用（存在暂时性死区）。

```javascript
const PI = 3.14;
PI = 3;             // 非严格模式下不报错，但也没有任何效果
console.log(PI);    // 3.14
```

常量在声明时必须立即初始化，否则属于语法错误。常量一旦声明就不能再修改，如果声明和初始化可以分开那就有违这条原则了。

```javascript
const foo;
foo = 1;             // 无效操作，非严格模式不报错
console.log(foo);    // undefined
```

对于复合类型的变量（例如数组和对象），变量名不指向数据，而是指向数据所在的地址。 `const` 命令只是保证变量名指向的地址不变，并不保证该地址的数据不变。使用 `const` 定义的对象和数组，依然可以对其属性和方法进行操作和调用。

```javascript
const foo = {};
foo.prop = 123;
console.log(foo.prop);    // 123
foo = {}                  // 报错

const a = [];
a.push("Hello");          // 可执行
a.length = 0;             // 可执行
a = ["Dave"];             // 报错
```

## 跨模块常量

虽然 `const` 遵循块级作用域，仅在所属的代码块内有效，但通过使用 `export` 和 `import` 命令，我们可以让它在多个模块间共享。模块化的功能是 ES6 带来的一个重要特性，在后续的博客中会再详细介绍。

```javascript
// constants.js 模块
export const A = 1;                          // export 命令设置该常量是可共享的
export const B = 2;                          // 相当于设定了该模块对外的接口
export const C = 3;

// test1.js 模块
import * as constants from './constants';    // import 命令引用其他模块的接口
console.log(constants.A);    // 1
console.log(constants.B);    // 2

// test2.js 模块
import {A, B} from './constants';            // 可以引用全部接口，也可以引用指定的接口
console.log(A);    // 1
console.log(B);    // 2
```

## 暂时性死区 (TDZ, Temporal Dead Zone)

前面说到使用 `let` 声明变量和在 Java/C++ 中一样，必须先声明后使用。在代码块内， `let` 语句之前的部分称为该变量的“暂时性死区”，在该区域内变量是不可用的，直到离开该区域才恢复可用。

只要块级作用域内存在 `let` 语句，则作用域内该变量永远都是引用的它，如果作用域外部有声明过同名变量，在作用域内会被无视。这一点和 Java/C++ 一样：可以在块级作用域内重复定义作用域外的同名变量。

```javascript
var tmp = 123;

if (true) {
  // TDZ开始
  tmp = 'abc';         // ReferenceError
  console.log(tmp);    // ReferenceError

  let tmp;
  // TDZ结束

  console.log(tmp);    // undefined

  tmp = 123;
  console.log(tmp);    // 123
}
```

暂时性死区的存在，也意味着 `typeof` 操作不再百分之百安全，使用 `let` 声明的变量，在声明之前进行 `typeof` 操作会抛出引用错误。这也强制开发者们养成先声明后使用的变成习惯。

```javascript
typeof x;    // ReferenceError
let x;
```

有些“死区”比较隐蔽，不太容易发现，比如下面的代码：

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

调用 `bar()` 之所以报错，是因为参数 `x` 的默认值等于另一个参数 `y` ，而此时 `y` 还没有声明，属于”死区“。如果换一下，让 `x=1, y=x` ，由于 `x` 已经声明过，因此再将其赋值给 `y` 作默认值不会报错。

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

暂时性死区的本质，其实还是块级作用域必须“先声明后使用”的性质。

## 不允许重复声明

 `let` 和 `const` 都不允许在同一作用域内重复声明同名变量，不管后者是用 `var` 、 `let` 还是 `const` 声明的都不行。

需要注意的是，因为这项规定，在函数体的顶层作用域内重新声明参数列表中的参数也是不允许的，但在其嵌套的代码段中声明同名变量并不受影向，因为作用域不同。

```javascript
function func(arg) {
  let arg;        // 报错
}

function func(arg) {
  {
    let arg;    // 不报错
  }
}
```

## 全局对象的属性

在 ES5 中，全局变量其实是全局对象的属性，在 ES6 中，使用 `var` 和 `function` 声明的全局变量依旧作为全局对象的属性，而使用 `let` 、 `const` 和 `class` 声明的全局变量，不属于全局对象的属性，强调其块级作用域。

```javascript
var a = 1;
console.log(window.a);    // 1

let b = 1;
console.log(window.b);    // undefined
```

## 该系列的其他文章

上一篇：[每天一点ES6(1)：概述](/blog/2016/01/24/es6-daily-01-intro)

下一篇：[每天一点ES6(3)：解构赋值](/blog/2016/02/02/es6-daily-03-destructuring)