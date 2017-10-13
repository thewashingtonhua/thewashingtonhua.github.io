<p>最近用 Vue 做了个项目，其中涉及到头像上传的功能，在 Web 端典型的做法是把文件控件隐藏，然后点击上传按钮时候模拟点击文件控件：</p>
<pre><code class="html">&lt;input type="file" name="avatar" id="file-picker" style="display:none;"&gt;
&lt;button onclick="onclick"&gt;上传头像&lt;/button&gt;

&lt;script&gt;
  function onclick() {
    document.querySelector('#file-picker').click();
  }
&lt;/script&gt;</code></pre>

<p>在 Vue 中我也如法炮制了一版，在浏览器、Android 下测试都 OK 的，但在 iOS 下<span class="code">click()</span>却无法触发。查了下似乎是 iOS 上 Safari 的限制，<span class="code">display:none</span>的元素无法被<span class="code">click()</span>触发。</p>

<p>调试许久后发现通过<span class="code">dispathEvent()</span>直接派发事件不受影响，因此可以用下面的代码来实现触发：</p>
<pre><code class="javascript">const event = new MouseEvent('click');
document.querySelector('#file-picker').dispatchEvent(event);</code></pre>

<p>当然，在 Vue 中使用<span class="code">id</span>或许并不是最合适的方案，我们也可以通过<span class="code">ref</span>来实现：</p>
<pre><code class="javascript">this.$refs.filePicker.dispatchEvent(event);</code></pre>