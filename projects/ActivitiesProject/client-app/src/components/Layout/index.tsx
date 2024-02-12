import "./styles.css";
import { Container } from "@chakra-ui/react";
import { Navbar } from "..";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Container mt="7em" maxWidth="950px" p={0}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
