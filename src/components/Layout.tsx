import React, { FC } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import * as Sentry from '@sentry/browser'
import 'normalize-scss/sass/normalize/_import-now.scss'
import './Layout.scss'
import { Header } from './Header'
import { Footer } from './Footer'
import { IS_PROD } from '../config'

if (IS_PROD) {
  Sentry.init({
    dsn: 'https://9638de4372be4acebf892d0732a86a4a@sentry.io/1450204'
  })
}

export const Layout: FC = (props) => {
  const { children } = props

  const query = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `

  const render = () => (
    <div className='layout'>
      <Header />
      <main id='mf-main'>
        {children}
      </main>
      <Footer />
    </div>
  )

  return (
    <StaticQuery
      query={query}
      render={render}
    />
  )
}
