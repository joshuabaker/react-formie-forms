import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const PageTitle = forwardRef((props, ref) => {
  const { options, page } = useFormieContext();

  if (!page.name) {
    return null;
  }

  return (
    <div className={options.modifyClassName("page-title")} ref={ref} {...props}>
      {page.name}
    </div>
  );
});
