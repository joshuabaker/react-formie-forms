import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { useFormiePageContext } from "./FormiePageContext";

export const PageTab = forwardRef((props, ref) => {
  const {
    options,
    pageIndex: currentPageIndex,
    setPageIndex,
  } = useFormieContext();

  const { pageIndex, errors, name } = useFormiePageContext();

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
    <li className={className} ref={ref} {...props}>
      <a href={"#"} onClick={handleClick}>
        {name}
      </a>
    </li>
  );
});
