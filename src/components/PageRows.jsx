import React, { forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import { useFormieContext } from "./FormieContext";

export const PageRows = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("page-rows")}
      ref={ref}
      {...props}
    />
  );
});
