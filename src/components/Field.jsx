import React, { forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import {
  attributesToProps,
  objectError,
  requiredPropError,
} from "../utils/helpers";
import { FIELD_POSITION } from "../types";
import { useFormieContext } from "./FormieContext";
import { useFormieFieldContext } from "./FormieFieldContext";

export const Field = forwardRef((props, ref) => {
  const { components, form, options } = useFormieContext();
  const field = useFormieFieldContext();

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

  const label = <components.FieldLabel />;
  const instructions = <components.FieldInstructions />;
  const input = React.createElement(components[field.type], {
    id: options.modifyId(field.handle),
    className: options.modifyClassName("input"),
    ...attributesToProps(field.inputAttributes),
  });

  const children = (
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
      <components.FieldErrorMessage />
    </>
  );

  const fieldProps = {
    className: `${options.modifyClassName("field")} ${field.cssClasses}`,
    ...attributesToProps(field.containerAttributes),
    ref,
    ...props,
  };

  return labelPosition === FIELD_POSITION.LEFT_INPUT ? (
    <BaseWrapper
      style={{
        display: "grid",
        columnGap: options.columnGap,
        rowGap: options.rowGap,
        gridTemplateColumns: "auto 1fr",
      }}
      {...fieldProps}
    >
      {label}
      {children}
    </BaseWrapper>
  ) : labelPosition === FIELD_POSITION.RIGHT_INPUT ? (
    <BaseWrapper
      style={{
        display: "grid",
        columnGap: options.columnGap,
        rowGap: options.rowGap,
        gridTemplateColumns: "1fr auto",
      }}
      {...fieldProps}
    >
      {children}
      {label}
    </BaseWrapper>
  ) : (
    <BaseWrapper {...fieldProps}>{children}</BaseWrapper>
  );
});
