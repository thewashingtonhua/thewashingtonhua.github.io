const canvas = document.getElementById('mycanvas')
const support = document.getElementById('support')

function draw () {
  if (canvas.getContext) {
    support.innerHTML = 'This browser supports canvas.'
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#999'
    ctx.fillRect(50, 50, 200, 100)
  }
}

window.onresize = draw
draw()
