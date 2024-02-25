import { Form, Formik } from "formik";
import TextInput from "../ActivityForm/TextInput";
import { Button } from "semantic-ui-react";
export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Password" name="password" type="password" />
          <Button positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
}
