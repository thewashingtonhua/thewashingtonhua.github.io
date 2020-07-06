import React, { FC } from 'react'
import { ToolboxLayout } from 'components'

type DeviceCategorySchema = 'Desktop' | 'Laptop' | 'Tablet' | 'Phone'

interface DeviceSchema {
  name: string,
  resolution?: {
    width?: number,
    height?: number,
    ppi?: number
  }
}

interface DeviceByCategory {
  category: DeviceCategorySchema,
  devices: DeviceSchema[]
}

const DEVICE_DATA: DeviceByCategory[] = [
  {
    category: 'Laptop',
    devices: [
      {
        name: 'Macbook Pro (13 inch)',
        resolution: {
          width: 2560,
          height:  1600,
          ppi: 227
        }
      },
      {
        name: 'Macbook Pro (13 inch)',
        resolution: {
          width: 2880,
          height:  1800,
          ppi:  220
        }
      },
      {
        name: 'Macbook Pro (16 inch)',
        resolution: {
          width: 3072,
          height:  1920,
          ppi: 226
        }
      }
    ]
  }
]

const DeviceData: FC = () => {
  return (
    <ToolboxLayout title='Device Data'>
      <h1>Device Data</h1>
      <div id='device-data'>
        <table cellSpacing={ 0 }>
          <thead>
            <tr>
              <th>Name</th>
              <th>Resolution</th>
              <th>PPI</th>
            </tr>
          </thead>
          <tbody>
            { DEVICE_DATA.map(category => (
              <>
                <tr>
                  <td className='category' colSpan={3}>{ category.category }</td>
                </tr>
                { category.devices.map(device => (
                  <tr>
                    <td>{ device.name }</td>
                    <td>{ device.resolution?.width }×{ device.resolution?.height }</td>
                    <td>{ device.resolution?.ppi }</td>
                  </tr>
                )) }
              </>
            )) }
          </tbody>
        </table>
      </div>
    </ToolboxLayout>
  )
}

export default DeviceData
