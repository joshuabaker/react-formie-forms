import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { useFormieFieldContext } from "./FormieFieldContext";
import { Field } from "formik";

export const Input = forwardRef((props, ref) => {
  const { options } = useFormieContext();
  const { cssClasses, handle, placeholder, required } = useFormieFieldContext();

  return (
    <Field
      className={`${options.modifyClassName("input")} ${cssClasses}`}
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
