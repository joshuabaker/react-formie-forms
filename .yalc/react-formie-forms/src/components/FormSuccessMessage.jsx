import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FormSuccessMessage = forwardRef((props, ref) => {
  return (
    <BaseComponent
      ref={ref}
      baseClassName={"form-success-message"}
      {...props}
    />
  );
});
