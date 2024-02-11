import { useEffect } from "react";
import "./styles.css";
import { Container } from "@chakra-ui/react";
import { ActivityDashboard, LoadingComponent, Navbar } from "..";
import { ActivityStore } from "../../stores";

function Layout() {
  const { loadActivities, loadingInitial } = ActivityStore();

  useEffect(() => {
    loadActivities();
  }, []);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <Navbar />
      <Container mt="7em" maxWidth="950px" p={0}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default Layout;
