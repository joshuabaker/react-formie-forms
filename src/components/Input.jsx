import React, { forwardRef } from "react";
import { Field as FormikField } from "formik";
import { useFieldContext } from "./FieldContext";

export const Input = forwardRef((props, ref) => {
  const { handle, placeholder, required } = useFieldContext();

  return (
    <FormikField
      name={handle}
      placeholder={placeholder}
      ref={ref}
      required={required}
      style={{ width: "100%" }}
      type={"text"}
      {...props}
    />
  );
});
