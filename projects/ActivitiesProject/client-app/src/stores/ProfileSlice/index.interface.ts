import { Profile, UserActivity } from "../../interfaces";
import { Photo } from "../../interfaces/Profile/index.interface";

export interface ProfileSlice {
  profile: Profile | null;
  loadingProfile: boolean;
  uploading: boolean;
  followings: Profile[];
  loadingFollowings: boolean;
  loadingActivities: boolean;
  userActivities: UserActivity[];
  loadProfile: (username: string) => Promise<void>;
  isCurrentUser: () => boolean;
  uploadPhoto: (file: Blob) => Promise<void>;
  setMainPhoto: (photo: Photo) => Promise<void>;
  deletePhoto: (photo: Photo) => Promise<void>;
  setDisplayName: (displayName: string) => void;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  updateFollowing: (username: string, following: boolean) => Promise<void>;
  loadFollowings: (predicate: string) => Promise<void>;
  loadUserActivities: (username: string, predicate: string) => Promise<void>;
}
