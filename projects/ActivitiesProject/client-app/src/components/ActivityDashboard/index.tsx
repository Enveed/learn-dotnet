import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid templateColumns="repeat(16, 1fr)">
      <GridItem colSpan={10}>
        <ActivityList activities={activities} />
      </GridItem>
    </Grid>
  );
}
