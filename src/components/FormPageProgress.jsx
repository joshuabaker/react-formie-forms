import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { useFormieContext } from "./FormieContext";

export const FormPageProgress = forwardRef((props, ref) => {
  const { form, pageIndex } = useFormieContext();
  const pageNumber = pageIndex + 1;
  const pageCount = form.pages.length;

  return (
    <BaseComponent
      as={"progress"}
      ref={ref}
      max={pageCount}
      value={pageNumber}
      {...props}
    />
  );
});
