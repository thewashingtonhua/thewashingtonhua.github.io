<h2>写在前面</h2>
<p>又好久没更了，这次来讲的是 ES6 中比较冷门的一块内容：元编程。大部分时候其实我们不会接触到这一块，日常的业务开发通常不会涉及这么高级的操作，但元编程对于一门语言来说可谓是瑞士军刀，一旦掌握，便可以施展出强大的法力。</p>

<h2>元编程是个什么鬼？</h2>
<p>一般我们编程都是为了实现一些业务上的需求，直接使用语言原生提供的内容即可，最多在其上做一层简单的封装。而元编程则是对编程语言本身进行编程，去修改其原本的行为，实现一些原生方法做不到的事，但实际编写起来又是原生的语法，非常神奇。</p>

<h2>Proxy</h2>
<p>Proxy 本意是代理，一般我们在计算机网络中经常听到这个词。使用 Proxy 我们可以通过编程来接管外界对对象的操作，改变其原本的行为。有点类似于中间件的概念。</p>
<pre><code class='javascript'>var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2</code></pre>
<p>如上的代码就对对象 obj 的读取和设置操作进行了接管，在其原有行为之前加上了一些内容。</p>

<p>Proxy 的基本使用为：<span class='code'>const proxy = new Proxy(target, handler)</span>，target 为被代理的对象，handler 中定义了拦截的行为。</p>
<p>Proxy 实例可以作为对象的原型：</p>
<pre><code class='javascript'>var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35</code></pre>
<p>这里 obj 本身并没有 time 属性，因此沿原型链向上寻找，找到 proxy 的 time 属性，proxy 虽然也没有 time 属性，但其拦截了所有属性访问操作并固定返回 35，因此依然能拿到结果。</p>

<h3>Proxy 支持的拦截操作</h3>
<table>
  <thead>
    <tr>
      <th>操作</th>
      <th>作用</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>get(target, key, receiver)</td>
      <td>拦截对象属性的读取，三个参数分别为：目标对象、属性名、proxy 实例本身（即 this 所指），其中最后一个参数可选</td>
    </tr>
    <tr>
      <td>set(target, key, value, receiver)</td>
      <td>拦截对象属性的设置，返回布尔值</td>
    </tr>
    <tr>
      <td>has(target, key)</td>
      <td>拦截<span class='code'>key in obj</span>的操作，返回布尔值</td>
    </tr>
    <tr>
      <td>deleteProperty(target, key)</td>
      <td>拦截<span class='code'>delete obj[key]</span>操作，返回一个布尔值</td>
    </tr>
    <tr>
      <td>ownKeys(target)</td>
      <td>拦截<span class='code'>Object.getOwnPropertyNames(obj)</span>、<span class='code'>Object.getOwnPropertySymbols(obj)</span>、<span class='code'>Object.keys(obj)</span>操作，返回一个数组，包含目标对象所有自身的属性的属性名。<span class='code'>Object.keys()</span>的返回结果仅包括目标对象自身的可遍历属性。</td>
    </tr>
    <tr>
      <td>getOwnPropertyDescriptor(target, key)</td>
      <td>拦截<span class='code'>Object.getOwnPropertyDescriptor(obj, key)</span>，返回属性的描述对象</td>
    </tr>
    <tr>
      <td>defineProperty(target, key)</td>
      <td>拦截<span class='code'>Object.defineProperty(obj, key, desc)</span>、<span class='code'>Object.defineProperties(obj, key, descs)</span>，返回一个布尔值</td>
    </tr>
    <tr>
      <td>preventExtensions(target)</td>
      <td>拦截<span class='code'>Object.preventExtensions(obj)</span>，返回一个布尔值</td>
    </tr>
    <tr>
      <td>getPrototypeOf(target)</td>
      <td>拦截<span class='code'>Object.getPrototypeOf(obj)</span>，返回一个对象</td>
    </tr>
    <tr>
      <td>isExtensible(target)</td>
      <td>拦截<span class='code'>Object.isExtensible(obj)</span>，返回一个布尔值</td>
    </tr>
    <tr>
      <td>setPrototypeOf(target, prototype)</td>
      <td>拦截<span class='code'>Object.setPrototypeOf(obj, prototype)</span>，返回一个布尔值，如果目标对象是函数那么还有两种额外操作可以拦截。</td>
    </tr>
    <tr>
      <td>apply(target, obj, args)</td>
      <td>拦截 Proxy 实例作为函数调用的操作，例如：<span class='code'>proxy(...args)</span>、<span class='code'>proxy.call(object, ...args)</span>、<span class='code'>proxy.apply(...)</span></td>
    </tr>
    <tr>
      <td>construct(target, args)</td>
      <td>拦截 Proxy 实例作为构造函数调用的操作，例如：<span class='code'>new proxy(...args)</span></td>
    </tr>
  </tbody>
