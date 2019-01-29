import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class HTML5Geolocation extends PureComponent {
  render () {
    return (
      <Layout>
        <SEO
          title='Geolocation | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item'>

          <article>
            <Link to='/lab' className='back'>&laquo; Back</Link>

            <h1>Geolocation</h1>

            <p>Latitude: <span id='latitude'></span></p>
            <p>Longtitude: <span id='longitude'></span></p>
            <p>Altitude: <span id='altitude'></span></p>
            <p>Accuracy: <span id='accuracy'></span></p>
            <p>Heading: <span id='heading'></span></p>

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