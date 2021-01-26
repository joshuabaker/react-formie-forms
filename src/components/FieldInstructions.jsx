import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { useFormieFieldContext } from "./FormieFieldContext";

export const FieldInstructions = forwardRef((props, ref) => {
  const { options } = useFormieContext();
  const { instructions } = useFormieFieldContext();

  if (!instructions) {
    return null;
  }

  return (
    <div
      className={options.modifyClassName("field-instructions")}
      ref={ref}
      {...props}
    >
      {instructions}
    </div>
  );
});
