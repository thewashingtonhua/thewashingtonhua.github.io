import React, { FC } from 'react'
import { graphql } from 'gatsby'
import {
  Layout,
  SEO,
  BlogCatelogNormalView,
  BlogCatelogArchiveView,
  Toolbar,
  BlogCatalogViewMode
} from '../components'
import './blog.scss'
import { GatsbyDataProps, BlogNode, NodeType } from '../utils/interface'
import { useBlogViewMode } from 'hooks'
import { IS_DEV } from 'config'

const BottomLine: FC<{ text: string }> = (props) => (
  <div className='bottom-line'><span>{props.text}</span></div>
)

const renderView = (viewMode: BlogCatalogViewMode, blogs: BlogNode[]) => {
  switch (viewMode) {
    case BlogCatalogViewMode.normal:
      return <BlogCatelogNormalView blogs={blogs} />
    case BlogCatalogViewMode.archive:
      return <BlogCatelogArchiveView blogs={blogs} />
    default:
      return null
  }
}

const BlogDraftPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const drafts = data.allMarkdownRemark.edges
    .map(n => n.node as BlogNode)
    .filter(node => node.fields.type === NodeType.blog && node.frontmatter.draft)
    .sort((x, y) => {
      if (x.fields.date && !y.fields.date) return -1
      return new Date(x.fields.date).getTime() - new Date(y.fields.date).getTime()
    })

  const { viewMode, setViewMode } = useBlogViewMode()

  return (
    <Layout>
      <SEO
        title='草稿'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content blog-catalog'>
        { IS_DEV &&
          <Toolbar viewMode={viewMode} onViewModeChange={setViewMode} />
        }
        { renderView(viewMode, drafts) }
        <BottomLine text='The End' />
      </div>
    </Layout>
  )
}

export default BlogDraftPage

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          description
          tags
          cover {
            publicURL
          }
          series
          draft
          original
        }
        fields {
          id
          slug
          type
          date
        }
      }
    }
  }
}`
