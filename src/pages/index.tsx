import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import { Layout, SEO } from '../components'
import './index.scss'
import { GatsbyDataProps, BlogNode, NodeType } from '../utils/interface'

const HomePage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node) as BlogNode[]

  const latestBlog = nodes
    .filter(node => (node.fields.type === NodeType.blog && !node.frontmatter.draft))
    .sort((x, y) => new Date(y.fields.date).getTime() - new Date(x.fields.date).getTime())[0]

  const blogCover = latestBlog.frontmatter.cover?.publicURL
  const blogDate = dayjs(latestBlog.fields.date).format('MMM DD, YYYY')

  return (
    <Layout>
      <SEO exactTitle title='童话说' />
      <div className='mf-content'>
        <div className='landing'>
          <header className='landing-header'>
            <p className='title'>最新博客</p>
            <Link to='/blog' className='more'>查看全部 &raquo;</Link>
          </header>
          <section className='landing-body'>
            <Link className='blog' to={latestBlog.fields.slug}>
              <div className='banner'>
                <img src={blogCover} alt='' />
              </div>
              <div className='info'>
                <h2 className='title'>{latestBlog.frontmatter.title}</h2>
                <p className='desc'>{latestBlog.frontmatter.description}</p>
                <footer className='blog__footer'>
                  <p className='date'>
                    <time dateTime={latestBlog.fields.date}>{blogDate}</time>
                  </p>
                </footer>
              </div>
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          description
          from
          to
          tags
          cover {
            publicURL
          }
          series
          draft
          original
        }
        fields {
          slug
          type
          date
        }
        excerpt
      }
    }
  }
}`
