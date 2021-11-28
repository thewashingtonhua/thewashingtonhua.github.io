---
title: '基于 Monorepo 的项目架构'
description: '分久必合'
tags: ['architecture', 'monorepo', '架构']
cover: '../../../images/blog/blank.jpg'
series: ''
draft: true
original: true
---

## Monorepo

### 优点

- 方便项目内的代码复用
- 优雅（相比独立 npm 包、npm link 等方案）
- 减少 node_modules 目录的大小（被拍扁了，所以重复安装少了）

### 缺点

- 从 Single-repo 迁移过来的成本不低，需要比较多的改造（拆包、重新梳理构建链路）。
- 命令会比较长，虽然可以通过写到 scripts 里进行屏蔽。

## 实战

### app vs. packages

最基本的 monorepo 只有 packages 一个目录用于承载各模块（约定俗成的名字，非固定名称），但其实可以有多个。

在阿里云盘的实践中，我们将模块划分为 packages 和 apps 两个目录，位于前者的模块被设计用于内部引用，不会单独对外发布，例如项目用到的 UI 组件、工具函数、数据模型、可复用的业务逻辑等；后者则一一对应每一个对外发布的应用，如 Web 端、桌面端、以及一些 H5 页面、小程序等。

大部分的业务向应用应该都能被划分成这两类。当然如果你正在编写的是一个工具库，你可能更需要类似 Babel 的模式，就一个 packages 目录，其中的每一项都是可以对完发布的。

### 源码引用 vs. 构建后引用

源码引用，好处是实时生效，方便热更新；缺点是构建过程可能会受 app 构建影响，例如一些 ESM 的包就不太好被 Node 直接使用。

构建后引用，好处是兼容性强，可以在构建时提供 ESM、CMD 等规范的导出；缺点是更新不及时，需要等待构建、发版过程。

所以这里其实是一个效率和兼容性之间的选择题。当然你也选择两个都要，watch package 的变化自动执行 build，然后 app 引用构建后的内容。

阿里云盘选择了前者，直接引用源码，通过 package 的拆分和的构建配置的统一规划，来规避 ESM 和 CMD 的兼容问题。

### Babel 的实践

```json
{
  rootMode: "upward"
}
```

### package.json 的实践

### tsconfig.json 的实践

### global.d.ts 的实践

难免会遇到需要往 Windows 上挂一点东西，或者手动给一些没有提供类型定义的模块添加类型定义的场景。通常的做法就是在模块的根目录放这么一个 *.d.ts 的文件。

实践发现，如果多个 app 都有这样的需要，且内容相同（例如页面加载前往 Windows 上挂了一些全局配置项）

## Reference

[https://segmentfault.com/a/1190000040291971](https://segmentfault.com/a/1190000040291971)
