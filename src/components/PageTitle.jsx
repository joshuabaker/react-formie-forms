import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseWrapper } from "./BaseWrapper";

export const PageTitle = forwardRef((props, ref) => {
  const { options, page } = useFormieContext();

  if (!page.name) {
    return null;
  }

  return (
    <BaseWrapper
      className={options.modifyClassName("page-title")}
      ref={ref}
      {...props}
    >
      {page.name}
    </BaseWrapper>
  );
});
