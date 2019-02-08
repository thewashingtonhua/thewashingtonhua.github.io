import React, { PureComponent } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
import './html5-input.scss'

export default class HTML5Input extends PureComponent {
  render () {
    return (
      <Layout>
        <SEO
          title='Input Type | 实验室'
          keywords={this.props.data.site.siteMetadata.keywords}
        />
        <div className='mf-content lab-item' id='lab-html5-input'>
          <article>
            <Link to='/lab' className='back'>&laquo; Back</Link>

            <h1>Input</h1>

            <label htmlFor='text'>text</label>
            <input type='text'     name='text'     id='text'      placeholder='text' />>

            <label htmlFor='password'>password</label>
            <input type='password' name='password' id='password'  placeholder='password' />

            <label htmlFor='tel'>tel</label>
            <input type='tel'      name='tel'      id='tel'       placeholder='tel' />

            <label htmlFor='email'>email</label>
            <input type='email'    name='email'    id='email'     placeholder='email' />

            <label htmlFor='file'>file</label>
            <input type='file'     name='file'     id='file'      placeholder='file' />

            <label htmlFor='date'>date</label>
            <input type='date'     name='date'     id='date'      placeholder='date' />

            <label htmlFor='datetime'>datetime</label>
            <input type='datetime' name='datetime' id='datetime'  placeholder='datetime' />

            <label htmlFor='number'>number</label>
            <input type='number'   name='number'   id='number'    placeholder='number' />

            <label htmlFor='url'>url</label>
            <input type='url'      name='url'      id='url'       placeholder='url' />

            <label htmlFor='search'>search</label>
            <input type='search'   name='search'   id='search'    placeholder='search' />

            <label htmlFor='range'>range</label>
            <input type='range'    name='range'    id='range'     placeholder='range' />

            <label htmlFor='color'>color</label>
            <input type='color'    name='color'    id='color'     placeholder='color' />

          </article>
        </div>
      </Layout>
    )
  }
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