const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const BLOG_POST_FILENAME_REGEX = /([0-9]+)\-([0-9]+)\-([0-9]+)\-(.+)\.md$/;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const { relativePath } = getNode(node.parent)

    let slug = ''

    if (relativePath.includes('blog')) {
      // Blog posts don't have embedded permalinks.
      // Their slugs follow a pattern: /blog/<year>/<month>/<day>/<slug>.html
      // The date portion comes from the file name: <date>-<title>.md
      const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const filename = match[4];

      slug = `/blog/${year}/${month}/${day}/${filename}`;

      const date = new Date(year, month - 1, day);

      // Blog posts are sorted by date and display the date in their header.
      createNodeField({
        node,
        name: 'date',
        value: date.toJSON(),
      });
    }

    if (relativePath.includes('project')) {
      const projectName = relative
      slug = `/project/${projectName}`;
    }

    console.log({ relativePath, slug })

    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const tmpl = ''
      const slug = node.fields.slug

      if (slug.includes('blog')) {
        tmpl = path.resolve(`./src/templates/blog.js`)
      }

      if (slug.includes('project')) {
        tmpl = path.resolve(`./src/templates/project.js`)
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
