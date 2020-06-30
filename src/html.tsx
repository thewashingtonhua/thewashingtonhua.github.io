import 'core-js/stable'
import React, { FC, Attributes, ReactNode } from 'react'

interface HTMLProps {
  htmlAttributes: Attributes,
  headComponents: ReactNode[],
  bodyAttributes: Attributes,
  preBodyComponents: ReactNode[],
  body: string,
  postBodyComponents: ReactNode[],
}

const HTML : FC<HTMLProps> = (props) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge,chrome=1' />
        <meta httpEquiv='render' content='webkit' />
        <meta httpEquiv='force-rendering' content='webkit' />
        <meta httpEquiv='format-detection' content='telephone=no' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover'
        />
        {/* <script src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script>
        <script>
          var VConsole = new VConsole();
        </script> */}
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key='noscript' id='gatsby-noscript'>
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

export default HTML
