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
import { Activity } from "../../../interfaces";

interface Props {
  activity: Activity;
}

export default function ActivityDetails({ activity }: Props) {
  return (
    <Card maxW="sm">
      <CardBody p={0}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          alt="Green double couch with wooden legs"
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
          <Button variant="outline" colorScheme="blue" w="50%">
            Edit
          </Button>
          <Button variant="outline" colorScheme="blackAlpha" w="50%">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
