import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { CommonSlice } from "./index.interface";

export const createCommonSlice: StateCreator<
  ActivitySlice & CommonSlice,
  [],
  [],
  CommonSlice
> = (set, get) => ({
  error: null,
  setServerError: (error) => {
    set({
      error: error,
    });
  },
});
