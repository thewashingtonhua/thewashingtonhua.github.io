---
title: '每天一点ES6(12)：Set 和 Map'
description: '多余的，一概不要'
date: '2017-07-03'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'map', 'set']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
---

## Set，一个独一无二的数组

Set 是 ES6 中新增的一种数据类型，可以理解为一种特殊的数组，重点区别在于 Set 的成员值都是唯一的，绝对不会重复。

```javascript
const s = new Set();
[1, 2, 3, 4, 5, 5, 5, 5].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 1, 2, 3, 4, 5
```

注意到上面代码中最后重复的 5 仅被 `add()` 了一次，重复的值并未被添加。

Set 可以接受一个数组（或其他具有 Iterable 接口的数据结构）作为参数来进行初始化。反过来也可以把 Set 作为参数来初始化一个数组。

```javascript
const s = new Set([1, 2, 3, 3, 3]); // 1, 2, 3
const a = Array.from(new Set([1, 2, 3, 3, 3])); // [1, 2, 3]
```

利用 Set 中的值不会重复的特点，可以用它来对数组进行去重。

```javascript
[...new Set(array)]

// 可以进一步封装为函数
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

向 Set 中添加值时不会进行类型转换，因此 `5` 和 `'5'` 是两个不同的值。Set 内部判断的方式类似于 `===` ，主要区别在于对 Set 而言， `NaN` 等于自身，而 `===` 认为 `NaN` 不等于自身。

### Set 实例的属性和方法

- `size` ：返回实例的成员总数。
- `add(value)` ：添加某个值，返回添加后的 Set。
- `delete(value)` ：删除某个值，返回删除后的 Set。
- `has(value)` ：返回一个布尔值，表示该值时候是 Set 的成员。
- `clear()` ：清除所有成员，没有返回。

 `add()` 和 `delete()` 都会返回修改后的 Set，因此可以链式调用。

Set 是一种特殊的 Object，在定义属性以及属性检测的写法上略有不同，但对 Set 判断类型得到的依然是 Object。

```javascript
typeof (new Set()) // "object"
```

### Set 的遍历

- `keys()` ：返回键名。
- `values()` ：返回值。
- `entries()` ：返回键值对。
- `forEach()` ：使用回调函数遍历。

由于 Set 的结构更接近数组，只有值没有键（或者说键就是值），因此 `keys()` 和 `values()` 都是返回相同的内容，即 Set 的成员数组， `entries()` 返回一个二维数组 `[[k1,v1], [k2,v2], ...]` ，相当于每个成员输出两遍。

在对 Set 进行遍历时，Set 不会对成员进行排序，遍历顺序就是插入顺序。

Set 的实例默认可遍历，遍历时默认使用 `values()` 生成结果，可以直接用 `for...of` 进行遍历，事实上 `...` 运算符内部就是用的 `for...of` 。

 `map()` 和 `filter()` 同样也适用于 Set。

## WeakSet

WeakSet 类似于 Set，但有两点区别：（除此之外和 Set 的使用一样）

- WeakSet成员只能是对象，不能是别的类型（数值、字符串、Symbol）。
- WeakSet中的对象都是弱引用，GC 机制不会考虑 WeakSet 中引用的对象，如果该对象在别处不再被引用，就会被GC，WeakSet中的引用不作数，但内容继续保留，可以访问。

利用 WeakSet 弱引用的特点，可以使用 WeakSet 保存一组临时对象，以及和对象绑定的信息（例如一组 DOM 节点），只要这些对象在外部消失，WeakSet 内部的引用就会自动消失，不会导致内存泄漏。但也正因为这一特性，WeakSet 的成员不适合用作引用，因为会随时消失，WeakSet 中成员的数量会受 GC 的影响，而 GC 运行的时机是不可预测的，所以 ES6 规定 WeakSet 不可遍历，甚至连 `size` 属性也没有。（如果允许遍历，可能刚遍历完成员就没了，甚至遍历到一半就没了）

对 WeakSet 的使用常见的一种错误就是直接用成员不是对象的一维数组去初始化，这与前面提到的 WeakSet 的第一条不同点相违背。

```javascript
const a1 = [[1, 2], [3, 4]];
const a2 = [1, 2, 3, 4];

