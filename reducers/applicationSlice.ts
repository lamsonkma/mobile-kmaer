import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IApplication } from '../constants/interface'

export const createAppAction = createAsyncThunk('app/create', async (payload: Omit<IApplication[], 'id'>) => {
  const { data } = await apiInstance.post('/application', payload)
  return data
})

export const updateAppAction = createAsyncThunk('app/update', async (payload: IApplication[]) => {
  const { data } = await apiInstance.put('/application', payload)
  return data
})

export const getAppAction = createAsyncThunk('app/get', async () => {
  const { data } = await apiInstance.get('/application')
  return data
})

export const getAppByIdAction = createAsyncThunk('app/getById', async (id: number) => {
  const { data } = await apiInstance.get(`/application/${id}`)
  return data
})

interface IAppState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  error?: string
  applications?: IApplication[]
  application?: IApplication
}

const initialState: IAppState = {
  loading: 'idle',
  applications: [],
  application: undefined,
}

const appSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAppAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(createAppAction.fulfilled, (state) => {
        state.loading = 'success'
      })
      .addCase(createAppAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
    builder
      .addCase(updateAppAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(updateAppAction.fulfilled, (state) => {
        state.loading = 'success'
      })
      .addCase(updateAppAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
    builder
      .addCase(getAppAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(getAppAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.applications = action.payload
      })
      .addCase(getAppAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })

    builder
      .addCase(getAppByIdAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(getAppByIdAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.application = action.payload
      })
      .addCase(getAppByIdAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
  },
})

export default appSlice.reducer

export const selectLoading = (state: RootState) => state.appication.loading
export const selectApps = (state: RootState) => state.appication.applications
export const selectAppById = (state: RootState) => state.appication.application
