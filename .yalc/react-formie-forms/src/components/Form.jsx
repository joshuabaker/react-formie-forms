import React from "react";
import classNames from "classnames";
import { Form as FormikForm } from "formik";
import { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const Form = forwardRef(({ className, ...props }, ref) => {
  const { options } = useFormieContext();

  return (
    <FormikForm
      ref={ref}
      className={classNames(options.modifyClassName("form"), className)}
      {...props}
    />
  );
});
