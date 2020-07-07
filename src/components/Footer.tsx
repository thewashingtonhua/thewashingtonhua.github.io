import React, { FC } from 'react'
import './Footer.scss'
import dayjs from 'dayjs'
import IconHeart from '../images/ui/icons/heart.svg'
import IconWechat from '../images/ui/icons/wechat.svg'
import IconWechatDyh from '../images/ui/icons/wechat-dyh.svg'
import IconGithub from '../images/ui/icons/github.svg'
import IconZhihu from '../images/ui/icons/zhihu.svg'
import IconJuejin from '../images/ui/icons/juejin.svg'
import { IS_DEV } from 'config'

const year = dayjs().format('YYYY')
const author = `<Washington Hua />`

export const Footer: FC = () => {
  return (
    <footer id='mf-footer'>
      <div className='copyright'>
        <p>
          <span>Developed with</span>
          <IconHeart />
          <span>by {author}</span>
        </p>

        <p>&copy; 2014 - {year} All Rights Reserved</p>
      </div>

      {/* <div className='sns'>
        <ul className='links'>
          { IS_DEV &&
            <li className='link wechat' title='个人微信号'>
              <IconWechat />
            </li>
          }
          { IS_DEV &&
            <li className='link wechat-dyh' title='微信订阅号'>
              <IconWechatDyh />
            </li>
          }
          <li className='link github' title='Github'>
            <a href='https://github.com/tonghuashuo' target='_blank' rel='noopener noreferrer'>
              <IconGithub />
            </a>
          </li>
          <li className='link zhihu' title='知乎专栏'>
            <a href='https://zhuanlan.zhihu.com/tonghuashuo' target='_blank' rel='noopener noreferrer'>
              <IconZhihu />
            </a>
          </li>
          <li className='link juejin' title='掘金专栏'>
            <a href='https://juejin.im/user/57b5967479bc44005e11f313/posts' target='_blank' rel='noopener noreferrer'>
              <IconJuejin />
            </a>
          </li>
        </ul>
      </div> */}
    </footer>
  )
}
