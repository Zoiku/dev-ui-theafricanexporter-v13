import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import sessionReducer from "./Features/Session";
import alertReducer from "./Features/Alert";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  session: sessionReducer,
  alert: alertReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default persistStore(store);