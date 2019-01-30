import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class BrowserViewport extends PureComponent {
  state = {
    innerWidth: '',
    innerHeight: '',
    outerWidth: '',
    outerHeight: '',
    clientWidth: '',
    clientHeight: '',
    screenWidth: '',
    screenHeight: '',
    screenAvailWidth: '',
    screenAvailHeight: '',
    screenOrientation: '',
    screenDeviceXDPI: '',
    devicePixelRatio: ''
  }

  getSize = () => {
    const innerWidth = window.innerWidth + ' px'
    const innerHeight = window.innerHeight + ' px'
    const outerWidth = window.outerWidth + ' px'
    const outerHeight = window.outerHeight + ' px'
    const clientWidth = document.documentElement.clientWidth + ' px'
    const clientHeight = document.documentElement.clientHeight + ' px'
    const screenWidth = window.screen.width + ' px'
    const screenHeight = window.screen.height + ' px'
    const screenAvailWidth = window.screen.availWidth + ' px'
    const screenAvailHeight = window.screen.availHeight + ' px'
    const screenOrientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type
    const screenDeviceXDPI = window.screen.deviceXDPI ? (window.screen.deviceXDPI + ' px') : 'N/A'
    const devicePixelRatio = window.devicePixelRatio + ''

    this.setState({
      innerWidth,
      innerHeight,
      outerWidth,
      outerHeight,
      clientWidth,
      clientHeight,
      screenWidth,
      screenHeight,
      screenAvailWidth,
      screenAvailHeight,
      screenOrientation,
      screenDeviceXDPI,
      devicePixelRatio
    })
  }

  render () {
    const {
      innerWidth,
      innerHeight,
      outerWidth,
      outerHeight,
      clientWidth,
      clientHeight,
      screenWidth,
      screenHeight,
      screenAvailWidth,
      screenAvailHeight,
      screenOrientation,
      screenDeviceXDPI,
      devicePixelRatio
    } = this.state

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

            <table cellSpacing={0}>
              <tbody>

                <tr className='title'>
                  <td colSpan={2}>Content</td>
                </tr>
                <tr>
                  <td>document.documentElement.clientWidth (No ScrollBar)</td>
                  <td>{clientWidth}</td>
                </tr>
                <tr>
                  <td>document.documentElement.clientHeight (No TopBar, No DevTool)</td>
                  <td>{clientHeight}</td>
                </tr>

                <tr className='title'>
                  <td colSpan={2}>Browser</td>
                </tr>
                <tr>
                  <td>window.innerWidth</td>
                  <td>{innerWidth}</td>
                </tr>
                <tr>
                  <td>window.innerHeight (No TopBar, No DevTool)</td>
                  <td>{innerHeight}</td>
                </tr>
                <tr>
                  <td>window.outerWidth</td>
                  <td>{outerWidth}</td>
                </tr>
                <tr>
                  <td>window.outerHeight</td>
                  <td>{outerHeight}</td>
                </tr>

                <tr className='title'>
                  <td colSpan={2}>Device</td>
                </tr>
                <tr>
                  <td>window.screen.width</td>
                  <td>{screenWidth}</td>
                </tr>
                <tr>
                  <td>window.screen.height</td>
                  <td>{screenHeight}</td>
                </tr>
                <tr>
                  <td>window.screen.availWidth</td>
                  <td>{screenAvailWidth}</td>
                </tr>
                <tr>
                  <td>window.screen.availHeight (No TopBar)</td>
                  <td>{screenAvailHeight}</td>
                </tr>
                <tr>
                  <td>window.screen.orientation</td>
                  <td>{screenOrientation}</td>
                </tr>
                <tr>
                  <td>window.screen.deviceXDPI (IE Only)</td>
                  <td>{screenDeviceXDPI}</td>
                </tr>
                <tr>
                  <td>window.devicePixelRatio</td>
                  <td>{devicePixelRatio}</td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </Layout>
    )
  }

  componentDidMount () {
    this.getSize()

    window.addEventListener('resize', this.getSize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getSize)
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