import React, { FC, useState, useEffect } from 'react'
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

const BlogCatalogPage: FC<GatsbyDataProps> = (props) => {
  const blogs = props.data.allMarkdownRemark.edges
    .map(n => n.node as BlogNode)
    .filter(node => node.fields.type === NodeType.blog && (!node.frontmatter.draft || IS_DEV))
    .sort((x, y) => new Date(y.fields.date).getTime() - new Date(x.fields.date).getTime())

  const { viewMode, setViewMode } = useBlogViewMode()

  return (
    <Layout>
      <SEO title='博客' />
      <div className='mf-content blog-catalog'>
        { IS_DEV &&
          <Toolbar viewMode={viewMode} onViewModeChange={setViewMode} />
        }
        { renderView(viewMode, blogs) }
        <BottomLine text='Beginning of the Dawn' />
      </div>
    </Layout>
  )
}

export default BlogCatalogPage

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
