import React from 'react'

import Mysongs from './Mysongs'

export default function Home() {
  const token = localStorage.getItem('token')

  return (
    <>
      <Mysongs />
    </>
  )
}
