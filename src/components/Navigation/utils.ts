import { LinkGetProps } from '@reach/router'
import { IS_PROD } from 'config'

export const isMenuActive =  (isMenuActiveProps: LinkGetProps) => {
  const { isPartiallyCurrent } = isMenuActiveProps
  const className = [
    'menu-link',
    isPartiallyCurrent && 'active'
  ].filter(Boolean).join(' ')
  return { className }
}

export const MENUS = [
  !IS_PROD && { to: '/draft', text: '草稿' },
  { to: '/blog', text: '博客' },
  { to: '/project', text: '项目' },
  { to: '/toolbox', text: '工具' },
  { to: '/friend', text: '友人' },
  { to: '/about', text: '关于' }
].filter(Boolean)
