import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { useFormieContext } from "./FormieContext";

export const SubmitButton = forwardRef((props, ref) => {
  const { isSubmitting } = useFormieContext();

  return (
    <BaseComponent
      as={"button"}
      type={"submit"}
      ref={ref}
      disabled={isSubmitting}
      tabIndex={0}
      baseClassName={"submit-button"}
      {...props}
    />
  );
});
