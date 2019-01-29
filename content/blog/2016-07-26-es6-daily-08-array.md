---
title: '每天一点ES6(8)：数组的扩展'
description: '别拿语法糖不当干粮'
date: '2016-07-26'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'array']
cover: '../images/blog/es6daily.jpg'
series: 'es6daily'
---

# 久违了的更新

不知不觉几个月就过去了，终于想到要更新了，下一次又不知道要等到什么时候了，毕竟连猴年马月都过去了……

这一回我们来说说 ES6 中的数组。其实数组方面并没有太多实质性的改变，更多的是一些语法糖，对 ES5 语法的小修小补，虽没有惊天地泣鬼神的黑科技，但有糖吃总不是什么坏事。

# Array.from()

用于将类数组对象和ES6中的“可遍历对象”转换为真正的数组，事实上只要是部署了Iterator接口的数据结构都可以被 `Array.from()` 转换为真正的数组。

```javascript
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// ES5
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6
let arr2 = Array.from(arrayLike);    // ['a', 'b', 'c']

// 字符串返回拆解后的数组
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

// 纯数组返回自身
Array.from([1, 2, 3])
// [1, 2, 3]

// 另类的循环重复
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']

// 字符串转数组后返回长度，能正确处理双字节Unicode字符
function countSymbols(string) {
  return Array.from(string).length;
}
```

需要注意的是，类数组对象区别于普通对象的本质区别在于 `length` 属性，因此任何具有 `length` 属性的对象理论上都能被该方法转成数组。

 `Array.from()` 还可以接受一个回调函数作为第二个参数，类似 `Array.map()` 的效果。配合 ES6 新引入的箭头函数，可以让代码优雅很多，免除了额外的 `forEach()` 和 `map()` 。

# Array.of()

将参数列表中的元素组合成一个数组，主要目的是为了解决 `Array()` 构造函数接受到不同个数的参数时行为不一致的问题。

```javascript
// Array() 面对不同个数的参数行为不统一
Array()             // []
Array(3)            // [, , ,]
Array(3, 11, 8)     // [3, 11, 8]

// Array.of() 单纯返回参数列表中元素组成的数组，面对不同个数的参数行为完全统一
// 可以用它来代替 new Array()
Array.of()          // []
Array.of(3)         // [3]
Array.of(3, 11, 8)  // [3,11,8]

// ES5 的实现
function ArrayOf () {
  return [].slice.call(arguments);
}
```

# copyWithin(target, start=0, end=this.length)

该方法用于在数组内部进行覆盖替换，第一个参数指定被替换内容的开始位置，后两个参数指定用于替换的内容的起止位置（注意end表示从这个索引开始不作为替换内容），皆为可选，负数表示倒过来数。

```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位（开始到结束的内容）复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

# find() & findIndex()

 `find()` 用于在数组中筛选出第一个符合条件的元素，参数为一个回调函数，指定筛选条件，对数组成员挨个执行该函数，返回第一个满足条件的元素， 找不到则返回 `undefined`

 `findIndex()` 和 `find()` 用法相同，但返回的是第一个满足条件的元素的索引，找不到则返回-1

这两个方法还弥补了 `indexOf()` 无法处理 `NaN` 的不足。

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

[NaN].indexOf(NaN)                       // -1
[NaN].findIndex(y => Object.is(NaN, y))  // 0
```

# fill()

该方法使用给定值填充数组，可用于空数组的初始化，第一个参数是用于填充的内容，可选低2、3个参数指定填充的起止位置

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

# keys()、values()、entries()

返回一个数组遍历器对象，内容分别为数组的索引、数值、键值对，可以用 `for...of` 遍历

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

# includes()

用于检测数组中是否包含指定项，接受第二个参数作为开始位置，负数表示倒过来数。该函数可作为 `indexOf()` 的替代品，更加语义化，且能够良好的处理 `NaN` 。

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true

[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

# 数组的空位

指的是数组中不含任何值的位置（undefined也是有效值，不算空位），ES5 中的数组方法在处理空位时的行为非常不一致，ES6 统一将空位视为 `undefined` ，更加标准化。当然最理想的方案还是尽可能的避免空位的产生。

# flat()、flatMap()

`flat` 用于将一个多维数组拉平到更低的维度，默认向下拉平一层，可以传入一个正整数表示需要降维多少层。`flat` 最多只能把数组拉平到一位数组，如果传入的参数比数组维度更高，也不会又额外的作用，传入 Infinity 可以拉平一切数组（数组中的对象不会被展开，还是对象）

`flatMap` 相当于先对数组执行 `map()` ，在对新数组执行一层 `flat()` ，注意只有拉平一层，没得选。`flatMap` 可以接受两个参数，第一个参数和 `map` 一样是个遍历函数，第二个参数是一个可选的 `this` ，用来绑定遍历函数中的 `this` 。

# 该系列的其他文章

上一篇：[每天一点ES6(7)：数值的扩展](./es6-daily-07-number)

下一篇：[每天一点ES6(9)：函数的扩展](./es6-daily-09-function)