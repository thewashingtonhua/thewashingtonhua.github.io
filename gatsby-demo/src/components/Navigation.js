import React, { memo } from 'react'
import { Link } from 'gatsby'

export default memo(props => (
  <div className='nagigation'>
    <Link to='/'>Home</Link>
    &nbsp;&nbsp;
    <Link to='/blogs'>Blogs</Link>
  </div>
))
