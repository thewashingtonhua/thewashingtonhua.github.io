import React, { FC } from 'react'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import platform from 'platform'

const BrowserUA: FC = () => {
  const {
    name,
    version,
    layout,
    ua,
    os,
    manufacturer,
    product
  } = platform
  const browser = `${name} ${version} (${layout})`
  const displayDevice = manufacturer ||product
  const device = `${manufacturer} ${product}`

  return (
    <ToolboxLayout title='User Agent'>
      <h1>UserAgent</h1>

      <p>Browser: {browser}</p>
      <p>OS: {os?.toString()}</p>
      <p>UA: {ua}</p>
      { displayDevice && <p>Device: {device}</p> }
    </ToolboxLayout>
  )
}

export default BrowserUA
