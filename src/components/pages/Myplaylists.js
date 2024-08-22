import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylist } from '../../features/playlistSlice'

export default function Myplaylists() {
  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.playlist.playlist)
  const playlistStatus = useSelector((state) => state.playlist.playlistStatus)
  const playlistError = useSelector((state) => state.playlist.playlistError)

  function rem(id) {
    const data = {
      playlistId: localStorage.getItem('playlistId'),
      songId: id,
      token: localStorage.getItem('token'),
    }

    axios
      .post('https://reelo-2.onrender.com/api/playlists/remove-song', data)
      .then(() => {
        dispatch(fetchPlaylist())
        alert('Deleted song from playlist')
      })
      .catch((err) => console.log(err))
  }

  function createPlaylist() {
    const data = {
      name: prompt('Enter playlist name'),
      token: localStorage.getItem('token'),
    }
    axios
      .post('https://reelo-2.onrender.com/api/playlists', data)
      .then((response) => {
        const newPlaylistId = response.data._id
        localStorage.setItem('playlistId', newPlaylistId) // Store the playlist ID
        dispatch(fetchPlaylist())
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    dispatch(fetchPlaylist())
  }, [dispatch])

  let content

  if (playlistStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (playlistStatus === 'success') {
    if (playlist.length === 0) {
      content = (
        <div className="flex flex-col items-center mt-10">
          <p className="text-gray-700 text-lg">No playlists found.</p>
          <button
            onClick={createPlaylist}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Playlist
          </button>
        </div>
      )
    } else {
      const firstPlaylist = playlist[0]
      const songs = firstPlaylist.songs

      if (!songs || songs.length === 0) {
        content = (
          <div className="text-center mt-10">
            <h1 className="text-xl font-bold">{firstPlaylist.name}</h1>
            <p className="text-gray-700">No songs in your playlist.</p>
          </div>
        )
      } else {
        content = (
          <div className="p-4">
            <h1 className=" font-bold mb-4 text-center text-[50px] my-[30px]">
              {firstPlaylist.name}'s playlist
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                  <img
                    src={song.poster}
                    alt={song.name}
                    className="w-24 h-24 object-cover rounded-full mb-2"
                  />
                  <h2 className="font-semibold text-lg text-center">
                    {song.name}
                  </h2>
                  <p className="text-gray-600 text-sm text-center">
                    {song.artist}
                  </p>
                  <button
                    onClick={() => rem(song._id)}
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      }
    }
  } else if (playlistStatus === 'failed') {
    content = <p className="text-red-600">Error: {playlistError}</p>
  }

  return <div>{content}</div>
}
