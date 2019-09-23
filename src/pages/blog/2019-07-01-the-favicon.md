---
title: '小图标：favicon 的终极解决方案'
description: '细节成就完美'
tags: ['favicon']
cover: '../../images/blog/the-favicon.jpg'
series: ''
draft: true
original: true
---

最近在跟同行聊天时，聊到了「可访问性」的问题，其中有一个点就是 favicon。

通常，我们对 favicon 的印象，就是那个浏览器标签上不起眼的小图标。大部分时候我们不会特别去注意它，除非你也像我一样经常会同时开着几十个浏览器标签，否则可能很难体会到这个小家伙的存在是多么的有必要。

## favicon 有什么用

就像手机上的 App 都有自己的图标，favicon 就是网页的图标。在移动时代之前，这个小图标主要用在收藏夹中，而收藏夹的英文原话往往叫「favourite」，因而得名『favicon』。在大前端时代，Web 和 Native 的边界日益模糊，我们可能已经不会刻意去区分是 App 的图标和 favicon，统一都管它们叫图标。

图标的主要用途和名称一样，都是用来表示自己是谁。当在某些环境中，不方便显示文字，或是标题太长显示不全的情况下，图标就成为了唯一的识别方式。

## 我们到底需要多少 favicon？

所以但凡会用到图标的地方，favicon 都需要覆盖到。除了浏览器的标签页，Speed Dial 也是一个需要展示

谈及 favicon 的尺寸，很多人印象里要么是 16 x 16，要么是 32 x 32，很多在线的 favicon 创建工具也只提供这么几个选项。Web 创世之初，确实是如此，但时至今日，Web 的早已触达更加广袤的领域，favicon 的应用场景相应的也就多了起来。

```html
<!-- For iPad with @2× display running iOS ≤ 6: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144-precomposed.png">
<!-- For iPhone with @2× display running iOS ≤ 6: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png">
<!-- For the iPad mini and the first- and second-generation iPad (@1× display) on iOS ≥ 7: -->
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76-precomposed.png">
<!-- For the iPad mini and the first- and second-generation iPad (@1× display) on iOS ≤ 6: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png">
<!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png"><!-- 57×57px -->


<!-- For iPhone with @3× display: -->
<link rel="apple-touch-icon-precomposed" sizes="180x180" href="apple-touch-icon-180x180-precomposed.png">
<!-- For iPad with @2× display & iOS10+: -->
<link rel="apple-touch-icon-precomposed" sizes="167x167" href="apple-touch-icon-167x167-precomposed.png">
<!-- For iPad with @2× display: -->
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152-precomposed.png">
<!-- For iPhone with @2× display: -->
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120-precomposed.png">


<!-- apple-touch links are marked as deprecated by Google -->
<!-- Chrome for Android home screen icon -->
<link rel="icon" type="image/png" href="favicon-192x192.png" sizes="192x192" />


<!-- Chrome Web Store icon & Small Windows 8 Star Screen Icon -->
<link rel="icon" type="image/png" href="favicon-128x128.png" sizes="128x128" />


<!-- IE10 Metro tile for pinned site -->
<link rel="icon" type="image/png" href="favicon-144x144.png" sizes="144x144" />


<!-- Universal (32x32) -->
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

<!-- Windows Tile -->
<meta name="application-name" content="站点名称"/>
<meta name="msapplication-TileColor" content="十六进制颜色值" />
<meta name="msapplication-TileImage" content="mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
```

上面的内容，对于觉得多数项目应该是够用了。但这并不是全部，想要更讲究一点的话，这里有几个链接：

- [Apple - Configuring Web Application](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Google - The Web Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
- [Microsoft - Build a live tile](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn455106(v=vs.85))

## 拯救 UI 设计师

都说能做出好工具的，要么是懂代码的设计师，要么是懂设计的工程师。刚巧，我自诩两个身份都沾。

那就动手吧。
