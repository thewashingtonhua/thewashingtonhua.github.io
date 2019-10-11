import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, SEO } from '../components'
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

  const categories = Array.from(new Set(labs.map(n => n.category)))

  return (
    <Layout>
      <SEO
        title='实验室'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-catalog'>

        { categories.map(category => (
          <Fragment key={category}>
            <h1>{category}</h1>
            <div className='category'>
              { labs.filter(n => n.category === category).map(lab => (
                <Link key={lab.url} className='item' to={lab.url}>{lab.title}</Link>
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
