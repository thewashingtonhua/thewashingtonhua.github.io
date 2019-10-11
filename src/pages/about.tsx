import React from 'react'
import { graphql } from 'gatsby'
import { Layout, SEO } from '../components'
import './about.scss'
import brain from '../images/about/brain.png'
import qr from '../images/QR/qr-dark.png'
import { GatsbyDataProps } from '../utils/interface'

const About = (props: GatsbyDataProps) => {
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
          <img src={brain} alt='Code in my left brain. Color in my right brain.' />
          <p>Washington Hua，前端工程师</p>
          <p>目前在马老师门下修福报，花名「童话」</p>
          <p>征途是成为「懂设计会开发的全栈产品经理」</p>

          <h1>联系方式</h1>
          <img src={qr} alt='' />

          <h1>为什么写博客</h1>
          <ul>
            <li>把「以为懂了」的东西讲给别人听，以此验证是否真的懂了。</li>
            <li>锻炼自己的表达能力，让自己懂和让别人懂是两个境界。</li>
            <li>Review 自己的代码，看有哪些是可以优化的，哪些甚至是解释不通的。</li>
            <li>用大白话分享技术知识，为社区贡献一点有价值的内容。</li>
            <li>装逼这事儿没什么说不出口的。</li>
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
