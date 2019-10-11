export interface BlogFrontMatter {
  title: string,
  description: string,
  cover: {
    id: string,
    publicURL: string,
    absolutePath: string,
    relativePath: string,
    extension: string,
    size: number,
    prettySize: string,
  },
  tags: string[],
  series?: string,
  draft: boolean,
  original?: boolean,
}

export interface ProjectFrontMatter {
  title: string,
  description: string,
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
  draft: boolean,
  category?: string
}

export interface GatsbyContentNode {
  id: string,
  frontmatter: BlogFrontMatter | ProjectFrontMatter,
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
