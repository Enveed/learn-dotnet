import { create } from "zustand";

interface ActivityState {
  title: string;
}

export const ActivityStore = create<ActivityState>()((set) => ({
  title: "Hello from Zustand",
}));
