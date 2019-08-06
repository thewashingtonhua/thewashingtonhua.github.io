import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './about.scss'
import brain from '../images/about/brain.png'
import qr from '../images/QR/qr.png'
import { GatsbyDataProps } from '../utils/interface'
// import { useInterval } from '../hooks'

const START_DATE = new Date('2016-03-01 10:00:00')
const DAYS_PER_MONTH = 365 / 12

const About = (props: GatsbyDataProps) => {
  const { data } = props

  const [experience, setExperience] = useState(0)

  const updateExperience = () => {
    const now = new Date()
    const secondsPassed = (now.getTime() - START_DATE.getTime()) / 1000
    const daysPassed = secondsPassed / 60 / 60 / 24

    // const year = Math.floor(daysPassed / 365)
    // const month = Math.floor(daysPassed / DAYS_PER_MONTH % 12)
    // const day = Math.floor(daysPassed % DAYS_PER_MONTH)
    // const hour = Math.floor(secondsPassed / 60 / 60 % 24)
    // const minute = Math.floor(secondsPassed / 60 % 60)
    // const second = Math.floor(secondsPassed % 60)

    // setExperience(`${year} 年 ${month} 个月 ${day} 天 ${hour} 小时 ${minute} 分钟 ${second} 秒`)
    // setExperience(`${year} 年 ${month} 个月 ${day} 天`)
    setExperience(Math.floor(daysPassed))
  }

  useEffect(() => {
    updateExperience()
  }, [])

  // useInterval(updateExperience, 1000)

  return (
    <Layout>
      <SEO
        title='我'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content' id='about'>
        <article>

          <h1>我</h1>
          <img src={brain} alt='Code in my left brain. Color in my right brain.' />
          <p>Washington Hua，花名「童话」</p>
          <p>一个出道 {experience} 天的工程师</p>
          <p>目前在马老师门下修福报</p>
          <p>征途是成为「懂设计的全栈工程师」</p>

          <h1>联系方式</h1>
          <img src={qr} alt='' />

          <h1>为什么写博客</h1>
          <ul>
            <li>把“以为懂了”的东西讲给别人听，以此验证是否真的懂了，顺带加深记忆。</li>
            <li>Review 自己的代码，看有哪些是可以优化的，哪些甚至是解释不通的。</li>
            <li>锻炼自己的表达能力，让自己懂和让别人懂是两个境界。</li>
            <li>如果可能的话，为社区贡献一点有价值的内容。</li>
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
