import React, { useState, MouseEvent } from 'react'
import { Link } from 'gatsby'
import logo from '../images/logo.png'
import './Header.scss'
import { LinkGetProps } from '@reach/router'
import { Search } from './Search'

const menus = [
  { to: '/blog', text: '博客' },
  { to: '/project', text: '项目' },
  { to: '/lab', text: '工具' },
  { to: '/friend', text: '友人' },
  { to: '/recruit', text: '招聘' },
  { to: '/about', text: '关于' }
]

export const Header = () => {

  const [navMenuOpen, setNavMenuOpen] = useState(false)

  function toggle (e: MouseEvent) {
    e && e.stopPropagation()
    setNavMenuOpen(!navMenuOpen)
  }

  function close (e: MouseEvent) {
    e && e.stopPropagation()
    setNavMenuOpen(false)
  }

  function isMenuActive (isMenuActiveProps: LinkGetProps) {
    const { isPartiallyCurrent } = isMenuActiveProps
    return isPartiallyCurrent
      ? { className: 'menu-link active' }
      : { className: 'menu-link' }
  }

  return (
    <header id='mf-header'>
      <div className='mf-header-container'>
        <div className='mf-header-wrapper'>
          <div className='brand'>
            <Link to='/' className='logo'>
              <img src={logo} alt=''/>
              <span>童话说</span>
            </Link>
          </div>

          <Search />

          <div className='navigation'>
            <div
              className={'hamberger' + (navMenuOpen ? ' open' : '')}
              onClick={toggle}
            />
            <nav className={'nav-menu' + (navMenuOpen ? ' open' : '')}>
              <ul className='menus'>
                { menus.map(n => (
                  <li className='menu' key={n.to}>
                    <Link
                      to={n.to}
                      getProps={isMenuActive}
                      onClick={close}
                    >{n.text}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className='mf-header-placeholder' />
    </header>
  )
}
