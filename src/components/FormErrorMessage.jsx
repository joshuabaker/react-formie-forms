import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FormErrorMessage = forwardRef((props, ref) => {
  return (
    <BaseComponent ref={ref} baseClassName={"form-error-message"} {...props} />
  );
});
