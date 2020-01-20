import React, { FC, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import { GatsbyDataProps, IWindow, INetworkInformation } from '../../utils/interface'

const HTML5Connection: FC<GatsbyDataProps> = (props) => {
  const [connectionType, setConnectionType] = useState('unknown')

  const _window = window as IWindow
  let _connection: INetworkInformation | null = null

  function getConnectionType () {
    const { navigator } = _window
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      _connection = connection
      const { type, effectiveType } = connection
      setConnectionType([type, effectiveType].filter(Boolean).join(' / '))
    }
  }

  useEffect(() => {
    getConnectionType()
    _connection && _connection.addEventListener('change', getConnectionType)

    return () => {
      _connection && _connection.removeEventListener('change', getConnectionType)
    }
  }, [])

  return (
    <ToolboxLayout title='Connection'>
      <h1>Connection</h1>
      <p>Type: <span id='type'>{connectionType}</span></p>
    </ToolboxLayout>
  )
}

export default HTML5Connection

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
