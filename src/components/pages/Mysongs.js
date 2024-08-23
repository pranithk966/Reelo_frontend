import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../../features/dataSlice'
import Slide from '../Slide'

export default function Mysongs() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data.data)
  const status = useSelector((state) => state.data.status)
  const error = useSelector((state) => state.data.error)
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [progress, setProgress] = useState({}) // Object to store progress for each song
  const [duration, setDuration] = useState({}) // Object to store duration for each song
  const audioRefs = useRef([]) // Refs to hold audio elements
  const [addedSongs, setAddedSongs] = useState({}) // Object to track added songs

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(fetchData())

    axios
      .get(`https://reelo-2.onrender.com/api/playlists?token=${token}`)
      .then((response) => {
        localStorage.setItem('playlistId', response.data[0]._id)
      })
      .catch((err) => console.log(err))
  }, [dispatch, token])

  useEffect(() => {
    const lastPausedSongId = localStorage.getItem('lastPausedSongId')
    const lastPlaybackTime = parseFloat(
      localStorage.getItem('lastPlaybackTime')
    ) // Ensure it's a number

    if (lastPausedSongId && lastPlaybackTime) {
      const index = data.findIndex((item) => item._id === lastPausedSongId)
      if (index !== -1) {
        const audioElement = audioRefs.current[index]
        if (audioElement) {
          audioElement.currentTime = lastPlaybackTime
          setCurrentPlaying(index) // Set currentPlaying here for immediate visual feedback
        }
      }
    }

    // Pre-load song durations for immediate display on page load
    data.forEach((item, index) => {
      const audioElement = audioRefs.current[index]
      if (audioElement) {
        audioElement.addEventListener('loadedmetadata', () => {
          setDuration((prevDuration) => ({
            ...prevDuration,
            [index]: audioElement.duration,
          }))
        })
      }
    })
  }, [data])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const togglePlayPause = (index) => {
    const currentAudio = audioRefs.current[index]

    if (currentPlaying === index) {
      // If clicked audio is already playing, pause it
      if (!currentAudio.paused) {
        currentAudio.pause()
        localStorage.setItem('lastPausedSongId', data[index]._id)
        localStorage.setItem('lastPlaybackTime', currentAudio.currentTime)
        setCurrentPlaying(null) // Set currentPlaying to null for visual feedback
      } else {
        currentAudio
          .play()
          .catch((err) => console.error('Playback error:', err)) // Handle playback errors
      }
    } else {
      // Pause the currently playing audio (if any)
      if (currentPlaying !== null) {
        const playingAudio = audioRefs.current[currentPlaying]
        if (playingAudio) {
          playingAudio.pause()
          localStorage.setItem('lastPausedSongId', data[currentPlaying]._id)
          localStorage.setItem('lastPlaybackTime', playingAudio.currentTime)
        }
      }

      // Play the clicked audio
      if (currentAudio) {
        currentAudio.currentTime = 0 // Start playing from the beginning (fix for previous song's time)
        currentAudio
          .play()
          .catch((err) => console.error('Playback error:', err)) // Handle playback errors
        setCurrentPlaying(index)
      }
    }
  }

  const handleTimeUpdate = (index) => {
    const audioElement = audioRefs.current[index]
    if (audioElement) {
      setProgress((prevProgress) => ({
        ...prevProgress,
        [index]: (audioElement.currentTime / audioElement.duration) * 100,
      }))
    }
  }

  const handleSeek = (e, index) => {
    const audioElement = audioRefs.current[index]
    if (audioElement) {
      const seekTime =
        (e.nativeEvent.offsetX / e.currentTarget.clientWidth) *
        audioElement.duration
      audioElement.currentTime = seekTime
    }
  }

  const addToPlay = (songId) => {
    const playlistId = localStorage.getItem('playlistId')

    if (!playlistId) {
      alert('No playlist selected. Please create or select a playlist first.')
      return
    }

    const data = {
      playlistId: playlistId,
      songId: songId,
      token: localStorage.getItem('token'),
    }

    axios
      .post('https://reelo-2.onrender.com/api/playlists/add-song', data)
      .then((response) => {
        console.log('Response:', response.data)
        // Update the specific song's state to indicate it was added
        setAddedSongs((prev) => ({
          ...prev,
          [songId]: true,
        }))
      })
      .catch((err) => {
        console.error(
          'Error adding song to playlist:',
          err.response ? err.response.data : err.message
        )
      })
  }

  let content

  if (status === 'loading') {
    content = <p>Loading...</p>
  } else if (status === 'success') {
    content = (
      <div className="xl:flex relative">
        <div className="lg:w-[100%] xl:w-[70%]">
          <h1 className="text-center md:text-[40px] font-bold my-[5px]">
            BeatBoxx Trends
          </h1>
          <div className="grid md:grid-cols-2 gap-[10px]">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-300 px-[20px] py-[20px] rounded-lg">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-[20px]">
                    <img
                      src={item.poster}
                      className="w-[80px] rounded-full"
                      alt={item.name}
                    />
                    <div className="flex flex-col w-[200px]">
                      <h1 className="text-gray-800 truncate font-bold text-[20px] text-center">
                        {item.name}
                      </h1>
                      <h1 className="text-center text-gray-600 truncate overflow-hidden whitespace-nowrap text-sm">
                        {item.artist}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={item.songPath}
                      controls={false}
                      onTimeUpdate={() => handleTimeUpdate(index)}
                    />
                    <div className="flex space-x-[20px]">
                      <button
                        onClick={() => togglePlayPause(index)}
                        className="rounded-full block my-2">
                        {currentPlaying === index &&
                        !audioRefs.current[index]?.paused ? (
                          <i
                            className="fa fa-pause-circle"
                            aria-hidden="true"
                            style={{ fontSize: '40px', color: 'green' }}></i>
                        ) : (
                          <i
                            className="fa fa-play-circle"
                            aria-hidden="true"
                            style={{ fontSize: '40px', color: 'green' }}></i>
                        )}
                      </button>

                      <button onClick={() => addToPlay(item._id)}>
                        {addedSongs[item._id] ? (
                          <i
                            className="fa fa-check-circle"
                            aria-hidden="true"
                            style={{ fontSize: '40px', color: 'black' }}></i>
                        ) : (
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                            style={{
                              fontSize: '40px',
                              color: 'black',
                            }}></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="relative flex items-center my-[10px] space-x-[15px]">
                    {/* Progress Bar */}
                    <div
                      className="bg-gray-600 h-2 rounded flex-grow"
                      style={{ flexBasis: '80%', cursor: 'pointer' }}
                      onClick={(e) => handleSeek(e, index)}>
                      <div
                        className="bg-black h-full rounded"
                        style={{ width: `${progress[index] || 0}%` }}
                      />
                    </div>

                    {/* Timer */}
                    <div
                      className="text-black text-sm flex-grow"
                      style={{ flexBasis: '20%' }}>
                      {formatTime(audioRefs.current[index]?.currentTime || 0)} /{' '}
                      {formatTime(duration[index] || 0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Slide
          data={data}
          audioRefs={audioRefs}
          duration={duration}
          handleSeek={handleSeek}
          formatTime={formatTime}
          handleTimeUpdate={handleTimeUpdate}
          addToPlay={addToPlay}
          addedSongs={addedSongs}
          progress={progress}
          togglePlayPause={togglePlayPause}
          currentPlaying={currentPlaying}
        />
      </div>
    )
  } else if (status === 'failed') {
    content = <p>Error: {error}</p>
  }

  return <div>{content}</div>
}
