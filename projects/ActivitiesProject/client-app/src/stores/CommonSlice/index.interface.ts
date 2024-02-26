import { ServerError } from "../../interfaces";

interface ModalInterface {
  open: boolean;
  body: JSX.Element | null;
}

export interface CommonSlice {
  error: ServerError | null;
  token: string | null;
  appLoaded: boolean;
  modal: ModalInterface;
  setServerError: (error: ServerError) => void;
  setToken: (token: string | null) => void;
  setAppLoaded: () => void;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
}
