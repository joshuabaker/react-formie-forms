import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const PageHeader = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} baseClassName={"page-header"} {...props} />;
});
