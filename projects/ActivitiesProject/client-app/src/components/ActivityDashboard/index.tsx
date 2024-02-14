import { Grid, GridItem } from "@chakra-ui/react";
import { ActivityList } from "..";
import { ActivityStore } from "../../stores";
import { useEffect } from "react";
import { LoadingComponent } from "..";
import ActivityFilters from "./ActivityFilters";

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
        <ActivityFilters />
      </GridItem>
    </Grid>
  );
}
