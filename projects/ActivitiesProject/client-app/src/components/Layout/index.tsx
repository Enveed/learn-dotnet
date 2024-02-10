import { useEffect, useState } from "react";
import "./styles.css";
import { Container } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import { ActivityDashboard, LoadingComponent, Navbar } from "..";
import { v4 as uuid } from "uuid";
import agent from "../../services/AxiosService";
import { ActivityStore } from "../../stores";

function Layout() {
  const [act, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { activities, loadActivities, loadingInitial } = ActivityStore();

  useEffect(() => {
    loadActivities();
  }, []);

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };

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
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default Layout;
