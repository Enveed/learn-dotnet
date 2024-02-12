import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
