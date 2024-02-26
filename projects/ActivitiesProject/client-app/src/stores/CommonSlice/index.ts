import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { CommonSlice } from "./index.interface";
import { UserSlice } from "../UserSlice/index.interface";

export const createCommonSlice: StateCreator<
  ActivitySlice & CommonSlice & UserSlice,
  [],
  [],
  CommonSlice
> = (set, get) => ({
  error: null,
  token: localStorage.getItem("jwt"),
  appLoaded: false,
  modal: {
    open: false,
    body: null,
  },
  setServerError: (error) => {
    set({
      error: error,
    });
  },
  setToken: (token) => {
    if (token !== null) localStorage.setItem("jwt", token);
    else localStorage.removeItem("jwt");
    set({ token: token });
  },
  setAppLoaded: () => {
    set({ appLoaded: true });
  },
  openModal: (content: JSX.Element) => {
    set({
      modal: {
        open: true,
        body: content,
      },
    });
  },
  closeModal: () => {
    set({
      modal: {
        open: false,
        body: null,
      },
    });
  },
});
