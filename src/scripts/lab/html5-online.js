// Online
const statusDOM = document.getElementById('status')

function updateOnlineStatus (e) {
  const condition = navigator.onLine ? 'online' : 'offline'
  statusDOM.className = condition
  statusDOM.innerHTML = condition
}

updateOnlineStatus()
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)
