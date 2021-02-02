import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FieldLabel = forwardRef((props, ref) => {
  return (
    <BaseComponent
      ref={ref}
      as={"label"}
      baseClassName={"field-label"}
      {...props}
    />
  );
});
