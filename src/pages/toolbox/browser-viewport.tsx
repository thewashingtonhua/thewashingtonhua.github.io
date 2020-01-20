import React, { FC, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import { GatsbyDataProps, IWindow } from '../../utils/interface'

const BrowserViewport: FC<GatsbyDataProps> = (props) => {
  const [innerWidth, setInnerWidth] = useState('')
  const [innerHeight, setInnerHeight] = useState('')
  const [outerWidth, setOuterWidth] = useState('')
  const [outerHeight, setOuterHeight] = useState('')
  const [clientWidth, setClientWidth] = useState('')
  const [clientHeight, setClientHeight] = useState('')
  const [screenWidth, setScreenWidth] = useState('')
  const [screenHeight, setScreenHeight] = useState('')
  const [screenAvailWidth, setScreenAvailWidth] = useState('')
  const [screenAvailHeight, setScreenAvailHeight] = useState('')
  const [screenOrientation, setScreenOrientation] = useState('')
  const [screenDeviceXDPI, setScreenDeviceXDPI] = useState('')
  const [devicePixelRatio, setDevicePixelRatio] = useState('')

  const getSize = () => {
    const _window = window as IWindow
    const screen = _window.screen
    setInnerWidth(window.innerWidth + ' px')
    setInnerHeight(window.innerHeight + ' px')
    setOuterWidth(window.outerWidth + ' px')
    setOuterHeight(window.outerHeight + ' px')
    setClientWidth(document.documentElement.clientWidth + ' px')
    setClientHeight(document.documentElement.clientHeight + ' px')
    setScreenWidth(screen.width + ' px')
    setScreenHeight(screen.height + ' px')
    setScreenAvailWidth(screen.availWidth + ' px')
    setScreenAvailHeight(screen.availHeight + ' px')
    setScreenOrientation((screen.msOrientation || screen.mozOrientation || screen.orientation || { type: '' }).type)
    setScreenDeviceXDPI(screen.deviceXDPI ? (screen.deviceXDPI + ' px') : 'N/A')
    setDevicePixelRatio(window.devicePixelRatio + '')
  }

  useEffect(() => {
    getSize()

    window.addEventListener('resize', getSize)

    return () => {
      window.removeEventListener('resize', getSize)
    }
  }, [])

  return (
    <ToolboxLayout title='Viewport'>
      <h1>Viewport</h1>

      <table cellSpacing={0}>
        <thead></thead>
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
    </ToolboxLayout>
  )
}

export default BrowserViewport
export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
