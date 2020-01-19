import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import { Layout, SEO } from '../components'
import './blog.scss'
import { IS_PROD } from '../config'
import { GatsbyDataProps, BlogNode, NodeType } from '../utils/interface'

const BottomLine: FC<{ text: string }> = (props) => (
  <div className='bottom-line'><span>{props.text}</span></div>
)

const BlogCatalogPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node) as BlogNode[]
  const blogs = nodes
    .filter(node => node.fields.type === NodeType.blog)
    .sort((x, y) => new Date(y.fields.date).getTime() - new Date(x.fields.date).getTime())

  // 把草稿和已发布的分开
  const [drafts, published] = blogs.reduce((cache, blog) => (
    blog.frontmatter.draft
      ? [[...cache[0], blog], cache[1]]
      : [cache[0], [...cache[1], blog]]
  ), [[] as BlogNode[], [] as BlogNode[]])

  // 草稿不对外发布
  const visibleBlogs = IS_PROD
    ? [...published]
    : [...drafts, ...published]

  return (
    <Layout>
      <SEO
        title='博客'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content blog-catalog'>
        <div className='blog-list'>
          { visibleBlogs.map(node => {
            const cover = node.frontmatter.cover?.publicURL
            const date = dayjs(node.fields.date).format('MMM DD, YYYY')
            return (
              <Link
                className={'blog' + (node.frontmatter.draft ? ' draft' : '')}
                to={node.fields.slug}
                key={node.id}
                id={node.fields.id}
              >
                <div className='banner'>
                  <img src={cover} alt='' />
                </div>
                <div className='info'>
                  <p className='title'>{node.frontmatter.title}</p>
                  <p className='desc'>{node.frontmatter.description}</p>
                  <footer className='blog__footer'>
                    <p className='date'>
                      <time dateTime='{blog.node.fields.date}'>{date}</time>
                    </p>
                    {/* <p className='tags'>Tags: {blog.node.frontmatter.tags.join(', ')}</p> */}
                  </footer>
                </div>
              </Link>
            )
          })}
        </div>
        <BottomLine text='The End' />
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
