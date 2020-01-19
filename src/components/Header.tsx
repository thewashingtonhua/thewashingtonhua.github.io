import React, { FC, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import logo from '../images/logo.png'
import './Header.scss'
import { Navigation, NavigationMobile } from './Navigation'
import { SearchBar } from './Search'
import { lockBodyScroll, unlockBodyScroll } from '../utils/dom'

export const Header: FC = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const onSearchTextChange = (value: string) => {
    setSearchText(value)
  }

  const onSearchBegin = () => {
    setIsSearching(true)
    onNavigationClose()
  }

  const onSearchEnd = () => {
    setIsSearching(false)
  }

  const onNavigationToggle = () => {
    setIsNavigationOpen(!isNavigationOpen)
  }

  const onNavigationClose = () => {
    setIsNavigationOpen(false)
  }

  useEffect(() => {
    const isLock = isNavigationOpen || isSearching
    if (isLock) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
  }, [isNavigationOpen, isSearching])

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
          searchText={searchText}
          isSearching={isSearching}
          onSearchTextChange={onSearchTextChange}
          onSearchBegin={onSearchBegin}
          onSearchEnd={onSearchEnd}
        />
      </div>
      <div className='mf-header-placeholder' />
    </header>
  )
}
