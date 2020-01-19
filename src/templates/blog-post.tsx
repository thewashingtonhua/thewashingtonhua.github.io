import React, { useState, FC } from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import { Layout, SEO } from '../components'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import '../styles/prism-styles.scss'
import './blog-post.scss'
import { GatsbyDataProps, BlogNode, NodeType } from '../utils/interface'
import { IS_PROD } from 'config'

interface BlogPostContentProps {
  blog: BlogNode
  weChatMode?: boolean
}

const BlogPostContent: FC<BlogPostContentProps> = (props) => {
  const { blog, weChatMode } = props

  const cover = blog.frontmatter.cover?.publicURL
  const date = dayjs(blog.fields.date).format('MMM DD, YYYY')

  const articleClassName = [
    blog.frontmatter.draft && 'draft',
    weChatMode && 'wechat-mode'
  ].filter(Boolean).join(' ')

  return (
    <article className={articleClassName} id={`blog__${blog.fields.id}`}>
      <h1 className='title'>{blog.frontmatter.title}</h1>
      <div className='metas'>
        <p className='publish-date'>
          <time dateTime={blog.fields.date}>{date}</time>
        </p>
      </div>
      { cover &&
        <div className='banner'>
          <img src={cover} alt='' />
        </div>
      }
      <div className='content' dangerouslySetInnerHTML={{ __html: blog.html }} />
    </article>
  )
}

const BlogPostPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node) as BlogNode[]
  const blogs = nodes
    .filter(node => node.fields.type === NodeType.blog)
    .sort((x, y) => new Date(y.fields.date).getTime() - new Date(x.fields.date).getTime())
  const thisBlog = data.markdownRemark as BlogNode

  const cover = thisBlog.frontmatter.cover?.publicURL
  const date = dayjs(thisBlog.fields.date).format('MMM DD, YYYY')

  const articleClassName = [
    thisBlog.frontmatter.draft && 'draft',
  ].filter(Boolean).join(' ')

  const renderSeries = () => {
    const thisSeries = thisBlog.frontmatter.series

    // 不属于任何系列
    if (!thisSeries) return null

    const seriesBlogs = blogs
      .filter(node => node.frontmatter.series === thisSeries)

    // 草稿不对外发布
    const visibleBlogs = IS_PROD
      ? seriesBlogs.filter(blog => !blog.frontmatter.draft)
      : seriesBlogs

    // 无可见博客则不显示
    if (!visibleBlogs.length) {
      return null
    }

    return (
      <section className='series'>
        <header className='header'>
          <p className='title'>该系列的其他文章</p>
        </header>
        <ul className='posts'>
          { seriesBlogs.map(post => (
            <li className='post' key={post.id}>
              <Link
                className={(post.frontmatter.draft ? 'draft' : '')}
                to={post.fields.slug}
              >
                { post.frontmatter.title }
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <Layout>
      <SEO
        title={`${thisBlog.frontmatter.title} | 博客`}
        keywords={[
          ...data.site.siteMetadata.keywords,
          ...thisBlog.frontmatter.tags
        ]}
      />

      <div className='mf-content blog-post'>
        <p className='back-to-parent'><Link to='/blog'>&laquo; 回到博客列表</Link></p>

        <article className={articleClassName} id={`blog__${thisBlog.fields.id}`}>
          <h1 className='title'>{thisBlog.frontmatter.title}</h1>
          <div className='metas'>
            <p className='publish-date'>
              <time dateTime={thisBlog.fields.date}>{date}</time>
            </p>
          </div>
          { cover &&
            <div className='banner'>
              <img src={cover} alt='' />
            </div>
          }
          <div className='content' dangerouslySetInnerHTML={{ __html: thisBlog.html }} />
        </article>

        { renderSeries() }
      </div>
    </Layout>
  )
}

export default BlogPostPage

export const query = graphql`
query($slug: String!) {
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
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      description
      cover {
        publicURL
      }
      tags
      series
      draft
    }
    fields {
      id
      date
    }
  }
}`
