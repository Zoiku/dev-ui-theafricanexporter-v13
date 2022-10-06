import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  path: null,
  user: {}
};

const sessionReducer = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession: (state, action) => {
      return {
        ...state,
        isLogged: true,
        user: action.payload
      };
    },

    initUser: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.profile,
            ...action.payload
          }
        }
      };
    },

    initCompany: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            company: action.payload
          }
        }
      };
    },

    initPath: (state, action) => {
      return {
        ...state,
        path: action.payload
      };
    },

    clearPath: (state) => {
      return {
        ...state,
        path: null
      };
    },

    endSession: () => {
      return {
        isLogged: false,
        user: {}
      };
    }
  }
});

export const {
  startSession,
  endSession,
  initUser,
  initCompany,
  initPath,
  clearPath
} = sessionReducer.actions;
export default sessionReducer.reducer;
