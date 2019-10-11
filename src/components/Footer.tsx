import React, { FC } from 'react'
import './Footer.scss'
import './Footer.scss'
import heart from '../images/heart.svg'
import dayjs from 'dayjs'

const year = dayjs().format('YYYY')

export const Footer: FC = () => {
  return (
    <footer id='mf-footer'>
      <div className='mf-footer-wrapper'>
        <p>
          <span>Designed, Developed & Wrote with</span>
          <img src={heart} alt='' />
          <span>by Washington Hua</span>
        </p>

        <p>Copyright &copy; {year} All Rights Reserved</p>
      </div>
    </footer>
  )
}
