import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { useFormieFieldContext } from "./FormieFieldContext";

export const FieldLabel = forwardRef((props, ref) => {
  const { options } = useFormieContext();
  const { name, handle } = useFormieFieldContext();

  return (
    <label
      className={options.modifyClassName("field-label")}
      htmlFor={options.modifyId(handle)}
      ref={ref}
      {...props}
    >
      {name}
    </label>
  );
});
