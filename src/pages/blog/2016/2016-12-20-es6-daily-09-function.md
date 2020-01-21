---
title: '每天一点ES6(9)：函数的扩展'
description: '博采众长的实用语法糖'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'function']
cover: '../../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 实用的语法糖

ES6 对函数的使用加入了不少比较实用的新特性，虽说依然还是语法糖，但确实比较实用的语法糖

## 函数参数默认值

ES6 原生支持在函数的参数列表中赋予默认值，当然此前通过在函数实现中对参数进行初始化也能实现同样的效果，但 ES6 的写法更简洁更语义化，吸收了其他成熟的编程语言的优点，建议马上用起来。

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello')          // Hello World
log('Hello', 'China') // Hello China
log('Hello', '')      // Hello
```

函数参数默认值可以和解构赋值一起使用

```js
function foo( {x, y = 5} ) {
  console.log(x, y);
}

foo( {} )           // undefined, 5
foo( {x: 1} )       // 1, 5
foo( {x: 1, y: 2} ) // 1, 2
foo()               // TypeError: Cannot read property 'x' of undefined
```

通常函数参数默认值配合解构赋值有两种写法，但两者是有一定差异的，需要留意一下：

```js
// 写法一
function m1( {x = 0, y = 0} = {} ) {
  return [x, y];
}

// 写法二
function m2( {x, y} = { x: 0, y: 0 } ) {
  return [x, y];
}

m1()               // [0, 0]
m2()               // [0, 0]

m1( {x: 3, y: 8} ) // [3, 8]
m2( {x: 3, y: 8} ) // [3, 8]

m1( {x: 3} )       // [3, 0]
m2( {x: 3} )       // [3, undefined]

m1( {} )           // [0, 0];
m2( {} )           // [undefined, undefined]

m1( {z: 3} )       // [0, 0]
m2( {z: 3} )       // [undefined, undefined]
```

设置了默认值的参数最好放在参数列表的最后（尾参数），否则是不可省略的。可以显式的传入 `undefined` 来触发默认值，但 `null` 没有这个作用。

每个函数都有一个 `length` 属性，记录参数列表中参数的个数，如果指定了默认值的，将不计入 `length` ，即 `length` 表示期望接收到的参数的个数。

```js
(function (a) {}).length           // 1
(function (a = 5) {}).length       // 0
(function (a, b, c = 5) {}).length // 2
```

如果参数的默认值也是一个参数，那么需要注意它的作用域：参数列表 > 函数外部

```js
let x = 1;

function f(x, y = x) {
  console.log(y);
}

// 先 x=2，然后 y=x 因而 y=2
// let x=1在这里并没有起到作用
f(2) // 2
```

```js
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

// 参数列表中没有x，因此只能从外围获取，x=1
// 之后 y=x 因而 y=1，这之后 x=2 只影响函数内部的 x，不影响 y
f() // 1
```

```js
function f(y = x) {
  let x = 2;
  console.log(y);
}

// y 初始化时 x 还没定义，取不到，因此报错
f() // ReferenceError: x is not defined
```

```js
var x = 1;

function foo(x = x) {
  // ...
}

// 这里 x 处于暂时性死区，参数和默认值都是变量，默认值作用域为参数列表
// 默认值 x 引用了参数 x 的值，但参数 x 此时还没有被定义，引用不到，导致错误
foo() // ReferenceError: x is not defined
```

如果函数的参数是一个方法，它的作用域同样是：参数列表 > 函数外部

```js
let foo = 'outer';

// 参数 func 的默认值是一个匿名函数
function bar(func = x => foo) {
  let foo = 'inner';
  console.log(func());
}

