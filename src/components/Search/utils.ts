import { GatsbyContentNode, BlogNode, ProjectNode, NodeType } from 'utils/interface'

type MatchData = [number, string]

interface BlurSearchResult {
  valid: boolean,
  matches: MatchData[]
}

/**
 * @description 模糊搜索
 * @param source 被搜索字符串
 * @param query 搜索关键字
 */
export const blurSearch = (source: string, query: string): BlurSearchResult => {
  const result: BlurSearchResult = { valid: false, matches: [] }
  if (!source || !query) {
    return result
  }

  const _source = source.toLowerCase()
  const _query = query.toLowerCase()

  let idx = -1
  for (const s of _query) {
    idx = _source.indexOf(s, idx + 1)
    if (idx === -1) {
      result.valid = false
      return result
    } else {
      result.matches.push([idx, s])
    }
  }

  result.valid = true
  return result
}

export interface SearchResultData {
  type: NodeType
  node: GatsbyContentNode
  matches: {
    title: MatchData[]
    desc: MatchData[]
  }
}

export const search = (
  nodes: GatsbyContentNode[],
  query: string
): SearchResultData[] => {
  const results: SearchResultData[] = []

  for (const node of nodes) {
    const searchByTitle = blurSearch(node.frontmatter.title, query)
    const searchByDesc = blurSearch(node.frontmatter.title, query)
    if (searchByTitle.valid || searchByDesc.valid) {
      const result: SearchResultData = {
        type: node.fields.type,
        node,
        matches: {
          title: searchByTitle.matches,
          desc: searchByDesc.matches
        }
      }
      results.push(result)
    }
  }

  return results
}
