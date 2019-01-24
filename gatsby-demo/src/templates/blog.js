import React from "react"
import { Helmet } from 'react-helmet'
import { graphql } from "gatsby"
import Navigation from "../components/Navigation"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <>
      <Helmet>
        <title>{post.frontmatter.title} | Blog | {data.site.siteMetadata.title}</title>
      </Helmet>

      <Navigation />

      <article>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
