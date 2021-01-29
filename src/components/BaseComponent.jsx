import React, { Children, forwardRef } from "react";

export const BaseComponent = forwardRef(({ as = "div", ...props }, ref) => {
  const { children } = props;

  if (Children.count(children) === 0 || !children) {
    return null;
  }

  return React.createElement(as, { ref, ...props });
});
