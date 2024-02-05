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
import { Activity } from "../../../interfaces";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
}: Props) {
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
                    onClick={() => deleteActivity(activity.id)}
                    variant="solid"
                    colorScheme="red"
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
