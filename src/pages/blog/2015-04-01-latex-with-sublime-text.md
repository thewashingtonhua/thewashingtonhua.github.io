---
title: '使用 Sublime Text 编写 LaTeX'
description: '用你最熟悉的工具来写 LaTeX 吧'
tags: ['sublime', 'latex']
cover: '../../images/blog/latex-with-sublime-text.jpg'
series: ''
draft: false
---

## 为什么要用 Sublime Text

大部分的 LaTeX 教程都会推荐使用 WinEdt、TexMake 等工具，这些工具固然好，但是对于开发人员来说，电脑上本来已经各种开发工具一大堆了，就为写个文档还要单独打开个编辑器，多麻烦，要是能用自己最常用的工具直接完成，岂不妙哉？这时候 Sublime Text 就该出场了。

做前端的同学们想必都对 Sublime Text 非常熟悉了，是的，这款十个人里有九个都在用的神器在前端界的地位无需多言，其流行程度和可扩展性绝不输 Eclipse。Sublime Text 自带对 LaTeX 语法的支持，但其并不自带 TeX，无法直接编译生成 PDF，因此想用它来写 LaTeX 还需要一番调教才行。那么接下来我就以 Windows 平台为例来教你怎么做。（如果你用的是 OSX 或者 Linux，可以参考 <a target='_blank' href='https://github.com/SublimeText/LaTeXTools/blob/master/README.markdown'>这篇文章</a>。

## 准备工作

首先我们需要下载并安装一些东西：

| 名称 | 简介 |  |
|-|-|-|
| <span style='white-space: nowrap;'>MiKTeX</span> | 一款 Windows 平台下的 LaTeX 工具套件，包含了 TeX 以及相关的程序。 | <a target='_blank' href='http://www.miktex.org/download' style='white-space: nowrap;'>下载地址</a> |
| <span style='white-space: nowrap;'>Sublime Text</span> | 超好用的文本编辑器，前端开发必备。 | <a target='_blank' href='http://www.sublimetext.com/3' style='white-space: nowrap;'>下载地址</a> |
| <span style='white-space: nowrap;'>LaTeX Tools</span> | 一款 Sublime Text 插件，用于编译 LaTeX 的 build 系统。建议使用 Package Control 安装。需要 以用右边的连接。 | <a target='_blank' href='https://github.com/SublimeText/LaTeXTools' style='white-space: nowrap;'>下载地址</a> |
| <span style='white-space: nowrap;'>Sumatra PDF</span> | 一款免费的 PDF 阅读器，LaTeXTools 默认使用它来预览生成的 PDF。 | <a target='_blank' href='http://www.sumatrapdfreader.org/download-free-pdf-viewer.html' style='white-space: nowrap;'>下载地址</a> |

## 配置 LaTeXTools

打开 Sublime Text，按下快捷键 `Ctrl + Shift + P` ，调出 Package Control，搜索 “LaTeXTools: Reconfigure and migrate settings” 并回车即可。这一步实际上在 User 目录下创建了名为 “LaTeXTools.sublime-settings” 的配置文件。

## 配置 SumatraPDF

第一步：将 SumatraPDF 的主程序目录添加到环境变量 `PATH` ，这一步很重要，否则下一步会无法进行。

第二步：打开命令提示符（cmd.exe），执行以下命令：（将其中的安装路径替换成你实际的安装路径）
 `sumatrapdf.exe -inverse-search "\"C:\Program Files\Sublime Text 3\sublime_text.exe\" \"%f:%l\""`

## 使用

进行到现在，理论上应该就已经配置好了。以后就可以用 Sublime Text 写 LaTeX 了。写完之后保存（新建的文件一定要先保存，否则 build 是无效的），然后按下快捷键 `Ctrl + B` ，Sublime Text 就会自动调用 LaTeXTools 的 build 系统来进行编译，然后自动打开 SumatraPDF 进行预览。之后每次修改后只要 `Ctrl + B` 一下，SumatraPDF 里的内容就会自动更新。

## 小结

好了，现在我们就可以用我们最喜欢的代码编辑器来写 LaTeX 了，是不是很方便呢？