import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { UserSlice } from "./index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { UserFormValues } from "../../interfaces";
import agent from "../../services/AxiosService";

export const createUserSlice: StateCreator<
  ActivitySlice & CommonSlice & UserSlice,
  [],
  [],
  UserSlice
> = (set, get) => ({
  user: null,
  isLoggedIn: () => {
    return !!get().user;
  },
  login: async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    console.log(user);
  },
});
