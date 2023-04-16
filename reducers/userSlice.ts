import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IUser } from '../constants/interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_EXPIRED_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../constants/storageKey'

interface INewPasswordPayload {
  password: string
  confirmPassword: string
}

interface IUserState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  message?: string
  user?: IUser
  isForgotPassword?: boolean
  isChangePassword?: boolean
}

interface IUpdateUserPayload {
  name?: string
  oldPassWord?: string
  newPassWord?: string
}

const initialState: IUserState = {
  loading: 'idle',
}
export const GetSelfAction = createAsyncThunk('user/profile', async () => {
  const { data } = await apiInstance.get('user/profile')
  return data
})

export const GetSelfActionWithoutEffect = createAsyncThunk('auth/me-without-loading', async () => {
  const { data } = await apiInstance.get('user/profile')
  return data
})

export const UpdateUserAction = createAsyncThunk('user', async (payload: IUpdateUserPayload, thunkAPI) => {
  const { data } = await apiInstance.patch('user', payload)
  thunkAPI.dispatch(GetSelfAction())
  return data
})

export const ForgotPasswordAction = createAsyncThunk('auth/forgot-password', async (payload: { email: string }) => {
  const { data } = await apiInstance.post('auth/forgot-password', payload)
  return data
})

export const VerifyOtpAction = createAsyncThunk('auth/verify-otp', async (payload: { email: string; otp: string }) => {
  const { data } = await apiInstance.post('auth/verify-otp', payload)
  return data
})

export const NewPassWordAction = createAsyncThunk(
  'user/new-password',
  async (payload: INewPasswordPayload, thunkAPI) => {
    const { data } = await apiInstance.patch('user/new-password', payload)
    return data
  },
)

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
      .addCase(UpdateUserAction.pending, (state) => {
        state.loading = 'loading'
        state.message = undefined
      })
      .addCase(UpdateUserAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.user = payload.payload
      })
      .addCase(UpdateUserAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })

    builder
      .addCase(ForgotPasswordAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(ForgotPasswordAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        if (payload.payload.status) {
          state.isForgotPassword = true
        } else {
          state.isForgotPassword = false
        }
      })
      .addCase(ForgotPasswordAction.rejected, (state, payload) => {
        state.loading = 'error'
      })

    builder
      .addCase(VerifyOtpAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(VerifyOtpAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        if (payload.payload.token) {
          state.isChangePassword = true
          state.user = payload.payload.user
          AsyncStorage.setItem(TOKEN_STORAGE_KEY, payload.payload.token.token)
          AsyncStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, payload.payload.token.expiresIn)
        } else {
          state.isChangePassword = false
        }
      })
      .addCase(VerifyOtpAction.rejected, (state, payload) => {
        state.loading = 'error'
      })

    builder
      .addCase(NewPassWordAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(NewPassWordAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.isChangePassword = false
        state.isForgotPassword = false
      })
      .addCase(NewPassWordAction.rejected, (state, payload) => {
        state.loading = 'error'
      })
  },
})
export default userSlice.reducer

export const selectLoading = (state: RootState) => state.user.loading
export const selectUser = (state: RootState) => state.user.user
export const selectMessage = (state: RootState) => state.user.message
export const selectIsForgotPassword = (state: RootState) => state.user.isForgotPassword
export const selectIsChangePassword = (state: RootState) => state.user.isChangePassword
