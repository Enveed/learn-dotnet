import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { ActivityStore } from "../../../stores";

export default function ActivityForm() {
  const { selectedActivity, createActivity, updateActivity, loading } =
    ActivityStore();
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Box bgColor="white" p="2" my="2">
      <Input
        placeholder="Title"
        my={2}
        value={activity.title}
        name="title"
        onChange={handleInputChange}
      />
      <Textarea
        placeholder="Description"
        my={2}
        value={activity.description}
        name="description"
        onChange={handleInputChange}
      />
      <Input
        placeholder="Category"
        my={2}
        value={activity.category}
        name="category"
        onChange={handleInputChange}
      />
      <Input
        placeholder="Date"
        my={2}
        value={activity.date}
        name="date"
        type="date"
        onChange={handleInputChange}
      />
      <Input
        placeholder="City"
        my={2}
        value={activity.city}
        name="city"
        onChange={handleInputChange}
      />
      <Input
        placeholder="Venue"
        my={2}
        value={activity.venue}
        name="venue"
        onChange={handleInputChange}
      />
      <Flex justifyContent="flex-end" gap={2}>
        <Button colorScheme="red">Cancel</Button>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Submitting"
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
}
