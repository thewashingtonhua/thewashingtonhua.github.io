import React, { PureComponent, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, SEO } from '../../components'
import './tool.scss'
import { GatsbyDataProps } from '../../utils/interface'

const HTML5Canvas = (props: GatsbyDataProps) => {
  const canvas = useRef()

  useEffect(() => {
    const _canvas = canvas.current
    if (_canvas.getContext) {
      const ctx = _canvas.getContext('2d')
      ctx.fillStyle = '#999'
      ctx.font='18px Arial';
      ctx.fillText('This browser supports canvas.', 25, 100);
    }
  }, [])

  return (
    <Layout>
      <SEO
        title='Canvas | 工具'
        keywords={props.data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-item'>

        <article>
          <Link to='/toolbox' className='back'>&laquo; Back</Link>

          <h1>Canvas</h1>

          <canvas ref={canvas} height='200' width='300' style={{
            'backgroundColor': '#DDD',
            'marginTop': '20px'
          }}>Canvas is not supported on this browser</canvas>
        </article>
      </div>
    </Layout>
  )
}

export default HTML5Canvas

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
