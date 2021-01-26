import React, { forwardRef } from "react";
import { FormiePageContext } from "./FormiePageContext";
import { useFormieContext } from "./FormieContext";

export const FormPageTabs = forwardRef((props, ref) => {
  const { components, form, options } = useFormieContext();

  return (
    <ul
      className={options.modifyClassName("form-page-tabs")}
      ref={ref}
      {...props}
    >
      {form.pages.map((page, index) => (
        <FormiePageContext.Provider
          value={{ pageIndex: index, ...page }}
          key={index}
        >
          <components.PageTab />
        </FormiePageContext.Provider>
      ))}
    </ul>
  );
});
