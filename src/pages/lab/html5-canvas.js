import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class HTML5Canvas extends PureComponent {
  canvas = React.createRef()

  draw = () => {
    const canvas = this.canvas.current
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#999'
      // ctx.fillRect(50, 50, 200, 100)
      ctx.font='18px Arial';
      ctx.fillText('This browser supports canvas.', 25, 100);
    }
  }

  render () {
    return (
      <Layout>
        <SEO
          title='Canvas | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item'>

          <article>
            <Link to='/lab' className='back'>&laquo; Back</Link>

            <h1>Canvas</h1>

            <canvas ref={this.canvas} height='200' width='300' style={{
              'backgroundColor': '#DDD',
              'marginTop': '20px'
            }}>Canvas is not supported on this browser</canvas>
          </article>
        </div>
      </Layout>
    )
  }

  componentDidMount () {
    this.draw()
  }
}

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`