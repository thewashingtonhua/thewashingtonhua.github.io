import React, { FC } from 'react'
import { BlogCatelogViewProps } from './interface'
import { Link } from 'gatsby'
import dayjs from 'dayjs'
import './NormalView.scss'

interface Props extends BlogCatelogViewProps {}

export const BlogCatelogNormalView: FC<Props> = (props) => {
  const { blogs } = props

  return (
    <div className='blog-list'>
      { blogs.map(node => {
        const cover = node.frontmatter.cover?.publicURL
        console.log(node.fields.date)
        const date = node.fields.date ? dayjs(node.fields.date).format('MMM DD, YYYY') : 'Unknown'
        return (
          <Link
            className={'blog' + (node.frontmatter.draft ? ' draft' : '')}
            to={node.fields.slug}
            key={node.id}
            id={node.fields.id}
          >
            <div className='banner'>
              <img src={cover} alt='' />
            </div>
            <div className='info'>
              <p className='title'>{node.frontmatter.title}</p>
              <p className='desc'>{node.frontmatter.description}</p>
              <footer className='blog__footer'>
                <p className='date'>
                  <time dateTime='{blog.node.fields.date}'>{date}</time>
                </p>
              </footer>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
