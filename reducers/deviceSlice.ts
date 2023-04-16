import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IDevice } from '../constants/interface'

export const createDeviceAction = createAsyncThunk('device/create', async (payload: IDevice) => {
  const { data } = await apiInstance.post('/device', payload)
  return data
})

export const updateDeviceAction = createAsyncThunk('device/update', async (payload: IDevice) => {
  const { data } = await apiInstance.put('/device', payload)
  return data
})

export const getDeviceByMeAction = createAsyncThunk('device/get', async () => {
  const { data } = await apiInstance.get('/device/me')
  return data
})

interface IDeviceState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  error?: string
  devices?: IDevice[]
}

const initialState: IDeviceState = {
  loading: 'idle',
  devices: [],
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDeviceAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(createDeviceAction.fulfilled, (state) => {
        state.loading = 'success'
      })
      .addCase(createDeviceAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })

    builder
      .addCase(getDeviceByMeAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(getDeviceByMeAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.devices = action.payload
      })
      .addCase(getDeviceByMeAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
  },
})

export default deviceSlice.reducer

export const selectLoading = (state: RootState) => state.device.loading
export const selectDevices = (state: RootState) => state.device.devices
