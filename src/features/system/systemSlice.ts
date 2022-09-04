import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const MAX_BOOT_STAGE = 3;

export interface SystemState {
  username: string;
  status: "preboot" | "boot" | "welcome" | "idle" | "shuttingdown";
  bootStage: number;
  loading: boolean;
}

const initialState: SystemState = {
  username: "",
  status: "preboot",
  bootStage: 0,
  loading: false,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    preboot: (state) => {
      state.status = "preboot";
    },
    startBoot: (state) => {
      state.status = "boot";
    },
    connectUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    bootStageCompleted: (state) => {
      if (state.bootStage < MAX_BOOT_STAGE) state.bootStage += 1;
    },
    start: (state) => {
      state.status = "idle";
    },
    load: (state) => {
      state.loading = true;
    },
    didLoad: (state) => {
      state.loading = false;
    },
    welcome: (state) => {
      state.status = "welcome";
    },
  },
});

export const { connectUser, preboot, startBoot, start, load, didLoad, bootStageCompleted } = systemSlice.actions;

export const selectUsername = (state: RootState) => state.system.username;
export const selectSystemStatus = (state: RootState) => state.system.status;
export const selectSystemLoading = (state: RootState) => state.system.loading;
export const selectBootStage = (state: RootState) => state.system.bootStage;

export default systemSlice.reducer;
