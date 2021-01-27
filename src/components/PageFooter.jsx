import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseWrapper } from "./BaseWrapper";

export const PageFooter = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("page-footer")}
      ref={ref}
      {...props}
    />
  );
});
