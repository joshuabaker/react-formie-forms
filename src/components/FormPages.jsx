import React, { forwardRef, Fragment } from "react";
import { useFormieContext } from "./FormieContext";
import { isFunction } from "formik";
import { PageContext } from "./PageContext";

export const FormPages = forwardRef(({ children, ...props }, ref) => {
  const { page, pageIndex } = useFormieContext();

  if (isFunction(children)) {
    children = children(page, pageIndex);
  }

  const currentPage = React.Children.toArray(children)[pageIndex];

  return (
    <Fragment ref={ref} key={pageIndex} {...props}>
      <PageContext.Provider value={{ pageIndex, ...page }}>
        {currentPage}
      </PageContext.Provider>
    </Fragment>
  );
});
