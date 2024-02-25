import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../ActivityForm/TextInput";
import { Button, Label } from "semantic-ui-react";
import { useBoundStore } from "../../stores";
export default function LoginForm() {
  const { login } = useBoundStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", errors: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch(() =>
          setErrors({ errors: "Invalid email or password" })
        )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="errors"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.errors}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
