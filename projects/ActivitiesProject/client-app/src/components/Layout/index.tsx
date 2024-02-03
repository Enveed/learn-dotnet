import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import { ActivityDashboard, Navbar } from "..";

function Layout() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <>
      <Navbar />
      <Container mt="7em" maxWidth="950px">
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default Layout;
