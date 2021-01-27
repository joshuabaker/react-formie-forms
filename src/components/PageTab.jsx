import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { usePageContext } from "./PageContext";
import { BaseComponent } from "./BaseComponent";

export const PageTab = forwardRef(({ children, ...props }, ref) => {
  const {
    options,
    pageIndex: currentPageIndex,
    setPageIndex,
  } = useFormieContext();

  const { pageIndex, errors } = usePageContext();

  let className = options.modifyClassName("page-tab");

  if (pageIndex === currentPageIndex) {
    className += ` ${options.modifyClassName("active")}`;
  }

  if (Object.keys(errors).length) {
    className += ` ${options.modifyClassName("errors")}`;
  }

  function handleClick(event) {
    event.preventDefault();
    setPageIndex(pageIndex);
  }

  return (
    <BaseComponent as={"li"} className={className} ref={ref} {...props}>
      <BaseComponent as={"a"} href={"#"} onClick={handleClick}>
        {children}
      </BaseComponent>
    </BaseComponent>
  );
});
