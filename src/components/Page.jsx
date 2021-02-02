import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseComponent } from "./BaseComponent";

export const Page = forwardRef(({ children, ...props }, ref) => {
  const { isSubmitting } = useFormieContext();

  return (
    <BaseComponent ref={ref} baseClassName={"page"} {...props}>
      <fieldset disabled={isSubmitting}>{children}</fieldset>
    </BaseComponent>
  );
});
