import React, { forwardRef } from "react";
import { getButtonGroupJustifyContent } from "../utils/helpers";
import { BaseComponent } from "./BaseComponent";
import { usePageContext } from "./PageContext";

export const ButtonGroup = forwardRef((props, ref) => {
  const page = usePageContext();
  const buttonsPosition = page.settings.buttonsPosition;

  return (
    <BaseComponent
      ref={ref}
      baseClassName={"button-group"}
      style={{
        display: "flex",
        justifyContent: getButtonGroupJustifyContent(buttonsPosition),
      }}
      {...props}
    />
  );
});
