import "./styles.css";
import { Container } from "@chakra-ui/react";
import { LoadingComponent, Navbar } from "..";
import { Outlet, useLocation } from "react-router-dom";
import { Home } from "../../pages";
import { ToastContainer } from "react-toastify";
import { useBoundStore } from "../../stores";
import { useEffect } from "react";

function Layout() {
  const location = useLocation();
  const { appLoaded, getUser, setAppLoaded, token } = useBoundStore();

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, []);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <>
          {" "}
          <Navbar />
          <Container mt="7em" maxWidth="950px" p={0}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default Layout;
