import React, { PureComponent, useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, SEO } from '../../components'
import './tool.scss'
import { GatsbyDataProps } from '../../utils/interface'
import platform from 'platform'

const BrowserUA = (props: GatsbyDataProps) => {
  const {
    name,
    version,
    layout,
    ua,
    os,
    manufacturer,
    product
  } = platform
  const browser = `${name} ${version} (${layout})`
  const displayDevice = manufacturer ||product
  const device = `${manufacturer} ${product}`

  return (
    <Layout>
      <SEO
        title='User Agent | 工具'
        keywords={props.data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-item'>
        <article>

          <Link to='/toolbox' className='back'>&laquo; Back</Link>

          <h1>UserAgent</h1>

          <p>Browser: {browser}</p>
          <p>OS: {os.toString()}</p>
          <p>UA: {ua}</p>
          { displayDevice && <p>Device: {device}</p> }
        </article>
      </div>
    </Layout>
  )
}

export default BrowserUA

export const query = graphql`

query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
