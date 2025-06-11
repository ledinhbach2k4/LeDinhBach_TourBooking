import { configureStore } from '@reduxjs/toolkit'
import toursReducer from './slices/toursSlice'

export const store = configureStore({
  reducer: {
    tours: toursReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch