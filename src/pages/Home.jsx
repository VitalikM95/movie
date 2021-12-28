import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import apiConfig from './../api/apiConfig'
import Card from './../components/card/Card'

import '.././scss/home.scss'

const Home = ({ addToFavourite }) => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [seachItems, setSeachItems] = useState([])
  const lastElem = useRef()
  const observer = useRef()
  const urlPopular = `${apiConfig.baseUrl}movie/popular?${apiConfig.apiKey}&language=uk-UA&page=${page}&region=UA`
  const urlSearch = `${apiConfig.baseUrl}search/movie?${apiConfig.apiKey}&language=ua-UA&query=${searchValue}&include_adult=false`

  useEffect(() => {
    async function fetchData() {
      if (page > 0) {
        try {
          const { data } = await axios.get(urlPopular)
          setItems([...items, ...data.results])
        } catch (error) {
          alert('Помилка отримання даних(популярні)')
        }
      }
    }
    fetchData()
  }, [page])

  useEffect(() => {
    async function fetchData() {
      if (searchValue) {
        try {
          const { data } = await axios.get(urlSearch)
          setSeachItems(data.results)
        } catch (error) {}
      }
    }
    fetchData()
  }, [searchValue])

  useEffect(() => {
    let callback = function (entries) {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1)
      }
    }
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(lastElem.current)
  }, [])

  const onChangeInput = e => setSearchValue(e.target.value)

  const cleanSearch = () => {
    setSearchValue('')
  }

  return (
    <div className='container'>
      <div className='content_header'>
        <h1>
          {searchValue
            ? `Пошук за запитом: ${searchValue}`
            : 'Популярні фільми'}
        </h1>
        <div className='search_block'>
          <img src='./search.svg' alt='search' width={14} height={14} />
          <input
            onChange={onChangeInput}
            value={searchValue}
            placeholder='Пошук...'
          />
          {searchValue && (
            <button onClick={cleanSearch} className='button-close'>
              <span></span>
            </button>
          )}
        </div>
      </div>
      <div className='movie_list'>
        {(searchValue ? seachItems : items).map((obj, index) => (
          <Card key={index} {...obj} onFavourite={obj => addToFavourite(obj)} />
        ))}
      </div>
      {searchValue ? null : <div ref={lastElem} style={{ height: 20 }}></div>}
    </div>
  )
}

export default Home
