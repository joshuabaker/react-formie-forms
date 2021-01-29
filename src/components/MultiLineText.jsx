import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Input } from "./Input";

export const MultiLineText = forwardRef(({ rows = 2, ...props }, ref) => {
  return (
    <Input component={TextareaAutosize} minRows={rows} ref={ref} {...props} />
  );
});
