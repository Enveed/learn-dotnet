import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <FormControl my={2} isInvalid={!!meta.error && meta.touched}>
      <DatePicker
        {...field}
        {...props}
        className="react-datepicker-custom"
        selected={field.value && new Date(field.value)}
        onChange={(value) => helpers.setValue(value)}
      />
      {!!meta.error && meta.touched ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
}
