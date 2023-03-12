import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IJob, IPagination, ISearchJob } from '../constants/interface'
import { GetSelfActionWithoutEffect } from './userSlice'

// export const GetAllJobAction = createAsyncThunk('job/getAll', async (pagination: IPagination) => {
//   const { data } = await apiInstance.get('/jobs/suggest', {
//     params: {
//       page: pagination.page || 1,
//       size: pagination.size || 20,
//       sort: ['_score:desc'],
//     },
//   })
//   return data
// })

export const GetSuggestionJobAction = createAsyncThunk('job/suggestion', async (pagination: IPagination) => {
  const { data } = await apiInstance.get('/jobs/suggest', {
    params: {
      page: pagination.page || 1,
      size: pagination.size || 20,
      sort: ['_score:desc'],
    },
  })
  return data
})

export const GetJobByIdAction = createAsyncThunk('job/getById', async (id: number) => {
  const { data } = await apiInstance.get(`/jobs/${id}`)
  return data
})

export const ApplyJobAction = createAsyncThunk('job/applyJob', async (id: number, thunk) => {
  const { data } = await apiInstance.post(`/apply`, { jobID: id })
  thunk.dispatch(GetSelfActionWithoutEffect())
  return data
})

export const ChangeFavoriteAction = createAsyncThunk('user/changeFavorite', async (id: number, thunk) => {
  const { data } = await apiInstance.post(`favorite-job`, {
    jobId: id,
  })
  thunk.dispatch(GetSelfActionWithoutEffect())
  return data
})

export const SearchJobAction = createAsyncThunk('jobs/search', async (search: ISearchJob) => {
  const { data } = await apiInstance.post(`jobs/search`, search)
  return data
})

interface IJobState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  jobs: IJob[]
  searchedJobs: IJob[]
  job?: IJob
  isApplyJob?: boolean
}

const InitialState: IJobState = {
  loading: 'idle',
  jobs: [],
  searchedJobs: [],
}

const jobSlice = createSlice({
  name: 'job',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSuggestionJobAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetSuggestionJobAction.fulfilled, (state, action) => {
        state.loading = 'success'
        if (action.meta.arg.page == 1) {
          state.jobs = action.payload
        } else {
          state.jobs = state.jobs.concat(action.payload)
        }
      })
      .addCase(GetSuggestionJobAction.rejected, (state, action) => {
        state.loading = 'error'
      })
    builder
      .addCase(GetJobByIdAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetJobByIdAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.job = action.payload
      })
      .addCase(GetJobByIdAction.rejected, (state, action) => {
        state.loading = 'error'
      })
    builder.addCase(SearchJobAction.pending, (state) => {
      state.loading = 'loading'
      state.searchedJobs = []
    })
    builder.addCase(SearchJobAction.fulfilled, (state, action) => {
      state.loading = 'success'
      state.searchedJobs = action.payload
    })
    builder.addCase(SearchJobAction.rejected, (state, action) => {
      state.loading = 'error'
    })
  },
})

export default jobSlice.reducer

export const selectLoading = (state: RootState) => state.job.loading
export const selectJobs = (state: RootState) => state.job.jobs
export const selectSearchedJobs = (state: RootState) => state.job.searchedJobs
export const selectJob = (state: RootState) => state.job.job
