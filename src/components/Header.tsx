import React, { useState } from 'react'
import { Link } from 'gatsby'
import logo from '../images/logo.png'
import './Header.scss'
import { LinkGetProps } from '@reach/router';

const menus = [
  { to: '/blog', text: '博客' },
  { to: '/project', text: '代表作' },
  { to: '/lab', text: '实验室' },
  { to: '/friend', text: '朋友' },
  { to: '/recruit', text: '招人' },
  { to: '/about', text: '我' }
]

export const Header = () => {

  const [navMenuOpen, setNavMenuOpen] = useState(false)

  function toggle () {
    setNavMenuOpen(!navMenuOpen)
  }

  function close () {
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
          <Link to='/' className='logo'>
            <img src={logo} alt=''/>
            <span>童话说</span>
          </Link>
          <div className={'hamberger' + (navMenuOpen ? ' open' : '')} onClick={toggle}>
            <div className='bar' />
            <div className='bar' />
            <div className='bar' />
          </div>
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
      <div className='mf-header-placeholder' />
    </header>
  )
}
