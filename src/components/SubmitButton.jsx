import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const SubmitButton = forwardRef((props, ref) => {
  const { isSubmitting, options, page } = useFormieContext();

  return (
    <button
      className={options.modifyClassName("submit-button")}
      disabled={isSubmitting}
      type={"submit"}
      ref={ref}
      {...props}
    >
      {page.settings.submitButtonLabel}
    </button>
  );
});
