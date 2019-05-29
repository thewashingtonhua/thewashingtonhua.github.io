import React, { PureComponent, useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
import './html5-online.scss'
import { GatsbyDataProps } from '../../utils/interface'

const HTML5Online = (props: GatsbyDataProps) => {
  const [status, setStatue] = useState('')

  const updateStatus = (e: Event) => {
    const status = navigator.onLine ? 'online' : 'offline'
    this.setState({ status })
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
    <Layout>
      <SEO
        title='Input Type | 实验室'
        keywords={this.props.data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-item' id='lab-html5-online'>

        <article>
          <Link to='/lab' className='back'>&laquo; Back</Link>

          <h1>Online</h1>

          <p>Status: <span id='status' className={status}>{status}</span></p>
        </article>

      </div>
    </Layout>
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
