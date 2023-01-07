import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DictionaryAPIModel } from '../helpers/models/DictionaryApiModel';
import { RootState } from '../store/index';

const initialState: DictionaryAPIModel = { data: [] };

const meaningSlice = createSlice({
    name: 'meaning',
    initialState,
    reducers: {
        setMeanings(state: DictionaryAPIModel, action: PayloadAction<DictionaryAPIModel>) {
            return { ...action.payload }
        }
    }
});

export const meaningActions = meaningSlice.actions;
export const selectCount = (state: RootState) => state.meaning;
export default meaningSlice.reducer;