import React, { forwardRef } from "react";
import { isEmptyChildren } from "formik";

export const BaseComponent = forwardRef(({ as = "div", ...props }, ref) => {
  if (isEmptyChildren(props.children)) {
    return null;
  }

  return React.createElement(as, { ref, ...props });
});
