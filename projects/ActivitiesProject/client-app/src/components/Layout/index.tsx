import { useEffect, useState } from "react";
import "./styles.css";
import { Container } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import { ActivityDashboard, LoadingComponent, Navbar } from "..";
import agent from "../../services/AxiosService";
import { ActivityStore } from "../../stores";

function Layout() {
  const [act, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { activities, loadActivities, loadingInitial } = ActivityStore();

  useEffect(() => {
    loadActivities();
  }, []);

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <Navbar />
      <Container mt="7em" maxWidth="950px" p={0}>
        <ActivityDashboard
          activities={activities}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default Layout;
