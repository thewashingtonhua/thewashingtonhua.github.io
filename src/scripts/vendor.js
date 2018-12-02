const getBase = () => {
  const { protocol, host } = window.location
  return `${protocol}//${host}`
}

const getPath = () => {
  const pathname = window.location.pathname
  return pathname
}

const fixRatio = (elem, w, h) => {
  elem = $(elem)
  const width = elem.width()
  const height = width * h / w
  elem.height(height)
}

const fixRatioAll = () => {
  const elems = $('.fix-ratio')
  elems.each(function () {
    const elem = $(this)
    const classlist = elem.prop('class')
    const reg = /ratio-\d+-\d+/
    const match = classlist.match(reg)
    if (match) {
      const w = match[0].split('-')[1]
      const h = match[0].split('-')[2]
      fixRatio(elem, w, h)
    }
  })
}

const initNavigator = () => {
  const tmpl = `
    <header id="mf-header">
      <div class="mf-header-wrapper">
        <a href="${getBase()}" class="logo">
          <span>童话说</span>
        </a>
        <div class='hamberger'>
          <div class='bar'></div>
          <div class='bar'></div>
          <div class='bar'></div>
        </div>
        <nav class='nav-menu'>
          <ul class="menus">
            <li class='menu' data-channel='blog'>
              <a href="${getBase()}/blog.html">博客</a>
            </li>
            <li class='menu' data-channel='project'>
              <a href="${getBase()}/project.html">项目</a>
            </li>
            <li class='menu' data-channel='lab'>
              <a href="${getBase()}/lab.html">实验室</a>
            </li>
            <li class='menu' data-channel='friend'>
              <a href="${getBase()}/friend.html">朋友</a>
            </li>
            <li class='menu' data-channel='about'>
              <a href="${getBase()}/about.html">我</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `
  const dom = $(tmpl)
  $('body').prepend(dom)

  setTimeout(() => {
    setChannel()
    handleHamberger()
  }, 0)
}

const setChannel = () => {
  const path = getPath()
  let channel = path.split('/')[1]
  if (channel) {
    channel = channel.replace(/.html$/, '')
    const elem = $(`#mf-header .nav-menu .menu[data-channel='${channel}']`)
    elem.length && elem.addClass('active')
  }
}

const handleHamberger = () => {
  const hambergerBtn = $('#mf-header .hamberger')
  const navMenu = $('#mf-header .nav-menu')
  hambergerBtn.on('click', function () {
    $(this).toggleClass('open')
    navMenu.toggleClass('open')
  })
}

const resizeHandler = () => {
  fixRatioAll()
}

$(document).ready(() => {
  initNavigator()
  fixRatioAll()

  $(window).on('resize', resizeHandler)
})

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
