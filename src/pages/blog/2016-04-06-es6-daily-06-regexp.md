---
title: '每天一点ES6(6)：正则的扩展'
description: '四字节 Unicode 的春天'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'regular', 'expression', 'regexp']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 终于这回不打脸了

难得日更了，这一回来讲正则。当然，这不是正则的基础教学，我们只关心 ES6 为 JavaScript 的正则带来的变化。

## RegExp 构造函数

ES5 中，构造函数 `RegExp()` 的参数有两种形式：

```js
var regexp = new RegExp('xyz', 'i');    // 字符串 + 修饰符
var regexp = new RegExp(/xyz/i);        // 带修饰符的正则

// 以上两种写法都等价于
var regexp = /xyz/i;
```

ES6 提供了一种新的写法，提供带修饰符的正则的同时，还能通过第二个参数来覆盖修饰符的内容。

```js
var regexp = new RegExp('/xyz/ig', 'i');    // 第一个参数中的正则的修饰符会被忽略，用第二个参数覆盖
```

## 更规范的方法定义

在使用正则的同时，必然会带有一个字符串。我们熟悉的 `match()` ， `replace()` ， `search()` 和 `split()` 等方法都是 `String` 类的方法。

ES6 对其做了一步规范化，将这些函数的实现全部移到了 `RegExp` 类上， `String` 类对象调用这些方法时，实际上都将会调用 `RegExp` 类的对应方法。

## 新修饰符：u

“u”表示“Unicode模式”，用于正确处理四字节的UTF-16编码

```js
/^\uD83D/u.test('\uD83D\uDC2A');  /* false */
/^\uD83D/.test('\uD83D\uDC2A');   /* true */
```

上面的代码中， `\uD83D\uDC2A` 是一个四字节的UTF-16编码，代表一个字符。不加“u”，会按 ES5 将其识别为2个字符，加了“u”之后，会按 ES6 将其正确识别为一个字符。

别看这小小的改动，影响的东西还是挺多的，以下几种情况就必须加上“u”才能正确识别：

### 1. 通配符

 `.` 在正则表达式中表示出换行符外的任意单个字符， `\S` 表示匹配所有不是空格的字符。对于四字节字符，它们是无法正确识别的，必须加上 `u` 修饰符。

```js
var s = '𠮷';

/^.$/.test(s);  // false
/^.$/u.test(s); // true
```

### 2. ES6 新增的 Unicode 字符表示法

ES6 新增了使用花括号表示 Unicode 字符的写法，这种写法必须加上 `u` 修饰符才能识别，否则会被识别为正则表达式中的量词。例如下面的 `/\u{61}/` ，本意是想匹配“a”，但因为没有加 `u` ，只能被识别为匹配61个连续的“u”。

```js
/\u{61}/.test('a')      // false
/\u{61}/u.test('a')     // true
/\u{20BB7}/u.test('𠮷') // true
```

### 3. i 修饰符

有些Unicode字符的编码不同，但字型很相近，需要加 `u` 才能识别

```js
/[a-z]/i.test('\u212A');  // false
/[a-z]/iu.test('\u212A'); // true
```

## 新修饰符：y

和修饰符 `y` 类似，都是全局匹配，后一次从上一次匹配成功的下一位置开始继续匹配。区别在于， `g` 只要剩余部分中存在匹配即可，而 `y` 要求必须从剩余部分的第一个位置开始。所谓“粘连”就是这个意思，其设计用途就是让头部匹配标志 `^` 在全局匹配中都有效。

```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

// 第一次匹配都成功
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null，剩余部分第一个位置是下划线，不匹配
```

若在 `split()` 中使用 `y` 修饰符，则原字符串必须以分隔符开头才有可能匹配成功，且匹配成功所得数组的第一个元素肯定是空字符串。 `replace()` 等方法也是类似。

## sticky 属性

这是 ES6 新增的 `RegExp` 类的属性，用于表示正则对象是否设置了 `y` 修饰符

## flags 属性

ES6 为正则表达式新增了 `flags` 属性，返回正则表达式的修饰符。要返回正则表达式的正文，则需要 `source` 属性，这是 ES5 中就已经存在的属性。
