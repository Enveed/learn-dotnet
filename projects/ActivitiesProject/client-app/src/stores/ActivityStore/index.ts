import { create } from "zustand";
import { Activity } from "../../interfaces";
import agent from "../../services/AxiosService";

interface ActivityState {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  loading: boolean;
  loadingInitial: boolean;
  loadActivities: () => void;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  openForm: (id?: string) => void;
  closeForm: () => void;
}

export const ActivityStore = create<ActivityState>()((set, get) => ({
  activities: [],
  selectedActivity: undefined,
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
  selectActivity: (id: string) => {
    set((state) => ({
      selectedActivity: state.activities.find((a) => a.id === id),
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
}));
