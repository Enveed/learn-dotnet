import { Grid, GridItem } from "@chakra-ui/react";
import { ActivityList } from "..";
import { useEffect } from "react";
import { LoadingComponent } from "..";
import ActivityFilters from "./ActivityFilters";
import { useBoundStore } from "../../stores";

export default function ActivityDashboard() {
  const { activityRegistry, loadActivities, loadingInitial } = useBoundStore();

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, []);

  if (loadingInitial) return <LoadingComponent content="Loading activities" />;
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
