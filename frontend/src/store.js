import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './slices/channelsSlice.js';

export default configureStore({
    reducer: {
        channelsInfo: channelsSlice,
    },
});