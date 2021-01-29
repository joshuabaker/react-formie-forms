import React from "react";
import { Form as FormikForm } from "formik";
import { forwardRef } from "react/cjs/react.production.min";

export const Form = forwardRef((props, ref) => {
  return <FormikForm ref={ref} {...props} />;
});
