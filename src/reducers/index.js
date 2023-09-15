import { combineReducers } from "redux";
import userReducer from "./userReducer";
import taskReducer from "./taskReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});

export const store = configureStore({ reducer: rootReducer });
