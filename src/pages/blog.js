import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import Layout from '../components/layout'
import SEO from '../components/seo'
import 'normalize-scss/sass/normalize/_import-now.scss'
import '../styles/vendor.scss'
import './blog.scss'

export default ({ data }) => {
  const blogs = data.allMarkdownRemark.edges
    .filter(({ node }) => node.fields.type === 'blog')

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
              <Link className='blog' to={node.fields.slug} key={node.id}>
                <div className='banner'>
                  <img src={cover} alt='' />
                </div>
                <div className='info'>
                  <h2 className='title'>{node.frontmatter.title}</h2>
                  <p className='desc'>{node.frontmatter.description}</p>
                  <footer className='blog__footer'>
                    <p className='date'>
                      <time dateTime='{node.frontmatter.date}'>{date}</time>
                    </p>
                    <p className='tags'>Tags: {node.frontmatter.tags.join(', ')}</p>
                  </footer>
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
        }
        fields {
          slug
          type
        }
      }
    }
  }
}`