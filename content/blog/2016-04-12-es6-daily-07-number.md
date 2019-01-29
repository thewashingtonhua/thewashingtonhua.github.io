---
title: '每天一点ES6(7)：数值的扩展'
description: '每一个数字都不能放过'
date: '2016-04-12'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'number']
cover: '../images/blog/es6daily.jpg'
series: 'es6daily'
---

# 二进制和八进制表示法

ES6 提供了二进制和八进制数的新写法，分别用前缀 `0b` （零必）和 `0o` （零欧）表示。

ES5 开始，严格模式下就不再允许使用前缀 `0` ，ES6 进一步明确必须使用前缀 `0o` 。

如果要将 `0b` 和 `0x` 前缀的字符串数值专为十进制，可以用 `Number()` 方法。

# 旧酒装进了新瓶子

ES6 的一项重要任务，就是对全局函数的整理，将一些全局函数规范化到 `String` 、 `Number` 、 `RegExp` 等原始类型中。

## （1）Number.isFinite()，Number.isNaN()

这两个函数是 ES6 中新增的函数，作为 `Number` 类的方法。在 ES5 中，有两个同名的全局函数，作用其实相同，区别在于 ES5 中的这两个函数会先调用 `Number()` 讲非数值转换为数值后再判断，而两个新的方法值对数只有小，对非数值一律返回false。

## （2）Number.parseInt()，Number.parseFloat()

同样是 ES6 中新增的函数，同样作为 `Number` 类的方法，同样在 ES5 中存在同名的全局函数，但这两个函数的作用和用法并没有改变

# 新增的函数

除了对原有函数的整理，ES6 自然少不了一些新加的语法糖。

## Number.isInteger()

用于判断整数，需要注意的是，JavaScript 内部对整数和浮点数采用一样的存储方式，因此小数点后为0的浮点数同样会被认为是整数。

## Number.EPSILON

这是一个极小的常量，设计用来平衡浮点数的计算误差，如果浮点数计算所得的误差不超过它，则认为是可接受的。

```javascript
Number.EPSILON                  //  2.220446049250313e-16
Number.EPSILON.toFixed(20)      // '0.00000000000000022204'
```

# 安全整数

JavaScript 能准确表示的整数范围为：- 2^53 ~ 2^53，超出这个范围的整数，JavaScript将无法直接表示。ES6 引入了 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 这两个常量，用来表示这个范围的上下限，以及 `Number.isSafeInteger()` 来判断一个整数是否在这个范围内。

```javascript
Number.MAX_SAFE_INTEGER ===  9007199254740991;             //   2^53 - 1
Number.MIN_SAFE_INTEGER === -9007199254740991;             // -(2^53 - 1)
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER;      // true
```

注意，在用 `Number.isSafeInteger()` 判断运算时，要对参与运算的每个值都进行验证，光验证计算结果是不足以说明问题的，因为超过精度范围的数并不是不存在，只是超出部分被截断，只保留精度范围的上下限。

# Math对象的扩展

ES6 在 `Math` 对象上新增了17个静态方法：

## Math.trunc()

取整数部分，小数部分直接截断不舍入，相当于对负数执行 `ceil()` ，对正数执行 `floor()` 。非数值会先经过 `Number()` 转换，空值和无法截取整数的值会返回 `NaN` 。

## Math.sign()

返回一个数的正负，正数返回1，负数返回-1，正负0返回自身，其他值返回 `NaN` 。

## Math.cbrt()

开立方根。

## Math.clz32()

JavaScript 整数采用32位二进制形式表示，该函数返回一个数的32位无符号整数形式有多少个前导零。对于小数， `Math.clz32()` 只考虑去整数部分。clz是Count Leading Zero的缩写。

```javascript
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22，1000的二进制为0...01111101000，前22位都是0
```

 `Math.clz32()` 和左移运算符 `&lt;&lt;` 密切相关，后者会直接影响前者的结果。

## Math.imul()

返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。通常情况下和一般的乘法没有区别，这个函数的意义在于计算结果超过 2^53 时可以正确保留后 32 位的值。

```javascript
(0x7fffffff * 0x7fffffff)|0       // 0
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

## Math.fround()

返回一个数的单精度浮点数形式。对整数而言没有任何不同，主要影响那些无法用64个二进制位精确表示的小数，函数返回最接近这个小数的单精度浮点数。

```javascript
Math.fround(0);     // 0
Math.fround(1);     // 1
Math.fround(1.337); // 1.3370000123977661
Math.fround(1.5);   // 1.5
Math.fround(NaN);   // NaN
```

## Math.hypot()

返回所有参数的平方和的平方根。

```javascript
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
```

## Math.expm1()

 `math.expm1(x)` 返回e^x-1，即 `Math.exp(x) - 1`

```javascript
Math.expm1(-1); // -0.6321205588285577
Math.expm1(0);  // 0
Math.expm1(1);  // 1.718281828459045
```

## Math.log1p()

 `Math.log1p(x)` 返回ln(1+x)，即 `Math.log(1+x)` 。如果 x<-1，返回 `NaN` 。

```javascript
Math.expm1(-1); // -0.6321205588285577
Math.expm1(0);  // 0
Math.expm1(1);  // 1.718281828459045
```

## Math.log10()

 `Math.log10(x)` 返回以10为底的x的对数，即 `Math.log(x) / Math.LN10` 。如果 x<0，返回 `NaN` 。

```javascript
Math.expm1(-1); // -0.6321205588285577
Math.expm1(0);  // 0
Math.expm1(1);  // 1.718281828459045
```

## Math.log2()

 `Math.log2(x)` 返回以2为底的x的对数，即 `Math.log(x) / Math.LN2` 。如果 x<0，返回 `NaN` 。

```javascript
Math.expm1(-1); // -0.6321205588285577
Math.expm1(0);  // 0
Math.expm1(1);  // 1.718281828459045
```

## 双曲函数

| 函数名 | 作用 |
|-|-|
| Math.sinh(x) | 双曲正切 |
| Math.cosh(x) | 双曲余弦 |
| Math.tanh(x) | 双曲正切 |
| Math.asinh(x) | 反双曲正弦 |
| Math.acosh(x) | 反双曲余弦 |
| Math.atanh(x) | 反双曲正切 |

## 指数运算符号**

这是一个 ES7 打算引入的运算符 `**` ，可以和等号连用构成 `**=` 。目前 Babel 已经支持

```javascript
2 ** 3;   // 8

let a=2;
a **= 3;  // 8
```

# 该系列的其他文章

上一篇：[每天一点ES6(6)：正则的扩展](./es6-daily-06-regexp)

下一篇：[每天一点ES6(8)：数组的扩展](./es6-daily-08-array)