import React, { useState, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
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
    <Layout>
      <SEO
        title='Connection | 实验室'
        keywords={props.data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-item'>

        <article>
          <Link to='/lab' className='back'>&laquo; Back</Link>

          <h1>Connection</h1>

          <p>Type: <span id='type'>{connectionType}</span></p>
        </article>

      </div>
    </Layout>
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
