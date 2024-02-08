import { Grid, GridItem } from "@chakra-ui/react";
import { Activity } from "../../interfaces";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  openForm,
  closeForm,
  editMode,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) {
  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6}>
      <GridItem colSpan={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </GridItem>
      <GridItem colSpan={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </GridItem>
    </Grid>
  );
}
