import { createSlice } from '@reduxjs/toolkit';
import { deleteReview, postReview, updateReview } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.user.comment = payload.comment;
  state.user.rating = payload.rating;
  state.user.id = payload._id;
};

const handleDeleteFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.user.comment = '';
  state.user.rating = 0;
  state.user.id = null;
};

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    user: {
      id: null,
      rating: 0,
      comment: '',
    },
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(postReview.pending, handlePending)
      .addCase(updateReview.pending, handlePending)
      .addCase(deleteReview.pending, handlePending)

      .addCase(postReview.rejected, handleRejected)
      .addCase(updateReview.rejected, handleRejected)
      .addCase(deleteReview.rejected, handleRejected)

      .addCase(postReview.fulfilled, handleFulfilled)
      .addCase(updateReview.fulfilled, handleFulfilled)
      .addCase(deleteReview.fulfilled, handleDeleteFulfilled);
  },
});

export const reviewReducer = reviewSlice.reducer;
