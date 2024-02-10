import { Grid, GridItem } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import { ActivityStore } from "../../stores";

interface Props {
  activities: Activity[];
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) {
  const { selectedActivity, editMode } = ActivityStore();
  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6}>
      <GridItem colSpan={10}>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </GridItem>
      <GridItem colSpan={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm createOrEdit={createOrEdit} submitting={submitting} />
        )}
      </GridItem>
    </Grid>
  );
}
