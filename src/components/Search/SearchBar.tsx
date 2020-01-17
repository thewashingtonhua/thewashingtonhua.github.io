import React, { FC, useState, ChangeEvent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import './SearchBar.scss'
import { GatsbyDataProps } from '../../utils/interface'
import { blurSearch } from './utils'
import { SearchInput } from './SearchInput'
import { SearchResult } from './SearchResult'

interface SearchBarProps {
  onSearchBegin?: () => void
  onSearchEnd?: () => void
}

interface SearchBarCompProps extends GatsbyDataProps, SearchBarProps {}

const SearchBarComp: FC<SearchBarCompProps> = (props) => {
  const { data, onSearchBegin, onSearchEnd } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node)

  const [searchText, setSearchText] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const onSearchTextChange = (value: string) => {
    setSearchText(value)
  }

  const _onSearchBegin = () => {
    setIsSearching(true)
    onSearchBegin && onSearchBegin()
  }

  const _onSearchEnd = () => {
    setIsSearching(false)
    onSearchEnd && onSearchEnd()
  }

  const searchResult = searchText
    ? nodes.filter(n => (
        blurSearch(n.frontmatter.title, searchText) ||
        blurSearch(n.frontmatter.description, searchText) ||
        blurSearch(n.excerpt, searchText)
      ))
    : []

  const searchBarCls = [
    'search-bar',
    isSearching && 'searching',
  ].filter(Boolean).join(' ')

  return (
    <div className={searchBarCls}>
      <div className='wrapper'>
        <SearchInput
          value={searchText}
          onChange={onSearchTextChange}
          onSearchBegin={_onSearchBegin}
          onSearchEnd={_onSearchEnd}
        />
        <SearchResult
          open={isSearching}
          data={searchResult}
          onSelect={_onSearchEnd}
        />
      </div>
   </div>
  )
}

export const SearchBar: FC<SearchBarProps> = (props) => {
  return (
    <StaticQuery
      query={searchQuery}
      render={data => <SearchBarComp data={data} {...props} />}
    />
  )
}

export const searchQuery = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          description
          tags
          cover {
            publicURL
          }
          series
          draft
          original
        }
        fields {
          id
          slug
          type
          date
        }
      }
    }
  }
}`
