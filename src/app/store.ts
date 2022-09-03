import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import systemReducer from "../features/system/systemSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    system: systemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
