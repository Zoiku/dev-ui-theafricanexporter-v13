import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  severity: null,
  message: null,
  active: false
};

const alertReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAlert: (_state, action) => {
      return {
        severity: action.payload.severity,
        message: action.payload.message,
        active: true
      };
    },

    clearAlerts: () => {
      return {
        active: false
      };
    }
  }
});

export const { setAlert, clearAlerts } = alertReducer.actions;
export default alertReducer.reducer;
