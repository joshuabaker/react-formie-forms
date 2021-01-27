import React, { forwardRef } from "react";
import { PageContext } from "./PageContext";
import { useFormieContext } from "./FormieContext";
import { isFunction } from "formik";
import { BaseComponent } from "./BaseComponent";

export const FormPageTabs = forwardRef(({ children, ...props }, ref) => {
  const { form, options } = useFormieContext();

  return (
    <BaseComponent
      as={"ul"}
      ref={ref}
      className={options.modifyClassName("form-page-tabs")}
      {...props}
    >
      {form.pages.map((page, pageIndex) => (
        <PageContext.Provider value={{ pageIndex, ...page }} key={index}>
          {isFunction(children) ? children(page, pageIndex) : children}
        </PageContext.Provider>
      ))}
    </BaseComponent>
  );
});
