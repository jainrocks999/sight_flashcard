import {createSlice} from '@reduxjs/toolkit';
import type {dbData, random} from '../../types';
const initialState = {
  dbData: [] as dbData,
  random: {random: false} as random,
  backSound: {
    word: false,
    find: false,
    memory: false,
    bingo: false,
    home: false,
  },
  page: 'home',
  grade: 'tblWord',
};
const reducer = createSlice({
  name: 'sightCards',
  initialState,
  reducers: {
    setPageChange: (state, action) => {
      return {...state, page: action.payload};
    },
  },
});
export default reducer.reducer;
