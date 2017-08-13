const vendor = require('./vendor.config')

module.exports = {
  id: 'project',
  items: {
    'tik-tok-color': {
      template: 'src/views/pages/project/tik-tok-color.html',
      title: 'Tik Tok Color',
      keywords: [],
      styles: [],
      scripts: []
    }
  },
  commonTitle: ' - 项目 | 童话说',
  commonKeywords: vendor.commonKeywords.concat([]),
  commonStyles: vendor.commonStyles.concat([
    '/dist/styles/project.css'
  ]),
  commonScripts: vendor.commonScripts.concat([])
}
