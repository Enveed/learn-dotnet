import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useBoundStore } from "../stores";
import { useEffect } from "react";

export default function RequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useBoundStore();
  useEffect(() => {
    if (!isLoggedIn()) navigate("/", { state: { from: location } });
  }, [isLoggedIn, location, navigate]);

  return <Outlet />;
}
