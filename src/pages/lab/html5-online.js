import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
import './html5-online.scss'

export default class HTML5Online extends PureComponent {
  state = {
    status: ''
  }

  updateStatus = e => {
    const status = navigator.onLine ? 'online' : 'offline'
    this.setState({ status })
  }

  render () {
    const { status } = this.state

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

  componentDidMount () {
    this.updateStatus()

    window.addEventListener('online', this.updateStatus)
    window.addEventListener('offline', this.updateStatus)
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.updateStatus)
    window.removeEventListener('offline', this.updateStatus)
  }
}

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`