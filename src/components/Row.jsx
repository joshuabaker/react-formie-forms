import React, { forwardRef, Fragment } from "react";
import { BaseComponent } from "./BaseComponent";
import { FIELD_TYPE } from "../types";
import { FieldProvider } from "./FieldContext";
import { isFunction } from "formik";
import { useFormieContext } from "./FormieContext";
import { useRowContext } from "./RowContext";
import { objectError, requiredPropErrorMessage } from "../utils/helpers";

export const Row = forwardRef(({ children, ...props }, ref) => {
  const row = useRowContext();
  const { fields } = row;

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
