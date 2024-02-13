import { Grid, GridItem } from "@chakra-ui/react";
import ActivityList from "./ActivityList";
import { ActivityStore } from "../../stores";
import { useEffect } from "react";
import { LoadingComponent } from "..";

export default function ActivityDashboard() {
  const { activityRegistry, loadActivities, loadingInitial } = ActivityStore();

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, []);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;
  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6}>
      <GridItem colSpan={10}>
        <ActivityList />
      </GridItem>
      <GridItem colSpan={6}>
        <h2>Activity Filters</h2>
      </GridItem>
    </Grid>
  );
}
