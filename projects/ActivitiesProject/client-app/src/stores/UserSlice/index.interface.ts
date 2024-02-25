import { User, UserFormValues } from "../../interfaces";

export interface UserSlice {
  user: User | null;
  isLoggedIn: () => boolean;
  login: (creds: UserFormValues) => Promise<void>;
}
