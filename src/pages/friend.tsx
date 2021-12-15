import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './friend.scss'
import lucode from '../images/friend/lucode.jpg'
import infiniteScript from '../images/friend/infinite-script.jpg'
import silvermac from '../images/friend/silvermac.jpg'
import zhiyao from '../images/friend/zhiyao.jpg'
import vic from '../images/friend/vic.jpg'
import wenhaoqi from '../images/friend/wenhaoqi.jpg'
import excitedCosmos from '../images/friend/excited-cosmos.jpg'
import chara from '../images/friend/chara-fm.jpg'
import { GatsbyDataProps } from '../utils/interface'

const DEVELOPERS = [
  {
    url: 'https://silvermac.io/',
    cover: silvermac,
    name: 'Sam',
    desc: [
      'Autodesk'
    ]
  },
  {
    url: 'https://lizhiyao.github.io/',
    cover: zhiyao,
    name: '志遥',
    desc: [
      'Alibaba'
    ]
  },
  {
    url: 'https://infinitescript.com/',
    cover: infiniteScript,
    name: 'Dr.Xie',
    desc: [
      'Tencent'
    ]
  },
  {
    url: 'http://www.lucode.net',
    cover: lucode,
    name: 'CodeSun',
    desc: [
      'Alibaba'
    ]
  }
]

const DESIGNERS = [
  {
    url: 'https://chara.fm/',
    cover: chara,
    name: 'Chara',
    desc: [
      'Alibaba'
    ]
  },
  {
    url: 'https://excitedcosmos.com/',
    cover: excitedCosmos,
    name: 'XinYu Li',
    desc: [
      'Alibaba'
    ]
  },
  {
    url: 'https://wenhaoqi.com/',
    cover: wenhaoqi,
    name: 'Curiosity Wen',
    desc: [
      'Alibaba'
    ]
  },
  {
    url: 'http://vicjiangyu.com/',
    cover: vic,
    name: 'Vic',
    desc: [
      'Dlab'
    ]
  }
]

const FriendPage: FC<GatsbyDataProps> = (props) => {
  const { data } = props

  return (
    <Layout>
      <SEO
        title='友人'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content' id='friends'>
        <h1 className='title'>Friends</h1>

        <h2 className='subtitle'>Developers</h2>

        <div className='friends'>
          { DEVELOPERS.map(friend => (
            <a
              key={friend.name}
              className='friend'
              id={`friend__${friend.name.toLowerCase()}`}
              target='_blank'
              href={friend.url}
              rel='noopener noreferrer'
            >
              <div className='cover fix-ratio ratio-16-9'>
                <img src={friend.cover} alt='' />
              </div>
              <div className='intro'>
                <h2>{friend.name}</h2>
                <ul>
                  { friend.desc.map(desc => <li key={desc}>{desc}</li>) }
                </ul>
              </div>
            </a>
          ))}
        </div>

        <h2 className='subtitle'>Designers</h2>

        <div className='friends'>
          { DESIGNERS.map(friend => (
            <a
              key={friend.name}
              className='friend'
              id={`friend__${friend.name.toLowerCase()}`}
              target='_blank'
              href={friend.url}
              rel='noopener noreferrer'
            >
              <div className='cover fix-ratio ratio-16-9'>
                <img src={friend.cover} alt='' />
              </div>
              <div className='intro'>
                <h2>{friend.name}</h2>
                <ul>
                  { friend.desc.map(desc => <li key={desc}>{desc}</li>) }
                </ul>
              </div>
            </a>
          ))}
        </div>

      </div>
    </Layout>
  )
}

export default FriendPage

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
