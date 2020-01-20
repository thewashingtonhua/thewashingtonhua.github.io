import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import { GatsbyDataProps } from '../../utils/interface'

const ERROR_TPYE = [
  undefined,
  'service denied',
  'cannot access geolocation info',
  'timeout'
]

const HTML5Geolocation = (props: GatsbyDataProps) => {
  const [latitude, setLatitude] = useState<number|null>(null)
  const [longitude, setLongitude] = useState<number|null>(null)
  const [accuracy, setAccuracy] = useState<number|null>(null)
  const [altitude, setAltitude] = useState<number|null>(null)
  const [altitudeAccuracy, setAltitudeAccuracy] = useState<number|null>(null)
  const [heading, setHeading] = useState<number|null>(null)
  const [speed, setSpeed] = useState<number|null>(null)
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
          setSpeed(position.coords.speed)
        },
        error => {
          error.code
          setError('[Error] ' + ERROR_TPYE[error.code])
        },
        { enableHighAccuracy: true }
      )
    } else {
      setError('[Error] Geolocation is not supported on this browser.')
    }
  }, [])

  return (
    <ToolboxLayout title='Geolocation '>
      <h1>Geolocation</h1>

      <p>Latitude: {latitude}</p>
      <p>Longtitude: {longitude}</p>
      <p>Accuracy: {accuracy}</p>
      <p>Altitude: {altitude}</p>
      <p>Altitude Accuracy: {altitudeAccuracy}</p>
      <p>Heading: {heading}</p>
      <p>Speed: {speed}</p>

      <p id='error'>{error}</p>
    </ToolboxLayout>
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
