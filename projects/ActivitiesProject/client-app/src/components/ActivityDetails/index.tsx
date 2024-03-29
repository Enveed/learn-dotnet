import { Grid, GridItem } from "@chakra-ui/react";
import { useBoundStore } from "../../stores";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoadingComponent } from "..";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

export default function ActivityDetails() {
  const {
    loadActivity,
    loadingInitial,
    selectedActivity: activity,
    clearSelectedActivity,
  } = useBoundStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) loadActivity(id);

    return () => {
      clearSelectedActivity();
    };
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;
  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6}>
      <GridItem colSpan={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat activityId={activity.id} />
      </GridItem>
      <GridItem colSpan={6}>
        <ActivityDetailSidebar activity={activity} />
      </GridItem>
    </Grid>
  );
}
