import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const FormTitle = forwardRef((props, ref) => {
  const { form, options } = useFormieContext();

  if (!form.title) {
    return null;
  }

  return (
    <div className={options.modifyClassName("form-title")} ref={ref} {...props}>
      {form.title}
    </div>
  );
});
