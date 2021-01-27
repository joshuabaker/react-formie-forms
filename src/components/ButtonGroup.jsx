import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { useFormieContext } from "./FormieContext";
import { BUTTON_POSITION } from "../types";

export const ButtonGroup = forwardRef((props, ref) => {
  const { page, options } = useFormieContext();

  const justifyContent = getButtonGroupJustifyContent(
    page.settings.buttonsPosition
  );

  return (
    <BaseComponent
      className={options.modifyClassName("button-group")}
      ref={ref}
      style={{
        display: "grid",
        gridAutoFlow: "column",
        columnGap: options.styles.columnGap,
        rowGap: options.styles.rowGap,
        justifyContent,
      }}
      {...props}
    />
  );
});

export function getButtonGroupJustifyContent(buttonsPosition) {
  switch (buttonsPosition) {
    case BUTTON_POSITION.CENTER:
      return "center";
    case BUTTON_POSITION.LEFT_RIGHT:
      return "space-between";
    case BUTTON_POSITION.RIGHT:
      return "flex-end";
    default:
      return "flex-start";
  }
}
