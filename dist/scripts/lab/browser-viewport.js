var spanVpW = document.getElementById('vp-w');
var spanVpH = document.getElementById('vp-h');
var spanCW = document.getElementById('c-w');
var spanCH = document.getElementById('c-h');
var spanScrW = document.getElementById('scr-w');
var spanScrH = document.getElementById('scr-h');
var spanScrAw = document.getElementById('scr-aw');
var spanScrAh = document.getElementById('scr-ah');
var spanScrDpi = document.getElementById('scr-dpi');

function init() {
  var vpW = window.innerWidth;
  var vpH = window.innerHeight;
  var cW = document.documentElement.clientWidth;
  var cH = document.documentElement.clientHeight;
  var scrW = window.screen.width;
  var scrH = window.screen.height;
  var scrAw = window.screen.availWidth;
  var scrAh = window.screen.availHeight;
  var scrDpi = window.screen.deviceXDPI;

  spanVpW.innerHTML = vpW + ' px';
  spanVpH.innerHTML = vpH + ' px';
  spanCW.innerHTML = cW + ' px';
  spanCH.innerHTML = cH + ' px';
  spanScrW.innerHTML = scrW + ' px';
  spanScrH.innerHTML = scrH + ' px';
  spanScrAw.innerHTML = scrAw + ' px';
  spanScrAh.innerHTML = scrAh + ' px';
  spanScrDpi.innerHTML = scrDpi ? scrDpi + ' px' : 'N/A';
}

init();
window.onresize = init;
//# sourceMappingURL=browser-viewport.js.map
