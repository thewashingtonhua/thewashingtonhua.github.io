import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './404.scss'

const code = `\(function whatJustHappened \(\) \{
  return \`
    Whatever you are looking for.
    It's not here.
    (any more)
  \`
\}\)\(\)
`

export default () => (
  <Layout>
    <SEO title='404' />
    <div className='mf-content' id='page-not-found'>
      <h1>404</h1>
      <pre>
        <code dangerouslySetInnerHTML={{
          __html: code
        }} />
      </pre>
      <Link className='btn-back' to='/'>returnToBase()</Link>
    </div>
  </Layout>
)
