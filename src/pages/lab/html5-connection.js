import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
import { GatsbyDataProps } from '../../utils/interface'

const HTML5Connection = (props: GatsbyDataProps) => {
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

          <p>Type: <span id='type'></span></p>

          <p id='error'></p>
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
