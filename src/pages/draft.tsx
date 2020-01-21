import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'
import { Layout, SEO } from '../components'
import './blog.scss'
import { GatsbyDataProps, BlogNode, NodeType } from '../utils/interface'

const BottomLine: FC<{ text: string }> = (props) => (
  <div className='bottom-line'><span>{props.text}</span></div>
)

const BlogDraftPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node) as BlogNode[]
  const drafts = nodes
    .filter(node => node.fields.type === NodeType.blog && node.frontmatter.draft)
    .sort((x, y) => new Date(x.fields.date).getTime() - new Date(y.fields.date).getTime())

  return (
    <Layout>
      <SEO
        title='草稿'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content blog-catalog'>
        <div className='blog-list'>
          { drafts.map(node => {
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
