---
title: 'substr() 和 substring() 的区别'
description: '两个函数，傻傻分不清楚'
tags: ['javascript', 'substr', 'substring', 'slice']
cover: '../../images/blog/substring.jpg'
---

JavaScript 中有两个非常常用但又非常容易混淆的函数： `substr()` 和 `substring()` ，两者都是 String 类型的方法，作用都是返回目标字符串的一个子串。

关于两者的详细文档可以参考：<a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr'>\[MDN\] String.prototype.substr</a> 和 <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring'>\[MDN\] String.prototype.substring</a>


两者都接收两个参数以控制子串的起止位置。第一个参数作用相同，都表示子串的起点位置，主要区别在于第二个参数： `substr()` 要求获取一个长度len，通过子串的长度来计算截止点，而 `substring()` 则是直接定义终点的位置，从终点开始往后的字符串不被截取。换句话说，前者是“起点+长度”，后者是“起点+终点”。

## substr( start [ , length ] )

- **start**
  1. 介于0（包含）和字符串长度之间的整数，表示从这个字符串开始截取子串；
  2. 若 &ge; 字符串长度，则返回空字符串；
  3. 若 &lt; 0，则从右起计数；
  4. 若 &lt; 0且绝对值超过字符串长度的，视为0；
- **length（可选）**
  1. 介于0（包含）和剩余字符串长度之间的整数，表示最大截取该长度的字符串作为子串；
  2. 若超过剩余字符串长度，则截取到字符串结束，超出部分不计；
  3. 若 &le; 0，返回空字符串；
  4. 若不指定，则默认从start截取到字符串末尾；

举几个例子：
```javascript
var str = "abcgefghij";

console.log('(1, 2): '   + str.substr(1, 2));   // '(1, 2): bc'
console.log('(-3, 2): '  + str.substr(-3, 2));  // '(-3, 2): hi'
console.log('(-3): '     + str.substr(-3));     // '(-3): hij'
console.log('(1): '      + str.substr(1));      // '(1): bcdefghij'
console.log('(-20, 2): ' + str.substr(-20, 2)); // '(-20, 2): ab'
console.log('(20, 2): '  + str.substr(20, 2));  // '(20, 2): '
```

## substring( start [ , end ] )

- **start**
  1. 介于0（包含）和字符串长度之间的整数，表示从该字符串开始截取子串；
  2. 若 &ge; 字符串长度，则返回空字符串；
- **end（可选）**
  1. 介于0（包含）和字符串长度之间的整数，表示从该字符开始不再被截取；
  2. 若 &gt; 字符串长度，则自动指定为字符串末尾；
  3. 若不指定，则自动指定为字符串末尾；
- **特殊情况**
  1. 任一参数 &lt; 0，或为 NaN，则将其视为0；
  2. 若 start == end，则返回空字符串；
  3. 若 start &gt; end，则两者交换数值；

举几个例子：
```javascript
var str = 'abcdefg';

// Displays 'abc'
console.log(str.substring(0, 3));
console.log(str.substring(3, 0));

// Displays 'efg'
console.log(str.substring(4, 7));
console.log(str.substring(7, 4));

// Displays 'abcdef'
console.log(str.substring(0, 6));

// Displays 'abcdefg'
console.log(str.substring(0, 7));
console.log(str.substring(-2, 7));
console.log(str.substring(0, 10));
```

## 永恒的字符串

和许多其他编程语言一样，JavaScript 中的字符串也是不可改变的， `substr()` 和 `substring()` 都只是返回子串，要想保存结果还需要单独定义变量，否则就能即时输出一下。

## 跨界好基友 slice( start [ , end ] )

除了本文的两个主角，JavaScript中还有一个函数也可用于获取子串，那就是主角们的好基友 `slice()` ，而之所以说它“跨界”，是因为 `slice()` 函数在 String 和 Array 类中都有定义。

 `slice()` 函数有点像是 `substr()` 和 `substring()` 的杂合体：它的标记方式和 `substring()` 一样，通过标记起点和终点来进行子串的截取，但当任意参数为负数时，并不视其为 0，而是从字符串末尾往前倒推，这一点却和 `substr()` 很像。（注意： `slice()` 的两个参数都是这样，而 `substr()` 只有第一个参数可以这样，）。同样的，第二个参数是可选的，不指定、或超出字符串长度时，默认截取到字符串末尾。并且，因为两个参数都是介于 0（包含）和字符串长度之间的，所以当第一个参数大于第二个参数时，并不会发生交换，而是返回空字符串。

 `slice()` 在数组中的表现也是一样的，只不过操作对象变成了数组元素，不过JavaScript中字符串和数组本来就傻傻分不清楚，因此这里也不难理解其原理。

## 为什么要有 3 个

 `substr()` 、 `substring()` 、 `slice()` 分别提供了3中不同的截取字符串的思路，分别是：根据长度、从正向确定起止位置、从两端确定起止位置，开发人员可以根据需要灵活地选择最方便的用法。