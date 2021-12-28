import React from 'react'
import Card from './../components/card/Card'

import '.././scss/favourites.scss'

const Favourites = ({ favouriteItems, addToFavourite }) => {
  return (
    <div className='container'>
      <div className='content'>
        <div className='content_header'>
          <h1>
            {favouriteItems.length > 0 ? 'Обранні' : 'Немає обраних фільмів'}
          </h1>
        </div>
        {favouriteItems.length > 0 ? (
          <div className='content_items'>
            {favouriteItems.map(item => (
              <Card
                key={item.id}
                {...item}
                onFavourite={obj => addToFavourite(obj)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Favourites
