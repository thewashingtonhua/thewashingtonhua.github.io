import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './about.scss'
import brain from '../images/about/brain.png'
import qr from '../images/QR/qr-dark.png'
import { GatsbyDataProps } from '../utils/interface'

const About: FC<GatsbyDataProps> = (props) => {
  const { data } = props

  return (
    <Layout>
      <SEO
        title='关于'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content' id='about'>
        <article>

          <h1>我</h1>

          <img className='cover' src={brain} alt='Code in my left brain. Color in my right brain.' />
          <p>Washington Hua，花名「童话」</p>
          <p>前端工程师 / 交互设计师 / 独立摄影师 / 咖啡爱好者</p>
          <p>目前在国内某互联网动物园养动物</p>
          <p>长期拖更原创博客主</p>
          <p>征途是成为「懂设计会开发的产品经理」</p>

          <h2>为什么写博客</h2>

          <ul>
            <li>把「以为懂了」的东西讲出来，看是不是真的懂了。</li>
            <li>让自己懂和让别人懂是两个境界。</li>
            <li>找个机会 Review 自己的代码。</li>
            <li>用大白话分享技术内容，为社区贡献一点有价值的内容。</li>
            <li>装逼这事儿没什么说不出口的。</li>
          </ul>

          <h2>联系方式</h2>

          {/* <img src={qr} alt='' /> */}
          <ul>
            <li>Github: <a target='_blank' rel='noopener noreferrer' href='https://github.com/tonghuashuo'>@tonghuashuo</a></li>
            <li>掘金: <a target='_blank' rel='noopener noreferrer' href='https://juejin.im/user/57b5967479bc44005e11f313/posts'>@Washington Hua</a></li>
            <li>知乎专栏: <a target='_blank' rel='noopener noreferrer' href='https://zhuanlan.zhihu.com/tonghuashuo'>@童话说</a></li>
            <li>微信公众号: 童话说</li>
            <li>微信号: thewashingtonhua</li>
          </ul>

        </article>

      </div>
    </Layout>
  )
}

export default About

export const query = graphql`
query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
