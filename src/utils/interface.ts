export enum NodeType {
  blog = 'blog',
  project = 'project'
}

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

export type GatsbyFrontMatter = BlogFrontMatter & ProjectFrontMatter

export interface BlogFields {
  id: string
  slug: string
  type: NodeType
  date: string
}

export interface ProjectFields {
  id: string
  slug: string
  type: NodeType
}

export type GatsbyFields = BlogFields & ProjectFields

export interface BlogNode {
  id: string
  frontmatter: BlogFrontMatter
  fields: BlogFields
  excerpt: string
  headings: Array<{
    value: string,
    depth: number
  }>
  html: string
  tableOfContents: string
  timeToRead: number
}

export interface ProjectNode {
  id: string
  frontmatter: ProjectFrontMatter
  fields: ProjectFields
  excerpt: string
  html: string
}

export type GatsbyContentNode = BlogNode | ProjectNode

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

export interface IScreen extends Screen {
  readonly msOrientation?: ScreenOrientation
  readonly mozOrientation?: ScreenOrientation
  readonly deviceXDPI?: number
}

export interface INetworkInformation extends EventTarget {
  readonly downlink: number
  readonly downlinkMax: number
  readonly effectiveType:  'slow-2g' | '2g' | '3g' | '4g'
  readonly rtt: number
  readonly saveData: boolean
  readonly type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'
  readonly onchange: () => void
}

export interface INavigator extends Navigator {
  readonly connection?: INetworkInformation
  readonly mozConnection?: INetworkInformation
  readonly webkitConnection?: INetworkInformation
}

export interface IWindow extends Window {
  screen: IScreen
  navigator: INavigator
}
