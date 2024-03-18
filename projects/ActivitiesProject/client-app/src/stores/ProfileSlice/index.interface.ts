import { Profile } from "../../interfaces";

export interface ProfileSlice {
  profile: Profile | null;
  loadingProfile: boolean;
  uploading: boolean;
  loadProfile: (username: string) => Promise<void>;
  isCurrentUser: () => boolean;
  uploadPhoto: (file: Blob) => Promise<void>;
}
