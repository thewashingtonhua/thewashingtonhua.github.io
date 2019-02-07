import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './blog.scss'
import { IS_PROD } from '../config'

export default ({ data }) => {
  let blogs = data.allMarkdownRemark.edges
    .filter(({ node }) => node.fields.type === 'blog')

  if (IS_PROD) {
    blogs = blogs.filter(({ node }) => !node.frontmatter.draft)
  }

  return (
    <Layout>
      <SEO
        title='博客'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content blog-catalog'>
        <div className='blog-list'>
          { blogs.map(({ node }) => {
            const cover = node.frontmatter.cover
              ? node.frontmatter.cover.publicURL
              : ''
            const date = dayjs(node.frontmatter.date).format('MMM DD, YYYY')
            return (
              <Link className={'blog' + (node.frontmatter.draft ? ' draft' : '')} to={node.fields.slug} key={node.id}>
                <div className='banner'>
                  <img src={cover} alt='' />
                </div>
                <div className='info'>
                  <p className='title'>{node.frontmatter.title}</p>
                  <p className='desc'>{node.frontmatter.description}</p>
                  <footer className='blog__footer'>
                    <p className='date'>
                      <time dateTime='{node.frontmatter.date}'>{date}</time>
                    </p>
                    {/* <p className='tags'>Tags: {node.frontmatter.tags.join(', ')}</p> */}
                  </footer>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='bottom-line' />
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
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date
          description
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
        }
      }
    }
  }
}`