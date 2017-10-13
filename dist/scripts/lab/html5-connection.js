// Connection
var errorDOM = document.getElementById('error');
var typeDOM = document.getElementById('type');

var type = '';

var connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
if (connection && connection.type) {
  type = connection.type;
  typeDOM.innerHTML = type;
  console.log(connection);
} else {
  errorDOM.innerHTML = '[Opsss] navigator.connection not supported on this platform.';
}

function updateConnectionStatus() {
  typeDOM.innerHTML = connection.type + ' (previously: ' + type + ')';
}

connection.addEventListener('typechange', updateConnectionStatus);
//# sourceMappingURL=html5-connection.js.map
