import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './lab.scss'

const labs = [
  {
    category: "browser",
    url: "/lab/browser-ua",
    title: "User Agent"
  },
  {
    category: "browser",
    url: "/lab/browser-viewport",
    title: "Viewport"
  },
  {
    category: "html5",
    url: "/lab/html5-canvas",
    title: "Canvas"
  },
  {
    category: "html5",
    url: "/lab/html5-geolocation",
    title: "Geolocation"
  },
  {
    category: "html5",
    url: "/lab/html5-input",
    title: "Input Type"
  },
  {
    category: "html5",
    url: "/lab/html5-connection",
    title: "Connection"
  },
  {
    category: "html5",
    url: "/lab/html5-online",
    title: "Online"
  }
]

export default ({ data }) => {
  const browserLabs = labs.filter(n => n.category === 'browser')
  const html5Labs = labs.filter(n => n.category === 'html5')

  return (
    <Layout>
      <SEO
        title='实验室'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-catalog'>

        <h1>Browser</h1>
        <div className='category'>
          { browserLabs.map(n => (
            <Link key={n.url} className='item' to={n.url}>{n.title}</Link>
          )) }
        </div>

        <h1>HTML5</h1>
        <div className='category'>
          { html5Labs.map(n => (
            <Link key={n.url} className='item' to={n.url}>{n.title}</Link>
          )) }
        </div>

      </div>
    </Layout>
  )
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