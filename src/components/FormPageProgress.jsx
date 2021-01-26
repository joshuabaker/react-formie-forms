import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const FormPageProgress = forwardRef((props, ref) => {
  const { form, pageIndex } = useFormieContext();
  const pageNumber = pageIndex + 1;
  const pageCount = form.pages.length;

  return (
    <progress max={pageCount} value={pageNumber} ref={ref} {...props}>
      {pageNumber} of {pageCount}
    </progress>
  );
});
