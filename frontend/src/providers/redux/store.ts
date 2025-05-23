import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import chatReducer from "./slices/Chat";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
