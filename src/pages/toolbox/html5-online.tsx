import React, { FC, useEffect, useState } from 'react'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import './html5-online.scss'

const HTML5Online: FC = () => {
  const [status, setStatus] = useState('')

  const updateStatus = () => {
    const status = navigator.onLine ? 'online' : 'offline'
    setStatus(status)
  }

  useEffect(() => {
    updateStatus()

    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  return (
    <ToolboxLayout title='Input Type' id='tool-html5-online'>
      <h1>Online</h1>
      <p>Status: <span id='status' className={status}>{status}</span></p>
    </ToolboxLayout>
  )
}

export default HTML5Online
