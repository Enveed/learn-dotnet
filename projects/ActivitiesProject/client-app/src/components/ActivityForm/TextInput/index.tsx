import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <FormControl my={2} isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Field as={Input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
}
