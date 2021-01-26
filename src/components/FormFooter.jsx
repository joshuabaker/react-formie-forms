import React, { forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import { FORM_POSITION } from "../types";
import { useFormieContext } from "./FormieContext";

export const FormFooter = forwardRef((props, ref) => {
  const { components, form, options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("form-footer")}
      ref={ref}
      {...props}
    >
      {form.settings.submitActionMessagePosition ===
        FORM_POSITION.BELOW_FORM && <components.FormSuccessMessage />}
      {form.settings.errorMessagePosition === FORM_POSITION.BELOW_FORM && (
        <components.FormErrorMessage />
      )}
    </BaseWrapper>
  );
});
