---
title: '每天一点ES6(3)：解构赋值'
description: '让你一次赋个够'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'destructuring']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 什么叫解构

所谓 **解构（Destructuring）** ，就是把数组或对象打散为一堆变量。

解构是 **构造（Constructuring）** 的逆过程，想象一下我们熟悉的构造函数，其实就是把一堆变量组合成一个对象或数组。

而 **解构赋值** ，就是把解构的结果赋值给其它的变量，这个过程通常是多对多的，看上去就像是把一个数组或对象直接赋值给另一个数组或对象一样。（然而这并不表示对象和数组可以直接赋值，只是看着像而已）

## 数组的解构赋值

ES6 支持对数组进行解构赋值，它会根据索引顺序进行模式匹配，写法如下。

```js
var [a, b, c] = [1, 2, 3];
var a = 1, b = 2, c = 3;    // 上面的代码等价于这行代码
```

数组的解构赋值根据索引顺序一一对应，如果左边变量的索引在右边的数组中存在，则将右边该索引位置的值赋给左边的变量，如果右边数组中没有对应的索引，则该索引位置的解构失败，左边的变量赋值为undefined（或使用默认值，后面会讲到）。

```js
// 右边比左边少，空缺位解构失败
let [foo]       = [];                // foo: undefined
let [bar, foo]  = [1];               // foo: undefined

// 右边比左边多，多余部分舍去
let [x, y]      = [1, 2, 3];         // x:1, y:2
let [a, [b], d] = [1, [2, 3], 4];    // a:1, b:2, d:4
```

数组的解构赋值要求等号右边必须是数组（ES6引入了Iterator接口的概念，因此这里严格说来是指等号右边必须是可遍历的结构），否则报错。

```js
// 原始变量的包装对象不具备Iterator接口
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;

// 空对象不具备Iterator接口
let [foo] = {};

// Set是ES6引入的集合类，具备Iterator接口，可以用于解构赋值
let [x, y, z] = new Set(["a", "b", "c"]);    // x: "a"

// Generator是ES6引入的函数类型，具备Iterator接口，可以用于解构赋值
// yield在Generator中相当于return，后续文章会详细说明。
function* fibs() {
  var a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];    // 函数内部的解构赋值。
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();    // sixth: 5
```

在之前的代码中，解构赋值通常都和 `let` 一起出现，但解构赋值和变量声明其实是两个独立的操作，我们只是将解构的结果直接用于新变量的初始化了而已。无论是 `var` 、 `let` 、 `const` 都可以使用，如果变量已经存在就不需要用到它们。

### 嵌套

数组的解构赋值支持嵌套，只要等号两边对应位置的结构相同即可。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];     // foo:1, bar:2, baz:3

// 左边有空缺不要紧，空缺位会自动跳过
let [ , , third] = ["foo", "bar", "baz"];    // third:"baz"
let [x, , y]     = [1, 2, 3];                // x:1, y:3

// "...x"是ES6新增的语法糖“剩余参数”，后续文章会详细说明。
let [head, ...tail] = [1, 2, 3, 4];          // head:1, tail:[2, 3, 4]
let [x, y, ...z]    = ['a'];                 // x:'a', y:undefined, z:[]
```

### 默认值

解构赋值可以设置默认值。

```js
var [foo = true] = [];                 // foo: true

var [x, y = 'b'] = ['a']               // x:'a', y:'b'
var [x, y = 'b'] = ['a', undefined]    // x:'a', y:'b'

// 仅当等号右边的元素是undefined时，默认值才起效
var [x = 1] = [undefined];             // x:1
var [x = 1] = [null];                  // x:null

function f() { console.log('aaa'); }
let [x = f()] = [1];                   // 右边不等于undefined，因此f()不会调用。x：1
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = [];     // x:1, y:1
let [x = 1, y = x] = [2];    // x:2, y:2
let [x = 1, y = x] = [2, 3]; // x:2, y:3
let [x = y, y = 1] = [];     // ReferenceError，x引用y的值时，y还没声明
```

## 对象的解构赋值

解构赋值也可以用于对象，区别在于对象的解构根据属性名进行映射，与顺序无关。

```js
var { bar, foo } = { foo: "aaa", bar: "bbb" };    // foo:"aaa", bar:"bbb"
var { baz }      = { foo: "aaa", bar: "bbb" };    // baz:undefined
```

对象解构赋值的内部机制，是先找到同名属性，然后用等号右边的属性值给左边对应的属性值赋值。真正被赋值的是冒号右边的属性值，而不是左边的属性名。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };    // baz:"aaa", foo:not defined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;                  // f:'hello', l:'world'
```

对象的解构赋值其实是下面形式的简写。

```js
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };    // 完整形式
var { foo     , bar      } = { foo: "aaa", bar: "bbb" };    // 简写形式
```

### 嵌套

对象的解构赋值同样支持嵌套，并且可以和数组混合嵌套。

```js
var obj = {
  p: [
    "Hello",
    { y: "World" }
  ]
};

var { p: [x, { y }] } = obj;    // x:"Hello", y:"World", p是属性名，不参与赋值
```

### 默认值

对象的解构赋值同样支持默认值。默认值仅当右边找不到同名属性，或同名属性值为undefined时起效

```js
var {x, y = 5} = {x: 1};        // x:1, y:5

var {x = 3} = {x: null};        // x:null
var {x = 3} = {x: undefined};   // x:3
```

