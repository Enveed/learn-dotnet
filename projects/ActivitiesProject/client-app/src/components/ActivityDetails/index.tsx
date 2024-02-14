import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ActivityStore } from "../../stores";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoadingComponent } from "..";

export default function ActivityDetails() {
  const {
    loadActivity,
    loadingInitial,
    selectedActivity: activity,
  } = ActivityStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;
  return (
    <Card maxW="sm">
      <CardBody p={0}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          alt="Category Image"
          borderRadius="lg"
        />
        <Stack gap={0} p={5}>
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
        </Stack>
      </CardBody>

      <CardFooter>
        <ButtonGroup spacing="2" flex="1">
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            variant="outline"
            colorScheme="blue"
            w="50%"
          >
            Edit
          </Button>
          <Button
            as={Link}
            to={`/activities`}
            variant="outline"
            colorScheme="blackAlpha"
            w="50%"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}