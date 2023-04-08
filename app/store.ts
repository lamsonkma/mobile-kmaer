import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'

import userReducer from '../reducers/userSlice'
import appReducer from '../reducers/applicationSlice'
import deviceReducer from '../reducers/deviceSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    appication: appReducer,
    device: deviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
