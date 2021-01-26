import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const FormSuccessMessage = forwardRef((props, ref) => {
  const { formSuccessMessage, options } = useFormieContext();

  if (!formSuccessMessage) {
    return null;
  }

  return (
    <div
      className={options.modifyClassName("form-success-message")}
      ref={ref}
      {...props}
    >
      {formSuccessMessage}
    </div>
  );
});
