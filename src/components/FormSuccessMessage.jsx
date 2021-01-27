import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseWrapper } from "./BaseWrapper";

export const FormSuccessMessage = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("form-success-message")}
      ref={ref}
      {...props}
    />
  );
});
