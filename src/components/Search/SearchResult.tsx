import React, { FC, useState, MouseEvent } from 'react'
import './SearchResult.scss'
import { GatsbyContentNode } from '../../utils/interface'
import { Link } from 'gatsby'
import { search, blurSearch } from './utils'

interface SearchResultProps {
  query: string
  nodes: GatsbyContentNode[]
  open: boolean
  onSelect?: () => void
}

export const SearchResult: FC<SearchResultProps> = (props) => {
  const { open, query, nodes, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState(-1)

  const cls = [
    'search-result',
    open && 'open',
  ].filter(Boolean).join(' ')

  const _onSelect = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onSelect && onSelect()
  }

  const _onMouseEnter = (index: number) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setCurrentIndex(index)
  }

  const _onMouseLeave = (index: number) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setCurrentIndex(-1)
  }

  // const searchResult = search(data, query)
  const searchResult = query
    ? nodes.filter(n => (
        blurSearch(n.frontmatter.title, query) ||
        blurSearch(n.frontmatter.description, query) ||
        blurSearch(n.excerpt, query)
      ))
    : []

  const renderResult = () => {
    const result = searchResult.map((n, i) => {
      const itemCls = [
        'result-item',
        i === currentIndex && 'current'
      ].filter(Boolean).join(' ')

      return (
        <li
          key={n.id}
          className={itemCls}
          onMouseEnter={_onMouseEnter(i)}
          onMouseLeave={_onMouseLeave(i)}
        >
          <Link
            className='result-item-link'
            to={n.fields.slug}
            onClick={_onSelect}
          >
            <p className='title'>{n.frontmatter.title}</p>
            <p className='excerpt'>{n.excerpt}</p>
          </Link>
        </li>
      )
    })

    return (
      <ul className='result-list'>
        { result }
      </ul>
    )
  }

  const renderPlaceholder = () => {
    return <p className='placeholder'>请开始你的搜索</p>
  }

  const renderNoResult = () => {
    return <p className='no-result'>没有符合条件的结果</p>
  }

  const content = query
    ? searchResult.length
      ? renderResult()
      : renderNoResult()
    : renderPlaceholder()

  return (
    <div className={cls}>
      <div className='result-container'>
        { content }
      </div>
    </div>
  )
}
