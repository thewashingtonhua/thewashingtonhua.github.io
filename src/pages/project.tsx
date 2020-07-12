import React, { Fragment, FC } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './project.scss'
import { GatsbyDataProps, ProjectNode, NodeType } from '../utils/interface'
import { IS_PROD } from 'config'

const ProjectCatalog: FC<GatsbyDataProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node) as ProjectNode[]
  const projects = nodes
    .filter(node => node.fields.type === NodeType.project)
    .filter(node => !IS_PROD || !node.frontmatter.draft)
    .sort((x, y) => new Date(y.frontmatter.from).getTime() - new Date(x.frontmatter.from).getTime())

  // 商业项目和个人项目分开
  const commercialProjects = projects.filter(node => node.frontmatter.category === 'commercial')
  const personalProjects = projects.filter(node => node.frontmatter.category === 'personal')

  const visibleProjects = []
  if (commercialProjects.length) {
    visibleProjects.push({ title: '商业作品', data: commercialProjects })
  }
  if (personalProjects.length) {
    visibleProjects.push({ title: '个人作品', data: personalProjects })
  }

  const totalCount = visibleProjects.map(n => n.data.length).reduce((x, y) => x + y, 0)

  return (
    <Layout>
      <SEO
        title='项目'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content project-catalog'>
        <h1 className='title'>代表作 ({totalCount})</h1>
        { visibleProjects.map(item =>
          <Fragment key={item.title}>
            <h2 className='project-category-title'>
              {item.title} ({item.data.length})
            </h2>
            <div className='project-list'>
              { item.data.map(node => {
                const cover = node.frontmatter.cover?.publicURL
                return (
                  <Link className={'project' + (node.frontmatter.draft ? ' draft' : '')} to={node.fields.slug} key={node.fields.slug} id={node.fields.id}>
                    <div className='cover'>
                      <img src={cover} alt='' />
                    </div>
                    <div className='intro'>
                      <h2>{node.frontmatter.title}</h2>
                      <p>{node.frontmatter.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Fragment>
        )}
      </div>
    </Layout>
  )
}

export default ProjectCatalog

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
  allMarkdownRemark(sort: { fields: [frontmatter___from], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          description
          cover {
            publicURL
          }
          from
          to
          draft
          category
        }
        fields {
          id
          slug
          type
        }
      }
    }
  }
}`
