import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'

export default class HTML5Geolocation extends PureComponent {
  state = {
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    error: ''
  }

  render () {
    const {
      latitude,
      longitude,
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      speed,
      error
    } = this.state

    return (
      <Layout>
        <SEO
          title='Geolocation | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item'>

          <article>
            <Link to='/lab' className='back'>&laquo; Back</Link>

            <h1>Geolocation</h1>

            <p>Latitude: {latitude}</p>
            <p>Longtitude: {longitude}</p>
            <p>Accuracy: {accuracy}</p>
            <p>Altitude: {altitude}</p>
            <p>Altitude Accuracy: {altitudeAccuracy}</p>
            <p>Heading: {heading}</p>
            <p>Speed: {speed}</p>

            <p id='error'>{error}</p>
          </article>
        </div>
      </Layout>
    )
  }

  componentDidMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed
          }
          // 经纬度数值为正数表示东经、北纬，负数表示西经南纬，遵循直角坐标系
          this.setState(coords)
        },
        error => {
          const ERROR_TPYE = {
            1: 'service denied',
            2: 'cannot access geolocation info',
            3: 'timeout'
          }
          this.setState({
            error: '[Error] ' + ERROR_TPYE[error.code]
          })
        },
        {
          enableHighAcuracy: true
        }
      )
    } else {
      this.setState({
        error: '[Error] Geolocation is not supported on this browser.'
      })
    }
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