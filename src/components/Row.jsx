import React, { Children, forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { FieldProvider } from "./FieldContext";
import { isFunction } from "formik";
import { useFormieContext } from "./FormieContext";
import { useRowContext } from "./RowContext";

export const Row = forwardRef(({ children, ...props }, ref) => {
  const { form, options } = useFormieContext();
  const row = useRowContext();

  const columnCount = Children.count(props.children);

  return (
    <BaseComponent
      ref={ref}
      style={{
        columnGap: options.styles.columnGap,
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        rowGap: options.styles.rowGap,
      }}
      {...props}
    >
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
