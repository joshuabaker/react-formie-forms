import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const PageFooter = forwardRef((props, ref) => {
  const { components, pageIndex, page, options } = useFormieContext();

  return (
    <div
      className={options.modifyClassName("page-footer")}
      ref={ref}
      {...props}
    >
      <components.ButtonGroup>
        {pageIndex > 0 && page.settings.showBackButton && (
          <components.BackButton />
        )}
        <components.SubmitButton />
      </components.ButtonGroup>
    </div>
  );
});
