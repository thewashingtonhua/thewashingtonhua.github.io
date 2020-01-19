---
title: '每天一点ES6(16)：Generator'
description: '一起来摩擦摩擦发电吧'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'promise']
cover: '../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 什么是 Generator ？

Generator 函数是 ES6 引入的一种异步编程解决方案，在之前讲[Iterator](./es6-daily-14-iterator)和[Promise](./es6-daily-15-promise)的时候有提到过。

Generator 从字面上理解，叫“生成器”，单看名字感觉和工厂函数有关，似乎是用来创建某些东西的。可以把 Generator 理解为一个状态机，可以在其内部封装多个状态，按序进行产出。执行 Generator 会返回一个遍历器对象，遍历得到的内容就是其内部的各种状态。所以 Generator 实际上是生成了一个可遍历的状态序列。

## Generator 的基本语法

Generator 函数跟普通函数没什么两样，但是有两个特征：

一是 `function` 关键字与函数名之间有一个星号，具体是更靠近 `function` 关键字，还是更靠近函数名，这个没有规定，跟随团队当前所用的代码风格走就好，一般会选择靠近 `function` ，因为 Generator 本身还是一个普通函数，只是在定义的时候有所不同。值得注意的一点是，不能使用箭头函数来定义 Generator。

```js
function * gen () {} // 函数定义
const gen = function * () {}  // 函数表达式
const gen = { * gen () {} }   // 函数定义的简写

// 注意，没有这样的写法
// const gen = * () => {}
```

二是函数体内用 `yield` 表达式产出不同的状态，这是 Generator 特有的一个表达式，不能在普通函数中使用。

```js
function* gen () {
  yield 'hello'
  yield 'world'
  return 'end'
}

const hw = gen()

hw.next() // { value: 'hello', done: false}
hw.next() // { value: 'world', done: false}
hw.next() // { value: 'end', done: true}
hw.next() // { value: undefined, done: true}
```

如上代码所示，Generator 函数除了定义阶段有些许不同，调用方式和普通函数一样，只不过调用 Generator 并不直接执行函数体的内容，而是返回一个遍历器对象，必须要对这个遍历器对象调用 `next()` 才会开始执行函数体，把指针移动到下一个 `yield` 表达式，产出其对应的状态， `value`  就是 `yield` 表达式的值， `done` 表示之后是否还有 `yield` 表达式。

注意，Generator 不能使用 `new` 来创建实例（但可以通过改造来达到同样的效果）

## yield 表达式

Generator 中使用 yield 表达式来暂停后续函数的执行，并将紧跟其后的表达式的值作为返回对象的 `value` 属性进行产出（yield 字面意思就是“产出”）。下次调用 `next()` 时，继续执行，直到下一个 `yield` ；或遇到 `return` ，那么就把 `return` 的值作为最后一个状态的 `value` ；或函数运行到最后一行 `return` ，那么最后一个状态的 `value` 就是 `undefined` 。

 `yield` 后面的表达式只有在调用 `next()` 时，内部指针指向该语句，才会执行，这等于是为 JS 提供了手动惰性求值的特性。

Generator 函数可以不用 `yield` 表达式，这时就变成了一个单纯的暂缓执行函数，函数在调用时并不会执行函数体里的内容，直到手动调用 `next()` 才会执行，并且一次性执行完毕。

 `yield` 如果嵌套使用在另一个表达式中，必须放在圆括号里。

```js
function* gen () {
  console.log('Hello' + yield);       // SyntaxError
  console.log('Hello' + yield 123);   // SyntaxError

  console.log('Hello' + (yield));     // OK
  console.log('Hello' + (yield 123)); // OK
}
```

 `yield` 表达式单独作为参数或者右值时，可以不加括号

```js
function* gen () {
  foo(yield 'a', yield 'b'); // OK
  let input = yield;         // OK
}
```

## yield 和 return 的区别

 `yield` 和 `return` 很相似，都是返回紧跟在语句后面的表达式的值。区别在于：

- `yield` 会暂停函数，下次再从该位置仅需执行， `return` 不会记忆位置。
- 一个函数里只能执行一次 `return` ，执行后函数就退出了。但可以执行多次 `yield` ，执行后只是暂停函数并返回表示当前状态的对象，并不一定会导致函数退出。这也是 Generator 区别于其他函数的最大一点，普通函数只能返回一个值，Generator 可以返回一系列的值，这也是它名称的由来（生成器），配合循环可以用于生成集合数据结构。

## 与 Iterator 接口的关系

任意一个对象的 `Symbol.iterator` 方法，等于该对象的遍历器生成函数，调用这个函数就会返回该对象的一个遍历器对象。Generator 函数就是遍历器生成函数，所以可以直接把 Generator 赋值给 `Symbol.iterator` ，以此来部署 Iterator 接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

