import React, { FC, useState, ChangeEvent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import './Search.scss'
import { GatsbyDataProps } from '../../utils/interface'
import { SearchInput } from './SearchInput'
import { SearchResult } from './SearchResult'

interface SearchProps extends GatsbyDataProps {}

/**
 * @description 模糊搜索
 * @param source 被搜索字符串
 * @param query 搜索关键字
 */
function blurSearch (source: string, query: string) {
  if (!source) {
    return false
  }

  const match = source.toLowerCase().includes(query.toLowerCase())
  return match
}


const SearchInner: FC<SearchProps> = (props) => {
  const { data } = props
  const nodes = data.allMarkdownRemark.edges.map(n => n.node)

  const [searchText, setSearchText] = useState('')

  function onSearchTextChange (value: string) {
    setSearchText(value)
  }

  const searchResult = searchText
    ? nodes.filter(n => (
        blurSearch(n.frontmatter.title, searchText) ||
        blurSearch(n.frontmatter.description, searchText) ||
        blurSearch(n.excerpt, searchText)
      ))
    : []

  console.log(searchResult.map(n => n.frontmatter.title))

  return (
    <div className='search-bar'>
      <SearchInput
        value={searchText}
        onChange={onSearchTextChange}
      />
      <SearchResult data={searchResult} />
   </div>
  )
}

export const Search: FC = () => {
  return (
    <StaticQuery
      query={searchQuery}
      render={data => <SearchInner data={data} />}
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
