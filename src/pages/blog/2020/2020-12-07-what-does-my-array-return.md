---
title: '我的数组返回了啥'
description: '功夫再高，一针下去也得倒'
tags: ['javascript', 'array']
cover: '../../../images/blog/array.jpg'
series: ''
draft: false
original: true
---

今天我们来聊一个非常基础，但又很容易忘记的知识点：数组的返回值。

日常开发中，我们经常会用到一些 Array.prototype 上的方法对数组进行操作，比如：map、push、sort 等，都是出场率非常高的。每每用到这些方法，我都会去回想一个问题：这个方法是会返回一个新数组，还是会修改数组自身？这是个非常细节，同时又非常重要的点，一旦弄错了，很可能会修改到我们不希望动到的数据。

好记性不如烂笔头，与其每次去想、去翻 MDN，不如自己来整理一遍，好好复习一下，顺带做个速查。

虽然本文的内容基本就是对 MDN 上资料的二次整合，但怎么来的不重要，重要的是我们得到了想要的内容。

【注1】本文只讨论名称涉及数组变更的方法，其它数组相关的属性（如：显然只读的；仅作判断、查找、格式化输出的；）不在本文讨论范围内，如：

- `toString()`、`join()` 等只读且返回 String 的方法
- `some()`、`every()`、`includes()` 等只读且返回 Boolean 的方法
- `indexOf()`、`findIndex()` 等只读且返回 Number 的方法
- `find()` 等只读且返回 Object 的方法
- `keys()`、`values()`、`entries()` 等只读方法
- `name`、`length` 等只读属性

【注2】本文只讨论符合方法用途定义的常规用法，诸如在回调函数中直接修改数组导致结果变化的操作不在本文讨论范围内。

## 原数组不变，返回新数组

- [Array.prototype.concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [Array.prototype.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [Array.prototype.flatMap()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.reduceRight()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
- [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

## 修改原数组，并返回修改后的数组

- [Array.prototype.copyWithin()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
- [Array.prototype.fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.prototype.reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 修改原数组，并返回修改后的数组长度

- [Array.prototype.push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Array.prototype.unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

## 修改原数组，并返回被修改的数组元素

- [Array.prototype.pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [Array.prototype.shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## 留神：藕断丝连的陷阱

日常工作中，我们大部分时候需要处理的都是对象数组。尽管 map、filter 等方法会为我们返回一个新数组，但这个过程默认是执行的浅拷贝，即新老数组的元素引用的是同一个对象，修改新数组中的元素会间接影响到老数组。

因此，在处理对象数组的时候要尤其当心。如果你只是读取数据源，或对其进行一些筛选和格式化，那一般不用担心，浅拷贝不会影响最终结果，甚至可能还对性能表现有帮助。但如果你需要对数组的内容进行修改，请千万注意要做深拷贝。
