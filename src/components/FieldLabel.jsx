import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FieldLabel = forwardRef((props, ref) => {
  return <BaseComponent as={"label"} ref={ref} {...props} />;
});
