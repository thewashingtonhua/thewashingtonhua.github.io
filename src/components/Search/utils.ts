import { GatsbyContentNode } from 'utils/interface'

/**
 * @description 模糊搜索
 * @param source 被搜索字符串
 * @param query 搜索关键字
 */
export const blurSearch =  (source: string, query: string) => {
  if (!source) {
    return false
  }

  const match = source.toLowerCase().includes(query.toLowerCase())
  return match
}

export interface SearchResultData {}

export const search = (nodes: GatsbyContentNode[], query: string): SearchResultData[] => {
  const result: SearchResultData[] = []

  for (const node of nodes) {
    const { frontmatter, excerpt } = node
    const { title, description } = frontmatter
  }

  return result
}
