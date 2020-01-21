import { useState, useEffect } from 'react'
import { BlogCatalogViewMode } from '../components'

export const useBlogViewMode = () => {
  const cachedviewModel = window.localStorage.getItem('blog-view-mode') as BlogCatalogViewMode
  const initViewMode = cachedviewModel || BlogCatalogViewMode.normal
  const [viewMode, setViewMode] = useState<BlogCatalogViewMode>(initViewMode)

  useEffect(() => {
    if (viewMode !== cachedviewModel) {
      window.localStorage.setItem('blog-view-mode', viewMode)
    }
  }, [viewMode])

  return { viewMode, setViewMode }
}
