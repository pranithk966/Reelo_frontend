import React, { useEffect } from 'react'
import axios from 'axios'
import Mysongs from './Mysongs'

export default function Home() {
  const token = localStorage.getItem('token')

  const data = {
    name: 'Salaar BGM',
    language: 'Music',
    songPath: 'Songs/Salaar.mp3',
    artist: 'Renu Patel',
    poster: 'posters/salaar.jpg',
    token: localStorage.getItem('token'),
  }

  // useEffect(() => {
  //   axios
  //     .post('https://reelo-2.onrender.com/api/songs', dat)
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err))
  // }, [])
  return (
    <>
      <Mysongs />
    </>
  )
}
