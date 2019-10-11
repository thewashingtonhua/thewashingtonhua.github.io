import React from 'react'
import { graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './friend.scss'
import lucode from '../images/friend/lucode.jpg'
import infiniteScript from '../images/friend/infinite-script.jpg'
import everain from '../images/friend/everain.jpg'
import silvermac from '../images/friend/silvermac.jpg'
import zhiyao from '../images/friend/zhiyao.jpg'
import { GatsbyDataProps } from '../utils/interface'

const friends = [
  {
    url: 'http://www.lucode.net',
    cover: lucode,
    name: 'LuCode',
    desc: [
      'CodeSun · 阿里'
    ]
  },
  {
    url: 'https://infinitescript.com/',
    cover: infiniteScript,
    name: 'InfiniteScript',
    desc: [
      'Dr.Xie · 商汤'
    ]
  },
  {
    url: 'https://everain.me/',
    cover: everain,
    name: 'Everain',
    desc: [
      '暮雨 · 网易'
    ]
  },
  {
    url: 'https://silvermac.io/',
    cover: silvermac,
    name: 'Silvermac',
    desc: [
      'Sam · Autodesk'
    ]
  },
  {
    url: 'https://lizhiyao.github.io/',
    cover: zhiyao,
    name: '丁香园记',
    desc: [
      '志遥 · 丁香园'
    ]
  }
]

export default (props: GatsbyDataProps) => {
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
export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