</table>

<h3>Proxy.revocable()</h3>
<p><span class='code'>Proxy.revocable()</span>返回一个对象，该对象的<span class='code'>proxy</span>属性是 Proxy 实例，<span class='code'>revoke</span> 是一个用于取消 Proxy 实例的函数。被取消的 Proxy 实例不可再被访问。</p>
<pre><code class='javascript'>let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked</code></pre>
<p><span class='code'>Proxy.revocable()</span>的一个使用场景就是临时授权对象访问。一个对象不允许直接访问，但允许通过代理临时访问，访问结束后收回代理权，之后不再允许访问。</p>

<h3>Proxy 中的 this</h3>
<p>在使用了 Proxy 的情况下，目标对象内部的<span class='code'>this</span>关键字会指向 Proxy 代理，而非原本的对象。使用时要时刻注意这一点，Proxy 内部的<span class='code'>this</span>未必是我们以为的那一个</p>

<h2>Reflect</h2>
<p>字面意思解叫“反射”，熟悉 Java 的朋友应该也有接触过这个词。它和 Proxy 一样，都是 ES6 引入的用于操作对象的新 API。</p>
<p>Reflect 的设计目的有以下几个：</p>
<ol>
  <li>将<span class='code'>Object</span>中一些明显属于语言内部的方法放到<span class='code'>Reflect</span>对象上，例如：<span class='code'>Object.defineProperty</span>。</li>
  <li>合理化一些<span class='code'>Object</span>方法的返回结果，例如：<span class='code'>Object.defineProperty</span>在无法定义属性是会抛出错误，而<span class='code'>Reflect.defineProperty</span>只是返回<span class='code'>false</span>。</li>
  <li>让<span class='code'>Object</span>中命令式的操作都变成函数式。例如：<span class='code'>key in obj</span>、<span class='code'>delete obj[key]</span>是命令式的，<span class='code'>Reflect.has(obj, key)</span>、<span class='code'>Reflect.deleteProperty(obj, key)</span>就是函数式的。</li>
  <li><span class='code'>Reflect</span>中的方法与<spanc class='code'>Proxy</spanc>中的一一对应，在<span class='code'>Proxy</span>中始终可以通过<span class='code'>Reflect</span>获取默认行为。</li>
</ol>
<p>简而言之，<span class='code'>Reflect</span>的存在意义有两点：一是把一些原本捆绑在<span class='code'>Object</span>对象上但实际上更应该属于语言内部的方法提取出来，并加以合理化，让<span class='code'>Object</span>更纯粹作为一种数据结构。二是和<span class='code'>Proxy</span>组 CP，用于在<span class='code'>Proxy</span>中始终指向默认行为，防止加了代理之后回不去。</p>

<h3>Reflect 的静态方法</h3>
<p>如前面所说的，<span class='code'>Reflect</span>的静态方法和<span class='code'>Proxy</span>支持的拦截操作一一对应。</p>
<ol>
  <li>Reflect.apply(target, thisArg, args)</li>
  <li>Reflect.construct(target, args)</li>
  <li>Reflect.get(target, name, receiver)</li>
  <li>Reflect.set(target, name, value, receiver)</li>
  <li>Reflect.defineProperty(target, name, desc)</li>
  <li>Reflect.deleteProperty(target, name)</li>
  <li>Reflect.has(target, name)</li>
  <li>Reflect.ownKeys(target)</li>
  <li>Reflect.isExtensible(target)</li>
  <li>Reflect.preventExtensions(target)</li>
  <li>Reflect.getOwnPropertyDescriptor(target, name)</li>
  <li>Reflect.getPrototypeOf(target)</li>
  <li>Reflect.setPrototypeOf(target, prototype)</li>
</ol>

<h2>小结</h2>
<p>通过 Proxy 和 Reflect，我们可以进一步控制对象的行为，甚至改变其默认行为。这可以说是对 JavaScript 能力的又一次提升。</p>

<h2>该系列的其他文章</h2>
<p>上一篇：<a href="es6-daily-12-set-and-map.html">每天一点ES6(12)：Map 和 Set</a></p>
<p>下一篇：<a href="./es6-daily-14-iterator.html">每天一点ES6(14)：Iterator</a></p>