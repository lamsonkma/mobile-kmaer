import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IIndustry } from '../constants/interface'

export interface IIndustryState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  industries?: IIndustry[]
  message?: string
}

const initialState: IIndustryState = {
  loading: 'idle',
}
export const GetAllIndustryAction = createAsyncThunk('industry/auth', async () => {
  const { data } = await apiInstance.get('industry')
  return data
})
export const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllIndustryAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllIndustryAction.fulfilled, (state, payload) => {
        console.log(payload.payload.data)
        state.loading = 'success'
        state.industries = payload.payload
      })
      .addCase(GetAllIndustryAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
  },
})
export default industrySlice.reducer

export const selectLoading = (state: RootState) => state.industry.loading
export const selectIndustry = (state: RootState) => state.industry.industries
export const selectMessage = (state: RootState) => state.industry.message
