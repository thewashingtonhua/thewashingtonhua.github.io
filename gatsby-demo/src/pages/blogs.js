import React from "react"
import { Helmet } from 'react-helmet'
import { Link, graphql } from "gatsby"
import Navigation from "../components/Navigation"

export default ({ data }) => (
  <>
    <Helmet>
      <title>Blog | {data.site.siteMetadata.title}</title>
    </Helmet>
    <h1>Blogs</h1>

    <Navigation />

    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    { data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug}>
          <h3>
            {node.frontmatter.title}{" "}
            <span>— {node.frontmatter.date}</span>
          </h3>
          <p>{node.excerpt}</p>
        </Link>
      </div>
    ))}
  </>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`