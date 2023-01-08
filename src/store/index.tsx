import { configureStore } from '@reduxjs/toolkit';
import meaningReducer from './meaningSlice';
import usageReducer from './usageSlice';

const store = configureStore({
    reducer: { meaning: meaningReducer, usage: usageReducer }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;