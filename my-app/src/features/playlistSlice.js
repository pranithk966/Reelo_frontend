import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist', // Fixed the slice name to 'playlist'
  async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `https://reelo-2.onrender.com/api/playlists?token=${token}`
    )
    return response.data
  }
)

const playlistSlice = createSlice({
  name: 'playlist', // Fixed slice name
  initialState: {
    playlist: [],
    playlistStatus: 'idle',
    playlistError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.playlistStatus = 'loading'
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.playlistStatus = 'success'
        state.playlist = action.payload // Fixed state property
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.playlistStatus = 'failed'
        state.playlistError = action.error.message
      })
  },
})

export default playlistSlice.reducer
