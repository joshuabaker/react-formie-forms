import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseComponent } from "./BaseComponent";

export const FormSuccessMessage = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseComponent
      className={options.modifyClassName("form-success-message")}
      ref={ref}
      {...props}
    />
  );
});
