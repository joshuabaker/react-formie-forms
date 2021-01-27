import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { useFormieContext } from "./FormieContext";

export const PageHeader = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseComponent
      className={options.modifyClassName("page-header")}
      ref={ref}
      {...props}
    />
  );
});
