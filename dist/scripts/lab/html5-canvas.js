var canvas = document.getElementById('mycanvas');
var support = document.getElementById('support');

function draw() {
  if (canvas.getContext) {
    support.innerHTML = 'This browser supports canvas.';
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#999';
    ctx.fillRect(50, 50, 200, 100);
  }
}

window.onresize = draw;
draw();
//# sourceMappingURL=html5-canvas.js.map
