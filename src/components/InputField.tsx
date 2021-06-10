import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { FormLabel, Input } from "@chakra-ui/react";
import { useField, FieldHookConfig } from "formik";
import React, { ReactElement } from "react";

export type InputFieldProps = FieldHookConfig<string> & {
  name: string;
  placeholder: string;
  label: string;
};

export function InputField(props: InputFieldProps): ReactElement | null {
  const [field, meta, _helpers] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        type={props.type}
      />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
}
