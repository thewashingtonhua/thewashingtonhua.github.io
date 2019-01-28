---
title: 'Webpack "Invalid Host Header"'
description: '更新有风险，更新需谨慎……'
date: '2017-05-04'
tags: ['webpack', 'dev', 'server', 'invalid', 'host']
cover: '../images/blog/webpack-dev-server.jpg'
---

一直以来都在用 Webpack 打包代码，配合 webpack-devserver 作 Hot Module Replacement 感觉棒棒哒，可以专心于程序逻辑，不用被无关紧要的琐事打扰。直到刚才……

# 突如其来的问题

正和同事讨论一个技术问题，写了个 Demo 打算发链接过去一起看看，结果同事说打不开，报“Invalid Host Header”，可我本机运行正常。试了下别的设备，一样打不开，确定问题真的存在。既然在本机能跑通，说明问题应该不在代码，而在于网络，`ifconfig` 检查了下 IP 地址，没错，仔细检查了一遍链接地址，也没有拼写错误，那看来是哪里配置有问题。

度娘给了一堆有的没的，StackOverflow 上一时也没有相关的讨论，于是去到 Github 上翻 Issue，似乎也没有对症的。

> 2017-06-03: 后来用 angular-cli 时候又遇到这个问题，这时候已经有相关的 Issue 了，只是我第一次遇到这个问题时候还比较早，暂时没有而已。

# 灵光一现

突然想到前两天刚更新过一批 npm 的包，其中就有 webpack 和 webpack-dev-server，不过主版本号没有变，理论上不大可能会有 Breaking Change，抱着试一试的心态，去看了下 Releases，结果意外发现了惊喜。

webpack-dev-server 在大约两周前更新了 2.4.3 和 1.16.4 两个版，除了常规的 BugFixes 和 Features，还特别注明了一项 Security Fix，并指出这很可能是一个 Breaking Change，但因为并没有涉及到架构、主要功能等影响重大的地方，因此犯不上增加 Major Version，只是作为安全性补丁，更新了 Patch Version。

这轮更新主要是新增了对 host header 的正确性检测（就是我当前遇到的问题），以屏蔽未经授权的访问。开发者需要在执行 webpack-dev-server 命令时手动添加 `--public` 选项，取值为授权的 host，否则响应中就会提示这个问题，也就是我们看到的“Invalid Host Header”。

# 解决方案

官方提供了两个解决方案：

- 执行 webpack-dev-server 命令时手动添加 `--public` 选项，取值为授权的 host，这是官方建议的做法，目的是为了安全。
- 设置 webpack-dev-server 的配置项 `disableHostCheck` 为 true 以禁用这一检测，如果开发者使用了代理，或在开发环境中不 care 这些安全问题，该设置可以直接斩草除根。

# 例外

当然，或许你并没有遇到这样的问题（等等，如果你没遇到这个问题，你又是出于什么原因把这篇文章看到了这里？），因为官方贴心的设置了一些例外场景，这些场景下不受该补丁的影响：

- host 为 localhost 或 127.0.0.1 时不会受阻。
- 只有使用 webpack-dev-server 或 webpack-dev-middleware 时会进行该项检测，webpack 和 打包后的代码不受此影响。

# 番外

此次受影响的还包括其它基于 webpack-dev-server 的模块，例如 angular-cli，其 `ng serve` 命令就是基于 webpack-dev-server 实现的，在升级到 1.0.1 之后收到了牵连。目前官方已经解决了这一问题，1.0.0-beta.1 版本添加了`--disable-host-check`选项，更新后即可使用。如果你出于某些原因不方便更新，也可以反过来降级到 1.0.0 作为临时解决方案。

相关 Issue 如下：
- <a href="https://github.com/angular/angular-cli/issues/6070">问题讨论：Invalid Host header after updating to 1.0.1</a>
- <a href="https://github.com/angular/angular-cli/issues/6173">解决方案：feat(@angular/cli): add host check flags to ng serve</a>

# 写在最后

经过这次的问题，总结了几个小点与大家分享：
- 创业公司对新技术的接受度还是比较高的，这点是好事也是坏事。
  - 好处：能接触到较为前沿的技术，对个人能力的提升非常有利。
  - 坏处：坑多，不少还是没有前车之鉴的新坑，缺少相关资料。
- 文档很重要，不出问题不觉得，一出就得指望 Change Log 了。
- 如果度娘、谷哥、SO 都帮不了你，试试 Github，可能会有奇效。
- 社区的力量真 tm 强大。