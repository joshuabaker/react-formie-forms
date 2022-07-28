import { isFunction } from "formik";
import React, { forwardRef, Fragment } from "react";
import { FIELD_TYPE } from "../types";
import { filterShouldShow } from "../utils/helpers";
import { BaseComponent } from "./BaseComponent";
import { FieldProvider } from "./FieldContext";
import { useFormieContext } from "./FormieContext";
import { useRowContext } from "./RowContext";

export const Row = forwardRef(({ children, ...props }, ref) => {
  const row = useRowContext();
  const fields = row.fields.filter(filterShouldShow);

  if (fields.length === 0) {
    return null;
  }

  const hiddenFields = fields.filter(({ type }) => type === FIELD_TYPE.HIDDEN);
  const visibleFields = fields.filter(({ type }) => type !== FIELD_TYPE.HIDDEN);

  return (
    <Fragment ref={ref}>
      {hiddenFields.length > 0 && (
        <RowFields fields={hiddenFields}>{children}</RowFields>
      )}
      {visibleFields.length > 0 && (
        <BaseComponent baseClassName={"row"} {...props}>
          <RowFields fields={visibleFields}>{children}</RowFields>
        </BaseComponent>
      )}
    </Fragment>
  );
});

function RowFields({ fields, children }) {
  const { form, options } = useFormieContext();

  return fields.map((field, fieldIndex) => (
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
  ));
}
