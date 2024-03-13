import { Profile } from "../../interfaces";

export interface ProfileSlice {
  profile: Profile | null;
  loadingProfile: boolean;
  loadProfile: (username: string) => Promise<void>;
}
