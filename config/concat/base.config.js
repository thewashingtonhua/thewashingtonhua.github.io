const vendor = require('./vendor.config')

module.exports = {
  id: 'base',
  items: {
    index: {
      template: 'src/views/index/index.html',
      title: '首页',
      keywords: [],
      styles: [
        {
          type: 'link',
          value: '/dist/styles/index.css'
        }
      ],
      scripts: []
    },
    blog: {
      template: 'src/views/index/blog.html',
      title: '博客',
      keywords: [],
      styles: [
        {
          type: 'link',
          value: '/dist/styles/blog-catalog.css'
        }
      ],
      scripts: []
    },
    project: {
      template: 'src/views/index/project.html',
      title: '项目',
      keywords: [],
      styles: [
        {
          type: 'link',
          value: '/dist/styles/project-catalog.css'
        }
      ],
      scripts: [
        {
          type: 'outter',
          value: '/dist/scripts/project/index.js'
        }
      ]
    },
    lab: {
      template: 'src/views/index/lab.html',
      title: '实验室',
      keywords: [],
      styles: [
        {
          type: 'link',
          value: '/dist/styles/lab-catalog.css'
        }
      ],
      scripts: []
    },
    friend: {
      template: 'src/views/index/friend.html',
      title: '朋友',
      keywords: [],
      styles: [
        {
          type: 'link',
          value: '/dist/styles/friend.css'
        }
      ],
      scripts: []
    },
    about: {
      template: 'src/views/index/about.html',
      title: '关于',
      keywords: [],
      styles: [
        {
          type: 'link',
          value: '/dist/styles/about.css'
        }
      ],
      scripts: [
        {
          type: 'outter',
          value: '/dist/scripts/about/index.js'
        }
      ]
    }
  },
  commonTitle: ' | 童话说',
  commonKeywords: vendor.commonKeywords.concat([]),
  commonStyles: vendor.commonStyles.concat([]),
  commonScripts: vendor.commonScripts.concat([])
}
