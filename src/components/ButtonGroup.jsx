import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";

export const ButtonGroup = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} baseClassName={"button-group"} {...props} />;
});
