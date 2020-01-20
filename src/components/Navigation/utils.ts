import { LinkGetProps } from '@reach/router'

export const isMenuActive =  (isMenuActiveProps: LinkGetProps) => {
  const { isPartiallyCurrent } = isMenuActiveProps
  const className = [
    'menu-link',
    isPartiallyCurrent && 'active'
  ].filter(Boolean).join(' ')
  return { className }
}

export const MENUS = [
  { to: '/blog', text: '博客' },
  { to: '/project', text: '项目' },
  { to: '/toolbox', text: '工具' },
  { to: '/friend', text: '友人' },
  { to: '/recruit', text: '招聘' },
  { to: '/about', text: '关于' }
]
