const vendor = require('./vendor.config')

module.exports = {
  id: 'lab',
  items: {
    'tik-tok-color': {
      template: 'src/views/pages/lab/browser/ua.html',
      title: 'Tik Tok Color',
      keywords: [],
      styles: [],
      scripts: []
    }
  },
  commonTitle: ' - 实验室 | 童话说',
  commonKeywords: vendor.commonKeywords.concat([]),
  commonStyles: vendor.commonStyles.concat([
    '/dist/styles/lab.css'
  ]),
  commonScripts: vendor.commonScripts.concat([])
}
