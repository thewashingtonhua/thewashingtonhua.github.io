import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import 'normalize-scss/sass/normalize/_import-now.scss'
import './404.scss'

export default () => (
  <Layout>
    <SEO title='404' />
    <h1>404</h1>
  </Layout>
)
