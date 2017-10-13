<p>CORS 本不是什么新鲜事，也不是特别的难，但最近遇上一个跨域的问题，后端人员是个新手没经验，靠不住，没办法只好自己上。这里权当是个记录。</p>

<p>问题其实很简单，PHP 接口层实现 CORS 允许多个指定源访问（局域网地址、应用服务器域名等），直接上代码：</p>
<pre><code class="php">public function test() {
  // 获取请求的 origin 字段
  $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

  // 这里指定了允许访问的源
  $origins_allowed = array(
    'http://app1.example.com',
    'http://app2.example.com',
    'http://localhost:8080'
  );

  // 如果请求源在上面的列表中，设置允许访问
  if (in_array($origin, $origins_allowed)) {
    header('Access-Control-Allow-Origin: '.$origin);
  }

  /* ============================================================ */
  /* 以上内容可以提取成公共部分，下面代码建议根据接口具体需求单独设置 */
  /* ============================================================ */

  // 其他请求头：允许字段、允许Cookie等，根据需要设置
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

  // 返回响应内容
  $data = array('data' => 'hello');
  $this->response($data, "json");
}</code></pre>