import React, { FC, Fragment, useState, MouseEvent } from 'react'
import './SearchResult.scss'
import { GatsbyContentNode, NodeType } from '../../utils/interface'
import { search, blurSearch, SearchResultData } from './utils'
import { SearchResultItem } from './SearchResultItem'

interface SearchResultProps {
  query: string
  nodes: GatsbyContentNode[]
  open: boolean
  onSelect?: () => void
}

export const SearchResult: FC<SearchResultProps> = (props) => {
  const { open, query, nodes, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [currentCategory, setCurrentCategory] = useState<NodeType>()

  const cls = [
    'search-result',
    open && 'open',
  ].filter(Boolean).join(' ')

  const _onSelect = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onSelect && onSelect()
  }

  const _onMouseEnter = (
    index: number,
    type: NodeType
  ) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setCurrentIndex(index)
    setCurrentCategory(type)
  }

  const _onMouseLeave = (
    index: number,
    type: NodeType
  ) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setCurrentIndex(-1)
    setCurrentCategory(type)
  }

  const searchResult = search(nodes, query)

  const blogsFound = searchResult.filter(n => n.type === NodeType.blog)
  const projectsFound = searchResult.filter(n => n.type === NodeType.project)

  const list: { title: string, items: SearchResultData[] }[] = []
  if (blogsFound.length) {
    list.push({
      title: '博客',
      items: blogsFound
    })
  }
  if (projectsFound.length) {
    list.push({
      title: '项目',
      items: projectsFound
    })
  }

  const renderResult = () => (
    <div className='result-list'>
      { list.map(category => (
        <div key={category.title} className='result-category'>
          <header className='category-header'>
            <p className='category-title'>{category.title}</p>
          </header>
          <ul className='category-items'>
            { category.items.map((item, i) => (
              <SearchResultItem
                key={item.node.id}
                data={item}
                isCurrent={i === currentIndex && item.type === currentCategory}
                onMouseEnter={_onMouseEnter(i, item.type)}
                onMouseLeave={_onMouseLeave(i, item.type)}
                onClick={_onSelect}
              />
            ))}
          </ul>
        </div>
      )) }
    </div>
  )

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
