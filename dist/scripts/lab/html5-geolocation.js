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
      1: 'service denied',
      2: 'cannot access geolocation info',
      3: 'timeout'
    };
    errorDOM.innerHTML = '[Error] ' + errorType[error.code];
  }, {
    enableHighAcuracy: true
  });
} else {
  errorDOM.innerHTML = '[Error] Geolocation is not supported on this browser.';
}
//# sourceMappingURL=html5-geolocation.js.map
