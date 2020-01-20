import React, { PureComponent, useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import './html5-online.scss'
import { GatsbyDataProps } from '../../utils/interface'

const HTML5Online = (props: GatsbyDataProps) => {
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
export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
