---
title: '我的数组返回了啥'
description: '功夫再高，一针下去也得倒'
tags: ['javascript', 'array']
cover: '../../../images/blog/array.jpg'
series: ''
draft: true
original: true
---

今天我们来聊一个非常基础，但又很容易忘记的知识点：数组的返回值。

日常开发中，我们经常会用到一些 Array.prototype 上的函数对数组进行操作，比如：map、push、sort，都是出场率非常高的。每每用到这些函数，我都会思考一个问题：这个函数是会返回一个新数组，还是会修改数组自身？这是个非常细节，同时又非常重要的点，一旦弄错了，很可能会修改到我们不希望动到的数据。

好记性不如烂笔头，与其每次去想、去翻 MDN，不如自己来整理一遍，好好复习一下，顺带做个速查。虽然本文的内容基本就是对 MDN 上资料的二次整合，但怎么来的不重要，重要的是我们得到了想要的内容。

注意：本文只讨论可以对数组进行修改，且返回内容依然为数组的方法，其它数组相关的内容不在本文讨论范围内，如：

- `toString()`、`join()` 等返回 String 的方法
- `some()`、`every()`、`includes()` 等只读且返回 Boolean 的方法
- `indexOf()`、`findIndex()` 等只读且返回 Number 的方法
- `find()` 等只读且返回 Object 的方法
- `keys()`、`values()`、`entries()` 等只读方法
- `name`、`length` 等只读属性

## TL,DR;

**原数组不变，返回新数组**

- Array.prototype.concat()
- Array.prototype.filter()
- Array.prototype.map()
- Array.prototype.reduce()
- Array.prototype.reduceRight()
- Array.prototype.flat()
- Array.prototype.flatMap()

**修改原数组，并返回修改后的数组**

- Array.prototype.copyWithin()
- Array.prototype.fill()
- Array.prototype.forEach()
- Array.prototype.reverse()
- Array.prototype.sort()

**修改原数组，并返回修改后的数组长度**

- Array.prototype.push()
- Array.prototype.unshift()

**修改原数组，并返回被修改的数组元素**

- Array.prototype.pop()
- Array.prototype.shift()

## 创建一个函数的 N 种方法

### Array.from()

```typescript
Array.from('foo')
// ["f", "o", "o"]

Array.from([1, 2, 3], x => x + x)
// [2, 4, 6]，注意这里只是浅拷贝
```

## 注意对象的引用

### 数组解构
