import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ActivityDashboard,
  Layout,
  ActivityForm,
  ActivityDetails,
} from "../components";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="activities" element={<ActivityDashboard />} />
          <Route path="activities/:id" element={<ActivityDetails />} />
          <Route
            path="create-activity"
            element={<ActivityForm key="create" />}
          />
          <Route path="manage/:id" element={<ActivityForm key="manage" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
