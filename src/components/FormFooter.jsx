import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const FormFooter = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} baseClassName={"form-footer"} {...props} />;
});
