import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { useFormieContext } from "./FormieContext";

export const BackButton = forwardRef((props, ref) => {
  return <BaseComponent ref={ref} baseClassName={"back-button"} {...props} />;
});
