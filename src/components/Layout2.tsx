import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import * as Sentry from '@sentry/browser'
import 'normalize-scss/sass/normalize/_import-now.scss'
import './Layout.scss'
import { Header } from './Header'
import { Footer } from './Footer'
import { IS_PROD } from 'config'

if (IS_PROD) {
  Sentry.init({
    dsn: 'https://9638de4372be4acebf892d0732a86a4a@sentry.io/1450204'
  })
}

interface LayoutProps {
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { children } = props

  return <StaticQuery
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
        <Footer />
      </>
    )}
  />
}
