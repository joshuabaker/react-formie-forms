import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { useFormieFieldContext } from "./FormieFieldContext";
import { ErrorMessage } from "formik";

export const FieldErrorMessage = forwardRef((props, ref) => {
  const { options } = useFormieContext();
  const { handle } = useFormieFieldContext();

  return (
    <ErrorMessage
      className={options.modifyClassName("field-error")}
      component={"div"}
      name={handle}
      ref={ref}
      {...props}
    />
  );
});
