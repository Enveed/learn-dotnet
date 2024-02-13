import "./styles.css";
import { Container } from "@chakra-ui/react";
import { Navbar } from "..";
import { Outlet, useLocation } from "react-router-dom";
import { Home } from "../../pages";

function Layout() {
  const location = useLocation();

  return (
    <>
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
