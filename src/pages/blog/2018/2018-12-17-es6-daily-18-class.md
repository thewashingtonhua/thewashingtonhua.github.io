---
title: '每天一点ES6(18)：Class'
description: '这回总没人质疑 JS 不是面向对象了吧？'
tags: ['ecmascript', '2015', 'es6', 'javascript', 'class']
cover: '../../../images/blog/es6daily.jpg'
series: 'es6daily'
draft: false
original: true
---

## 过去

从我们学习 JavaScript 的第一天起，我们就被告知，JavaScript 是面向对象的，虽然它的语法和传统的 C 风格相去甚远，甚至有人并不认可 JavaScript 是面向对象的。但不管怎么说，这并不影响我们使用 JavaScript 去实现面向对象。

在过去（也就是 ES6 之前的时代），我们使用这样的语法来定义一个类：

```js
function Point (x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)
```

如今，你依然可以通过这种方式去定义一个类，当然我推荐你一个更好的方式：

## 现在

ES6 对开发者影响最大的改变之一，就是改变了类定义的语法（或者说“新增”比较合适，毕竟老的依然能用，只是不再推荐），使得在 JavaScript 中定义类的语法更加接近 C 风格，现在你可以使用如下的代码来重写上面的代码：

```js
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
```

运行一下，结果没有什么不同，但是语法看上去更符合我们的认知（请原谅一个毕业自常规本科教育的开发者的世界观）

## 语法糖

类定义语法的变更带给我的第一个疑虑是：我们接触了这么久的原型链机制，是否在 ES6 的新语法下也被改变了呢？并没有！

新语法的加入并没有改变 JavaScript 基于原型链的本质，只是在语法上更加符合了 C 风格。上面代码中的 `constructor` 和 `toString` 其实就是 `Point.prototype.constructor` 和 `Point.prototype.toString` ，Point 本身的类型也还是函数（就是 `constructor` ），一切只是换了个马甲而已，并没有本质上的区别。

如果我们把两种语法的代码整理成下面的样子，一切就很好理解了：

```js
class Point {
  constructor () {
    // ...
  }

  toString () {
    // ...
  }

  toValue () {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor () {},
  toString () {},
  toValue () {}
}
```

## 还是有变化的

新的语法在使用上同样也受到其它 ES6 特性的影响，例如：新语法定义的类方法是不可枚举的， `Object.keys` 不会得到任何内容，但 `Object.getOwnPropertyNames` 可以。类的属性名也可以采用表达式， `[variable]` 是一个合法的属性名，具体取决于 `variable` 变量的取值，当然这不仅仅局限于类，这是 ES6 中对象的新特性。

## 严格模式

类内部是采用严格模式的，事实上 ES6 的另一个新特性“模块”（我们会在下一篇讲到）也是基于严格模式的，考虑到从 ES6 开始的代码都是运行在模块之中，可以说 ES6 在语言层面上就是按照严格模式来设计的，我们在使用时候就直接默认遵循严格模式来就好了，不用再做区分了。

## 构造函数

类的构造函数可以为空，甚至省略（JS 引擎会自动创建一个空的构造函数，因此实际上等效于为空），默认返回实例对象，但允许指定返回另一个对象。

类必须使用 `new` 进行调用，不能像普通函数一样直接调用，否则会报错。

## Class 表达式

和函数表达式类似，类也支持这样的写法：

```js
const MyClass = class Me {
  getClassName () {
    return Me.name
  }
}
```

需要注意的是，和函数表达式一样， `MyClass` 才是真正的类名， `Me` 只在类内部可以作为一个内部代号，指代自身，在类外部是访问不到的。

## 立即执行的 Class

听说过立即执行函数吧，这个也差不多，同样是临时定义立即调用：

```js
const person = new class {
  constructor (name) {
    this.name = name
  }

  sayName () {
    console.log(this.name)
  }
}('张三')

person.sayName()
```

## 变量不提升

类定义不存在变量提升，这一点有些特殊，但为了实现继承，这是必须的。

从最佳实践的角度，为了不给开发过程埋坑，最好还是手动提升变量，即始终遵循“先定义后使用”的规则，绕开可能的变化。即便发生提升也会得到相同的结果。

## 私有属性和私有方法

