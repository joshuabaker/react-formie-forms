import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FieldInstructions = forwardRef((props, ref) => {
  return (
    <BaseComponent ref={ref} baseClassName={"field-instructions"} {...props} />
  );
});