// 参数列表中没有定义 foo，因此到外部去寻找，找到 foo='outer'，引用
// 这里 x 因为没有用到，所以没有传参没关系
bar();    // outer
```

有时情况会比较复杂，例如：

```js
var x = 1;
function foo( x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

// 函数调用时参数 x 没有传值也没有默认值，因而 x = undefined
// 匿名函数 y 中的 x 引用了参数列表中的 x，并将其赋值为 2
// 函数中的 var x=3 新创建了一个 x，和 y 中的 x 并非同一个
// 因此最终输出的 x，其实是 var x=3 这个 x
foo() // 3
```

如果上面函数中的 `x=3` 没有用 `var` 申明，那么引用的就是参数中的 `x`

## rest 参数

ES6 引入了 `...argument` 的写法，放在参数列表的最后，用于获取函数的剩余参数。剩余参数的数量不定，本质是一个数组，可以用它代替 arguments 对象，更简洁更自然。需要注意的是 rest 参数不计入函数的 `length` 。

```js
function add(...values) {
  let sum = 0;

  // 剩余参数就是个数组，遍历即可获得其中内容
  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

## 扩展运算符（spread）

同样也是 `...argument` 的写法，但它是 rest 参数的逆运算，将一个数组转为逗号分隔的参数序列。

```js
console.log(...[1, 2, 3]);
// 1 2 3
// console.log()直接打印逗号分隔的参数，输出内容是不带逗号的，这是正常行为

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42
```


扩展运算符与正常的函数参数可以结合使用，非常灵活。（当然下面的写法只是为了演示，实际应用并不推荐这么写，可读性太低）

```js
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

扩展运算符可以有很多的应用，例如可以代替数组的 `apply()` ，可以很方便的合并两个数组，可以将任何实现了 Iterator 接口的对象转成数组（例如配合 Map、Set、Generator等）。

## name 属性

函数现在正式拥有了 `name` 属性，虽然此前不少浏览器已经自行实现了该属性，但 ES6 正式将其写入了标准，并对匿名函数的 `name` 属性做了规范：

```js
var f = function() {}
f.name; // ES5 显示 ""，ES6 显示 "f"

const bar = function baz() {};
bar.name // ES5/6 都显示"baz"

// Function 构造函数返回的函数实例，name属性的值为“anonymous”
(new Function).name           // "anonymous"

// bind返回的函数，name属性值会加上“bound ”前缀。
function foo() {};
foo.bind({}).name             // "bound foo"
(function(){}).bind({}).name  // "bound "
```

## 箭头函数（Lambda表达式）

Lambda表达式是在Java、Python、C#、C++等语言中早已实现的写法，ES6 将其命名为箭头函数（Arrow Function）更加直观形象，但其实它们是一个东西。箭头函数的主要作用是让函数的表达更加简洁，尤其是用于回调的匿名函数。

```js
var f = v => v;
// 等同于：
var f = function(v) {
  return v;
};

// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
var f = () => 5;
// 等同于
var f = function () { return 5 };


var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};


// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来。
var sum = (num1, num2) => { return num1 + num2; }

// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
var getTempItem = id => ({ id: id, name: "Temp" });
```

箭头函数可以和解构赋值一起用

```js
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
```

箭头函数没有独立执行上下文（ this ），区别于 `function` 中的 `this` 引用的是运行时所在的上下文，箭头函数引用的是其定义时所在的作用域，即其父函数所在的上下文。我们来看个例子。

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

在上面的例子中，由于箭头函数自身没有 `this` ，因此引用其父函数 `foo()` 的 `this` 。 `foo()` 在被调用时被 `call()` 绑定到了 `{id: 42}` 上，因此箭头函数中的 `this` 引用的就是 `{id: 42}` 。如果没有被 `call()` 绑定，那么引用的就是全局变量 `id: 21` 。

通过下面的 ES6 转成 ES5 后的对比就能清楚地明白个中原理了。

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

箭头函数也没有独立的 `arguments` ，如果需要取不定参数，则要么用function，要么用rest参数。箭头函数也没有自己的 `super` 和 `new.target` 箭头函数不能用作构造函数，换句话说不能使用  `new` ，否则会报错（因为没有this）。箭头函数内不能使用 `yield` ，因此也不能用作生成器。由于没有 `this` ，因而也不存在通过 `bind()` 、 `call()` 、 `apply()` 来改变 `this` 的指向。

## 绑定this

这其实是一个ES7的语法（由于我的博客更得太慢，阮一峰老师都已经开始把ES7的内容整合进来了……），用来取代 `call` 、 `apply` 、 `bind` 的调用。写法是两个冒号，双冒号右边是被调用的函数，左边是 `this` 绑定的上下文。

```js
obj::func;
func.bind(obj); // 等价

obj::func(...args);
func.bind(obj, ...args); // 等价

// 双冒号左边为空，右边为对象的方法，则表示绑定到该对象上。
::obj.func;
obj::obj.func;
```

双冒号运算符返回的还是原对象，本质上和用 `bind` 是一样的，因此不会破坏链式调用。

## 尾调用优化

这是函数式编程中的一个重要概念，并不是ES6的新特性，但是ES6标准规定所有的ES实现都必须部署“尾调用优化”。

什么是尾调用？一句话说明就是：某个函数的最后一步是调用另一个函数。

```js
function f(x) {
  return g(x);
} // f(x)最后一步调用g(x)，尾调用

// 最后一步不一定要在最后一行，只要是最后一步操作即可
function f(x) {
  if (x>0) {
    return m(x);
  } else {
    return n(x);
  }
}
```

下面几种情况不算尾调用（很容易混淆，但是看清定义之后就不难理解了）

```js
function f(x) {
  let y = g(x);
  return y;
}
// 调用g(x)之后还有赋值操作，不是最后一步，不算（尽管语义上完全等价）

function f(x) {
  return g(x) + 1;
}
// 也是调用g(x)后还有操作，不算

function f(x) {
  g(x);
}
// 等价于 g(x); return undefined;，不是最后一步，不算。
```

那么“尾调用优化”又是什么鬼？这其实和程序在内存中的存在形式有关。函数调用会在内存中形成一个“调用帧”，用于保存函数调用的位置、内部变量等信息，函数如果嵌套调用就会形成多个“调用帧”，组成“调用栈”，“调用栈”的容量是有限的，嵌套调用太多，超出了容量限制，就会发生“栈溢出”。尾调用的特殊之处，就在于它是函数执行的最后一步操作，它的调用位置、内部变量等信息不会再被用到，因此外部函数的“调用帧”不用为此保留，直接用内部函数的“调用帧”替换即可。这样设计可以大大节省内存，也是尾调用优化的意义所在。

从上面的解释我们不难得出，实现尾调用优化有两个必要条件：最后一步操作（不用保留调用位置）、不引用外层函数内部变量（不用保存内部变量）

```js
function outer(a) {
  let foo = 1;
  function inner(b) {
    return b + foo;
  }
  return inner(a);
}
// 这里inner函数虽然是最后一步没错，但其执行过程需要用到outer函数的内部变量foo，因此不满足尾调用优化的条件。
```

尾调用优化最常见的应用就是“尾递归”。普通的递归函数对内存的需求量通常与数据的规模呈正比，甚至是指数级的，而“尾递归”可以利用“尾调用优化”大幅降低内存占用。

ES6规定尾调用优化只在严格模式下开启，正常模式是无效的。

## 改写尾递归

以计算斐波那契数组为例，其实就是把每一步的计算之后的结果传递给下一步，到最后一步时候直接返回最终结果，就不用原路返回了。

```js
// 普通递归，空间复杂度O(n)，容易栈溢出
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10);

// 尾递归，空间复杂度O(1)，理论上不会栈溢出
function Fibonacci(n, total = 1) {
  if (n === 1) return total;
  return Fibonacci(n - 1, n * total);
}
Fibonacci(10);
```

阮一峰老师的原文还对非严格模式下的“尾递归优化”进行了探讨，但因为讲得比较深入，我没有更好的方法去概括，而且和我们的主题 ES6 并没有直接联系，这里就不继续展开了，附上 [原文链接](http://es6.ruanyifeng.com/#docs/function#尾调用优化)。

## 小结

虽然多是些语法糖，但ES6给函数带来的改变还是非常大的，网上已经有大量使用了参数默认值、rest参数、箭头函数的案例了，是时候把这些东西加入到我们自己的知识库中来了。
