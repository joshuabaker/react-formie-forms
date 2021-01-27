import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseComponent } from "./BaseComponent";

export const PageTitle = forwardRef((props, ref) => {
  const { options, page } = useFormieContext();

  if (!page.name) {
    return null;
  }

  return (
    <BaseComponent
      className={options.modifyClassName("page-title")}
      ref={ref}
      {...props}
    >
      {page.name}
    </BaseComponent>
  );
});
