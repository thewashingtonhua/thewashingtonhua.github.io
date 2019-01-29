import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class BrowserUA extends PureComponent {
  render () {
    return (
      <Layout>
        <SEO
          title='User Agent | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item'>
          <article>

            <Link to='/lab' className='back'>&laquo; Back</Link>

            <h1>UserAgent</h1>

            <p>Browser: <span id='browser'>Detecting ...</span></p>
            <p>OS: <span id='os'>Detecting ...</span></p>

            <p>UA: <span id='ua'>Detecting ...</span></p>
            <p>Platform: <span id='platform'>Detecting ...</span></p>

            <p id='error'></p>
          </article>
        </div>
      </Layout>
    )
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