import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { UserSlice } from "./index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { UserFormValues } from "../../interfaces";
import agent from "../../services/AxiosService";
import { router } from "../../routes";
import { ProfileSlice } from "../ProfileSlice/index.interface";

export const createUserSlice: StateCreator<
  ActivitySlice & CommonSlice & UserSlice & ProfileSlice,
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
    get().closeModal();
  },
  register: async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    get().setToken(user.token);
    set({ user: user });
    router.navigate("/activities");
    get().closeModal();
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
  setImage: (image) => {
    if (get().user) {
      set((state) => ({
        user: {
          ...state.user!,
          image,
        },
      }));
    }
  },
});
