import { StateCreator } from "zustand";
import { Activity } from "../../interfaces";
import agent from "../../services/AxiosService";
import { v4 as uuid } from "uuid";
import { ActivitySlice } from "./index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { format } from "date-fns";

export const createActivitySlice: StateCreator<
  ActivitySlice & CommonSlice,
  [],
  [],
  ActivitySlice
> = (set, get) => ({
  activities: [],
  activityRegistry: new Map(),
  selectedActivity: undefined,
  editMode: false,
  loading: false,
  loadingInitial: false,
  getActivitiesByDate: () => {
    return Array.from(get().activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  },
  getGroupedActivities: () => {
    return Object.entries(
      get()
        .getActivitiesByDate()
        .reduce((activities, activity) => {
          const date = format(activity.date!, "dd MMM yyyy");
          activities[date] = activities[date]
            ? [...activities[date], activity]
            : [activity];
          return activities;
        }, {} as { [key: string]: Activity[] })
    );
  },
  loadActivities: async () => {
    set({ loadingInitial: true });
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => get().setActivity(activity));
    } catch (e) {
      console.log(e);
    }
    set({ loadingInitial: false });
  },
  loadActivity: async (id: string) => {
    let activity = get().activityRegistry.get(id);
    if (activity) {
      set({
        selectedActivity: activity,
      });
    } else {
      set({
        loadingInitial: true,
      });
      try {
        activity = await agent.Activities.details(id);
        get().setActivity(activity);
        set({
          selectedActivity: activity,
        });
      } catch (e) {
        console.log(e);
      }
      set({
        loadingInitial: false,
      });
    }
    return activity;
  },
  setActivity: (activity: Activity) => {
    activity.date = new Date(activity.date!);
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
      set({ loading: false });
      return activity;
    } catch (e) {
      console.log(e);
      set({ loading: false });
    }
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
      set({ loading: false });
      return activity;
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
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
});
