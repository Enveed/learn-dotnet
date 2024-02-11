import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { ActivityStore } from "../../../stores";

export default function ActivityList() {
  const [target, setTarget] = useState("");
  const { activities, deleteActivity, loading, selectActivity } =
    ActivityStore();

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <>
      {activities.map((activity) => (
        <Card overflow="hidden" variant="outline" key={activity.id}>
          <Stack flex="1">
            <CardBody pb={0}>
              <Heading size="md">{activity.title}</Heading>

              <Text fontSize="xs" pt="2" color="gray">
                {activity.date}
              </Text>
              <Text fontSize="xs" pt="1" color="gray">
                {activity.city}, {activity.venue}
              </Text>
              <Text py="3" color="black">
                {activity.description}
              </Text>
            </CardBody>

            <CardFooter pt={0}>
              <Flex
                flex="1"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="outline" colorScheme="blackAlpha" size="sm">
                  {activity.category}
                </Button>
                <Flex gap={2}>
                  <Button
                    name={activity.id}
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    variant="solid"
                    colorScheme="red"
                    isLoading={loading && target === activity.id}
                    loadingText="Submitting"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => selectActivity(activity.id)}
                    variant="solid"
                    colorScheme="blue"
                  >
                    View
                  </Button>
                </Flex>
              </Flex>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </>
  );
}