const w1 = new WeakSet(a1); // [1, 2], [3, 4]
const w2 = new WeakSet(a2); // Uncaught TypeError

// 真正传入的内容不是 a1、a2 本身，而是其各自的成员。
// a1 的成员是数组，数组属于对象，因此两个成员被放入 WeakSet
// a2 的成员是数字，数字不属于对象，因此报错
```

## Map，一个独一无二无所不能的对象

Map 是对 Object 的改进，同样是键值对的结构，Object 中的键只能是字符串，如果试图把一个 DOM 节点用作键，Object 会自动将其转成字符串"[object HTMLDivElement]"，这样一来很容易就会导致命名冲突。Map 支持任何类型的键，换句话说，Object 是“键-值”的映射，Map 是“值-值”的映射

### Map 的操作

- `set(k, v)` ：设置新的属性/覆盖原有属性，返回修改后的 Map（即支持链式调用）
- `get(k)` ：从 Map 中获取指定键对应的值
- `has(k)` ：Map 中是否包含指定的键。
- `delete(k)` ：删除 Map 中指定的键，返回修改后的 Map（即支持链式调用）。
- `clear()` ：清空 Map 中所有的键。
- `size` ：返回 Map 中属性的数量。

Map 支持传入一个二维数组进行初始化，二维数组中的每个元素都是一个"[k, v]"结构的数组。事实上任何实现了 Iterator 接口的数据结构都可以用于生成 Map，包括 Set 和 Map。

由于 Map 中的键可以是任意类型，尤其需要注意对象/数组类型，必须是对同一个对象/数组的引用才会被认为是同一个键，值相等的不同引用会被认为是两个属性（引用的内存地址不同），这会导致两个键看上去一模一样，但实际上却是两个不同的键。

```javascript
const map = new Map();

map.set(['a'], 1);
map.get(['a']); // undefined

const k1 = ['a'];
const k2 = ['a'];
map.set(k1, 2);
map.set(k2, 3);
map.get(k1); // 2
map.get(k2); // 3
```

对于简单类型，只要两者严格相等，就认为是同一个键，NaN 虽然不严格等于自身，但在这儿被视为同一个键。

### Map 的遍历

Map 的遍历和 Set 基本一样，除了不支持 `map()` 和 `filter()` 外。

### Map 的转换

Map 可以和对象、数组、JSON 互相转换，前两者较为方便，对象和数组都可以用于创建 Map，Map 转对象和数组不过是逆过程；和 JSON 互转时可能会需要用对象作为中介。

## WeakMap

WeakMap 和 WeakSet 的存在价值相似，只接受对象作键名、弱引用、无法遍历、没有 `size` 和 `clear()` 。

WeakMap 的设计用于在对象上保存一些不需要参与引用计数的临时数据。注意 WeakMap 弱引用的是键名，键值依然是正常引用。

```javascript
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

### WeakMap 的用途

WeakMap 的一个典型应用场景就是以 DOM 节点作为键名，保存一些监听函数，或是定义一些

## 小结

Set / Map 其实是对 Array / Object 的完善，主要是做了去重。

WeakSet / WeakMap 则是在 Set / Map 的基础上，限制了键名必须是对象，以及限制为弱引用（因而不可遍历、没有 `size` 、没有 `clear()` ）。

ES6 最大的意义，其实就是对各个原始类型和数据结构的完善以及规范化，在该系列的之前几篇文章中，我们已经先后提到了对字符串、正则、数字、数组、函数、对象的完善和规范化，这篇则是对数组和对象这两种数据结构的完善和规范。

## 该系列的其他文章

上一篇：[每天一点ES6(11)：Symbol](./es6-daily-11-symbol)

下一篇：[每天一点ES6(13)：Proxy](./es6-daily-13-proxy-and-reflect)
