
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
