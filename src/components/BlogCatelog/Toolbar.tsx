import React, { FC, MouseEvent } from 'react'
import { BlogCatalogViewMode } from './interface'
import './Toolbar.scss'

interface Props {
  viewMode: BlogCatalogViewMode
  onViewModeChange?: (viewMode: BlogCatalogViewMode) => void
}

const options = ['图文视图', '归档视图']

const translateViewMode = (mode: BlogCatalogViewMode) => {
  switch (mode) {
    case BlogCatalogViewMode.normal:
      return '图文视图'
    case BlogCatalogViewMode.archive:
      return '归档视图'
    default:
      return ''
  }
}

export const Toolbar: FC<Props> = (props) => {
  const { viewMode, onViewModeChange } = props

  const renderViewModeSelector = () => {

    const options = Object.values(BlogCatalogViewMode)

    const handleClick = (
      mode: BlogCatalogViewMode
    ) => (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onViewModeChange && onViewModeChange(mode)
    }

    return (
      <ul className='viewmode-selector'>
        { options.map(n => (
          <li
            key={n}
            className={'viewmode-option' + (n === viewMode ? ' active' : '')}
            onClick={handleClick(n)}
          >{translateViewMode(n)}</li>
        )) }
      </ul>
    )
  }

  return (
    <div className='blog-catelog-toolbar'>
      { renderViewModeSelector() }
    </div>
  )
}
