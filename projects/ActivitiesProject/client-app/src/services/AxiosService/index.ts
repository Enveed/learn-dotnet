import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../../interfaces";
import { toast } from "react-toastify";
import { router } from "../../routes";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = function <T>(response: AxiosResponse<T>) {
  return response.data;
};

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response!;
    switch (status) {
      case 400:
        toast.error("Bad Request");
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("Forbidden Access");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("Server Error");
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>(`/activities`, activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
};

const agent = { Activities };

export default agent;
