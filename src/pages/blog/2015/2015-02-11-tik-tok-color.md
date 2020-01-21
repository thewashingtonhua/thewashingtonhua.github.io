---
title: '时间是什么颜色的'
description: '如果时间有颜色……'
tags: ['color', 'time', 'project']
cover: '../../../images/blog/tik-tok-color.jpg'
series: ''
draft: false
original: true
---

## 简单说两句

最初在 [这里](http://whatcolourisit.scn9a.org) 看到了这个案例，觉得挺有意思的，就尝试自己仿制了一个。

原理上讲其实很简单，将时间的值对应为颜色通道的数值，并通过视觉效果体现出来。原作仅为 RGB 模式，我在其基础之上还尝试了 HSL 模式和 CMYK 的效果，并支持 3 种模式之间的切换查看。CMYK 模式在 Web 端并没有原生支持，无法直接使用，因此我把时、分、秒分别对应到 C、M、Y 通道，K 通道用日期表示，一天一变，保证每个通道都能有变化。

原理虽然简单，但实现过程涉及颜色空间和数值进制之间的格式转换，需要多加注意，否则会出现各种 Bug。

不同色彩空间的色域不完全相同，彼此间也不是简单的包含关系，因此存在一定程度的转换失真。但由于时间的各个值最大不超过 60，对应可显示的颜色范围只有完整色域的一小部分（当然，我们完全可以通过换算来覆盖完整的色域空间，但是没有必要，这个 idea 的重点就在于把时间的值直接用做颜色值，看会是什么效果，因此这里我们不考虑这个问题）。

下面给出一些关键之处的实现说明。

## HSL 到 RGB 的转换

CSS 中原生支持通过 HSL 模式来表示颜色，因此可以直接调用 `hsl(h, s, l)` 来进行显示。这里我们为了显示其对应的十六进制表示，还需要进行一次从 HSL 到 RGB 的转换。转换算法如下：

```js
function hsl2rgb (hsl) {
  var hsl_array = hsl.substring(4,hsl.length-1).trim().split(',')
  var h = Number(hsl_array[0])
  var s = Number(hsl_array[1].substring(0, hsl_array[1].length-1)) / 100
  var l = Number(hsl_array[2].substring(0, hsl_array[2].length-1)) / 100

  var r, g, b
  if (s === 0) {
    r = l g = l b = l
  } else {
    var tmp2 = (l < 0.5) ? (l * (1 + s)) : ((l * 100 + s * 100) - l * s * 100) / 100
    var tmp1 = (2 * l * 100 - tmp2 * 100) / 100
    var h2   = h / 360

    function hue2rgb (tmp1, tmp2, tmp3) {
      if (tmp3 < 0) tmp3 += 1
      if (tmp3 > 1) tmp3 -= 1
      var result = 0
      if (tmp3 < 1 / 6) {
        result = tmp1 + (tmp2 - tmp1) * 6 * tmp3
      } else if (tmp3 < 1 / 2) {
        result = tmp2
      } else if (tmp3 < 2 / 3) {
        result = tmp1 + (tmp2 - tmp1) * (2 / 3 - tmp3) * 6
      } else {
        result = tmp1
      }
      return Math.round(result * 255)
    }

    r = hue2rgb(tmp1, tmp2, h2 + 1 / 3)
    g = hue2rgb(tmp1, tmp2, h2)
    b = hue2rgb(tmp1, tmp2, h2 - 1 / 3)
  }

  var rgb = "rgb(" + r + "," + g + "," + b + ")"
  return rgb
}
```

函数接受一个形如 `hsl(h, s%, l%)` 的表达式作为参数，返回值为形如 `rgb(r, g, b)` 的表达式。由于 IEEE745 浮点数的精度问题，在计算过程中不得不通过缩放来维持计算的准确性。详细的算法描述可以参见：[[Wikipedia] HSL到RGB的转换算法]('http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4)

## CMYK 到 RGB 的转换

CMYK 模式作为一种印刷行业的色彩空间，在 Web 上并没有原生的实现，因此只能借助 RGB 进行中转。好在 CMYK 到 RGB 的转换并不复杂，公式化简之后可以一步到位，关键算法如下：

```js
var c = hour
var m = min
var y = sec
var k = day

var r = Math.round( (1 - c / 100 * ( 1 - k / 100 ) - k / 100 ) * 255)
var g = Math.round( (1 - m / 100 * ( 1 - k / 100 ) - k / 100 ) * 255)
var b = Math.round( (1 - y / 100 * ( 1 - k / 100 ) - k / 100 ) * 255)
```

变量 `hour` ,  `min` ,  `sec` ,  `day` 在之前的代码中有定义，来自于 `new Date()`，这里将其省略了。时间值与 CMYK 值的映射关系是我自定义的，因为色相主要由 C、M、Y 决定，如果这三个值变化太慢的话，视觉上不容易看出效果，而K主要负责定位套版的颜色，一天一变问题不大，你也可以变换尝试其他的组合，说不定会有意想不到的效果。详细的算法描述可以参见：[[Wikipedia] CMYK 到 RGB 的转换算法](http://zh.wikipedia.org/wiki/%E5%8D%B0%E5%88%B7%E5%9B%9B%E5%88%86%E8%89%B2%E6%A8%A1%E5%BC%8F)

## RGB 的十六进制表示法

前面计算所得的 R、G、B 数值，不管是在 RGB 模式下，还是从 HSL 和 CMYK 转换过来的，我们都是将其作为十进制看待的，取值范围为 0-255，这一步我们需要将其转换为 6 位十六进制进行显示。

```js
function rgb2hex(color) {
  var rgb_array = color.substring(4,color.length-1).trim().split(',')
  var rd = Number(rgb_array[0])
  var gd = Number(rgb_array[1])
  var bd = Number(rgb_array[2])

  var rh = rd.toString(16)
  var gh = gd.toString(16)
  var bh = bd.toString(16)

  var hex = "#" + rh + gh + bh
  return hex
}
```

 `rd` 、 `gd` 、 `bd` 为从 color 中分离出来的 RGB 通道各自的十进制数，后缀 d 表示 decimal，十进制。 `rh` 、 `gh` 、 `bh` 为转换后 RGB 通道各自的 2 位的十六进制值，后缀 h 表示 hexadecimal，十六进制。 `toString()` 方法中的 16 表示以十六进制表示。

## 小结

看似简单的东西，做起来却又陷阱重重，没有扎实的基本功就免不了漏洞百出。实践才是检验真理的唯一标准啊。
