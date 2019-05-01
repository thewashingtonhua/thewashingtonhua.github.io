import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import * as Sentry from '@sentry/browser'
import 'normalize-scss/sass/normalize/_import-now.scss'
import './layout.scss'
import Header from './header'

Sentry.init({
  dsn: 'https://9638de4372be4acebf892d0732a86a4a@sentry.io/1450204'
})

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header />
        <main>
          {children}
        </main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
