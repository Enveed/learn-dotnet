import { Activity, ActivityFormValues } from "../../interfaces";
import {
  Pagination,
  PagingParams,
} from "../../interfaces/Pagination/index.interface";

export interface ActivitySlice {
  activities: Activity[];
  activityRegistry: Map<string, Activity>;
  selectedActivity: Activity | undefined;
  editMode: boolean;
  loading: boolean;
  loadingInitial: boolean;
  pagination: Pagination | null;
  pagingParams: PagingParams;
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
  updateAttendeeFollowing: (username: string) => void;
  setPagination: (pagination: Pagination) => void;
  setPagingParams: (pagingParams: PagingParams) => void;
  getAxiosParams: () => URLSearchParams;
}
