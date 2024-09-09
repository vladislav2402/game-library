import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk],
});
