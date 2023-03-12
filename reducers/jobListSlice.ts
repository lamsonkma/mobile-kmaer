import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IApplyJob, IFavoriteJob } from '../constants/interface'

interface IJobListScreen {
  loading: 'idle' | 'loading' | 'success' | 'error'
  favoriteJobList?: IFavoriteJob[]
  applyJobList?: IApplyJob[]
  applyJob?: IApplyJob
  favoriteJob?: IFavoriteJob
  message?: string
}
const initialState: IJobListScreen = {
  loading: 'idle',
}
export const createFavoriteJobAction = createAsyncThunk('favorite', async (id: number) => {
  const { data } = await apiInstance.post('favorite-job', { jobId: id })
  return data
})
export const getAllFavoriteAction = createAsyncThunk('favorite-job/me', async () => {
  const { data } = await apiInstance.get('favorite-job/me')
  return data
})
export const createApplyJobAction = createAsyncThunk('apply', async (id: number) => {
  const { data } = await apiInstance.post('apply', { jobID: id })
  return data
})
export const getAllApplyAction = createAsyncThunk('apply/me', async () => {
  const { data } = await apiInstance.get('apply/me')
  return data
})

export const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createApplyJobAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(createApplyJobAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.applyJob = payload.payload
      })
      .addCase(createApplyJobAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      }),
      builder
        .addCase(createFavoriteJobAction.pending, (state) => {
          state.loading = 'loading'
        })
        .addCase(createFavoriteJobAction.fulfilled, (state, payload) => {
          state.loading = 'success'
          state.favoriteJob = payload.payload
        })
        .addCase(createFavoriteJobAction.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
        }),
      builder
        .addCase(getAllApplyAction.pending, (state) => {
          state.loading = 'loading'
        })
        .addCase(getAllApplyAction.fulfilled, (state, payload) => {
          state.loading = 'success'
          state.applyJobList = payload.payload
        })
        .addCase(getAllApplyAction.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
        }),
      builder
        .addCase(getAllFavoriteAction.pending, (state) => {
          state.loading = 'loading'
        })
        .addCase(getAllFavoriteAction.fulfilled, (state, payload) => {
          state.loading = 'success'
          state.favoriteJobList = payload.payload
        })
        .addCase(getAllFavoriteAction.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
        })
  },
})
export default jobListSlice.reducer

export const selectApplyJob = (state: RootState) => state.jobList.applyJob
export const selectFavoriteJob = (state: RootState) => state.jobList.favoriteJob
export const selectApplyJobList = (state: RootState) => state.jobList.applyJobList
export const selectFavoriteJobList = (state: RootState) => state.jobList.favoriteJobList
export const selectLoading = (state: RootState) => state.jobList.loading
export const selectMessage = (state: RootState) => state.jobList.message
