import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { isFunction } from "formik";
import { PageProvider } from "./PageContext";
import { useFormieContext } from "./FormieContext";

export const FormPageTabs = forwardRef(({ children, ...props }, ref) => {
  const { form } = useFormieContext();

  return (
    <BaseComponent
      ref={ref}
      as={"ul"}
      baseClassName={"form-page-tabs"}
      {...props}
    >
      {form.pages.map((page, pageIndex) => (
        <PageProvider value={{ pageIndex, ...page }}>
          {isFunction(children) ? children(page, pageIndex) : children}
        </PageProvider>
      ))}
    </BaseComponent>
  );
});
