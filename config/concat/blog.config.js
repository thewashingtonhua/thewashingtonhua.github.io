const vendor = require('./vendor.config')
const catalog = require('../catalog.json')

const blogs = catalog.blogs
const items = {}

for (const blog of blogs) {
  items[blog.id] = blog
}

module.exports = {
  id: 'blog',
  // items: {
  //   'substr-and-substring': {
  //     template: 'src/views/pages/blog/substr-and-substring.html',
  //     title: 'substr( )和substring( )的区别',
  //     keywords: [],
  //     styles: [],
  //     scripts: []
  //   },
  //   'stack-calculator': {
  //     template: 'src/views/pages/blog/stack-calculator.html',
  //     title: '栈计算器',
  //     keywords: [],
  //     styles: [],
  //     scripts: []
  //   },
  //   'tik-tok-color': {
  //     template: 'src/views/pages/blog/tik-tok-color.html',
  //     title: '时间是什么颜色的',
  //     keywords: [],
  //     styles: [],
  //     scripts: []
  //   }
  // },
  items,
  commonTitle: ' - 博客 | 童话说',
  commonKeywords: vendor.commonKeywords.concat([]),
  commonStyles: vendor.commonStyles.concat([
    {
      type: 'link',
      value: '/dist/styles/blog.css'
    }
  ]),
  commonScripts: vendor.commonScripts.concat([
    {
      type: 'outter',
      value: '/dist/scripts/line-number.js'
    }
  ])
}
