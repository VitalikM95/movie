import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'

const Header = ({ favouriteItems }) => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header_left'>
          <img src='./logo.svg' alt='logo' width={50} height={50} />
        </div>
        <Link to='/'>
          <div className='header_center'>The movie database</div>
        </Link>
        <div className='header_right'>
          <Link to='/favourite'>
            <img src='./favorite.svg' alt='favorite' width={30} height={30} />
            {favouriteItems.length > 0 ? (
              <span>{favouriteItems.length}</span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