在传统的 C 风格中，属性前面都会有 `public` 、 `protected` 、 `private` 三大修饰符加持。虽然类语法的存在是为了让类定义的代码看起来更接近 C 风格，但 ES6 并没有加入这些修饰符，事实上，ES6 中类的属性和方法都还是公开的，虽然我们可以通过变量名前加下划线、立即执行函数、把私有变量移出模块等“自己骗自己”的方法来模拟，但这些都不是真正的私有。

关于这个问题，有一个颇具争议但看样子依然会被写进标准的提案，建议在属性名前加 `#` 来表示私有变量，并且在语言层面上支持私有变量。根据提案， `#` 并不算是修饰符，而是变量名的一部分，也就是说 `#x` 和 `x` 是两个变量，虽然语法上允许这种形式的“重名”，但实际使用中建议还是避免这种骚操作。

```js
class Point {
  #x

  constructor (x = 0) {
    this.#x = +x
  }

  get x () {
    return this.#x
  }

  set x (value) {
    this.#x = value
  }
}
```

至于为什么会选择 `#` 这个符号，据说主要有两个原因，一个是为了保留 JavaScript 是动态语言（没有类型申明）的特点， `private` 不太适合，因此只能选择一个新的符号。Ruby 使用了 `@` ，但 ES6 在此之前已经把 `@` 用于了装饰器（后面文章会讲到），因此一通 pass 下来，好像就 `#` 还不错，就它了。

比较奇怪的是，尽管私有属性在实例上不可访问，但可以在类内部定义一个常规方法，接收一个实例作为参数，在方法中直接访问该实例的私有属性。这算是一个骚操作吧，不是很能理解为什么要这么设计，如果这个操作是通过调用 getter 函数来间接访问私有变量，似乎就合理多了。

## this

类内部的 `this` 一律指向类的实例，只要你不做什么骚操作，你几乎不用担心 `this` 会指错。如果你非要展现自己风骚的一面，那就自求多福吧。（方法自然是有的，但你还是不知道的好，免得知道以后乱用）

## name

由于类的本质依然是函数，因此函数的 `name` 属性在类中依然适用，可以返回类名。

## Generator

如果某个方法之前加上了 `*` ，它就是一个 Generator 函数；特殊一点，如果这个方法名刚好叫 `* [Symbol.iterator]` ，恭喜你，实例化这个类你就过得了一个遍历器，至于具体能遍历出啥来，就看你方法中怎么定义了。

## 静态方法

类语法支持定义静态方法，语法非常符合认知：（两种定义方法都可以）

```js
class Foo {
  static classMethod () {
    return 'hello'
  }
}

Foo.classMethod = function () {
  return 'hello'
}

Foo.classMethod() // 'hello'

const foo = new Foo()
foo.classMethod() // TypeError: foo.classMethod is not a function
```

注意，静态方法中的 `this` 指向的是类本身，而不是实例，也就是这里的 `this` 只能访问静态方法和静态变量。

```js
class Foo {
  static bar () {
    this.baz()
  }

  static baz () {
    console.log('hello')
  }

  baz () {
    console.log('world')
  }
}

Foo.bar() // hello
```

## 静态属性

ES6 规定类内部只有静态方法，没有静态属性，但后续的提案很快就把这块加上了。当然 ES5 的语法依然有效。

```js
class Foo {
  // 实例属性
  instanceProp = 1

  // 静态属性（class 写法）
  static prop = 2
}

// 静态属性（function 写法）
Foo.prop = 2
```

## new.target

这算是一个骚操作吧——给关键字加属性。

这个属性用在构造函数中（无论是 class 还是 function），返回 `new` 命令作用于的那个构造函数，如果构造函数不是通过 `new` 调用的， `new.target` 会返回 `undefined` 。

这个属性可以用来确定构造函数是怎么调用的，比如强制构造函数只能用 `new` 调用，或者强制某各类不能直接实例化，必须继承后才可实例化。（子类继承父类时， `new.target` 返回子类）

```js
fucntion Person (name) {
  // new target === Person
  if (new.target !== undefined) {
    this.name = name
  } else {
    // 限制必须使用 new 调用
    throw new Error('必须使用 new 命令生成实例)
  }
}

var person = new Person('张三') // 正确
var notAPerson = Person.call(person, '张三') // 报错

// 限制基类不可被实例化，必须继承
class Shape {
  constructor () {
    if (new.taret === Shape) {
      throw new Error('本类不能实例化')
    }
  }
}
```

