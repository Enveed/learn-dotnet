import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import { BaseSyntheticEvent } from "react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  options: { text: string; value: string }[];
}

export default function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <FormControl my={2} isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Select
        value={field.value}
        onChange={(e: BaseSyntheticEvent) => {
          helpers.setValue(e.target.value);
        }}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
      {!!meta.error && meta.touched ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
}
