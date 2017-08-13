const vendor = require('./vendor.config')
const catalog = require('../catalog.json')

const projects = catalog.projects
const items = {}

for (const project of projects) {
  items[project.id] = project
}

module.exports = {
  id: 'project',
  items,
  commonTitle: ' - 项目 | 童话说',
  commonKeywords: vendor.commonKeywords.concat([]),
  commonStyles: vendor.commonStyles.concat([
    {
      type: 'link',
      value: '/dist/styles/icons.css'
    },
    {
      type: 'link',
      value: '/dist/styles/project.css'
    }
  ]),
  commonScripts: vendor.commonScripts.concat([])
}
