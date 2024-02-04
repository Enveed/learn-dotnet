import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";

interface Props {
  activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6}>
      <GridItem colSpan={10}>
        <ActivityList activities={activities} />
      </GridItem>
      <GridItem colSpan={6}>
        {activities[0] && <ActivityDetails activity={activities[0]} />}
      </GridItem>
    </Grid>
  );
}
