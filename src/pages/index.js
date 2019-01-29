import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import Layout from '../components/layout'
import SEO from '../components/seo'
import 'normalize-scss/sass/normalize/_import-now.scss'
import '../styles/vendor.scss'
import './index.scss'

export default ({ data }) => {
  const nodes = data.allMarkdownRemark.edges

  const latestBlog = nodes.filter(({ node }) => node.fields.type === 'blog')[0].node
  const latestProjects = nodes.filter(({ node }) => node.fields.type === 'project').slice(0, 2)

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
                <p className='tags'>Tags: {latestBlog.frontmatter.tags.join(', ')}</p>
              </footer>
            </div>
          </Link>
        </div>

        <header className='channel-header'>
          <Link to='/project' className='title'>最新项目</Link>
          <Link to='/project' className='more'>查看全部 &raquo;</Link>
        </header>
        <div className='channel-body projects'>
          { latestProjects.map(({node}) => {
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
  allMarkdownRemark(sort: { fields: [frontmatter___date, frontmatter___from], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          description
          date
          tags
          cover {
            publicURL
          }
        }
        fields {
          slug
          type
        }
        excerpt
      }
    }
  }
}`