import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './recruit.scss'
import { GatsbyDataProps } from '../utils/interface'


const About = (props: GatsbyDataProps) => {
  const { data } = props

  return (
    <Layout>
      <SEO
        title='招人'
        keywords={data.site.siteMetadata.keywords}
      />
      <div className='mf-content' id='recruit'>
        <article>

          <h1>招人</h1>

          <h2>阿里巴巴集团 · 研发效能部，招前端工程师</h2>
          <p>社招内推，P6~P7，上海浦东张江</p>
          <p>React、TypeScript、RxJS，具备工程师的基本修养</p>
          <p>简历发到：<a href='mailto:xintong.hxt@alibaba-inc.com'>xintong.hxt@alibaba-inc.com</a></p>

          <h2>顺便</h2>
          <p>Node.js、算法、视觉、产品、数据分析，也在招，也可以推。</p>
          <p>（只不过我主要负责前端，所以……）</p>

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
