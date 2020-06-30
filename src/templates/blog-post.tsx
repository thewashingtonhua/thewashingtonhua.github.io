import React, { useState, FC, CSSProperties, createRef, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Layout, SEO } from '../components'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import '../styles/prism-styles.scss'
import './blog-post.scss'
import { GatsbyDataProps, BlogNode, NodeType } from '../utils/interface'
import { IS_PROD } from 'config'
import { hasWindow } from 'utils'

dayjs.extend(advancedFormat)

interface TOCProps {
  blog: BlogNode
  style: CSSProperties
}

const TOC: FC<TOCProps> = (props) => {
  const { tableOfContents } = props.blog
  if (!tableOfContents) return null
  return (
    <aside
      className='toc'
      style={props.style}
      dangerouslySetInnerHTML={{
        __html: tableOfContents
      }}
    />
  )
}

interface SeriesProps {
  blog: BlogNode
  blogs: BlogNode[]
}

const Series: FC<SeriesProps> = (props) => {
  const { blog, blogs } = props
  const thisSeries = blog.frontmatter.series

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

interface BlogPostProps {
  blog: BlogNode
  blogs: BlogNode[]
}

const BlogPostContent: FC<BlogPostProps> = (props) => {
  const { blog, blogs } = props

  const [tocStyle, setTOCStyle] = useState<CSSProperties>({})

  const contentRef = createRef<HTMLDivElement>()

  const handleScroll = () => {
    const elem = contentRef.current
    if (!elem) return

    const top = elem.getBoundingClientRect().top
    const offset = Math.max(60 - top, 0)
    setTOCStyle({ transform: `translateY(${offset}px)` })
  }

  useEffect(() => {
    if (!hasWindow()) return
    if (window.innerWidth < 1280) return
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  })

  const cover = blog.frontmatter.cover?.publicURL
  const date = dayjs(blog.fields.date).format('MMM Do, YYYY')

  const articleClassName = [
    blog.frontmatter.draft && 'draft',
  ].filter(Boolean).join(' ')

  return (
    <article className={articleClassName} id={`blog__${blog.fields.id}`}>
      <h1 className='post-title'>{blog.frontmatter.title}</h1>
      <p className='metas'>
        <span className='meta'>{date}</span>
        <span className='meta'>阅读本文大约需要 {blog.timeToRead} 分钟</span>
      </p>
      { cover &&
        <div className='banner'>
          <img src={cover} alt='' />
        </div>
      }
      <div className='content-wrapper' ref={contentRef}>
        <div className='content' dangerouslySetInnerHTML={{ __html: blog.html }} />
        <TOC blog={blog} style={tocStyle} />
      </div>

      <Series blog={blog} blogs={blogs} />
    </article>
  )
}

const BlogPostPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node) as BlogNode[]
  const blogs = nodes
    .filter(node => node.fields.type === NodeType.blog)
    .sort((x, y) => new Date(y.fields.date).getTime() - new Date(x.fields.date).getTime())
  const blog = data.markdownRemark as BlogNode

  return (
    <Layout>
      <SEO
        title={`${blog.frontmatter.title} | 博客`}
        keywords={[
          ...data.site.siteMetadata.keywords,
          ...blog.frontmatter.tags
        ]}
      />

      <div className='mf-content blog-post'>
        <p className='back-to-parent'><Link to='/blog'>&laquo; 回到博客列表</Link></p>
        <BlogPostContent blog={blog} blogs={blogs} />
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
    headings {
      value
      depth
    }
    tableOfContents
    timeToRead
  }
}`
