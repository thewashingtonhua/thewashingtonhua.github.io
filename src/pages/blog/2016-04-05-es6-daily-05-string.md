---
title: '每天一点ES6(5)：字符串的扩展'
description: '不变的字符串现在更加多变了'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'string']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
---

## 继续打脸

呵呵呵呵呵，现在这个系列已经正式沦落为连作者也不知道啥时候更的节奏了……

这次来讲讲字符串，ES6对 `String` 类扩展了一些函数，使得操作字符串更加的便捷，一些以往必须借助额外的 Javascript 代码才能实现的效果，现在有了现成的函数。

## 改进的 Unicode 表示法

JavaScript 允许使用 `\uxxxx` 的形式表示一个字符，但在 ES6 之前，单个码点仅支持 `\u0000` 到 `\uFFFF` ，超出该范围的必须用双字节形式表示，否则会解析错误。ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符，不受限于4位。例如下面的写法就是合法的，能够被正确解析：

```javascript
"\u{20BB7}"  // "𠮷"
```

## codePointAt()

JavaScript 中，1 个字符固定为 2 个字节，对于需要 4 个字节存储的字符会被认为是 2 个字符， `length` 会判定为2， `charAt()` 无法读取整个字符， `charCodeAt()` 只能分别返回前后各两个字节的值。

ES6 提供了  `codePointAt()` ，能够正确处理 4 个字节存储的字符，返回一个字符的码点。但需要注意的是，这并没有改变 JavaScript 将 2 个字节视为1个字符的事实，只是自动识别出了这是个 4 字节的字符并返回了正确的码点而已，对于单个4字节的字符来说， `charPointAt(0)` 返回完整字符的十进制码点， `charPointAt(1)` 返回这个字符的后2个字节的十进制码点，效果等同于 `charCodeAt(1)` 。

为了处理这种“不合理”的索引，可以借助 `for...of` 循环，它会正确识别 32 位的UTF-16字符。

```javascript
var s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// "20bb7"
// 不可打印
```

可以利用 `charPointAt()` 来判断一个字符是双字节的还是四字节的：

```javascript
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```

## String.fromCodePoint()

作用和 `charPointAt()` 相反，从四字节码字得到一个完整字符，解决了 ES5 中 `fromCharCode()` 只能识别双字节的问题。

需要注意的是， `fromCharPoint()` 定义在 `String` 对象上，而 `codePointAt()` 定义在字符串的实例对象上。

## at()

ES5 提供了 `charAt()` 方法，用于提取字符串中指定位置的字符，但同样存在无法处理四字节字符的问题，ES6 中有一个提案给出了 `at()` 来处理该问题。

## normalize()

Unicode 提供了两种方式来表示重音和音标等符号，一种是将带重音符号的字符单独作为一个字符，设定一个码点，另一种是提供单独的重音符号的码点，和普通字符合成一个四字节的字符。两种方法在视觉和语义上都没有差别，但JavaScript并不能将它们识别为相同的内容。

ES6 提供了字符串实例的 `normalize()` ，用来将字符的不同表示方式统一为相同的形式，这个过程称为“Unicode正规化”。 `normalize()` 接受一个参数作为判定规则，可选的值有4个：

- NFC （标准等价合成）：视觉和语义上等价，返回合并后的字符（默认值）
- NFD （标准等价分解）：视觉和语义上等价，返回拆分后的字符
- NFKC（兼容等价合成）：语义上等价，但视觉上不等价，返回合并后的字符
- NFKD（兼容等价分解）：语义上等价，但视觉上不等价，返回拆分后的字符

目前 `normalize()` 还不能识别中文（比如“囍”和“喜喜”），以及三个及以上字符的合成。

## includes(), startsWith(), endsWith()

在 ES6 之前，要想确定一个字符串是否包含某个子串，只能用 `indexOf()` 。ES6 提供了三个新的方法来进行检索： `includes()` ， `startsWith()` ， `endsWith()` ，各自的作用看名字就知道了。三个方法都支持第二个参数，表示开始搜索的索引位置。（ `endsWith()` 比较特别，它的第二个参数表示前 n 个字符是否以第一个参数结尾）

## repeat()

ES6 提供了原生函数用于重复字符串，方法接受一个非负整数用于指定重复次数，不小于-1的负数和NaN会被视为0，正小数会被向下取整，Infinity是不可取的，会报错，字符串会先试图转换成数字。

## padStart(), padEnd()

这其实是 ES7 计划中的一部分，如果一个字符串不够指定长度，则对其进行填充以补足长度。方法接受两个参数，第一个参数是目标长度，如果字符串长度达不到这里指定的值，则进行补齐，否则啥也不做直接返回原字符串。第二个参数适用于补齐的内容（默认为空格），内容的长度未必刚好，不够的会重复，超出的会截断

## 模板字符串

通常我们要用 JavaScript 输出一些 HTML 时，会这样写：

```javascript
$("#result").append(
  "There are <b>" + basket.count + "</b> "
  + "items in your basket, "
  + "<em>" + basket.onSale + "</em> are on sale!"
);
```

倒不是说上面这种写法有什么问题，只是比较繁琐。ES6 带来了更方便的写法：

```javascript
$("#result").append(`
  There are <b>${basket.count}</b> items
  in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

ES6 中通过反引号 ``` 标记模板字符串，这是一种增强型的字符串，可以当做普通字符串一样使用，同时还支持定义多行字符串，或以 `${obj.prop}` 的形式在字符串中嵌入表达式，表达式中可以包含变量、函数调用等各种 JavaScript 语句，嵌入的内容最终会被转换为字符串。（PHP中也有类似的写法，注意区分： `{$obj['prop']}` ）

如果需要引用模板字符串本身，只需在其外部用引号包裹即可。

## 标签模板

模板字符串可以紧跟在一个函数名后面，这个函数会被调用来处理这个模板字符串。

```javascript
var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
```

上面代码中的 `tag` 其实是一个函数名，可以取任意有效的变量名，虽然它长得并不像个函数。整个表达式的返回值就是 `tag` 函数处理模板字符串后的返回值。

事实上， `tag` 函数依次接收了多个参数，第一个参数是个数组，数组的内容是模板字符串中除了花括号表达式以外的内容。从第二个参数起就是花括号表达式计算的结果。换言之，上面代码实际上相当于：

```javascript
tag(['Hello ', ' world ', ''], 15, 50)
```

这里 `tag` 函数的实现是自定义的，在调用之前我们需要先定义它的行为，通常我们使用一个更加语义化的函数名。
```javascript
function hello(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

var a = 5, b = 10;

hello`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"
```

标签模板被设计用来对输入进行过滤和处理，例如：过滤用户的非法输入、多语言国际化等，虽然不及 Mastache 来得强大，但很多功能都可以通过标签进一步实现，标签模板还能很好的和 React，甚至是 Java 等语言共用。

## String.raw()

ES6 中新增的 `String` 类的原生方法，用于返回一个连转义符号本身也被转义的最“原始”的字符串。该方法常用于处理模板字符串。其具体实现为：

```javascript
String.raw = function (strings, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

和标签模板非常类似，但这是一个更加“正常”的函数。 `String.raw()` 的第一个参数必须是一个具有 `raw` 属性的对象，其值为一个数组或类数组对象。

## 该系列的其他文章

上一篇：[每天一点ES6(4)：Babel](/blog/2016/02/19/es6-daily-04-babel)

下一篇：[每天一点ES6(6)：正则的扩展](/blog/2016/04/06/es6-daily-06-regexp)