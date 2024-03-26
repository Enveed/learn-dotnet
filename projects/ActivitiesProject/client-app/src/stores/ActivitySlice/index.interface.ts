import { Activity, ActivityFormValues } from "../../interfaces";

export interface ActivitySlice {
  activities: Activity[];
  activityRegistry: Map<string, Activity>;
  selectedActivity: Activity | undefined;
  editMode: boolean;
  loading: boolean;
  loadingInitial: boolean;
  getActivitiesByDate: () => Activity[];
  loadActivities: () => void;
  loadActivity: (id: string) => Promise<Activity | undefined>;
  createActivity: (activity: ActivityFormValues) => Promise<void>;
  updateActivity: (activity: ActivityFormValues) => Promise<void>;
  deleteActivity: (id: string) => void;
  setActivity: (activity: Activity) => void;
  getGroupedActivities: () => [string, Activity[]][];
  updateAttendance: () => void;
  cancelActivityToggle: () => void;
  clearSelectedActivity: () => void;
}
