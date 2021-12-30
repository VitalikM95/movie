import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiConfig from './../api/apiConfig'
import AppContext from '../context'
import { Swiper, SwiperSlide } from 'swiper/react'

import '.././scss/detail.scss'
import 'swiper/css'
import 'swiper/css/navigation'

import SwiperCore, { Navigation } from 'swiper'
SwiperCore.use([Navigation])

const Detail = ({ info, onFavourite }) => {
  const { isItemFavorited, onClickMovie } = useContext(AppContext)
  const [recomendItems, setRecomendItems] = useState([])
  const urlRecomend = `${apiConfig.baseUrl}movie/${info.id}/recommendations?${apiConfig.apiKey}&language=uk-UA&page=1`
  const detailPosterUrl = `${apiConfig.w500Image}${info.poster_path}`
  const bgUrl = `${apiConfig.originalImage}${info.backdrop_path}`

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(urlRecomend)
        setRecomendItems(data.results)
      } catch (error) {
        alert('помилка рекомендації')
      }
    }
    fetchData()
  }, [info])

  return (
    <div className='movie'>
      <div
        className='movie_backgr'
        style={{ backgroundImage: `url('${bgUrl}')` }}>
        <div className='movie_overlay'>
          <div className='container'>
            <div className='movie_img'>
              {info.poster_path && (
                <img
                  src={detailPosterUrl}
                  alt='movie_poster'
                  width={300}
                  height={400}
                />
              )}
            </div>
            <div className='movie_info'>
              <h2 className='movie_title'>{info.title}</h2>
              <div className='wrap_div'>
                {info.release_date ? (
                  <div className='movie_date'>
                    <img
                      src='./calendar.svg'
                      alt='calendar'
                      width={20}
                      height={20}
                    />
                    {info.release_date}
                  </div>
                ) : (
                  <div></div>
                )}

                <div className='movie_info__genre'>
                  {info.genres ? (
                    info.genres.map(item => (
                      <div key={item.name} className='movie_genre__item'>
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              {info.overview ? (
                <div className='movie_text'>
                  <span className='movie_text__header'>Опис</span>
                  <br />
                  {info.overview}
                </div>
              ) : (
                <div></div>
              )}

              <span className='movie_info__button'>
                <button
                  className={
                    isItemFavorited(info.id) ? 'button_added' : 'button'
                  }
                  onClick={() => onFavourite(info)}>
                  {isItemFavorited(info.id)
                    ? ' видалити з обраних'
                    : ' додати в обрані'}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='recomend'>
        <h1>Рекомендації</h1>
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          className='mySwiper'>
          {recomendItems.map(item => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => onClickMovie(item.id)}
                className='recomend_item'>
                <img
                  src={`${apiConfig.w500Image}${item.poster_path}`}
                  alt='image'
                  width={100}
                  height={150}
                />
                <div className='recomend_item__title'>{item.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link to='/detail'>
        <button>click</button>
      </Link>
    </div>
  )
}

export default Detail
