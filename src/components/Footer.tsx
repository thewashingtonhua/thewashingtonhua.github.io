import React, { FC } from 'react'
import './Footer.scss'
import './Footer.scss'
import heart from '../images/heart.svg'
import dayjs from 'dayjs'

const year = dayjs().format('YYYY')
const author = `<Washington Hua />`

export const Footer: FC = () => {
  return (
    <footer id='mf-footer'>
      <div className='mf-footer-wrapper'>
        <p>
          <span>Developed with</span>
          <img src={heart} alt='' />
          <span>by {author}</span>
        </p>

        <p>Copyright &copy; 2014 - {year} All Rights Reserved</p>
      </div>
    </footer>
  )
}
