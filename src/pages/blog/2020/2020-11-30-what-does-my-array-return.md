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

日常开发中，我们经常会用到一些 Array.prototype 上的函数对数组进行操作，比如：map、filter、reduce，都是出场率非常高的。每每用到这些函数，我都会思考一个问题：这个函数是会返回一个新数组，还是会修改数组自身？这是个非常细节，同时又非常重要的点，一旦弄错了，很可能会修改到我们不希望动到的数据。

好记性不如烂笔头，与其每次去想、去翻 MDN，不如自己来整理一遍，好好复习一下，顺带做个速查。虽然本文的内容基本就是对 MDN 上资料的二次整合，但怎么来的不重要，重要的是我们得到了想要的内容。

注意：本文只讨论可以对数组进行修改，切返回内容依然为数组的方法，其它数组相关的内容不在本文讨论范围内，如：

- `toString()`、`join()` 等返回 String 的方法
- `some()`、`every()`、`includes()` 等返回 Boolean 的方法
- `indexOf()`、`findIndex()` 等返回 Number 的方法
- `find()` 等可能返回 Object 的方法
- `keys()`、`values()`、`entries()` 等只读不修改的方法
- `name`、`length` 等制度不修改的属性

## 返回新数组的方法

### Array.prototype.concat()

> The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
>
> 合并两个或多个数组。该方法不会改变已有的数组，而是返回一个新数组。

虽然 concat() 作用于某个数组实例，但它并不会修改这个实例，这是最容易让人迷惑的点。

```typescript
const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];

const numbers = num1.concat(num2, num3);

console.log(numbers, num1, num2, num3);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]
```

### Array.prototype.filter()

> The filter() method creates a new array with all elements that pass the test implemented by the provided function.
>
> filter() 方法创建一个新数组，数组的内容是通过指定函数验证的所有元素。

非常常用的方法，用于按条件进行筛选，并形成新的结果集。记住这一点很有用。

```typescript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

### Array.prototype.flat()

> The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
>
> flat() 方法创建一个新的数组，内容为其所有子数组元素被拍平指定深度后再连接起来。

flat() 是一个非常有破坏性的操作，会直接改变数组的层级结构，因此它会返回新数组理所当然。

```typescript
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]
```

### Array.prototype.flatMap()

> The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately.
>
> flatMap 会返回一个新数组，内容是将原数组的每一个元素用指定函数进行一次映射，然后再向下拍平一级。相当于先做一次 map() 再做一次 flat(1)，只是比它们的组合略微高效一些。

flatMap 相当于 map + flat，两者都会创建新数组，合到一起更是理所当然。

## 修改数组自身的方法

### Array.prototype.copyWithin()

> The copyWithin() method shallow copies part of an array to another location in the same array and returns it without modifying its length.
>
> copyWithin() 方法将数组的一部分浅拷贝到同一个数组的另一个位置，返回自身且不改变数组长度。

函数名中特意加上了 Within 的字样，充分说明了它所有的改变都会被内部消化的特点。

```typescript
const array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```

### Array.prototype.fill()

> The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
>
> fill() 方法把数组中的所有元素都改为一个静态的值，允许指定起始所以位置（默认从 0 到数组结束），并返回修改后的数组。

墙上的砖块被重新「填充」颜色后，肯定还是原来的砖块，不会产生新的砖块，这一点很符合常识，

```typescript
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4), array1);
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1), array1);
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6), array1);
// expected output: [6, 6, 6, 6]

```

### Array.prototype.forEach()

> The forEach() method executes a provided function once for each array element.
>
> forEach() 为数组的每一个元素依次执行一遍指定的函数

严格说来 forEach 并不一定改变数组自身，它只是单纯地读取数组元素进行一次循环，它甚至未必会碰到数组，一切都取决于传入的函数是否对会数组做什么。如果在循环过程中函数对数组进行了修改，那么下一个循环就会读取到新的值。

但可以确定的是，forEach 函数本身的返回是 undefined，并不是一个数组，因此这里我们把它算作修改数组自身。

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
