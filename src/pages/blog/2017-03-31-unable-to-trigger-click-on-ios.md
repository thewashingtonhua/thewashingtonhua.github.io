---
title: 'iOS 下 click() 无效的问题'
description: 'iOS这个傲娇的小公举'
tags: ['ios', 'click']
cover: '../../images/blog/ios-click.jpg'
series: ''
draft: false
---

最近用 Vue 做了个项目，其中涉及到头像上传的功能，在 Web 端典型的做法是把文件控件隐藏，然后点击上传按钮时候模拟点击文件控件：

```html
<input type="file" name="avatar" id="file-picker" style="display:none;">
<button onclick="onclick">上传头像</button>

<script>
  function onclick() {
    document.querySelector('#file-picker').click();
  }
</script>
```

在 Vue 中我也如法炮制了一版，在浏览器、Android 下测试都 OK 的，但在 iOS 下 `click()` 却无法触发。查了下似乎是 iOS 上 Safari 的限制， `display:none` 的元素无法被 `click()` 触发。

调试许久后发现通过 `dispathEvent()` 直接派发事件不受影响，因此可以用下面的代码来实现触发：

```javascript
const event = new MouseEvent('click');
document.querySelector('#file-picker').dispatchEvent(event);
```

当然，在 Vue 中使用 `id` 或许并不是最合适的方案，我们也可以通过 `ref` 来实现：

```javascript
this.$refs.filePicker.dispatchEvent(event);
```