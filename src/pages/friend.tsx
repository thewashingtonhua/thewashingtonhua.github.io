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
import { GatsbyDataProps } from '../utils/interface'

const friends = [
  {
    url: 'https://wenhaoqi.com/',
    cover: wenhaoqi,
    name: 'Dr. Cat',
    desc: [
      '阿里 · Designer'
    ]
  },
  {
    url: 'http://vicjiangyu.com/',
    cover: vic,
    name: 'Vic',
    desc: [
      'Dlab · Designer'
    ]
  },
  {
    url: 'https://silvermac.io/',
    cover: silvermac,
    name: 'Sam',
    desc: [
      'Autodesk · Developer'
    ]
  },
  {
    url: 'https://lizhiyao.github.io/',
    cover: zhiyao,
    name: '志遥',
    desc: [
      '丁香园 · Developer'
    ]
  },
  {
    url: 'https://infinitescript.com/',
    cover: infiniteScript,
    name: 'Dr.Xie',
    desc: [
      '商汤 · Developer'
    ]
  },
  {
    url: 'http://www.lucode.net',
    cover: lucode,
    name: 'CodeSun',
    desc: [
      '阿里 · Developer'
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
        <h1 className='title'>未来，就在这里</h1>

        <div className='friends'>
          { friends.map(friend => (
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
