const vendor = require('./vendor.config')
const catalog = require('../catalog.json')

const labs = catalog.labs
const items = {}

for (const lab of labs) {
  items[lab.id] = lab
}

module.exports = {
  id: 'lab',
  items,
  commonTitle: ' - 实验室 | 童话说',
  commonKeywords: vendor.commonKeywords.concat([]),
  commonStyles: vendor.commonStyles.concat([
    {
      type: 'link',
      value: '/dist/styles/lab.css'
    }
  ]),
  commonScripts: vendor.commonScripts.concat([])
}
