import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { ISkill } from '../constants/interface'

interface ISkillState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  skills?: ISkill[]
  message?: string
}

const initialState: ISkillState = {
  loading: 'idle',
}

export const GetAllSkillAction = createAsyncThunk('skills', async () => {
  const { data } = await apiInstance.get('skills')
  return data
})
export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllSkillAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllSkillAction.fulfilled, (state, payload) => {
        console.log(payload.payload.data)
        state.loading = 'success'
        state.skills = payload.payload
      })
      .addCase(GetAllSkillAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
  },
})
export default skillSlice.reducer

export const selectLoading = (state: RootState) => state.skill.loading
export const selectSkills = (state: RootState) => state.skill.skills
export const selectMessage = (state: RootState) => state.skill.message
