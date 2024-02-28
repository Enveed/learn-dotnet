import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../ActivityForm/TextInput";
import { Button, Header } from "semantic-ui-react";
import { useBoundStore } from "../../stores";
import * as Yup from "yup";
import { ValidationError } from "..";
export default function RegisterForm() {
  const { register } = useBoundStore();

  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        errors: null,
      }}
      onSubmit={(values, { setErrors }) =>
        register(values).catch((errors) => setErrors({ errors }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Display Name" name="displayName" />
          <TextInput placeholder="Username" name="username" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="errors"
            render={() => (
              <ValidationError errors={errors.errors as unknown as string[]} />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
