import { User, UserFormValues } from "../../interfaces";

export interface UserSlice {
  user: User | null;
  isLoggedIn: () => boolean;
  login: (creds: UserFormValues) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
  register: (creds: UserFormValues) => Promise<void>;
  setImage: (image: string) => void;
}
