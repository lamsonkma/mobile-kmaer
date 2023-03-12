import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { ICareer } from '../constants/interface'

export const GetAllCareerAction = createAsyncThunk('career/getAll', async () => {
  const { data } = await apiInstance.get('/career')
  return data
})

interface ICareerState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  careers: ICareer[]
}

const InitialState: ICareerState = {
  loading: 'idle',
  careers: [],
}

const careerSlice = createSlice({
  name: 'career',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCareerAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllCareerAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.careers = action.payload
      })
      .addCase(GetAllCareerAction.rejected, (state, action) => {
        state.loading = 'error'
      })
  },
})

export default careerSlice.reducer

export const selectCareers = (state: RootState) => state.career.careers
