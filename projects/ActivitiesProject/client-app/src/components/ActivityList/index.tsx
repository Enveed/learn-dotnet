import { Fragment } from "react";
import { useBoundStore } from "../../stores";
import ActivityListItem from "./ActivityListItem";
import { Heading } from "@chakra-ui/react";

export default function ActivityList() {
  const { getGroupedActivities } = useBoundStore();

  return (
    <>
      {getGroupedActivities().map(([group, activities]) => (
        <Fragment key={group}>
          <Heading as="h2" size="md" my={2}>
            {group}
          </Heading>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
