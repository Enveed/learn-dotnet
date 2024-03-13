import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { UserSlice } from "../UserSlice/index.interface";
import { ProfileSlice } from "./index.interface";
import agent from "../../services/AxiosService";

export const createProfileSlice: StateCreator<
  ActivitySlice & CommonSlice & UserSlice & ProfileSlice,
  [],
  [],
  ProfileSlice
> = (set, get) => ({
  profile: null,
  loadingProfile: false,
  loadProfile: async (username: string) => {
    set({ loadingProfile: true });
    try {
      const profile = await agent.Profiles.get(username);
      set({
        profile,
      });
    } catch (e) {
      console.log(e);
    }
    set({ loadingProfile: false });
  },
});
