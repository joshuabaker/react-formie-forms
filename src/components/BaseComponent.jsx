import React, { Children, forwardRef } from "react";

export const BaseComponent = forwardRef((props, ref) => {
  if (!Children.count(props.children)) {
    return null;
  }

  return <div ref={ref} {...props} />;
});
