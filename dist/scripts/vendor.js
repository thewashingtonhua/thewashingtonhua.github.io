var getBase = function getBase() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      host = _window$location.host;

  return protocol + '//' + host;
};

var getPath = function getPath() {
  var pathname = window.location.pathname;
  return pathname;
};

var fixRatio = function fixRatio(elem, w, h) {
  elem = $(elem);
  var width = elem.width();
  var height = width * h / w;
  elem.height(height);
};

var fixRatioAll = function fixRatioAll() {
  var elems = $('.fix-ratio');
  elems.each(function () {
    var elem = $(this);
    var classlist = elem.prop('class');
    var reg = /ratio-\d+-\d+/;
    var match = classlist.match(reg);
    if (match) {
      var w = match[0].split('-')[1];
      var h = match[0].split('-')[2];
      fixRatio(elem, w, h);
    }
  });
};

var initNavigator = function initNavigator() {
  var tmpl = '\n    <header id="mf-header">\n      <div class="mf-header-wrapper">\n        <a href="' + getBase() + '" class="logo">\n          <span>\u7AE5\u8BDD\u8BF4</span>\n        </a>\n        <div class=\'hamberger\'>\n          <div class=\'bar\'></div>\n          <div class=\'bar\'></div>\n          <div class=\'bar\'></div>\n        </div>\n        <nav class=\'nav-menu\'>\n          <ul class="menus">\n            <li class=\'menu\' data-channel=\'blog\'>\n              <a href="' + getBase() + '/blog.html">\u535A\u5BA2</a>\n            </li>\n            <li class=\'menu\' data-channel=\'project\'>\n              <a href="' + getBase() + '/project.html">\u9879\u76EE</a>\n            </li>\n            <li class=\'menu\' data-channel=\'lab\'>\n              <a href="' + getBase() + '/lab.html">\u5B9E\u9A8C\u5BA4</a>\n            </li>\n            <li class=\'menu\' data-channel=\'friend\'>\n              <a href="' + getBase() + '/friend.html">\u670B\u53CB</a>\n            </li>\n            <li class=\'menu\' data-channel=\'about\'>\n              <a href="' + getBase() + '/about.html">\u6211</a>\n            </li>\n          </ul>\n        </nav>\n      </div>\n    </header>\n    <section id=\'mf-header-placeholder\'></section>\n  ';
  var dom = $(tmpl);
  $('body').prepend(dom);

  setTimeout(function () {
    setChannel();
    handleHamberger();
  }, 0);
};

var setChannel = function setChannel() {
  var path = getPath();
  var channel = path.split('/')[1];
  if (channel) {
    channel = channel.replace(/.html$/, '');
    var elem = $('#mf-header .nav-menu .menu[data-channel=\'' + channel + '\']');
    elem.length && elem.addClass('active');
  }
};

var handleHamberger = function handleHamberger() {
  var hambergerBtn = $('#mf-header .hamberger');
  var navMenu = $('#mf-header .nav-menu');
  var body = $('body');
  hambergerBtn.on('click', function () {
    $(this).toggleClass('open');
    navMenu.toggleClass('open');
    body.toggleClass('scroll-lock');
  });
};

var resizeHandler = function resizeHandler() {
  fixRatioAll();
};

$(document).ready(function () {
  initNavigator();
  fixRatioAll();

  $(window).on('resize', resizeHandler);
})

// Baidu ZhanZhang - Auto Push
;(function () {
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  } else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(bp, s);
})();

// Baidu TongJi
/* eslint-disable no-use-before-define */
var _hmt = _hmt || []
/* eslint-enable no-use-before-define */
;(function () {
  var hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?d82e27389265a031116dc59fe6cd8d1d';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();
//# sourceMappingURL=vendor.js.map
