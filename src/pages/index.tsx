import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import { Layout, SEO } from '../components'
import './index.scss'
import { GatsbyDataProps } from '../utils/interface'

export default (props: GatsbyDataProps) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node)

  const latestBlog = nodes
    .filter(node => (node.fields.type === 'blog' && !node.frontmatter.draft))
    .sort((x, y) => new Date(y.fields.date).getTime() - new Date(x.fields.date).getTime())[0]

  const blogCover = latestBlog.frontmatter.cover?.publicURL
  const blogDate = dayjs(latestBlog.fields.date).format('MMM DD, YYYY')

  return (
    <Layout>
      <SEO
        title={data.site.siteMetadata.title}
        exactTitle
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content'>
        <header className='channel-header'>
          <Link to='/blog' className='title'>最新博客</Link>
          <Link to='/blog' className='more'>查看全部 &raquo;</Link>
        </header>
        <div className='channel-body blogs'>
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
                {/* <p className='tags'>Tags: {latestBlog.frontmatter.tags.join(', ')}</p> */}
              </footer>
            </div>
          </Link>
        </div>

        {/* <header className='channel-header'>
          <Link to='/project' className='title'>最新项目</Link>
          <Link to='/project' className='more'>查看全部 &raquo;</Link>
        </header>
        <div className='channel-body projects'>
          { latestProjects.map(node => {
            const cover = node.frontmatter.cover
              ? node.frontmatter.cover.publicURL
              : ''
            return (
              <Link className='project' to={node.fields.slug} key={node.id}>
                <div className='cover'>
                  <img src={cover} alt='' />
                </div>
                <div className='intro'>
                  <h2>{node.frontmatter.title}</h2>
                  <p>{node.frontmatter.description}</p>
                </div>
              </Link>
            )
          })}
        </div> */}

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
