const spanVpW = document.getElementById('vp-w')
const spanVpH = document.getElementById('vp-h')
const spanCW = document.getElementById('c-w')
const spanCH = document.getElementById('c-h')
const spanScrW = document.getElementById('scr-w')
const spanScrH = document.getElementById('scr-h')
const spanScrAw = document.getElementById('scr-aw')
const spanScrAh = document.getElementById('scr-ah')
const spanScrDpi = document.getElementById('scr-dpi')

function init () {
  const vpW = window.innerWidth
  const vpH = window.innerHeight
  const cW = document.documentElement.clientWidth
  const cH = document.documentElement.clientHeight
  const scrW = window.screen.width
  const scrH = window.screen.height
  const scrAw = window.screen.availWidth
  const scrAh = window.screen.availHeight
  const scrDpi = window.screen.deviceXDPI

  spanVpW.innerHTML = vpW + ' px'
  spanVpH.innerHTML = vpH + ' px'
  spanCW.innerHTML = cW + ' px'
  spanCH.innerHTML = cH + ' px'
  spanScrW.innerHTML = scrW + ' px'
  spanScrH.innerHTML = scrH + ' px'
  spanScrAw.innerHTML = scrAw + ' px'
  spanScrAh.innerHTML = scrAh + ' px'
  spanScrDpi.innerHTML = scrDpi ? (scrDpi + ' px') : 'N/A'
}

init()
window.onresize = init
