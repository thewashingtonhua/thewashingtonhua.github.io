---
title: '每天一点ES6(19)：Module'
description: '可能是 ES6 中对未来影响最大的一项改变'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'module', 'import', 'export']
cover: '../../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 模块化

但凡有一定资历的开发者，对“模块化”的概念应该都非常熟悉了。C、PHP 有 `include` 、Java、Python 有 `import` ，Ruby 有 `require` ，连 CSS 都有 `@import` 。然而 JavaScript 却一直都没有语言层面的模块化方案 —— 直到 ES6。

## 简史

不过这个问题也不怪 JavaScript 的发明者，毕竟时代不同，当初的需求很简单，就只是一个简单的脚本语言。

随着 Web 的发展，JavaScript 被开发出更多的可能性，前端项目的复杂度与日俱增，语言特性的缺失成为了发展的瓶颈，于是便有了 ES6 大刀阔斧的变革。

在 ES6 之前，社区也曾出现过 CommonJS、AMD、CMD、UMD 等各种模块化方案。ES6 为我们带来了语言层面上的解决方案，我们称之为 ESM（ECMAScript Module），并且很快取代之前的所有方案，一统了江湖。

> 由于一些历史原因，CommonJS 在未来很长一段时间还会继续存在，但 Node.js 的开发团队计划未来迁移到 ESM，为此正在研发一套平滑的迁移方案。对于普通开发者，只需要知道：万物终将基于 ESM。

## 静态加载

熟悉 Node 的朋友应该都清楚，CommonJS 的模块本质就是一个对象，当我们 `reuqire` 一个模块的时候，会引入整个模块，也就是把整个对象给搬了过来，然后访问对象上的属性。这种模块加载方式我们称之为“动态加载”，因为只有在运行时才能得到这个对象。动态加载的好处是灵活方便，可以根据条件判断选择性地加载模块；坏处是要么不加载，要加载就是整个模块，没办法只加载用到部分（因此没法做 Tree-Shaking），而且没法在编译阶段做“静态优化”（实现 Tree-Shaking 的另一个阻碍）。

ESM 采用静态加载的方式，牺牲一部分灵活性（Dynamic Import 提案弥补了这一缺陷，现已进入 Stage-3，主流环境都已经支持，可以期待在 ES2019 中见到它），换取“静态优化”的可能性，大家熟悉的 Tree-Shaking、类型检测等功能都要归功于此。

## 严格模式

ESM 自动采用严格模式，无论是否在模块顶部加上 `"use strict";`

严格模式本身属于 ES5 的内容，ES6 并没有对其做修改，只是强制启用。换个角度理解，未来其实也就没有严格模式一说了，所有 JavaScript 代码都必须遵守严格模式的规则。

## export

ESM 的核心是两个命令， `export` 用于导出， `import` 用于导入，非常直观。（从英文的角度，include 表示“包含”，被包含的代码块会被简单复制到引用之处；require 表示“需要”，import 表示“引进”，后两者虽然从英文语法上没有强调是“整体”还是“局部”，但和“包含”还有明显区别的）

ESM 中，一个模块就是一个独立的文件，文件中定义的变量，除非用 `export` 命令导出，在外部是无法访问的。

```js
// 定义后立即导出
export const firstName = 'Phil'
export const firstName = 'Coulson'

// 先定义，后统一导出
const year = 1962
const gender = 'Male'
export { year, gender }

// 导出函数
export function add (x, y) {
  return x + y
}

// 导出类
export class Point {}

// 给导出的内容设置别名
function v1 () {}
function v2 () {}
export {
  v1 as funcV1,
  v2 as funcV2,
  v2 as funcV3 // 一个变量可以有多个别名
}
```

`export` 规定的是对外的接口，且必须和文件内的变量一一对应，不能直接导出一个直接量。换句话说，导出内容的本体必须是一个具名的变量、函数、类，导出时可以直接使用这个名字，也可以指定别名。

```js
// 报错
export 1

// 报错
const m = 1
export m

// 正确
export const m = 1

// 正确
const m = 1
export { m }

// 正确
const n = 1
export { n as m }
```

`export` 导出的是一个接口，与之对应的值是动态绑定关系，通过这个接口可以取到模块内部实时的值。如果所导出的内容在未来发生变化，外部引用也会相应更新。

```js
export const foo = 'bar'
setTimeout(() => foo = 'baz', 500)
// 500 毫秒后，foo 的引用会被改变
```

## import

`import` 用于导入一个模块

```js
import { lastName as surname, firstname } form './profile.js'
```

导入同样支持指定别名。导入的内容都是只读的，不能直接重新赋值，但如果导入的是一个对象/数组，可以重新设置其中的属性/元素。但建议最好还是保持导入内容的只读性。

`from` 后面是模块的路径，支持绝对路径、相对路径， `*.js` 后缀可以省略（配合 Webpack 等工具还能支持更多类型的模块）

`import` 自带提升效果，会提升到整个模块的头部，多个 `import` 会按顺序加载，习惯上最好手动把所有的 `import` 写在模块的顶部。由于 `import` 是在编译阶段执行的，因此 `import` 中不能使用表达式和变量等运行时才能确定取值的语法结构。

