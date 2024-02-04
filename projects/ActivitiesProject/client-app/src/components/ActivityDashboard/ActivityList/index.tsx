import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Activity } from "../../../interfaces";

interface Props {
  activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
  return (
    <>
      {activities.map((activity) => (
        <Card overflow="hidden" variant="outline">
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
                <Button variant="solid" colorScheme="blue">
                  View
                </Button>
              </Flex>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </>
  );
}
