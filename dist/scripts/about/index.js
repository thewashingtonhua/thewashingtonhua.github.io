var timeDOM = document.getElementById('experience');

var start = new Date(2016, 2, 1, 10, 0, 0);
var daysPerMonth = 365 / 12;
var now = new Date();
var passed = now - start;

function update() {
  now = new Date();
  passed = now - start;

  var passedDays = passed / 1000 / 60 / 60 / 24;
  var year = Math.floor(passedDays / 365);
  var month = Math.floor(passedDays / daysPerMonth % 12);
  var day = Math.floor(passedDays % daysPerMonth);
  var hour = Math.floor(passed / 1000 / 60 / 60 % 24);
  var minute = Math.floor(passed / 1000 / 60 % 60);
  var second = Math.floor(passed / 1000 % 60);

  timeDOM.innerHTML = '\uFF08\u5DE5\u4F5C\u7ECF\u9A8C\uFF1A' + year + ' \u5E74 ' + month + ' \u4E2A\u6708 ' + day + ' \u5929 ' + hour + ' \u5C0F\u65F6 ' + minute + ' \u5206\u949F ' + second + ' \u79D2\uFF09';
}

setInterval(function () {
  update();
}, 1000);
//# sourceMappingURL=index.js.map
