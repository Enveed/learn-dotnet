import { Activity } from "../../interfaces";

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
  createActivity: (activity: Activity) => Promise<Activity | undefined>;
  updateActivity: (activity: Activity) => Promise<Activity | undefined>;
  deleteActivity: (id: string) => void;
  setActivity: (activity: Activity) => void;
  getGroupedActivities: () => [string, Activity[]][];
}
