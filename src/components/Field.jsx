import classNames from "classnames";
import {
  ErrorMessage as FormikErrorMessage,
  useField as useFormikField,
} from "formik";
import React, { forwardRef } from "react";
import { FIELD_POSITION, FIELD_TYPE } from "../types";
import {
  attributesToProps,
  objectError,
  requiredPropErrorMessage,
} from "../utils/helpers";
import { BaseComponent } from "./BaseComponent";
import { useFieldContext } from "./FieldContext";
import { useFormieContext } from "./FormieContext";

export const Field = forwardRef(function Field({ className, ...props }, ref) {
  const { components, form, options } = useFormieContext();
  const field = useFieldContext();
  const [, meta] = useFormikField(field?.handle);

  if (!field.handle) objectError(requiredPropErrorMessage("handle"), field);
  if (!field.type) objectError(requiredPropErrorMessage("type"), field);
  if (!components[field.type]) objectError("No component provided", field.type);

  const inputId = options.modifyId(field.handle, form.handle);

  const input = React.createElement(components[field.type], {
    id: inputId,
    ...attributesToProps(field.inputAttributes),
  });

  if (field.type === FIELD_TYPE.HIDDEN) {
    return input;
  }

  const labelPosition = field.labelPosition
    ? field.labelPosition
    : form.settings.defaultLabelPosition;

  const instructionsPosition = field.instructionsPosition
    ? field.instructionsPosition
    : form.settings.defaultInstructionsPosition;

  const errorPosition = form.settings.unstable_defaultFieldErrorPosition;

  const label = field.name ? (
    <components.FieldLabel htmlFor={inputId}>
      {field.name}
    </components.FieldLabel>
  ) : null;

  const instructions = field.instructions ? (
    <components.FieldInstructions>
      {field.instructions}
    </components.FieldInstructions>
  ) : null;

  const error =
    meta.error && (form.submitCount || meta.touched) ? (
      <components.FieldErrorMessage>
        <FormikErrorMessage name={field.handle} />
      </components.FieldErrorMessage>
    ) : null;

  return (
    <BaseComponent
      ref={ref}
      className={classNames(
        options.modifyClassName("field"),
        {
          [options.modifyClassName("error")]: meta.error,
          [options.modifyClassName("touched")]: meta.touched,
        },
        className
      )}
      {...attributesToProps(field.containerAttributes)}
      {...props}
    >
      {labelPosition !== FIELD_POSITION.BELOW_INPUT &&
        labelPosition !== FIELD_POSITION.RIGHT_INPUT &&
        label}
      {instructionsPosition !== FIELD_POSITION.BELOW_INPUT &&
        instructionsPosition !== FIELD_POSITION.RIGHT_INPUT &&
        instructions}
      {errorPosition !== FIELD_POSITION.BELOW_INPUT &&
        errorPosition !== FIELD_POSITION.RIGHT_INPUT &&
        error}
      {input}
      {(labelPosition === FIELD_POSITION.BELOW_INPUT ||
        labelPosition === FIELD_POSITION.RIGHT_INPUT) &&
        label}
      {(instructionsPosition === FIELD_POSITION.BELOW_INPUT ||
        instructionsPosition === FIELD_POSITION.RIGHT_INPUT) &&
        instructions}
      {(errorPosition === FIELD_POSITION.BELOW_INPUT ||
        errorPosition === FIELD_POSITION.RIGHT_INPUT) &&
        error}
    </BaseComponent>
  );
});