## next() 的参数

 `yield` 表达式本身并没有返回值，如果尝试执行 `const foo = yield 1` ， `foo` 的值会是 `undifined` 。可以在调用 `next()` 时传入一个参数，作为上一个 `yield` 的返回值。第一次调用 `next()` 时不应该传入参数，因为这一步只是为了启动 Generator，还不存在“上一个 yield”；即便传入了也会被忽略。

利用这一点，可以在 Generator 执行过程中改变其上下文，进而调整其行为。

## for...of

 `for...of` 循环可以自动遍历 Generator 生成的 Iterator 对象，而不需要手动调用 `next()` 方法。 `for...of` 会依次获取每次 `yield` 表达式的值，直到某一次 `next()` 返回的对象的 `done` 属性为 `true` 时终止，或者遇到了 `return` 。

配合 Generator，可以用 `for...of` 遍历任意对象。一种方法是给对象外面包一层，将对象的键值对以二维数组形式给 `yield` 出来。

```js
function* objectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj);

  for (const propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

const jane = { first: 'Jane', last: 'Doe' };

for (const [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

另一种方法是把 Generator 加到对象的 `Symbol.iterator` 属性上。

```js
function* objectEntries() {
  const propKeys = Object.keys(this);

  for (const propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

const jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (const [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

除了 `for...of` 之外，扩展运算符（ `...` ）、解构赋值和 `Array.from()` 内部调用的都是遍历器接口。因此 Generator 返回的 Iterator 对象在这些地方都能用。

## Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个 `throw()` 方法，可以在函数体外抛出错误，在函数体内捕获，但这样的捕获只会发生一次。

```js
const g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

const i = g();
i.next();

try {
  i.throw('a'); // 第一次抛异常，被内部 catch 捕获
  i.throw('b'); // 第二次抛异常，内部的 catch 已经执行过了，不再捕获， 因此被外部的 catch 捕获。
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

注意这里的 `throw()` 和 `throw` 语句不一样，前者是 Generator 的方法，后者是 JS 的关键字；前者抛出的错误能被 Generator 内部的 `catch()` 捕获，后者的只能被外部的 `catch()` 捕获；前者可以连续多次调用，依次被从内到外的 `catch()` 捕获，后者在被捕获之后，就不再继续执行 `try` 里面的代码；调用前者会附带执行一次 `next()` ，执行下一条 `yield` 表达式，调用后者不带任何附加操作。但两者也有相同之处，两者都建议抛出 `Error` 对象，而不是一个随便的原始类型值。

Generator 执行过程中如果抛出了异常，只要被内部捕获，Geneerator 就能继续执行下去。但如果没有被内部捕获，就会终止执行。继续调用 `next()` 将返回 `{value: undefined, done: true}` 。

## Generator.prototype.return()

这里的 `return()` 类似 JS 里普通的 `return` ，返回值并终止函数，这里会返回 value 值为传入参数，done 值为 true 的 Generator 状态对象，并终结遍历 Generator 的函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

如果 Generator 函数里有 `try...finally` 代码块，那么 `return()` 将在 `finally` 代码块执行完之后执行。

```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false } // 存在 finally，先执行 finally
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true } // return 的结果到这里才出现
```

本质上， `next()` 、 `throw()` 、 `return()` 都是在做同样的事：让 Generator 恢复运行，并用不同的语句替换 `yield` 语句。

- `next()` 将其替换成一个值（传入的参数，不传则为 `undefined` ）
- `throw()` 将其替换为抛出一个异常。
- `return()` 将其替换为一个普通返回。

## yield* 表达式

这个特殊的 `yield` 表达式用于在一个 Generator 内部调用另一个 Generator。普通的 `yield` 只会返回 Generator 对象，但并不会执行它。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()) {
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

 `yield*` 后面跟 Generator 函数（没有 `return` )，等同于给这个 Generator 内部部署一个 `for...of` 循环。实际上任何部署了 Iterator 接口的数据结构都可以 `yield*` 进行遍历。

## Generator 的 `this`

Generator 函数总是返回一个遍历器，可以通过 `prototype` 去定义实例方法，但无法直接通过 `this` 去定义。可以通过 `call()` 绑定一个空对象作为上下文，把属性都赋值到这个对象上，用这个对象作为 Generator 函数的实例，来变通实现。

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {}
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

或者更好一点，绑定函数的原型为上下文，这样 `this` 直接指向实例本身。

```js
function* F () {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

我们还可以进一步将其改造为构造函数，通过 `new` 来创建实例

```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F () {
  return gen.call(gen.prototype);
}

var f = new F ();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

## 小结

Generator 的本质就是一个状态机，相比 ES5 用普通函数实现的效果，不会把内部状态暴露出来，更优雅也更安全。

Generator 也可以看作是 ES6 对协程的不完全实现，多个 Generator 可以以“时间片轮转”的形式实现并行，通过 `yield` 控制执行权。

当然，Generator 在实际应用中最广泛的用途，还是用来控制异步流，将其转换为更为直观的类似同步流的写法。
