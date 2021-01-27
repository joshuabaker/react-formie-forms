import React, { forwardRef } from "react";
import { attributesToProps, objectError } from "../utils";
import { BaseComponent } from "./BaseComponent";
import { FIELD_POSITION } from "../types";
import { useField as useFormikField } from "formik";
import { useFieldContext } from "./FieldContext";
import { useFormieContext } from "./FormieContext";

export const Field = forwardRef((props, ref) => {
  const { components, form, options } = useFormieContext();
  const field = useFieldContext();
  const [, meta] = useFormikField(props);

  if (!field.handle) {
    objectError("field.handle is required", field);
  }

  if (!field.type) {
    objectError("field.type is required", field);
  }

  if (!components[field.type]) {
    objectError("No component provided", field.type);
  }

  const labelPosition = field.labelPosition
    ? field.labelPosition
    : form.settings.defaultLabelPosition;

  const instructionsPosition = field.instructionsPosition
    ? field.instructionsPosition
    : form.settings.defaultInstructionsPosition;

  const label = (
    <components.FieldLabel hrefFor={options.modifyId(field.handle)}>
      {field.name}
    </components.FieldLabel>
  );

  const instructions = (
    <components.FieldInstructions>
      {field.instructions}
    </components.FieldInstructions>
  );

  const input = React.createElement(components[field.type], {
    id: options.modifyId(field.handle),
    className: options.modifyClassName("input"),
    ...attributesToProps(field.inputAttributes),
  });

  const error = (
    <components.FieldErrorMessage>
      {meta.touched ? meta.error : null}
    </components.FieldErrorMessage>
  );

  const generatedChildren = (
    <>
      {labelPosition === FIELD_POSITION.ABOVE_INPUT && label}
      {(instructionsPosition === FIELD_POSITION.ABOVE_INPUT ||
        instructionsPosition === FIELD_POSITION.LEFT_INPUT) &&
        instructions}
      {input}
      {labelPosition === FIELD_POSITION.BELOW_INPUT && label}
      {(instructionsPosition === FIELD_POSITION.BELOW_INPUT ||
        instructionsPosition === FIELD_POSITION.RIGHT_INPUT) &&
        instructions}
      {error}
    </>
  );

  const fieldProps = {
    className: `${options.modifyClassName("field")} ${field.cssClasses}`,
    ...attributesToProps(field.containerAttributes),
    ref,
    ...props,
  };

  return labelPosition === FIELD_POSITION.LEFT_INPUT ? (
    <BaseComponent
      style={{
        display: "grid",
        columnGap: options.columnGap,
        rowGap: options.rowGap,
        gridTemplateColumns: "auto 1fr",
      }}
      {...fieldProps}
    >
      {label}
      {generatedChildren}
    </BaseComponent>
  ) : labelPosition === FIELD_POSITION.RIGHT_INPUT ? (
    <BaseComponent
      style={{
        display: "grid",
        columnGap: options.columnGap,
        rowGap: options.rowGap,
        gridTemplateColumns: "1fr auto",
      }}
      {...fieldProps}
    >
      {generatedChildren}
      {label}
    </BaseComponent>
  ) : (
    <BaseComponent {...fieldProps}>{generatedChildren}</BaseComponent>
  );
});
