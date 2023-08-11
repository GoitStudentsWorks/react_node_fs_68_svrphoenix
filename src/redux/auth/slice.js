import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login, logout, refreshCurrentUser } from './operations';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: '',
};

const handlePending = (state, _) => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilledUser = (state, { payload }) => {
  state.isLoading = false;
  state.user = payload.user;
  state.token = payload.token;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutReset(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, (state, _) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          logout.pending,
          refreshCurrentUser.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          logout.rejected,
          refreshCurrentUser.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          login.fulfilled,
          refreshCurrentUser.fulfilled
        ),
        handleFulfilledUser
      );
  },
});

export const authReducer = authSlice.reducer;
export const { logoutReset } = authSlice.actions;
