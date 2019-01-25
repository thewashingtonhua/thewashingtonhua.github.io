<h2>写在前面</h2>
<p>这次轮到遍历了。其实 ES5 中就已经有好多种用于遍历的方法：</p>
<ul>
  <li><span class='code'>while</span></li>
  <li><span class='code'>do-while</span></li>
  <li><span class='code'>for</span></li>
  <li><span class='code'>for-in</span></li>
  <li><span class='code'>forEach</span></li>
  <li><span class='code'>map</span></li>
</ul>
<p>那么这次 ES6 又打算在遍历上搞什么花样劲？</p>

<h2>Iterator</h2>
<p>算上 ES6 新引入的数据类型，JavaScript 原生用于表示集合的数据结构就有：Array、Object、Map、Set 四种，开发者还可以自定义由各种数据结构组成的集合。面对众多的数据结构，我们需要一个统一的方式来遍历各种数据结构，Iterator 就是为此而生。</p>
<p>Iterator 是 ES6 新引入的接口，为各种不同的数据结构提供了一种统一的访问机制。任何数据结构只要部署了 Iterator 接口，就可以执行遍历操作。ES6 为此提供了<span class='code'>for...of</span>语法来遍历部署了 Iterator 接口的数据结构。只要数据结构部署了 Iterator 接口，我们就称之为“可遍历的”。</p>
<p>在 ES6 的规范中，以下数据结构原生就具备 Iterator 接口：</p>
<ul>
  <li>Array</li>
  <li>Map</li>
  <li>Set</li>
  <li>String</li>
  <li>TypedArray</li>
  <li>函数的 arguments 对象</li>
  <li>NodeList 对象</li>
</ul>

<p>Iterator 本质是一个遍历器对象，它向数据结构中部署了一个指针，默认指向其开始开始位置，然后提供了<span class='code'>next()</span>方法用来依次访问下一个元素。每次调用<span class='code'>next()</span>会返回一个对象，对象具有<span class='code'>value</span>和<span class='code'>done</span>两个属性，分别表示当前项的取值，和是否还有下一项。</p>
<p>以下代码实现了一个简单的遍历器对象：</p>
<pre><code class='javascript'>const it = makeIterator(['a', 'b'])

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

const makeIterator = array => {
  let nextIndex = 0
  return {
    next: () => nextIndex < array.length
      ? { value: array[nextIndex++], done: false }
      : { value: undefined, done: true }
  }
}</code></pre>

<p>Iterator 只是把接口应用到数据结构上，和数据结构本身没有关联。</p>
<p>ES6 规定，默认的 Iterator 接口部署在<span class='code'>Symbol.iterator</span>属性，具备这个属性的接口就是“可遍历的”。<span class='code'>Symbol.iterator</span>的值是一个函数，执行该函数会返回一个遍历器。属性名<span class='code'>Symbol.iterator</span>本身是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以必须要放在方括号内。</p>
<pre><code class='javascript'>const obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        return index < self.data.length
          ? { value: self.data[index++], done: false }
          : { value: undefined, done: true }
      }
    }
  }
}</code></pre>

<p>对于类似数组的对象（存在数值键名和 length 属性），可以直接将<span class='code'>Array.prototype[Symbol.iterator]</span>赋值给对象的<span class='code'>[Symbol.iterator]</span>属性。</p>
<pre><code class='javascript'>Obj.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Obj.prototype[Symbol.iterator] = [][Symbol.iterator]; // 效果相同

const iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for (const item of iterable) {
  console.log(item) // 'a', 'b', 'c'
}</code></pre>

<p>字符串某种程度上也可以看作是数组，因此也默认部署了 Iterator 接口，可以使用<span class='code'>for...of</span>遍历。</p>

