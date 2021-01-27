import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseWrapper } from "./BaseWrapper";

export const FormErrorMessage = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("form-error-message")}
      ref={ref}
      {...props}
    />
  );
});
