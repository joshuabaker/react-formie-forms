import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const PageTitle = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} {...props} />;
});
