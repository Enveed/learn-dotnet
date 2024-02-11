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
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  openForm: (id?: string) => void;
  closeForm: () => void;
  createActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
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
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        set((state) => ({
          activityRegistry: new Map(state.activityRegistry).set(
            activity.id,
            activity
          ),
        }));
      });
      set({ loadingInitial: false });
    } catch (e) {
      console.log(e);
      set({ loadingInitial: false });
    }
  },
  selectActivity: (id: string) => {
    set((state) => ({
      selectedActivity: state.activityRegistry.get(id),
    }));
  },
  cancelSelectedActivity: () => {
    set(() => ({
      selectedActivity: undefined,
    }));
  },
  openForm: (id?: string) => {
    id ? get().selectActivity(id) : get().cancelSelectedActivity();
    set(() => ({
      editMode: true,
    }));
  },
  closeForm: () => {
    set(() => ({
      editMode: false,
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
      if (get().selectedActivity?.id === id) get().cancelSelectedActivity();
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
}));
