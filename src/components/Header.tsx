import React, { FC, useState } from 'react'
import { Link } from 'gatsby'
import logo from '../images/logo.png'
import './Header.scss'
import { Navigation, NavigationMobile } from './Navigation'
import { SearchBar } from './Search'

export const Header: FC = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  const onNavigationToggle = () => {
    setIsNavigationOpen(!isNavigationOpen)
  }

  const onNavigationClose = () => {
    setIsNavigationOpen(false)
  }

  return (
    <header id='mf-header'>
      <div className='mf-header-container'>
        <div className='mf-header-wrapper'>
          <div className='brand'>
            <Link to='/' className='brand-link'>
              <img className='brand-logo' src={logo} alt=''/>
              <span className='brand-name'>童话说</span>
            </Link>
          </div>

          <Navigation />
          <NavigationMobile
            open={isNavigationOpen}
            onToggle={onNavigationToggle}
            onClose={onNavigationClose}
          />
        </div>
        <SearchBar
          onSearchBegin={onNavigationClose}
        />
      </div>
      <div className='mf-header-placeholder' />
    </header>
  )
}
