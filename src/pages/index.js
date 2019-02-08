import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './index.scss'

export default ({ data }) => {
  const nodes = data.allMarkdownRemark.edges

  const latestBlog = nodes
    .filter(({ node }) => node.fields.type === 'blog')
    .filter(({ node }) => !node.frontmatter.draft)
    .sort((x, y) => new Date(y.node.fields.date) - new Date(x.node.fields.date))[0].node
  const latestProjects = nodes
    .filter(({ node }) => node.fields.type === 'project')
    .sort((x, y) => new Date(y.node.frontmatter.from) - new Date(x.node.frontmatter.from)).slice(0, 2)
    .map(n => n.node)

  const blogCover = latestBlog.frontmatter.cover
    ? latestBlog.frontmatter.cover.publicURL
    : ''
  const blogDate = dayjs(latestBlog.frontmatter.date).format('MMM DD, YYYY')

  return (
    <Layout>
      <SEO
        title='首页'
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
                  <time dateTime={latestBlog.frontmatter.date}>{blogDate}</time>
                </p>
                {/* <p className='tags'>Tags: {latestBlog.frontmatter.tags.join(', ')}</p> */}
              </footer>
            </div>
          </Link>
        </div>

        <header className='channel-header'>
          <Link to='/project' className='title'>最新项目</Link>
          <Link to='/project' className='more'>查看全部 &raquo;</Link>
        </header>
        <div className='channel-body projects'>
          { latestProjects.map(p => {
            const cover = p.frontmatter.cover
              ? p.frontmatter.cover.publicURL
              : ''
            return (
              <Link className='project' to={p.fields.slug} key={p.id}>
                <div className='cover'>
                  <img src={cover} alt='' />
                </div>
                <div className='intro'>
                  <h2>{p.frontmatter.title}</h2>
                  <p>{p.frontmatter.description}</p>
                </div>
              </Link>
            )
          })}
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