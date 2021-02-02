import React, { Children, forwardRef } from "react";
import classNames from "classnames";
import { useFormieContext } from "./FormieContext";

export const BaseComponent = forwardRef(
  ({ as = "div", baseClassName, className, children, ...props }, ref) => {
    const { options } = useFormieContext();

    if (Children.count(children) === 0) {
      return null;
    }

    return React.createElement(as, {
      ref,
      children,
      className: classNames(options.modifyClassName(baseClassName), className),
      ...props,
    });
  }
);
