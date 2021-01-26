import React, { forwardRef } from "react";
import { Form as FormikForm } from "formik";
import { useFormieContext } from "./FormieContext";

export const Form = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <FormikForm
      className={options.modifyClassName("form")}
      ref={ref}
      {...props}
    />
  );
});
