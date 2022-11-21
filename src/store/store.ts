import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './gridSlice';

const store = configureStore({
  reducer: {
    gridStore: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
