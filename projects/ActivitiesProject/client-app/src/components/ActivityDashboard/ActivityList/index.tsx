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
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

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
