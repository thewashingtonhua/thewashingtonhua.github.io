import React, { Fragment, FC } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './toolbox.scss'
import { GatsbyDataProps } from '../utils/interface'

const tools = [
  {
    category: "Browser",
    url: "/toolbox/browser-ua",
    title: "User Agent"
  },
  {
    category: "Browser",
    url: "/toolbox/browser-viewport",
    title: "Viewport"
  },
  {
    category: "Browser",
    url: "/toolbox/browser-keyboard",
    title: "Keyboard"
  },
  {
    category: "HTML5",
    url: "/toolbox/html5-canvas",
    title: "Canvas"
  },
  {
    category: "HTML5",
    url: "/toolbox/html5-geolocation",
    title: "Geolocation"
  },
  {
    category: "HTML5",
    url: "/toolbox/html5-input",
    title: "Input Type"
  },
  {
    category: "HTML5",
    url: "/toolbox/html5-connection",
    title: "Connection"
  },
  {
    category: "HTML5",
    url: "/toolbox/html5-online",
    title: "Online"
  },
  {
    category: "Device",
    url: "/toolbox/device-data",
    title: "Device Data"
  }
]

const ToolBoxPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props

  const categories = Array.from(new Set(tools.map(n => n.category)))

  return (
    <Layout>
      <SEO
        title='工具'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content tool-catalog'>

        { categories.map(category => (
          <Fragment key={category}>
            <h1 className='category-title'>{category}</h1>
            <div className='category-items'>
              { tools.filter(n => n.category === category).map(tool => (
                <Link key={tool.url} className='item' to={tool.url}>{tool.title}</Link>
              )) }
            </div>
          </Fragment>
        ))}

      </div>
    </Layout>
  )
}

export default ToolBoxPage

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
