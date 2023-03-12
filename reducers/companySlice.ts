import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { ICompany, IJob, IPagination, ISkill } from '../constants/interface'
interface ICompanyState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  companies: ICompany[]
  message?: string
  jobs: IJob[]
}

const initialState: ICompanyState = {
  loading: 'idle',
  companies: [],
  jobs: [],
}

interface ICompanyParams extends IPagination {
  id: number
}

export const GetAllCompanyAction = createAsyncThunk('company/getAll', async () => {
  const { data } = await apiInstance.get('company')
  return data
})

export const GetJobsByCompanyAction = createAsyncThunk('company/getJobsByCompany', async (params: ICompanyParams) => {
  const { data } = await apiInstance.get(`jobs/company/${params.id}`, {
    params: {
      sort: params.sort || 'id:desc',
      page: params.page || 1,
      take: params.size || 20,
    },
  })
  return data
})

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(GetAllCompanyAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllCompanyAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.companies = payload.payload
      })
      .addCase(GetAllCompanyAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
      .addCase(GetJobsByCompanyAction.pending, (state, action) => {
        if (state.jobs.length == 0 || state.jobs[0].company.id !== action.meta.arg.id) {
          state.loading = 'loading'
        }
      })
      .addCase(GetJobsByCompanyAction.fulfilled, (state, action) => {
        state.loading = 'success'
        if (state.jobs.length > 0 && state.jobs[0].company.id !== action.meta.arg.id) {
          state.jobs = action.payload
        } else {
          state.jobs = [...state.jobs, ...action.payload]
        }
      })
      .addCase(GetJobsByCompanyAction.rejected, (state, action) => {
        state.loading = 'error'
      }),
})
export default companySlice.reducer

export const selectLoading = (state: RootState) => state.company.loading
export const selectCompanies = (state: RootState) => state.company.companies
export const selectJobsCompany = (state: RootState) => state.company.jobs
export const selectMessage = (state: RootState) => state.company.message
