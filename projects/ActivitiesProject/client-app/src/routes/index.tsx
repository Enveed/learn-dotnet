import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import {
  ActivityDashboard,
  ActivityDetails,
  ActivityForm,
  Layout,
  NotFound,
  ServerError,
  TestErrors,
} from "../components";
import LoginForm from "../components/LoginForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "create-activity", element: <ActivityForm key="create" /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
      { path: "login", element: <LoginForm /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
