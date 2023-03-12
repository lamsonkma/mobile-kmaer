import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IEducation } from '../constants/interface'
import { GetSelfAction, GetSelfActionWithoutEffect } from './userSlice'

interface IEducationState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  education?: IEducation
  message?: string
}

const initialState: IEducationState = {
  loading: 'idle',
}
interface IIdEducation {
  id: number
}
export const CreateEducationAction = createAsyncThunk(
  'education/create',
  async (payload: Omit<IEducation, 'id'>, thunk) => {
    const { data } = await apiInstance.post('education', payload)
    thunk.dispatch(GetSelfActionWithoutEffect())
    return data
  },
)
export const DeleteEducationAction = createAsyncThunk('education/delete', async (payload: { id: number }, thunk) => {
  const { id } = payload
  await apiInstance.delete(`education/${id}`)
  thunk.dispatch(GetSelfActionWithoutEffect())
  return
})
export const UpdateEducationAction = createAsyncThunk('education/update', async (payload: IEducation, thunk) => {
  const { id, ...dataUpdate } = payload
  await apiInstance.patch(`education/${id}`, dataUpdate)
  thunk.dispatch(GetSelfActionWithoutEffect())
  return
})
export const GetOneEducationAction = createAsyncThunk('education/id', async (payload: IIdEducation) => {
  const { id } = payload
  const { data } = await apiInstance.get(`education/${id}`)
  return data
})
export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ;[CreateEducationAction, UpdateEducationAction, DeleteEducationAction].forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          console.log('Loading edu')
          state.loading = 'loading'
          state.message = undefined
        })
        .addCase(act.fulfilled, (state, payload) => {
          console.log('Success edu')
          state.loading = 'success'
          // state.message = payload.payload.message
        })
        .addCase(act.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
          console.log('error is ' + payload.error.message)
        })
    }),
      builder
        .addCase(GetOneEducationAction.pending, (state) => {
          console.log('Loading edu')
          state.loading = 'loading'
          state.message = undefined
        })
        .addCase(GetOneEducationAction.fulfilled, (state, payload) => {
          console.log('Success edu')
          state.loading = 'success'
          state.education = payload.payload
        })
        .addCase(GetOneEducationAction.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
          console.log('error is ' + payload.error.message)
        })
  },
})
export default educationSlice.reducer

export const selectingLoading = (state: RootState) => state.education.loading

export const selectingEducation = (state: RootState) => state.education.education

export const selectingMessage = (state: RootState) => state.education.message