## 继承

Class 提供了 `extends` 关键字用于实现继承，相比修改原型链的写法，新语法更直观方便。

```js
class Point {
  toString () {
    return 'Point'
  }
}

class ColorPoint extends Point {
  constructor (x, y, color) {
    super(x, y) // 调用父类的 constructor(x, y)
    this.color = color
  }

  toString () {
    return this.color + ' ' + super.toString() //调用父类的 toString()
  }
}
```

子类构造函数中必须首先调用 `super()` ，否则子类无法得到 `this` 。子类自己的 `this` 依赖于父类的 `this` ，需要先得到父类同样的实例属性和方法，然后再覆盖以自己的实例属性和方法。

子类可以省略构造函数，这个方法会被默认添加，并传入和父类构造函数相同的参数，等于直接取得父类中定义的内容。如果你需要自定义子类的实例化方式，就需要遵循上面的步骤，手动调用 `super()` 。

## 继承机制

ES5 中，本质是先构造子类的 `this` ，再添加父类的属性（ `Parent.apply(this)` ），最后添加子类的属性。

ES6 中，是先通过父类获取 `this` ，再添加子类的属性，所以子类构造函数必须先调用 `super()` 才能正常访问 `this` 。

## Object.getPrototypeOf()

 `Object.getPrototypeOf()` 用于获取一个子类的父类、（你或许见过用 `__proto__` 来获取原型的方式，这是现代浏览器自己实现的快捷方式，不属于语言标准，Node.js 也不支持这样的语法，不建议使用）

```js
Object.getPrototypeOf(ColorPoint) === Point // true
```

## super

 `super` 既可以作为函数（用在构造函数中，代表父类的构造函数，返回父类实例），也可以作为对象（用在子类实例方法中，指向父类的原型对象；用在子类静态方法中，指向父类）。

当 `super` 用作函数时，虽然它代表父类的构造函数，但返回的是子类的实例，即 `super` 内部的 `this` 指的是子类，因此 `super` 相当于 `Parent.prototype.constructor.call(this)` 。如果在父类的构造函数里执行 `console.log(new.target.name)` ，则它的子类在执行 `super()` 时这段代码会打出子类的构造函数，而不是父类。

当 `super` 出现在子类的实例方法中时，由于它指向父类的原型对象，因此只有定义在父类原型上的属性和方法才能被 `super` 访问到（ `Parent.prototype.XXX` ），定义在父类实例上的属性和方法 `super` 是访问不到的。子类实例方法在通过 `super` 调用父类方法时，方法内部的 `this` 指向当前子类实例（ `super.method.call(this)` ），如果通过 `super` 对某个属性赋值（不太能想象什么场景下会这么做，因此还是避免这种骚操作比较好），这时的 `super` 就是 `this` ，即该属性被认为是子类的实例属性。通过这种方式定义的属性，在后续的代码中可以通过 `this.XXX` 访问到，但如果访问 `super.XXX` ，实际访问的是 `Parent.prototype.XXX` 。

当 `spuer` 出现在子类的静态方法中时，由于它指向父类，因此只能访问到静态的属性和方法。子类静态方法中通过 `super` 调用父类方法时，方法内部的 `this` 指向子类，而不是子类的实例。

 `super` 在使，用时必须显式地指定是作为函数还是对象使用，否则会报错（比如 `console.log(super)` ）。一般情况下，在构造函数中用作函数，在方法中用作对象，应该是遇不到这类问题的。

由于 JavaScript 中的对象总是继承自其他对象的，所以可以在任何对象中使用 `super` 关键字。

## 小结

Class 的出现给我们写代码的方式带来了巨大的改变，但更多的是语法层面的改变。如果你来自 Java、C# 等传统编程语言，你会觉得一切都是那么的熟悉。

原本的老方法得到了保留，如果你是个怀旧的人，你可以继续使用你熟悉的语法，但从发展的眼光来看，我们还是建议尽早迁移到新的语法。

由于一些历史原因，JavaScript 的设计存在大量的缺陷，ES6 的发布掀起了对 JavaScript 大修补的热潮，现在的 JavaScript 正在集各家之所长，快速成长。

下一篇，我们将探索可能是 ES6 中对未来影响最大的一项改变 —— 模块。
