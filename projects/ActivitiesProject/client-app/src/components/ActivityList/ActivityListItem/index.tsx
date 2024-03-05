import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Activity } from "../../../interfaces";
import { MdOutlineAccessTimeFilled, MdLocationPin } from "react-icons/md";
import { format } from "date-fns";
import ActivityListItemAttendee from "../ActivityListItemAttendee";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  return (
    <Card my={2}>
      <CardHeader>
        <Flex flex="1" gap="4" flexWrap="wrap">
          <Avatar src="/assets/user.png" size="xl" />

          <Box>
            <Heading size="md">{activity.title}</Heading>
            <Text>Hosted by Bob</Text>
          </Box>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody px={0}>
        <Stack divider={<StackDivider borderColor="black" />} spacing={4}>
          <Box px={5}>
            <Text>
              <Icon as={MdOutlineAccessTimeFilled} />{" "}
              {format(activity.date!, "dd MMM yyyy h:mm aa")}
              <Icon as={MdLocationPin} /> {activity.venue}
            </Text>
          </Box>
          <Box px={5}>
            <ActivityListItemAttendee attendees={activity.attendees!} />
          </Box>
        </Stack>
      </CardBody>
      <Divider />

      <CardFooter justify="space-between" flexWrap="wrap">
        <Text>{activity.description}</Text>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          colorScheme="teal"
          minW="80px"
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
