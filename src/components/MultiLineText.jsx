import React, { forwardRef } from "react";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import { useField as useFormikField } from "formik";
import { useFieldContext } from "./FieldContext";
import { useFormieContext } from "./FormieContext";

export const MultiLineText = forwardRef(
  ({ rows = 2, className, ...props }, ref) => {
    const { options } = useFormieContext();
    const { handle, placeholder, required, limitAmount } = useFieldContext();
    const [field] = useFormikField(handle);

    return (
      <TextareaAutosize
        ref={ref}
        placeholder={placeholder}
        required={required}
        maxLength={limitAmount}
        minRows={rows}
        style={{ width: "100%" }}
        className={classNames(
          options.modifyClassName("input-textarea"),
          className
        )}
        {...field}
        {...props}
      />
    );
  }
);
