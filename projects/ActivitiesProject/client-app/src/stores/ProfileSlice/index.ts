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
  uploading: false,
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
  isCurrentUser: () => {
    const { user, profile } = get();
    if (user && profile) {
      return user.username === profile.username;
    }
    return false;
  },
  uploadPhoto: async (file: Blob) => {
    set({ uploading: true });
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      if (get().profile) {
        set((state) => ({
          profile: {
            ...state.profile!,
            photos: state.profile?.photos
              ? [...state.profile!.photos, photo]
              : [photo],
          },
        }));
        if (photo.isMain && get().user) {
          get().setImage(photo.url);
          set((state) => ({
            profile: { ...state.profile!, image: photo.url },
          }));
        }
      }
    } catch (e) {
      console.log(e);
    }
    set({ uploading: false });
  },
  setMainPhoto: async (photo) => {
    set({ loading: true });
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      get().setImage(photo.url);
      if (get().profile && get().profile?.photos) {
        get().profile!.photos!.find((p) => p.isMain)!.isMain = false;
        get().profile!.photos!.find((p) => p.id === photo.id)!.isMain = true;
        set((state) => ({
          profile: { ...state.profile!, image: photo.url },
        }));
      }
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
  deletePhoto: async (photo) => {
    set({ loading: true });
    try {
      await agent.Profiles.deletePhoto(photo.id);
      set((state) => ({
        profile: {
          ...state.profile!,
          photos: state.profile!.photos?.filter((p) => p.id !== photo.id),
        },
      }));
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
  setDisplayName: (displayName) => {
    if (get().user)
      set((state) => ({
        user: {
          ...state.user!,
          displayName,
        },
      }));
  },
  updateProfile: async (profile) => {
    set({ loading: true });
    try {
      await agent.Profiles.updateProfile(profile);
      if (profile.displayName !== get().user?.displayName)
        get().setDisplayName(profile.displayName!);
      set((state) => ({
        profile: {
          ...state.profile!,
          ...profile,
        },
      }));
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
});
