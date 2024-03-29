import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingComponent } from "..";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";
import { categoryOptions } from "../../common/options";
import DateInput from "./DateInput";
import { Header } from "semantic-ui-react";
import { ActivityFormValues } from "../../interfaces/Activity/index.interface";

export default function ActivityForm() {
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    useBoundStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required!"),
    description: Yup.string().required(),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(new ActivityFormValues(activity));
      });
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Box bgColor="white" p="2" my="2">
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput placeholder="Title" name="title" />
            <TextArea rows={3} placeholder="Description" name="description" />
            <SelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Flex justifyContent="flex-end" gap={2}>
              <Button as={Link} to={"/activities"} colorScheme="red">
                Cancel
              </Button>
              <Button
                isDisabled={isSubmitting || !dirty || !isValid}
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText="Submitting"
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
