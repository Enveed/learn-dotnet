import { Profile } from "../../interfaces";
import { Photo } from "../../interfaces/Profile/index.interface";

export interface ProfileSlice {
  profile: Profile | null;
  loadingProfile: boolean;
  uploading: boolean;
  loadProfile: (username: string) => Promise<void>;
  isCurrentUser: () => boolean;
  uploadPhoto: (file: Blob) => Promise<void>;
  setMainPhoto: (photo: Photo) => Promise<void>;
}
