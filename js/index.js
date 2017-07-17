/*
 * Generate Navigations
 */
function initNavigator () {
  var newMfSidebar = document.createElement('div')
  var newMfProfile = document.createElement('div')
  var newMfPortrait = document.createElement('a')
  var newMfGhid = document.createElement('a')
  var newMfCategory = document.createElement('ul')
  var blogLi = document.createElement('li')
  var blogA = document.createElement('a')
  // var project_li = document.createElement('li')
  // var project_a = document.createElement('a')
  var labLi = document.createElement('li')
  var labA = document.createElement('a')
  var friendLi = document.createElement('li')
  var friendA = document.createElement('a')
  var aboutLi = document.createElement('li')
  var aboutA = document.createElement('a')

  newMfSidebar.id = 'mf_sidebar'
  newMfProfile.id = 'mf_profile'
  newMfProfile.className = 'clearfix'
  newMfPortrait.id = 'mf_portrait'
  newMfPortrait.href = 'http://tonghuashuo.github.io'
  newMfGhid.id = 'mf_ghid'
  newMfGhid.href = 'https://github.com/tonghuashuo'
  newMfGhid.target = '_blank'
  newMfGhid.innerHTML = '@tonghuashuo'
  newMfCategory.id = 'mf_category'
  newMfCategory.className = 'clearfix'
  blogLi.id = 'blog'
  // project_li.id = 'project'
  labLi.id = 'lab'
  friendLi.id = 'friend'
  aboutLi.id = 'about'

  newMfProfile.appendChild(newMfPortrait)
  newMfProfile.appendChild(newMfGhid)

  blogLi.appendChild(blogA)
  // project_li.appendChild(project_a)
  labLi.appendChild(labA)
  friendLi.appendChild(friendA)
  aboutLi.appendChild(aboutA)
  newMfCategory.appendChild(blogLi)
  // newMfCategory.appendChild(project_li)
  newMfCategory.appendChild(labLi)
  newMfCategory.appendChild(friendLi)
  newMfCategory.appendChild(aboutLi)

  newMfSidebar.appendChild(newMfProfile)
  newMfSidebar.appendChild(newMfCategory)

  var newMfContent = document.getElementById('mf_content')

  document.body.insertBefore(newMfSidebar, newMfContent)

  var url = window.location.href
  var base = url.indexOf('tonghuashuo.github.io')
  var sub = url.substr(base).split('/')
  var level = sub.length - 2

  var subStr = ''
  for (var i = 0; i < level; i++) {
    subStr += '../'
  }

  blogA.href = subStr + 'blog.html'
  // project_a.href = subStr + 'project.html'
  labA.href = subStr + 'lab.html'
  friendA.href = subStr + 'friend.html'
  aboutA.href = subStr + 'about.html'

  blogA.innerHTML = '博客'
  // project_a.innerHTML = '项目'
  labA.innerHTML = '实验室'
  friendA.innerHTML = '朋友'
  aboutA.innerHTML = '关于'

  var channel = level ? sub[1] : sub[1].slice(0, -5)
  document.getElementById(channel).className = 'active'
}

initNavigator()

// Baidu ZhanZhang - Auto Push
;(function () {
  var bp = document.createElement('script')
  var curProtocol = window.location.protocol.split(':')[0]
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
  } else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js'
  }
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(bp, s)
})()

// Baidu TongJi
/* eslint-disable no-use-before-define */
var _hmt = _hmt || []
/* eslint-enable no-use-before-define */
;(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?d82e27389265a031116dc59fe6cd8d1d'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
