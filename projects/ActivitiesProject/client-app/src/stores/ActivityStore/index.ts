import { create } from "zustand";
import { Activity } from "../../interfaces";
import agent from "../../services/AxiosService";
import { v4 as uuid } from "uuid";

interface ActivityState {
  activities: Activity[];
  activityRegistry: Map<string, Activity>;
  selectedActivity: Activity | undefined;
  editMode: boolean;
  loading: boolean;
  loadingInitial: boolean;
  getActivitiesByDate: () => Activity[];
  loadActivities: () => void;
  loadActivity: (id: string) => void;
  createActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  setActivity: (activity: Activity) => void;
}

export const ActivityStore = create<ActivityState>()((set, get) => ({
  activities: [],
  activityRegistry: new Map(),
  selectedActivity: undefined,
  editMode: false,
  loading: false,
  loadingInitial: true,
  getActivitiesByDate: () => {
    return Array.from(get().activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  },
  loadActivities: async () => {
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const activities = await agent.Activities.list();
      activities.forEach((activity) => get().setActivity(activity));
      set({ loadingInitial: false });
    } catch (e) {
      console.log(e);
      set({ loadingInitial: false });
    }
  },
  loadActivity: async (id: string) => {
    let activity = get().activityRegistry.get(id);
    if (activity)
      set({
        selectedActivity: activity,
      });
    else {
      set({
        loadingInitial: true,
      });
      try {
        activity = await agent.Activities.details(id);
        get().setActivity(activity);
      } catch (e) {
        console.log(e);
      }
      set({
        loadingInitial: false,
      });
    }
  },
  setActivity: (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    set((state) => ({
      activityRegistry: new Map(state.activityRegistry).set(
        activity.id,
        activity
      ),
    }));
  },
  createActivity: async (activity: Activity) => {
    set({ loading: true });
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      set((state) => ({
        activityRegistry: new Map(state.activityRegistry).set(
          activity.id,
          activity
        ),
        selectedActivity: activity,
        editMode: false,
      }));
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
  updateActivity: async (activity: Activity) => {
    set({ loading: true });
    try {
      await agent.Activities.update(activity);
      set((state) => ({
        activityRegistry: new Map(state.activityRegistry).set(
          activity.id,
          activity
        ),
        selectedActivity: activity,
        editMode: false,
      }));
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
  deleteActivity: async (id: string) => {
    set({ loading: true });
    try {
      await agent.Activities.delete(id);
      set((state) => {
        const tempActivityRegistry = new Map(state.activityRegistry);
        tempActivityRegistry.delete(id);
        return {
          activityRegistry: tempActivityRegistry,
        };
      });
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
}));
