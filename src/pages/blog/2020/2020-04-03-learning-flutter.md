---
title: 'Flutter 扫雷记'
description: '目标，移动端，走起'
tags: ['flutter']
cover: '../../../images/blog/flutter.jpg'
series: ''
draft: true
original: true
---
## 起源

这篇文章，记录了我在学习 Flutter 的过程中踩过的各种雷，方便自己日后再遇到时能够有据可循，同时也分享给各位初上手 Flutter 的同行们。

## 雷区

### 雷区1：Dart Not Found

通常，在安装完一个新的工具后，我们都会习惯性的通过 `which` 命令检查下是否安装成功。但在安装完 Flutter 之后，`which flutter` 返回了正确的结果，`which dart` 却报 `dart not found`。

检查 Flutter 目录下的内容，发现在 `PATH_TO_FLUTTER/bin/cache/dart-sdk/bin` 目录下是存在 dart 的可执行文件的，通过这个地址调用 dart 也确实可以正常使用。既然 Flutter 内置了 Dart，`PATH_TO_FLUTTER/bin` 目录也已经添加到环境变量，为何 Flutter 可以访问但 Dart 却不行呢？

查阅官方文档了解到，Flutter 内置的 Dart 仅供 Flutter 使用，并非全局安装。

> If you’re developing only mobile apps, then you don’t need the Dart SDK; just [install Flutter](https://flutter.dev/docs/get-started/install).

> 如果你只是用来开发移动应用，那么你不需要 Dart SDK，只管[安装 Flutter](https://flutter.dev/docs/get-started/install) 即可。

也就是说，Flutter 的运行并不依赖全局的 Dart，所以我们遇到的情况是正常的。

如果朋友们有强迫症，一定要全局安装 Dart，或是想用 Dart 做点 Flutter 以外的事情，那么有两种方式：

1. 把 `PATH_TO_FLUTTER/bin/cache/dart-sdk/bin` 添加到环境变量，使用 Flutter 内置的 Dart 作为全局 Dart。
2. 通过 Homebrew 单独安装 Dart。
```bash
brew tap dart-lang/dart
brew install dart
```

### 雷区2：Android License Status Unknown

如果你是跟着官方文档安装的 Flutter，那么一定运行过 `flutter doctor` 这个工具。大部分时候我们只需要缺什么补什么一个个安装即可，但有一个问题困扰了不少人，Github 和 Stackoverflow 上问的也比较多，那就是「Android License Status Unknown」。

一番搜索，大部分都会提示执行一下 `flutter doctor --android-licenses`，执行完之后，剧情开始分叉：

剧情 1：很顺利，命令行提示有一些 Android 工具的 license 没有同意，需要手动同意一下。我在公司和自己的电脑上都配过，一个之前配过 Android 环境，一个没有，都出现了这个问题，所以不要慌，按照提示一路按「y」同意即可

剧情 2：命令行提示 Android SDK 有新版本，需要先更新：

```bash
A newer version of the Android SDK is required. To update, run:
~/Android/sdk/tools/bin/sdkmanager --update
```

根据提示执行：`~/Android/sdk/tools/bin/sdkmanager --update`，这时候又出现了新的剧情分叉：

剧情 2.1：更新很顺利，回到剧情 1，顺利完结。

剧情 2.2：报 Java 错误，提示有些类包不存在。

经过一通翻天覆地的搜索，以及亲自试错，我可以很负责任地告诉大家，确实跟 JDK 版本有关系。（奇怪的是，Google 官方并没有表示 Android 开发对 JDK 版本的要求，又或者只是藏在了更深的地方我没发现）实测验证，剧情 2.2 仅在 JDK 9 及以上的环境中能够解锁，JDK 8 并不会遇到（主流环境应该至少有 8 了吧，再早的就过分了）。据知情人士透露，JDK 9 开始移除了一些包，导致了这个问题。而我因为是新配的环境，默认下了当前最新的 JDK 13，因此遇到了这个问题。

鉴于本人对 Java 并不熟，大学毕业后就没再正经碰过，不是很了解现在的发展情况，在询问了身边做 Android 开发的朋友后得知高版本也并非刚需，并且我的目标是 Flutter，Java 在这里不是重点，因此这里我选择降级到 JDK 8。如果有不甘心的朋友非新版本 JDK 不可，[这里](https://www.wandouip.com/t5i325108/)有位仁兄整理了如何补齐缺失类包的方法，我没有亲自验证过，但看样子应该是那么回事，有兴趣的可以前往一读。
