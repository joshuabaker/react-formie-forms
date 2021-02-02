import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { FieldProvider } from "./FieldContext";
import { isFunction } from "formik";
import { useFormieContext } from "./FormieContext";
import { useRowContext } from "./RowContext";

export const Row = forwardRef(({ children, ...props }, ref) => {
  const { form, options } = useFormieContext();
  const row = useRowContext();

  return (
    <BaseComponent ref={ref} baseClassName={"row"} {...props}>
      {row.fields.map((field, fieldIndex) => (
        <FieldProvider
          value={{
            fieldIndex,
            id: options.modifyId(field.handle, form.handle),
            ...field,
          }}
          key={fieldIndex}
        >
          {isFunction(children) ? children(field, fieldIndex) : children}
        </FieldProvider>
      ))}
    </BaseComponent>
  );
});
