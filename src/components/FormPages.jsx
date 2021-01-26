import React, { forwardRef, Fragment } from "react";
import { useFormieContext } from "./FormieContext";

export const FormPages = forwardRef(({ children, ...props }, ref) => {
  const { pageIndex } = useFormieContext();

  return (
    <Fragment ref={ref} {...props}>
      {React.Children.toArray(children)[pageIndex]}
    </Fragment>
  );
});
