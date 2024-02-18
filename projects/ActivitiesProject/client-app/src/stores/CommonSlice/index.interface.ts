import { ServerError } from "../../interfaces";

export interface CommonSlice {
  error: ServerError | null;
  setServerError: (error: ServerError) => void;
}
