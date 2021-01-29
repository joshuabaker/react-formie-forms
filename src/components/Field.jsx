import React, { forwardRef } from "react";
import { attributesToProps, objectError } from "../utils";
import { BaseComponent } from "./BaseComponent";
import { ErrorMessage as FormikErrorMessage } from "formik";
import { FIELD_POSITION } from "../types";
import { useFieldContext } from "./FieldContext";
import { useFormieContext } from "./FormieContext";

export const Field = forwardRef(function Field(props, ref) {
  const { components, form, options } = useFormieContext();
  const field = useFieldContext();

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

  const errorPosition = form.settings.unstable_defaultFieldErrorPosition;

  const label = (
    <components.FieldLabel htmlFor={field.id}>
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
    ...attributesToProps(field.inputAttributes),
  });

  const error = (
    <components.FieldErrorMessage>
      <FormikErrorMessage name={field.handle} />
    </components.FieldErrorMessage>
  );

  const generatedChildren = (
    <>
      {errorPosition === FIELD_POSITION.ABOVE_INPUT && error}
      {labelPosition === FIELD_POSITION.ABOVE_INPUT && label}
      {(instructionsPosition === FIELD_POSITION.ABOVE_INPUT ||
        instructionsPosition === FIELD_POSITION.LEFT_INPUT) &&
        instructions}
      {input}
      {labelPosition === FIELD_POSITION.BELOW_INPUT && label}
      {(instructionsPosition === FIELD_POSITION.BELOW_INPUT ||
        instructionsPosition === FIELD_POSITION.RIGHT_INPUT) &&
        instructions}
      {errorPosition === FIELD_POSITION.BELOW_INPUT && error}
    </>
  );

  const fieldProps = {
    ...attributesToProps(field.containerAttributes),
    ref,
    ...props,
  };

  if (labelPosition === FIELD_POSITION.LEFT_INPUT) {
    return (
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
    );
  }

  if (labelPosition === FIELD_POSITION.RIGHT_INPUT) {
    return (
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
    );
  }

  return <BaseComponent {...fieldProps}>{generatedChildren}</BaseComponent>;
});
