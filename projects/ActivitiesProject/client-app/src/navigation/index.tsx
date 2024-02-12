import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ActivityDashboard, Layout } from "../components";
import { Home } from "../pages";
import ActivityForm from "../components/ActivityDashboard/ActivityForm";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="activities" element={<ActivityDashboard />} />
          <Route path="create-activity" element={<ActivityForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
