import React, { FC } from 'react'
import './SearchResult.scss'
import { GatsbyContentNode } from '../../utils/interface'
import { Link } from 'gatsby'

interface SearchResultProps {
  data: GatsbyContentNode[]
}

export const SearchResult: FC<SearchResultProps> = (props) => {
  const { data } = props

  const cls = [
    'search-result',
    !data.length && 'no-data'
  ].filter(Boolean).join(' ')

  return (
    <div className={cls}>
      <ul>
        { data.map(n =>
          <li key={n.id}>
            <Link to={n.fields.slug}>{n.frontmatter.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
