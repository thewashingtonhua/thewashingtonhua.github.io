// Geolocation
var errorDOM = document.getElementById('error');
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var coords = position.coords;
    // 经纬度数值为正数表示东经、北纬，负数表示西经南纬，遵循直角坐标系
    document.getElementById('latitude').innerHTML = coords.latitude;
    document.getElementById('longitude').innerHTML = coords.longitude;
    document.getElementById('altitude').innerHTML = coords.altitude;
    document.getElementById('accuracy').innerHTML = coords.accuracy;
    document.getElementById('heading').innerHTML = coords.heading;
  }, function (error) {
    var errorType = {
      1: '位置服务被拒绝',
      2: '获取不到位置信息',
      3: '获取信息超时'
    };
    errorDOM.innerHTML = '[Error] ' + errorType[error.code] + '，无法获取你当前的地理位置';
  }, {
    enableHighAcuracy: true
  });
} else {
  errorDOM.innerHTML = '[Error] Geolocation is not supported on this browser.';
}
//# sourceMappingURL=html5-geolocation.js.map
