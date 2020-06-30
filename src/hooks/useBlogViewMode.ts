import { useState, useEffect } from 'react'
import { BlogCatalogViewMode } from '../components'
import { hasWindow } from 'utils'

export const useBlogViewMode = () => {
  const cachedviewModel = hasWindow()
    ? window.localStorage.getItem('blog-view-mode') as BlogCatalogViewMode
    : null
  const initViewMode = cachedviewModel || BlogCatalogViewMode.normal
  const [viewMode, setViewMode] = useState<BlogCatalogViewMode>(initViewMode)

  useEffect(() => {
    if (viewMode !== cachedviewModel) {
      if (hasWindow()) {
        window.localStorage.setItem('blog-view-mode', viewMode)
      }
    }
  }, [viewMode])

  return { viewMode, setViewMode }
}
