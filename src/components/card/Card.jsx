import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context'
import apiConfig from './../../api/apiConfig'

import './card.scss'

const Card = ({ id, title, release_date, poster_path, onFavourite }) => {
  const { onClickMovie, isItemFavorited } = useContext(AppContext)
  const obj = { id, title, release_date, poster_path }
  const onClickFavourite = () => {
    onFavourite(obj)
  }
  const imgUrl = `${apiConfig.w500Image}${poster_path}`
  return (
    <div className='card'>
      <Link to='/detail'>
        <div className='img_wrapper' onClick={() => onClickMovie(id)}>
          <img
            src={poster_path ? imgUrl : './noImage.png'}
            alt='movie_img'
            width={100}
            height={150}
          />
        </div>
      </Link>

      <div className='card_info'>
        <div className='card_title'>{title}</div>
        <div className='cadrd_footer'>
          {release_date ? (
            <div className='card_footer__data'>{release_date}</div>
          ) : (
            <div></div>
          )}
          <div className='card_footer__button'>
            <button
              className={isItemFavorited(id) ? 'button_added' : 'button'}
              onClick={onClickFavourite}>
              {isItemFavorited(id) ? ' видалити з обраних' : ' додати в обрані'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
