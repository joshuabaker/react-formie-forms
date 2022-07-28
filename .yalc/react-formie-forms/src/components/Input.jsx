import React, { forwardRef } from "react";
import classNames from "classnames";
import { Field as FormikField } from "formik";
import { useFieldContext } from "./FieldContext";
import { useFormieContext } from "./FormieContext";

export const Input = forwardRef(
  ({ type = "text", className, ...props }, ref) => {
    const { options } = useFormieContext();
    const { handle, placeholder, required } = useFieldContext();

    return (
      <FormikField
        ref={ref}
        type={type}
        name={handle}
        placeholder={placeholder}
        required={required}
        style={{ width: "100%" }}
        className={classNames(
          options.modifyClassName(`input-${type}`),
          className
        )}
        {...props}
      />
    );
  }
);
