import React, { Fragment, FC } from 'react'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import './html5-input.scss'

const types = [
  'text',
  'password',
  'tel',
  'email',
  'file',
  'date',
  'datetime',
  'number',
  'url',
  'search',
  'range',
  'color'
]

const HTML5Input: FC = () => {
  return (
    <ToolboxLayout title='Input Type' id='tool-html5-input'>
      <h1>Input</h1>

      { types.map(type => (
        <Fragment key={type}>
          <label htmlFor={type}>{type}</label>
          <input
            type={type}
            name={type}
            id={type}
            placeholder={type}
          />
        </Fragment>
      ))}
    </ToolboxLayout>
  )
}

export default HTML5Input
