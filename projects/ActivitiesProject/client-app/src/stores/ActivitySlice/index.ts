import { StateCreator } from "zustand";
import { Activity, ActivityFormValues, Profile } from "../../interfaces";
import agent from "../../services/AxiosService";
import { v4 as uuid } from "uuid";
import { ActivitySlice } from "./index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { format } from "date-fns";
import { UserSlice } from "../UserSlice/index.interface";
import { ProfileSlice } from "../ProfileSlice/index.interface";
import { CommentSlice } from "../CommentSlice/index.interface";
import { PagingParams } from "../../interfaces/Pagination/index.interface";

export const createActivitySlice: StateCreator<
  ActivitySlice & CommonSlice & UserSlice & ProfileSlice & CommentSlice,
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
  pagination: null,
  pagingParams: new PagingParams(),
  predicate: new Map().set("all", true),
  setPagingParams: (pagingParams: PagingParams) => {
    set({ pagingParams });
  },
  setPredicate: (predicate, value) => {
    const resetPredicate = () => {
      get().predicate.forEach((_value, key) => {
        if (key !== "startDate") get().predicate.delete(key);
      });
    };

    switch (predicate) {
      case "all":
        resetPredicate();
        set({ predicate: get().predicate.set("all", true) });
        break;
      case "isGoing":
        resetPredicate();
        set({ predicate: get().predicate.set("isGoing", true) });
        break;
      case "isHost":
        resetPredicate();
        set({ predicate: get().predicate.set("isHost", true) });
        break;
      case "startDate":
        set({ predicate: get().predicate.set("startDate", value) });
    }

    set((state) => {
      const tempActivityRegistry = new Map(state.activityRegistry);
      tempActivityRegistry.clear();

      return {
        pagingParams: new PagingParams(),
        activityRegistry: tempActivityRegistry,
      };
    });
    get().loadActivities();
  },
  getAxiosParams: () => {
    const params = new URLSearchParams();
    params.append("pageNumber", get().pagingParams.pageNumber.toString());
    params.append("pageSize", get().pagingParams.pageSize.toString());
    get().predicate.forEach((value, key) => {
      console.log(key);
      if (key === "startDate") {
        params.append(key, (value as unknown as Date).toISOString());
      } else {
        params.append(key, String(value));
      }
    });
    return params;
  },
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
      const result = await agent.Activities.list(get().getAxiosParams());
      result.data.forEach((activity) => get().setActivity(activity));
      get().setPagination(result.pagination);
    } catch (e) {
      console.log(e);
    }
    set({ loadingInitial: false });
  },
  setPagination: (pagination) => {
    set({ pagination });
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
    const user = get().user;
    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees?.find(
        (x) => x.username === activity.hostUsername
      );
    }
    activity.date = new Date(activity.date!);
    set((state) => ({
      activityRegistry: new Map(state.activityRegistry).set(
        activity.id,
        activity
      ),
    }));
  },
  createActivity: async (activity: ActivityFormValues) => {
    activity.id = uuid();
    const user = get().user;
    const attendee = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee];
      get().setActivity(newActivity);
      set({
        selectedActivity: newActivity,
      });
    } catch (e) {
      console.log(e);
    }
  },
  updateActivity: async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      if (activity.id) {
        const updatedActivity = {
          ...(await get().loadActivity(activity.id)),
          ...activity,
        };
        set((state) => ({
          activityRegistry: new Map(state.activityRegistry).set(
            activity.id!,
            updatedActivity as Activity
          ),
          selectedActivity: updatedActivity as Activity,
        }));
      }
    } catch (e) {
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
  updateAttendance: async () => {
    const user = get().user;
    set({ loading: true });
    try {
      await agent.Activities.attend(get().selectedActivity!.id);
      if (get().selectedActivity?.isGoing) {
        set((state) => ({
          selectedActivity: {
            ...state.selectedActivity!,
            attendees: state.selectedActivity!.attendees.filter(
              (a) => a.username !== user?.username
            ),
            isGoing: false,
          },
        }));
      } else {
        const attendee = new Profile(user!);
        set((state) => {
          const tempAttendee = state.selectedActivity!.attendees;
          tempAttendee?.push(attendee);
          return {
            selectedActivity: {
              ...state.selectedActivity!,
              attendees: tempAttendee,
              isGoing: true,
            },
          };
        });
      }
      set((state) => ({
        activityRegistry: new Map(state.activityRegistry).set(
          state.selectedActivity!.id,
          state.selectedActivity!
        ),
      }));
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
  cancelActivityToggle: async () => {
    set({ loading: true });
    try {
      await agent.Activities.attend(get().selectedActivity!.id);
      set((state) => ({
        selectedActivity: {
          ...state.selectedActivity!,
          isCancelled: !state.selectedActivity?.isCancelled,
        },
        activityRegistry: new Map(state.activityRegistry).set(
          state.selectedActivity!.id,
          state.selectedActivity!
        ),
      }));
    } catch (e) {
      console.log(e);
    }
    set({ loading: false });
  },
  clearSelectedActivity: () => {
    set({ selectedActivity: undefined });
  },
  updateAttendeeFollowing: (username: string) => {
    set((state) => {
      const tempActivityRegistry = new Map(state.activityRegistry);
      tempActivityRegistry.forEach((activity) => {
        activity.attendees.forEach((attendee) => {
          if (attendee.username === username) {
            attendee.following
              ? attendee.followersCount--
              : attendee.followersCount++;
            attendee.following = !attendee.following;
          }
        });
      });
      return {
        activityRegistry: tempActivityRegistry,
      };
    });
  },
});
