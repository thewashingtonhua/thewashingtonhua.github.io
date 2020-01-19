import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import './SearchBar.scss'
import { GatsbyDataProps } from '../../utils/interface'
import { blurSearch, search } from './utils'
import { SearchInput } from './SearchInput'
import { SearchResult } from './SearchResult'

interface SearchBarProps {
  searchText: string
  onSearchTextChange?: (value: string) => void
  isSearching: boolean
  onSearchBegin?: () => void
  onSearchEnd?: () => void
}

interface SearchBarCompProps extends GatsbyDataProps, SearchBarProps {}

const SearchBarComp: FC<SearchBarCompProps> = (props) => {
  const {
    data,
    searchText,
    isSearching,
    onSearchTextChange,
    onSearchBegin,
    onSearchEnd
  } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node)

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
          onSearchBegin={onSearchBegin}
          onSearchEnd={onSearchEnd}
        />
        <SearchResult
          query={searchText}
          open={isSearching}
          nodes={nodes}
          onSelect={onSearchEnd}
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
          from
          to
          series
          draft
          original
          category
        }
        excerpt
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
