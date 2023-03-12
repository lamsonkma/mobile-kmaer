import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IUser } from '../constants/interface'

interface IUserState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  message?: string
  user?: IUser
}
const initialState: IUserState = {
  loading: 'idle',
}
export const GetSelfAction = createAsyncThunk('auth/me', async () => {
  const { data } = await apiInstance.get('auth/me')
  return data
})

export const GetSelfActionWithoutEffect = createAsyncThunk('auth/me-without-loading', async () => {
  const { data } = await apiInstance.get('auth/me')
  return data
})
export const UpdateUserProfileAction = createAsyncThunk('user/profile', async (payload: Partial<IUser>, thunk) => {
  const { data } = await apiInstance.patch('user/profile', payload)
  thunk.dispatch(GetSelfActionWithoutEffect())
  return data
})
const userSlice = createSlice({
  name: 'user',
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder
      .addCase(GetSelfAction.pending, (state) => {
        state.loading = 'loading'
        state.message = undefined
      })
      .addCase(GetSelfAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.user = payload.payload
      })
      .addCase(GetSelfAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
      .addCase(GetSelfActionWithoutEffect.fulfilled, (state, payload) => {
        state.user = payload.payload
      })
    builder
      .addCase(UpdateUserProfileAction.pending, (state) => {
        state.loading = 'loading'
        state.message = undefined
      })
      .addCase(UpdateUserProfileAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        // state.user = payload.payload
      })
      .addCase(UpdateUserProfileAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
        console.log(payload.error.message)
      })
  },
})
export default userSlice.reducer

export const selectLoading = (state: RootState) => state.user.loading
export const selectUser = (state: RootState) => state.user.user
export const selectMessage = (state: RootState) => state.user.message