<h2>Iterator 的调用</h2>
<p>以下情况下会调用 Iterator 接口：</p>
<ul>
  <li><span class='code'>for...of</span></li>
  <li>解构赋值</li>
  <li>扩展运算符</li>
  <li><span class='code'>yield*</span></li>
  <li><span class='code'>Array.from</span></li>
  <li><span class='code'>Map()</span>、<span class='code'>Set()</span>、<span class='code'>WeekMap()</span>、<span class='code'>WeekSet()</span>，例如：<span class='code'>new Map([['a', 1], ['b', 2]])</span></li>
  <li><span class='code'>Promise.all()</span>、<span class='code'>Promise.race()</span></li>
</ul>

<h2>Iterator 和 Generator</h2>
<p>日常使用中和 Iterator 关系最大的，要数 Generator —— ES6 中新引入的一种异步解决方案，后面会讲到。通过 Generator，我们可以非常快捷的部署 Iterator 接口，只需一步步写出每次要输出的 value 即可，不用费心去管理 done。</p>
<pre><code class='javascript'>const obj = {
  * [Symbol.iterator]() {
    yield 'hello'
    yield 'world'
  }
}

[...obj] // ["hello", "world"]</code></pre>

<h2>遍历器对象的 return() 和 throw()</h2>
<p>除了 <span class='code'>next()</span>，遍历器对象还包含了<span class='code'>return()</span>和<span class='code'>throw()</span>两个可选的方法。</p>
<p>如果<span class='code'>for...of</span>提前退出（异常，或者遇到<span class='code'>break</span>、<span class='code'>continue</span>语句），<span class='code'>return()</span>会被调用，通常用于在对象完成遍历前释放资源占用。</p>
<p>举个例子：</p>
<pre><code class='javascript'>// readLinesSync 接受一个文件对象作为参数，返回一个遍历器对象
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

// 情况一，输出文件的第一行以后，执行 return 方法，关闭这个文件
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二，输出所有行以后，执行 return 方法，关闭该文件
for (let line of readLinesSync(fileName)) {
  console.log(line);
  continue;
}

// 情况三，执行 return 方法关闭文件之后，再抛出错误
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}</code></pre>

<p>需要注意的是，<span class='code'>return()</span>必须返回一个对象，z合适 Generator 的规格决定的。<span class='code'>throw()</span>主要是配合 Generator 使用，一般的遍历器用不到，后面会具体讲。</p>

<h2>for...of</h2>
<p>配合 Iterator，ES6 新增了一个新的循环操作：<span class='code'>for...of</span>，只要是正确部署了<span class='code'>Symbol.iterator</span>属性的数据结构都可以使用它。</p>
<p><span class='code'>for...of</span>在使用上和<span class='code'>for...in</span>非常相似，最大区别在于<span class='code'>for...in</span>每次得到的是对象的属性键，如果用于数组就是返回的下标，而<span class='code'>for...of</span>每次得到的是对象的属性值，如果用于数组就是返回的元素值。</p>
<p>Map 和 Set 也可以通过<span class='code'>for...of</span>来遍历，不过是按照元素的添加顺序进行遍历。另外 Set 在遍历时返回的是值，Map 在遍历时返回的是键值数组。</p>
<p>对象、数组、Map、Set 都支持<span class='code'>keys()</span>、<span class='code'>values()</span>、<span class='code'>entries()</span>，其返回的内容也是遍历器对象，可以通过<span class='code'>for...of</span>遍历。</p>


<h2>小结</h2>
<p>有了 Iterator，我们可以自由地定义数据结构的遍历方式。这一部分的两个关键点，一个是<span class='code'>[Symbol.iterator]</span>属性是个函数，包含必须的<span class='code'>next()</span>函数，在一个就是新的循环语法<span class='code'>for...of</span>。至于文中提到的 Generator，我们会在该系列之后的文章中进行介绍。</p>

<h2>该系列的其他文章</h2>
<p>上一篇：<a href="es6-daily-13-proxy-and-reflect.html">每天一点ES6(13)：Proxy 和 Reflect</a></p>
<p>下一篇：<a href="es6-daily-15-promise.html">每天一点ES6(15)：Promise</a></p>
