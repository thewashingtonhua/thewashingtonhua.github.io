import React, { FC } from 'react'
import './Footer.scss'
import dayjs from 'dayjs'
import IconHeart from '../images/ui/icons/heart.svg'
import IconWechat from '../images/ui/icons/wechat.svg'
import IconWechatDyh from '../images/ui/icons/wechat-dyh.svg'
import IconGithub from '../images/ui/icons/github.svg'
import IconZhihu from '../images/ui/icons/zhihu.svg'
import IconJuejin from '../images/ui/icons/juejin.svg'

const year = dayjs().format('YYYY')

export const Footer: FC = () => {
  return (
    <footer id='mf-footer'>
      <div className='copyright'>
        <p>
          <span>Developed with</span>
          <IconHeart />
          <span>by Washington Hua</span>
        </p>

        <p>Copyright &copy; {year} All Rights Reserved</p>
      </div>

      <div className='sns'>
        <ul className='links'>
          <li className='link wechat' title='个人微信号'>
            <IconWechat />
          </li>
          <li className='link wechat-dyh' title='微信订阅号'>
            <IconWechatDyh />
          </li>
          <li className='link github' title='Github'>
            <IconGithub />
          </li>
          <li className='link zhihu' title='知乎专栏'>
            <IconZhihu />
          </li>
          <li className='link juejin' title='掘金专栏'>
            <IconJuejin />
          </li>
        </ul>
      </div>
    </footer>
  )
}
