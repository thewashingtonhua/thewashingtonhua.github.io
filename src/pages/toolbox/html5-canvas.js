import React, { PureComponent, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { ToolboxLayout } from '../../components'
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
    <ToolboxLayout title='Canvas'>
      <h1>Canvas</h1>

      <canvas ref={canvas} height='200' width='300' style={{
        'backgroundColor': '#DDD',
        'marginTop': '20px'
      }}>Canvas is not supported on this browser</canvas>
    </ToolboxLayout>
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
