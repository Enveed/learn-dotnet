import { create } from "zustand";
import { Activity } from "../../interfaces";
import agent from "../../services/AxiosService";

interface ActivityState {
  activities: Activity[];
  selectedActivity: Activity | null;
  editMode: boolean;
  loading: boolean;
  loadingInitial: boolean;
  loadActivities: () => void;
}

export const ActivityStore = create<ActivityState>()((set) => ({
  activities: [],
  selectedActivity: null,
  editMode: false,
  loading: false,
  loadingInitial: false,
  loadActivities: async () => {
    set({ loadingInitial: true });
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        set((state) => ({
          activities: [...state.activities, activity],
        }));
      });
      set({ loadingInitial: false });
    } catch (e) {
      console.log(e);
      set({ loadingInitial: false });
    }
  },
}));
