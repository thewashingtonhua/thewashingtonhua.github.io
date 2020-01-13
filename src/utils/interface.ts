export interface GatsbyImage {
  id: string
  publicURL: string
  absolutePath: string
  relativePath: string
  extension: string
  size: number
  prettySize: string
}

export interface BlogFrontMatter {
  title: string
  description: string
  cover: GatsbyImage
  tags: string[]
  series: string
  draft: boolean
  original: boolean
}

export interface ProjectFrontMatter {
  title: string
  description: string
  cover: GatsbyImage
  from: string
  to: string
  draft: boolean
  category: string
}

export type FrontMatter = BlogFrontMatter & ProjectFrontMatter

export interface BlogFields {
  id: string
  slug: string
  type: string
  date: string
}

export interface ProjectFields {
  id: string
  slug: string
  type: string
}

export type GatsbyFields = BlogFields & ProjectFields

export interface GatsbyContentNode {
  id: string
  frontmatter: FrontMatter
  fields: GatsbyFields
  excerpt: string
  html: string
}

export interface GatsbyDataProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
        keywords: string[]
      }
    }
    allMarkdownRemark: {
      totalCount: number
      edges: Array<{
        node: GatsbyContentNode
      }>
    }
    markdownRemark: GatsbyContentNode
  }
}
