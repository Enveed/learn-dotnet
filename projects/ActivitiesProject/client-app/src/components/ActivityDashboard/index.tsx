import { Grid, GridItem } from "@chakra-ui/react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import { ActivityStore } from "../../stores";
import { useEffect } from "react";
import { LoadingComponent } from "..";

export default function ActivityDashboard() {
  const { loadActivities, loadingInitial, selectedActivity, editMode } =
    ActivityStore();

  useEffect(() => {
    loadActivities();
  }, []);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;
  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6}>
      <GridItem colSpan={10}>
        <ActivityList />
      </GridItem>
      <GridItem colSpan={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </GridItem>
    </Grid>
  );
}
