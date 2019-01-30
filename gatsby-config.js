const path = require('path')

module.exports = {
  siteMetadata: {
    title: `童话说`,
    description: `Washington Hua 的个人博客，专注大前端技术`,
    author: `Washington Hua`,
    keywords: [
      'tonghuashuo',
      'github',
      'front-end',
      'javascript',
      'typescript',
      'react',
      'node',
      'washington',
      'hua',
      '童话',
      '童话说',
      '前端',
      '博客',
      '技术',
      '计算机',
      '互联网'
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#fff',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [,
          // {
          //   resolve: 'gatsby-remark-embed-snippet',
          //   options: {
          //     classPrefix: 'gatsby-code-',
          //     directory: `${__dirname}/samples/`,
          //   },
          // },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'gatsby-code-',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
            },
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `童话说`,
        short_name: `童话说`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    /* {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
         {
          site {
            siteMetadata {
              title: rssFeedTitle
              description: rssFeedDescription
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
        feeds: [
          {
            serialize: ({query: {site, allMarkdownRemark}}) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.frontmatter.title,
                    description: edge.node.html,
                    date: require('moment')(edge.node.fields.date).format(
                      'MMMM DD, YYYY, h:mm A',
                    ),
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  },
                );
              });
            },
            query: `
              {
                allMarkdownRemark
                (limit: 10,
                filter: {fileAbsolutePath: {regex: "/blog/"}},
                sort: {fields: [fields___date],
                order: DESC}) {
                  edges {
                    node {
                      fields {
                        date
                        slug
                      }
                      frontmatter {
                        title
                      }
                      html
                    }
                  }
                }
              }
            `,
            output: '/feed.xml',
          },
        ],
      },
    }, */
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [
          path.resolve(__dirname, 'node_modules/normalize-scss/sass')
        ]
      }
    }

  ],
  polyfill: false
}
