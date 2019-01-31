import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './friend.scss'
import lucode from '../images/friend/lucode.jpg'
import infiniteScript from '../images/friend/infinite-script.jpg'
import everain from '../images/friend/everain.jpg'
import silvermac from '../images/friend/silvermac.jpg'

export default ({ data }) => (
  <Layout>
    <SEO
      title='朋友'
      keywords={data.site.siteMetadata.keywords}
    />
    <div className='mf-content' id='friends'>
      <h1 className='title'>未来，就在这里</h1>

      <div className='friends'>
        <a className='friend' id='lucode' target='_blank' href='http://www.lucode.net'>
          <div className='cover fix-ratio ratio-16-9'>
            <img src={lucode} alt='' />
          </div>
          <div className='intro'>
            <h2>LuCode</h2>
            <ul>
              <li>CodeSun，中科大研究生</li>
              <li>主攻编译技术、形式化验证</li>
              <li>服务器资深玩家</li>
            </ul>
          </div>
        </a>

        <a className='friend' id='infinite-script' target='_blank' href='https://infinitescript.com/'>
          <div className='cover fix-ratio ratio-16-9'>
            <img src={infiniteScript} alt='' />
          </div>
          <div className='intro'>
            <h2>InfiniteScript</h2>
            <ul>
              <li>Dr.Xie，哈工大博士</li>
              <li>主攻计算机视觉、机器学习</li>
              <li>Github 老司机</li>
            </ul>
          </div>
        </a>

        <a className='friend' id='everain' target='_blank' href='https://everain.me/'>
          <div className='cover fix-ratio ratio-16-9'>
            <img src={everain} alt='' />
          </div>
          <div className='intro'>
            <h2>Everain</h2>
            <ul>
              <li>Everain，网易前端开发</li>
              <li>主攻 JavaScript 大前端生态</li>
              <li>猪厂大前端接班人</li>
            </ul>
          </div>
        </a>

        <a className='friend' id='silvermac' target='_blank' href='https://silvermac.io/'>
          <div className='cover fix-ratio ratio-16-9'>
            <img src={silvermac} alt='' />
          </div>
          <div className='intro'>
            <h2>Silvermac</h2>
            <ul>
              <li>Sam，Autodesk 研发大佬</li>
              <li>主攻各种我听不懂的黑科技</li>
              <li>各大厂抢着要的香饽饽</li>
            </ul>
          </div>
        </a>
      </div>

    </div>
  </Layout>
)

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`