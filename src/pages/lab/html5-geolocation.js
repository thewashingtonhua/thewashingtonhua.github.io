import React, { PureComponent, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
import { GatsbyDataProps } from '../../utils/interface'

const ERROR_TPYE = {
  1: 'service denied',
  2: 'cannot access geolocation info',
  3: 'timeout'
}

const HTML5Geolocation = (props: GatsbyDataProps) => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [accuracy, setAccuracy] = useState(null)
  const [altitude, setAltitude] = useState(null)
  const [altitudeAccuracy, setAltitudeAccuracy] = useState(null)
  const [heading, setHeading] = useState(null)
  const [speed, setSpeed] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // 经纬度数值为正数表示东经、北纬，负数表示西经南纬，遵循直角坐标系
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setAccuracy(position.coords.accuracy)
          setAltitude(position.coords.altitude)
          setAltitudeAccuracy(position.coords.altitudeAccuracy)
          setHeading(position.coords.heading)
          setSpeed(position.coords.speed)        },
        error => {
          setError('[Error] ' + ERROR_TPYE[error.code])
        },
        { enableHighAcuracy: true }
      )
    } else {
      setError('[Error] Geolocation is not supported on this browser.')
    }
  }, [])

  return (
    <Layout>
      <SEO
        title='Geolocation | 实验室'
        keywords={props.data.site.siteMetadata.keywords}
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

export default HTML5Geolocation
export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
