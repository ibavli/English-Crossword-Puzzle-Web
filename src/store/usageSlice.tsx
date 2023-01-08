import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Beginner } from '../helpers/ResourceHelper/ResourceHelper';
import { RootState } from '../store/index';

const initialState: string = Beginner;

const usageSlice = createSlice({
    name: 'usage',
    initialState,
    reducers: {
        setUsage(state: string, action: PayloadAction<string>) {
            return action.payload;
        }
    }
});

export const usageActions = usageSlice.actions;
export const selectCount = (state: RootState) => state;
export default usageSlice.reducer;