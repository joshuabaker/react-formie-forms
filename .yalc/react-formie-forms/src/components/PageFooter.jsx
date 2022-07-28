import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const PageFooter = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} baseClassName={"page-footer"} {...props} />;
});
