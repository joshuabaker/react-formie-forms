import React, { forwardRef, Fragment } from "react";
import { BaseComponent } from "./BaseComponent";
import { isFunction } from "formik";
import { RowProvider } from "./RowContext";
import { useFormieContext } from "./FormieContext";

export const PageRows = forwardRef(({ children, ...props }, ref) => {
  const { page, options } = useFormieContext();

  return (
    <BaseComponent
      className={options.modifyClassName("page-rows")}
      ref={ref}
      {...props}
    >
      {page.rows.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          <RowProvider value={{ rowIndex, ...row }}>
            {isFunction(children) ? children(row, rowIndex) : children}
          </RowProvider>
        </Fragment>
      ))}
    </BaseComponent>
  );
});
