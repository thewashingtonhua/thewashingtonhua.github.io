import React, { FC, KeyboardEvent, useState, ChangeEvent } from 'react'
import { ToolboxLayout } from '../../components'
import './tool.scss'
import './browser-keyboard.scss'

interface Record {
  type: string
  key: string
  keyCode: number
  charCode: number
  shiftKey: boolean
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
}

const BrowserKeyboard: FC = (props) => {
  const [value, setValue] = useState('')
  const [records, setRecords] = useState<Record[]>([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const recordEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const { type, key, keyCode, charCode, shiftKey, altKey, ctrlKey, metaKey } = e
    const record = { type, key, keyCode, charCode, shiftKey, altKey, ctrlKey, metaKey }
    setRecords([ record, ...records ].slice(0, 100))
  }

  const renderRecords = () => {
    return records.map((record, i) => (
      <tr key={i}>
        <td>{records.length - i}</td>
        <td>{record.key}</td>
        <td>{record.keyCode}</td>
        <td>{String(record.shiftKey)}</td>
        <td>{String(record.altKey)}</td>
        <td>{String(record.ctrlKey)}</td>
        <td>{String(record.metaKey)}</td>
      </tr>
    ))
  }

  return (
    <ToolboxLayout title='User Agent' id='tool-browser-keyboard'>
      <h1>Keyboard</h1>
      <input
        type='text'
        value={value}
        onChange={onChange}
        onKeyDown={recordEvent}
      />
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>No.</th>
            <th>key</th>
            <th>keyCode</th>
            <th>Shift</th>
            <th>Option / Alt</th>
            <th>Ctrl</th>
            <th>Command / Window</th>
          </tr>
        </thead>
        <tbody>
          { renderRecords() }
        </tbody>
      </table>

    </ToolboxLayout>
  )
}

export default BrowserKeyboard
