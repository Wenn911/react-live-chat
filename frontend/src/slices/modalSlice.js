import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.isOpen = true;
      state.type = type;
      state.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
