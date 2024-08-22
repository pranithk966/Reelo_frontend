import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Provider } from 'react-redux'
import store from './store'
import Playlist from './components/pages/Myplaylists'
import NavBar from './components/NavBar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
