import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseComponent } from "./BaseComponent";

export const PageFooter = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseComponent
      className={options.modifyClassName("page-footer")}
      ref={ref}
      {...props}
    />
  );
});
