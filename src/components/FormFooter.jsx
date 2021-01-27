import React, { forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import { useFormieContext } from "./FormieContext";

export const FormFooter = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("form-footer")}
      ref={ref}
      {...props}
    />
  );
});
