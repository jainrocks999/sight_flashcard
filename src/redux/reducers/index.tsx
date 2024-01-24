import {createSlice} from '@reduxjs/toolkit';
import type {dbData, random, setting, settings} from '../../types';
const initialState = {
  dbData: [] as dbData,
  settings: {} as setting,
  random: {random: false} as random,
  backSound: {
    normal: false,
    question: false,
  },
  Catagory: '' as
    | 'Primary'
    | 'Kinder'
    | 'GradeOne'
    | 'GradeTwo'
    | 'AllIntOne'
    | 'practice'
    | '',
  page: 'home',
  grade: 'tblWord',
  welcomSound: true,
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
    setPage: (state, action) => {
      return {...state, Catagory: action.payload};
    },
    isWelcomeSound: (state, action) => {
      return {...state, welcomSound: action.payload};
    },
    getBackSound: (state, action) => {
      return {...state, backSound: action.payload};
    },
  },
});
export const {isWelcomeSound, getBackSound} = reducer.actions;
export default reducer.reducer;
