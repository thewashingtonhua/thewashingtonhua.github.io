import React, { PureComponent } from 'react'
import { Link, withPrefix } from 'gatsby'
import logo from '../images/logo.png'
import './header.scss'

class Header extends PureComponent {
  menus = [
    { to: '/blog', text: '博客' },
    { to: '/project', text: '代表作' },
    { to: '/lab', text: '实验室' },
    { to: '/friend', text: '朋友' },
    { to: '/about', text: '我' }
  ]

  state = {
    navMenuOpen: false
  }

  toggle = e => {
    e && e.stopPropagation()
    this.setState({ navMenuOpen: !this.state.navMenuOpen })
  }

  isMenuActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent
      ? { className: 'menu active' }
      : { className: 'menu' }
  }

  render () {
    const { navMenuOpen } = this.state

    return (
      <>
        <header id='mf-header'>
          <div className='mf-header-wrapper'>
            <Link to='/' className='logo'>
              <img src={logo} alt=''/>
              <span>童话说</span>
            </Link>
            <div className={'hamberger' + (navMenuOpen ? ' open' : '')} onClick={this.toggle}>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
            </div>
            <nav className={'nav-menu' + (navMenuOpen ? ' open' : '')}>
              <div className='menus'>
                { this.menus.map(n => (
                  <Link
                    key={n.to}
                    to={n.to}
                    getProps={this.isMenuActive}
                  >{n.text}</Link>
                ))}
              </div>
            </nav>
          </div>
        </header>
        <section id='mf-header-placeholder' />
      </>
    )
  }
}

export default Header
