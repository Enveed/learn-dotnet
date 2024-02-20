import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
}

export default function TextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <FormControl my={2} isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Field as={Textarea} {...field} {...props} />
      {!!meta.error && meta.touched ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
}
