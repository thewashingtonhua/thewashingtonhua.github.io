import React, { FC } from 'react'
import 'normalize-scss/sass/normalize/_import-now.scss'
import './Layout.scss'
import { SEO } from './SEO'
import { Layout } from './Layout'

interface ToolboxLayoutProps {
  id?: string
  title?: string
}

export const ToolboxLayout: FC<ToolboxLayoutProps> = (props) => {
  const { id, title, children } = props

  const _title = `${title} | 工具`

  return (
    <Layout>
      <SEO title={_title} />
      <div className='mf-content lab-item' id={id}>
        <article>
          <a href='/toolbox' className='back'>&laquo; Back</a>
          { children }
        </article>
      </div>
    </Layout>
  )
}
