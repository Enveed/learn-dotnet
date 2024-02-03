import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import { Activity } from "../../interfaces";

interface Props {
  activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid templateColumns="repeat(16, 1fr)">
      <GridItem colSpan={10}>
        <List>
          {activities.map((activity: Activity) => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </List>
      </GridItem>
    </Grid>
  );
}
