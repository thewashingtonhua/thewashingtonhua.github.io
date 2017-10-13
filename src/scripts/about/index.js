const timeDOM = document.getElementById('experience')

const start = new Date(2016, 2, 1, 10, 0, 0)
const daysPerMonth = 365 / 12
let now = new Date()
let passed = now - start

function update () {
  now = new Date()
  passed = now - start

  const passedDays = passed / 1000 / 60 / 60 / 24
  const year = Math.floor(passedDays / 365)
  const month = Math.floor(passedDays / daysPerMonth % 12)
  const day = Math.floor(passedDays % daysPerMonth)
  const hour = Math.floor(passed / 1000 / 60 / 60 % 24)
  const minute = Math.floor(passed / 1000 / 60 % 60)
  const second = Math.floor(passed / 1000 % 60)

  timeDOM.innerHTML = `（工作经验：${year} 年 ${month} 个月 ${day} 天 ${hour} 小时 ${minute} 分钟 ${second} 秒）`
}

setInterval(() => {
  update()
}, 1000)
