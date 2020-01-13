import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './project-post.scss'
import { GatsbyDataProps, ProjectNode } from '../utils/interface'

const ProjectPostPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const post = data.markdownRemark as ProjectNode

  return (
    <Layout>
      <SEO
        title={`${post.frontmatter.title} | 代表作`}
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content project-detail'>
        <p className='back-to-parent'><Link to='/project'>&laquo; 回到项目列表</Link></p>
        <article className='content' id={`project__${post.fields.id}`} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export default ProjectPostPage

export const query = graphql`
query($slug: String!) {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
    }
    fields {
      id
    }
  }
}`
