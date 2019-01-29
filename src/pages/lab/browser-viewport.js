import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class BrowserViewport extends PureComponent {
  render () {
    return (
      <Layout>
        <SEO
          title='Viewport | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item'>
          <article>
            <a href='/lab' className='back'>&laquo; Back</a>

            <h1>Viewport</h1>

            <h2>Web Content (no tool/dev)</h2>
            <ul>
              <li>Viewport Width:&nbsp;&nbsp;<span id='vp-w'></span> </li>
              <li>Viewport Height:&nbsp;<span id='vp-h'></span> </li>
            </ul>

            <h2>Web Content (no tool/dev/scroll)</h2>
            <ul>
              <li>Client Width:&nbsp;&nbsp;<span id='c-w'></span> </li>
              <li>Client Height:&nbsp;<span id='c-h'></span> </li>
            </ul>

            <h2>Physical Device</h2>
            <ul>
              <li>Screen Width:&nbsp;&nbsp;<span id='scr-w'></span> </li>
              <li>Screen Height:&nbsp;<span id='scr-h'></span> </li>
              <li>Screen AvailWidth:&nbsp;&nbsp;<span id='scr-aw'></span> </li>
              <li>Screen AvailHeight:&nbsp;<span id='scr-ah'></span> (no taskbar)</li>
              <li>Screen DPI: <span id='scr-dpi'></span> (IE/Edge Only)</li>
            </ul>
          </article>
        </div>
      </Layout>
    )
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