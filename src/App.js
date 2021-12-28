import { Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/header/Header'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Favourites from './pages/Favourites'

import useLocalStorage from './components/hooks/useLocalStorage'
import apiConfig from './api/apiConfig'
import AppContext from './context'

import './App.scss'
import 'swiper/css/bundle'

function App() {
  const [favouriteItems, setFavouriteItems] = useLocalStorage('favoutites', [])
  const [info, setInfo] = useLocalStorage('movie_info', [])

  const onClickMovie = async id => {
    try {
      const { data } = await axios.get(
        `${apiConfig.baseUrl}movie/${id}?${apiConfig.apiKey}&language=uk-UA`
      )
      setInfo(data)
    } catch (error) {
      alert('Помилка отримання даних (деталі)')
    }
  }

  const onAddToFavourite = async obj => {
    try {
      const findFavItem = favouriteItems.find(
        favObj => Number(favObj.id) === Number(obj.id)
      )
      if (findFavItem) {
        setFavouriteItems(prev =>
          prev.filter(item => Number(item.id) !== Number(obj.id))
        )
      } else {
        setFavouriteItems(prev => [...prev, obj])
      }
    } catch (error) {
      alert('Помилка добавления в закладки!')
    }
  }
  const isItemFavorited = id => {
    return favouriteItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ onClickMovie, isItemFavorited }}>
      <div>
        <Header favouriteItems={favouriteItems} />
        <Route path='/' exact>
          <Home addToFavourite={onAddToFavourite} />
        </Route>
        <Route path='/detail' exact>
          <Detail info={info} onFavourite={obj => onAddToFavourite(obj)} />
        </Route>
        <Route path='/favourite' exact>
          <Favourites
            favouriteItems={favouriteItems}
            addToFavourite={onAddToFavourite}
          />
        </Route>
        <div></div>
      </div>
    </AppContext.Provider>
  )
}

export default App
