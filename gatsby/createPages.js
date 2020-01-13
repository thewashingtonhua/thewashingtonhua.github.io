const path = require(`path`)

module.exports = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let tmpl = path.resolve(`./src/pages/404.tsx`)
      const slug = node.fields ? node.fields.slug : '/'
      const type = node.fields ? node.fields.type : ''

      if (type === 'blog') {
        tmpl = path.resolve(`./src/templates/blog-post.tsx`)
      }

      if (type === 'project') {
        tmpl = path.resolve(`./src/templates/project-detail.tsx`)
      }

      createPage({
        path: slug,
        component: tmpl,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: slug,
        },
      })
    })
  })
}
