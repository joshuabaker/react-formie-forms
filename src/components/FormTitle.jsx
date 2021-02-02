import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FormTitle = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} baseClassName={"form-title"} {...props} />;
});
