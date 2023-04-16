import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IApplication, IRule } from '../constants/interface'

interface IRulePayload {
  applicationId: number
  startTime: string
  endTime: string
  enabled: boolean
  deviceId: number
}

export const GetAllRuleAction = createAsyncThunk('rule/getAll', async (id: number) => {
  const { data } = await apiInstance.get(`rule/${id}`)
  return data
})

export const getRuleByAppIdAction = createAsyncThunk('rule/getByAppId', async (id: number) => {
  const { data } = await apiInstance.get(`/rule/app/${id}`)
  return data
})

export const createRuleAction = createAsyncThunk('rule/create', async (payload: IRulePayload, thunkAPI) => {
  const { data } = await apiInstance.post('/rule', payload)
  thunkAPI.dispatch(GetAllRuleAction(payload.deviceId))
  return data
})

export const updateRuleAction = createAsyncThunk('rule/update', async (payload: IRulePayload, thunkAPI) => {
  const { data } = await apiInstance.patch('/rule', payload)
  return data
})

export const deleteRuleAction = createAsyncThunk('rule/delete', async (id: number, thunkAPI) => {
  const { data } = await apiInstance.delete(`/rule/${id}`)
  return data
})

interface RuleState {
  rules: IRule[]
  loading: 'idle' | 'loading' | 'success' | 'error'
  error?: string
}

const initialState: RuleState = {
  rules: [],
  loading: 'idle',
}

const ruleSlice = createSlice({
  name: 'rule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllRuleAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllRuleAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.rules = action.payload
      })
      .addCase(GetAllRuleAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
    builder
      .addCase(getRuleByAppIdAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(getRuleByAppIdAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.rules = action.payload
      })
      .addCase(getRuleByAppIdAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
    builder
      .addCase(createRuleAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(createRuleAction.fulfilled, (state) => {
        state.loading = 'success'
      })
      .addCase(createRuleAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
    builder
      .addCase(updateRuleAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(updateRuleAction.fulfilled, (state) => {
        state.loading = 'success'
      })
      .addCase(updateRuleAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })

    builder
      .addCase(deleteRuleAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(deleteRuleAction.fulfilled, (state) => {
        state.loading = 'success'
      })
      .addCase(deleteRuleAction.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.error.message
      })
  },
})

export default ruleSlice.reducer

export const selectRule = (state: RootState) => state.rule.rules
