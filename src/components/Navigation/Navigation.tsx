import React, { FC } from 'react'
import { Link } from 'gatsby'
import './Navigation.scss'
import { MENUS, isMenuActive } from './utils'

export const Navigation: FC = () => {
  return (
    <div className='navigation'>
      <nav className='nav-menu'>
        <ul className='menus'>
          { MENUS.map(n => (
          <li className='menu' key={n.to}>
              <Link
                to={n.to}
                getProps={isMenuActive}
              >{n.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
