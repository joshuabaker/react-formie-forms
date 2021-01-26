import React, { forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import { FORM_POSITION } from "../types";
import { useFormieContext } from "./FormieContext";

export const FormHeader = forwardRef((props, ref) => {
  const { components, form, options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("form-header")}
      ref={ref}
      {...props}
    >
      {form.settings.displayFormTitle && <components.FormTitle />}
      {form.settings.displayPageTabs && <components.FormPageTabs />}
      {form.settings.displayPageProgress && <components.FormPageProgress />}
      {form.settings.errorMessagePosition === FORM_POSITION.ABOVE_FORM && (
        <components.FormErrorMessage />
      )}
      {form.settings.submitActionMessagePosition ===
        FORM_POSITION.ABOVE_FORM && <components.FormSuccessMessage />}
    </BaseWrapper>
  );
});
