import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { TOKEN_EXPIRED_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../constants/storageKey'

interface ILoginSuccessResponse {
  user: IUser
  token: {
    accessToken: string
    accessTokenExpired: string
  }
}
interface IUser {
  email: string
  password: string
  role: string
}

interface ILoginPayload {
  email: string
  password: string
}
interface IAuthState {
  isLoggedIn: boolean
  loading: 'idle' | 'loading' | 'success' | 'error'
  user?: IUser
  error?: string
}
interface IRegisterPayload extends ILoginPayload {
  name: string
}
const initialState: IAuthState = {
  isLoggedIn: false,
  loading: 'idle',
}
export const loginAction = createAsyncThunk('auth/login', async (payload: ILoginPayload) => {
  const { data } = await apiInstance.post<ILoginSuccessResponse>('/auth/login', payload)
  return data
})
export const registerAction = createAsyncThunk('auth/register', async (payload: IRegisterPayload) => {
  const { data } = await apiInstance.post<ILoginSuccessResponse>('auth/register', payload)
  return data
})
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ;[loginAction, registerAction].forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          state.loading = 'loading'
          state.error = undefined
        })
        .addCase(act.fulfilled, (state, payload) => {
          state.loading = 'success'
          state.isLoggedIn = true
          state.user = payload.payload.user
          AsyncStorage.setItem(TOKEN_STORAGE_KEY, payload.payload.token.accessToken)
          AsyncStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, payload.payload.token.accessTokenExpired)
        })
        .addCase(act.rejected, (state, payload) => {
          console.log('error')
          state.loading = 'error'
          state.error = payload.error.message
          console.log(payload.error.message)
        })
    })
  },
})
export default authSlice.reducer

export const selectLoading = (state: RootState) => state.auth.loading
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
