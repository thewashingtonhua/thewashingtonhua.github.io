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
      resolve: 'gatsby-plugin-typescript'
    },
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
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'gatsby-code-',
              inlineCodeMarker: '>',
              showLineNumbers: true
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              backgroundColor: 'transparent',
              disableBgImage: true,
              quality: 100
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
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-mdx`
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        postCssPlugins: [
          require('autoprefixer')
        ]
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: path.resolve('./src/images/ui/icons')
        }
      }
    }
  ],
  polyfill: false
}
