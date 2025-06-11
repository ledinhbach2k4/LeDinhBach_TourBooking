import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Tour {
  id: number
  title: string
  description: string
  callToAction: string
  imageSrc: string
}

interface ToursState {
  tours: Tour[]
  loading: boolean
  error: string | null
}

const initialState: ToursState = {
  tours: [],
  loading: false,
  error: null,
}

export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  const response = await axios.get('/api/tourswiper')
  return response.data as Tour[]
})

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false
        state.tours = action.payload
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tours'
      })
  },
})

export default toursSlice.reducer