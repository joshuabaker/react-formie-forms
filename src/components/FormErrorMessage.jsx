import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const FormErrorMessage = forwardRef((props, ref) => {
  const { formErrorMessage, options } = useFormieContext();

  if (!formErrorMessage) {
    return null;
  }

  return (
    <div
      className={options.modifyClassName("form-error-message")}
      ref={ref}
      {...props}
    >
      {formErrorMessage}
    </div>
  );
});
