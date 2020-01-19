import React, { FC, MouseEvent, ReactNode } from 'react'
import './SearchResultItem.scss'
import { GatsbyContentNode, BlogNode, ProjectNode, NodeType } from '../../utils/interface'
import { Link } from 'gatsby'
import dayjs from 'dayjs'
import { SearchResultData, MatchData } from './utils'

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

  const itemCls = [
    'result-item',
    isCurrent && 'current'
  ].filter(Boolean).join(' ')

  const highlight = (source: string, matches: MatchData[]): ReactNode => {
    if (!matches.length) {
      return source
    }

    const content: { highlight: boolean, str: string }[] = []
    const _matches = [...matches]

    for (let currentIdx = 0; currentIdx < source.length; currentIdx++) {
      console.log('for', _matches)
      const [idx, str] = _matches.length ? _matches[0] : [-1, '']
      const contentLen = content.length
      const lastContent = content[contentLen - 1]
      if (currentIdx === idx) {
        _matches.shift()
        if (lastContent && lastContent.highlight) {
          lastContent.str += str
        } else {
          content.push({ highlight: true, str })
        }
      } else {
        if (lastContent && !lastContent.highlight) {
          lastContent.str += source[currentIdx]
        } else {
          content.push({ highlight: false, str: source[currentIdx] })
        }
      }
    }

    return content.map((n, i) => (
      <span key={i} className={n.highlight ? 'highlight' : ''}>{n.str}</span>
    ))
  }

  const renderTitle = () => {
    return (
      <p className='title'>
        { highlight(node.frontmatter.title, matches.title) }
      </p>
    )
  }

  const renderDesc = () => {
    return (
      <p className='desc'>
        { highlight(node.frontmatter.description, matches.desc) }
      </p>
    )
  }

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
        {renderTitle()}
        {renderDesc()}
      </Link>
    </li>
  )
}
