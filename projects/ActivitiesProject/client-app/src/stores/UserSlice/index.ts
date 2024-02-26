import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { UserSlice } from "./index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { UserFormValues } from "../../interfaces";
import agent from "../../services/AxiosService";
import { router } from "../../routes";

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
    get().setToken(user.token);
    set({ user: user });
    router.navigate("/activities");
  },
  logout: () => {
    get().setToken(null);
    set({ user: null });
    router.navigate("/");
  },
  getUser: async () => {
    try {
      const user = await agent.Account.current();
      set({ user: user });
    } catch (e) {
      console.log(e);
    }
  },
});
