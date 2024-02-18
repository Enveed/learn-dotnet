import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../interfaces";
import { LoadingComponent } from "..";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";

export default function ActivityForm() {
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = useBoundStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
  }, [id, loadActivity]);

  // const handleSubmit = () => {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   } else {
  //     updateActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  // const handleChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Box bgColor="white" p="2" my="2">
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <>
            <Input
              placeholder="Title"
              my={2}
              value={activity.title}
              name="title"
              onChange={handleChange}
            />
            <Textarea
              placeholder="Description"
              my={2}
              value={activity.description}
              name="description"
              onChange={handleChange}
            />
            <Input
              placeholder="Category"
              my={2}
              value={activity.category}
              name="category"
              onChange={handleChange}
            />
            <Input
              placeholder="Date"
              my={2}
              value={activity.date}
              name="date"
              type="date"
              onChange={handleChange}
            />
            <Input
              placeholder="City"
              my={2}
              value={activity.city}
              name="city"
              onChange={handleChange}
            />
            <Input
              placeholder="Venue"
              my={2}
              value={activity.venue}
              name="venue"
              onChange={handleChange}
            />
            <Flex justifyContent="flex-end" gap={2}>
              <Button as={Link} to={"/activities"} colorScheme="red">
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </Flex>
          </>
        )}
      </Formik>
    </Box>
  );
}
