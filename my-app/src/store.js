import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './features/dataSlice'
import playlistReducer from './features/playlistSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
    playlist: playlistReducer, // Fixed to use the correct slice
  },
})

export default store
