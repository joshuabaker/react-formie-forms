import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FormHeader = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} {...props} />;
});
