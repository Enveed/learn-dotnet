import axios, { AxiosResponse } from "axios";
import { Activity } from "../../interfaces";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = function <T>(response: AxiosResponse<T>) {
  return response.data;
};

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
};

const agent = { Activities };

export default agent;
