import React, { useState, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import { GatsbyDataProps } from '../../utils/interface'

const HTML5Connection = (props: GatsbyDataProps) => {
  const [connectionType, setConnectionType] = useState('unknown')

  useEffect(() => {
    let _connection = null

    function getConnectionType () {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        _connection = connection
        const { type, effectiveType } = connection
        setConnectionType([type, effectiveType].filter(Boolean).join(' / '))
      }
    }

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
