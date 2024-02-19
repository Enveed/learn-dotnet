import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../interfaces";
import { LoadingComponent } from "..";
import { v4 as uuid } from "uuid";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required!"),
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
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl my={2} isInvalid={!!errors.title && touched.title}>
              <Field as={Input} placeholder="Title" name="title" />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <Field
                as={Textarea}
                placeholder="Description"
                my={2}
                name="description"
              />
            </FormControl>
            <FormControl>
              <Field as={Input} placeholder="Category" my={2} name="category" />
            </FormControl>
            <FormControl>
              <Field
                as={Input}
                placeholder="Date"
                my={2}
                name="date"
                type="date"
              />
            </FormControl>
            <FormControl>
              <Field as={Input} placeholder="City" my={2} name="city" />
            </FormControl>
            <FormControl>
              <Field as={Input} placeholder="Venue" my={2} name="venue" />
            </FormControl>
            <Flex justifyContent="flex-end" gap={2}>
              <Button as={Link} to={"/activities"} colorScheme="red">
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={loading}
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
