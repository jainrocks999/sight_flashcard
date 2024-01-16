import {createSlice} from '@reduxjs/toolkit';
import type {dbData, random, settings} from '../../types';
const initialState = {
  dbData: [] as dbData,
  settings: [] as settings,
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
    getDbData: (state, action) => {
      return {...state, dbData: action.payload};
    },
    getSettings: (state, action) => {
      return {...state, settings: action.payload};
    },
  },
});
export default reducer.reducer;
