import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import 'normalize-scss/sass/normalize/_import-now.scss'
import './index.scss'

export default ({ data }) => (
  <Layout>
    <SEO
      title='博客'
      keywords={data.site.siteMetadata.keywords}
    />
  </Layout>
)

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`