对于一些特定的模块（例如 lodash），可能会有 `import 'lodash'` 这样的用法，这种用法会执行所加载的模块，但不输入任何值。

`import` 是单例的。重复同一条 `import` 语句并不会导致多次导入，只会执行一次。分多条语句导入同一模块的不同的接口，和在同一条语句中一次性导入所有需要的接口是等价的。不会多次执行。但最好还是不要这样，大部分规范都会限制同一模块只导入一次，在一条语句中导入所需内容。

通过 Babel 转码，我们可以在 ESM 的模块中混用 CommonJS 的模块，但由于 `import` 和 `require` 执行时机的差别，最好把 `import` 放在最顶部。

## 模块的整体加载

如果想一次性加载一个模块里所有导出的接口，除了手动列举所有的接口外，还可以使用如下语法：

```js
import * as circle from './circle'
```

## export default

开发者在引入一个模块时，不可能总是清楚的知道模块里有哪些导出，因此 ESM 提供了一个“默认导出”的特性。默认导出本身可以有自己的变量名，但用户在引入模块的默认导出时不必非得使用这个名字，可以为其指定任意名字（不需要 `as` ，也不需要花括号）。

```js
// export-default.js
// 默认导出匿名函数
export default function () {
  console.log('foo')
}

// 默认导出具名函数，但引入时未必要用这个名字
export default function foo () {
  console.log('foo')
}

// 默认导出同样可以定义和导出分开
function foo () {
  condole.log('foo')
}
export default foo

// import-default.js
// 默认导出在被导入时可以任意命名
import customName from './export-default'
customeName() // 'foo'
```

一个模块只能有一个默认导出，不允许重复。

一个模块可以同时包含默认导出和普通导出，导入时也可以在同一条语句中导入，比如我们在使用 React 时经常会看到这样的写法：

```js
import React, { Component } from 'react'
```

默认导出本质上就是输出一个名叫 `default` 的变量，然后允许在导入时任意起名，因此默认导出也可以写作：

```js
// modules.js
function add (x, y) {
  return x + y
}
export { add as default }
// 等同于 export default add

// app.js
import { default as foo } from 'modules'
// 等同于 import foo from modules
```

默认导出后面不允许跟变量申明语句（即不是用 `var` 、 `let` 、 `const` 声明的），可以是一个已声明的变量，或是常规的函数声明、类定义，特别的，由于默认导出已经有变量名 `default` 了，因此它还可以是一个直接量。

## export 与 import 的复合写法

> 该提案目前还处于 Stage 1 阶段

有一些特殊的场景，我们需要先导入再导出同一个模块，这时候我们可以把 `export` 和 `import` 语句写在一起。

```js
// 把导入的内容直接导出
// 相当于简单转达，模块内部无法访问
export { foo, bar } from 'my_module'
// 可以简单理解为：
import { foo, bar } from 'my_module'
export { foo, bar }

// 支持接口改名
export { foo as myFoo } from 'my_module'

// 支持整体输出
// 这种写法中，会忽略 my_module 的 default
export * from 'my_module'

// 具名导出和默认导出可以互转
// 但新的导出还是只能有一个默认导出
export { es6 as default } from './someModule'
export { default as es6 } from './someModule'

// 一下三种形式的导入暂且还不支持使用复合写法
import * as someIdentifier from 'someModule'
import someIdentifier from 'someModule'
import someIdentifier, { namedIdentifier } from 'someModule'
```

特别的， `export * form 'some-module'` 会导出被导入模块的所有普通导出，但会忽略被导入模块的 `default` ，即默认导出。如果新的模块需要默认导出，得手动指定。

## 模块的继承

模块也能继承。模块的继承其实就是整体导入一个或几个模块，增加点自己的内容，最后一并导出。有点像是把一个或几个模块打包重新导出成一个的意思。

```js
// circleplus.js
export * from 'circle'
export const e = 2.71828182846
export default function (x) {
  return Math.exp(x)
}

// main.js
import { * as math }, exp from 'circleplus'
console.log(exp(math.e))
```

## 跨模块常量

跨模块共享常量是模块化开发中最常用的手段之一，JavaScript 中通过 `const` 定义的常量只能在当前模块中使用，但是导出之后，就可以被其它模块导入，进而实现共享。

## Dynamic Import (Stage-3)

前面说到 ESM 是牺牲了动态加载换来了静态分析的可能性，但动态加载的需求又确实存在，难道就没有两全其美的解决方案吗？Dynamic Import 就是来弥补这个缺陷的。

```js
const main = document.querySelector('main')

import('./section-modules/${someVariable}.js')
  .then(module => {
    module.loadPageIntro(main)
  })
  .catch(err => {
    main.textContent = err.message
  })
```

`import()` 根据传入的参数按需加载模块，并在加载完成时返回一个 Promise 对象，后续就可以在 `then()` 里访问获取到的模块。

## 小结

可能是 ES6 中对未来影响最大的一项改变 —— 这个形容我觉得一点都不过分，原生模块化的加入使得 JavaScript 具备了开发大型系统的能力，可以应对日益复杂的交互需求。
