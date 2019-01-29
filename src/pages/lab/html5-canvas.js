import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class HTML5Canvas extends PureComponent {
  render () {
    return (
      <Layout>
        <SEO
          title='Canvas | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item'>

          <article>
            <Link to='/lab' className='back'>&laquo; Back</Link>

            <h1>Canvas</h1>

            <p id='support'></p>

            <canvas id='mycanvas' height='200' width='300' style={{
              'backgroundColor': '#DDD',
              'marginTop': '20px'
            }}>Canvas is not supported on this browser</canvas>
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