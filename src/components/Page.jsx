import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const Page = forwardRef(({ children, ...props }, ref) => {
  const { isSubmitting, options } = useFormieContext();

  return (
    <div className={options.modifyClassName("page")} ref={ref} {...props}>
      <fieldset disabled={isSubmitting}>{children}</fieldset>
    </div>
  );
});