如果左边的属性在右边没有同名属性，又没有指定默认值，则解构失败，值为undefined

```js
var {foo} = {bar: 'baz'}    // foo:undefined
```

如果解构模式是嵌套的对象，子对象所属的父属性不存在，则即便右边同名属性的值不是undefined，也依旧会报错。

```js
var {foo: {bar}} = {baz: 'baz'}    // Error

var _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错，foo属性值为undefined，再取子属性自然报错。
```

如果要将一个已经声明的变量用于解构赋值，必须用括号包裹，不能让花括号处于行首。例如下面的代码，JS引擎会把 `{x}` 理解为一个代码段，进而导致语法错误。

```js
var x;
 {x} = {x: 1};     // 语法错误
({x} = {x: 1});    // 正确的写法
```

解构赋值允许等号左边为空。下面的代码虽然毫无意义，但在语法上却是合法的。

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

利用对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
let { log, sin, cos } = Math;    // Math类中包含了这几个方法，该操作将这几个方法提取出来
```

## 字符串的解构赋值

字符串作为类数组对象，同时具备了数组和对象的特性，因此可以用两种方式进行解构赋值。

```js
// 字符串可以看做数组进行结构
const [a, b, c, d, e] = 'hello';    // a:"h", b:"e", c:"l", d:"l", e:"o",

// 字符串作为类数组对象，拥有length属性。
let {length : len} = 'hello';       // len:5
```

## 数值和布尔值的解构赋值

数值和布尔值也能进行解构，两者会先转为对象，剩下的就是匹配对象中的方法

```js
let {toString: s} = 123;
s === Number.prototype.toString  // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

// undefined和null不能转为对象，没有属性
let { prop: x } = undefined;     // TypeError
let { prop: y } = null;          // TypeError
```

## 函数参数的解构赋值

函数的参数也可以使用解构赋值。下面的代码中， `add()` 的参数不是数组，而是 `[x,y] = [1,2]` 的解构，在函数内部，x和y可以直接访问，不需要索引。

```js
function add([x, y]){
  return x + y;
}

add([1, 2]) // 3
```

函数参数的解构也可以使用默认值。

```js
function move({x = 0, y = 0}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3});       // [3, 0]，y使用默认值
move({});           // [0, 0]，空对象，x、y均使用默认值
move();             // [0, 0]，无参调用，x、y均使用默认值
```

注意，下面的写法不是解构赋值，而是给函数的参数设定默认值，只有在无参调用时默认值才起效。

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [        3,         8]
move({x: 3});       // [        3, undefined]，x正常赋值，默认值无效，y属性不存在，因此是undefined
move({});           // [undefined, undefined]，空对象也是实参，默认值无效，x、y属性都不存在，都是undefined
move();             // [        0,         0]，无参调用，默认值起效
```

## 圆括号问题

对编译器而言，一个式子到底是模式，还是表达式，只有解析到（或解析不到）等号才能知道，因此会导致一些歧义。ES6 规定，但凡有可能产生歧义，就不能使用圆括号。以下3种情况下不能用圆括号：

### 1. 变量声明语句中，模式不能带有圆括号

```js
// 下面3中写法都会报错
var [(a)] = [1];
var { x: (c) } = {};
var { o: ({ p: p }) } = { o: { p: 2 } };
```

### 2. 函数参数中，模式不能带有圆括号

```js
// 函数参数也属于变量声明，因此不能带有圆括号
function f([(z)]) { return z; }
```

### 3. 不能将整个模式，或嵌套模式中的一层，放在圆括号之中。

```js
// 将整个模式放在圆括号之中，会报错
({ p: a }) = { p: 42 };
([a]) = [5];

// 将嵌套模式的一层放在圆括号之中，会报错。
[({ p: a }), { x: c }] = [{}, {}];
```

只有一种情况可以使用圆括号：赋值语句的非模式部分。

```js
[(b)] = [3];               // 正确，数组的解构赋值根据索引来，与括号无关
({ p: (d) } = {});         // 正确，p是模式，但d不是模式。
```

## 用途

### 1. 交换变量的值

```js
[x, y] = [y, x];
```

### 2. 从函数返回多个值

```js
// 返回一个数组
function example() { return [1, 2, 3]; }
var [a, b, c] = example();

// 返回一个对象
function example() { return { foo: 1, bar: 2 }; }
var { foo, bar } = example();
```

### 3. 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})
```

### 4. 函数参数的默认值

```js
// bar, baz 等参数如果不指定，就用默认值代替，本质是对象的解构赋值
// 避免了在函数体内再写 var bar = config.bar || true 等检测代码
function (foo, {
  bar = true,
  baz = function () {},
  ......
}) {
    // do something
}
```

### 5. 提取JSON数据

```js
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
}
let { id, status, data: number } = jsonData;
console.log(id, status, number)    // 42, OK, [867, 5309]
```

### 6. 遍历Map

```js
// Map 类型是 ES6 引入的集合类型，以键值对方式存储数据。后续文章会详细说明
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

// for...of 是 ES6 引入的循环方式，类似 for...in，后续文章会详细说明
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 也可以单独获取键，或者值
for (let [key]     of map) { ... }
for (let [, value] of map) { ... }    // 注意逗号不能省，这是数组的解构赋值
```

### 7. 输入模块的指定方法

```js
// 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
const { SourceMapConsumer, SourceNode } = require("source-map");
```
