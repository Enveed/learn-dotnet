import { ServerError } from "../../interfaces";

export interface CommonSlice {
  error: ServerError | null;
  token: string | null;
  appLoaded: boolean;
  setServerError: (error: ServerError) => void;
  setToken: (token: string | null) => void;
  setAppLoaded: () => void;
}
