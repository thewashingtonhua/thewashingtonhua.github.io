export interface GatsbyContentNode {
  id: string,
  frontmatter: {
    title: string,
    description: string,
    date: string,
    cover: {
      id: string,
      publicURL: string,
      absolutePath: string,
      relativePath: string,
      extension: string,
      size: number,
      prettySize: string,
    },
    from: string,
    to: string,
    tags: string[],
    series: string,
    draft: boolean,
    original: boolean,
    category: string
  },
  fields: {
    id: string,
    slug: string,
    type: string,
    date: string
  },
  excerpt: string,
  html: string
}

export interface GatsbyDataProps {
  data: {
    site: {
      siteMetadata: {
        title: string,
        description: string,
        author: string,
        keywords: string[]
      }
    },
    allMarkdownRemark: {
      totalCount: number,
      edges: Array<{
        node: GatsbyContentNode
      }>
    }
    markdownRemark: GatsbyContentNode
  }
}
