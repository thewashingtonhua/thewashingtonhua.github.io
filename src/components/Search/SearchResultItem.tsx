import React, { FC, MouseEvent } from 'react'
import './SearchResultItem.scss'
import { GatsbyContentNode, BlogNode, ProjectNode, NodeType } from '../../utils/interface'
import { Link } from 'gatsby'
import dayjs from 'dayjs'
import { SearchResultData } from './utils'

interface SearchResultItemProps {
  data: SearchResultData
  isCurrent: boolean
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave: (e: MouseEvent<HTMLElement>) => void
  onClick: (e: MouseEvent<HTMLElement>) => void
}

export const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  const {
    data,
    isCurrent,
    onMouseEnter,
    onMouseLeave,
    onClick
  } = props
  const { node, matches } = data
  const { title, desc } = matches

  const itemCls = [
    'result-item',
    isCurrent && 'current'
  ].filter(Boolean).join(' ')

  return (
    <li
      className={itemCls}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        className='result-item-link'
        to={node.fields.slug}
        onClick={onClick}
      >
        <p className='title'>{node.frontmatter.title}</p>
        <p className='desc'>{node.frontmatter.description}</p>
      </Link>
    </li>
  )
}
