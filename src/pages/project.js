import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './project.scss'

export default ({ data }) => {
  const projects = data.allMarkdownRemark.edges
    .filter(({ node }) => node.fields.type === 'project')

  return (
    <Layout>
      <SEO
        title='代表作'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content project-catalog'>
        <h1 className='title'>代表作({projects.length})</h1>
        <div className='project-list'>
          { projects.map(({ node }) => {
            const cover = node.frontmatter.cover
              ? node.frontmatter.cover.publicURL
              : ''
            return (
              <Link className='project' to={node.fields.slug} key={node.fields.slug}>
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
  allMarkdownRemark(sort: { fields: [frontmatter___from], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date
          description
          cover {
            publicURL
          }
        }
        fields {
          slug
          type
        }
      }
    }
  }
}`