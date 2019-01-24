import React from "react"
import { Helmet } from 'react-helmet'
import Navigation from "../components/Navigation"
import { graphql } from 'gatsby'

export default ({ data }) => (
  <>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
    </Helmet>
    <h1>Home</h1>
    <Navigation />
  </>
)


export const query = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
}`