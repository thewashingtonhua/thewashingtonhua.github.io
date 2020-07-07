import React, { FC, useState } from 'react'
import { Link } from 'gatsby'
import './NavigationMobile.scss'
import { MENUS, isMenuActive } from './utils'

interface NavigationMobileProps {
  open: boolean
  onToggle: () => void
  onClose: () => void
}

export const NavigationMobile: FC<NavigationMobileProps> = (props) => {
  const { open, onToggle, onClose } = props

  return (
    <div className='navigation-mobile'>
      <div
        className='hamberger'
        data-is-open={ open }
        onClick={onToggle}
        />
      <nav
        className='nav-menu'
        data-is-open={ open }
      >
        <ul className='menus'>
          { MENUS.map(n => (
            <li className='menu' key={n.to}>
              <Link
                to={n.to}
                getProps={isMenuActive}
                onClick={onClose}
              >{n.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
