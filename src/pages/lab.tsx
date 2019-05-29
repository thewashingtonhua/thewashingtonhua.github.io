import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './lab.scss'
import { GatsbyDataProps } from '../utils/interface'

const labs = [
  {
    category: "Browser",
    url: "/lab/browser-ua",
    title: "User Agent"
  },
  {
    category: "Browser",
    url: "/lab/browser-viewport",
    title: "Viewport"
  },
  {
    category: "HTML5",
    url: "/lab/html5-canvas",
    title: "Canvas"
  },
  {
    category: "HTML5",
    url: "/lab/html5-geolocation",
    title: "Geolocation"
  },
  {
    category: "HTML5",
    url: "/lab/html5-input",
    title: "Input Type"
  },
  {
    category: "HTML5",
    url: "/lab/html5-connection",
    title: "Connection"
  },
  {
    category: "HTML5",
    url: "/lab/html5-online",
    title: "Online"
  }
]

export default (props: GatsbyDataProps) => {
  const { data } = props

  return (
    <Layout>
      <SEO
        title='实验室'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-catalog'>

        { labs.map(lab => (
          <Fragment key={lab.url}>
            <h1>{lab.category}</h1>
            <div className='category'>
              { labs.filter(n => n.category === lab.category).map(n => (
                <Link key={n.url} className='item' to={n.url}>{n.title}</Link>
              )) }
            </div>
          </Fragment>
        ))}

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
