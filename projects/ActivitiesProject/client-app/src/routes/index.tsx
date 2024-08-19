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
import { ProfilePage } from "../pages";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "activities", element: <ActivityDashboard /> },
          { path: "activities/:id", element: <ActivityDetails /> },
          { path: "create-activity", element: <ActivityForm key="create" /> },
          { path: "manage/:id", element: <ActivityForm key="manage" /> },
          { path: "profiles/:username", element: <ProfilePage /> },
          { path: "errors", element: <TestErrors /> },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
