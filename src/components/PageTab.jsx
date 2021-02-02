import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { usePageContext } from "./PageContext";
import { BaseComponent } from "./BaseComponent";

export const PageTab = forwardRef(({ children, ...props }, ref) => {
  const { setPageIndex } = useFormieContext();
  const { pageIndex } = usePageContext();

  function handleClick(event) {
    event.preventDefault();
    setPageIndex(pageIndex);
  }

  return (
    <BaseComponent as={"li"} ref={ref} baseClassName={"page-tab"} {...props}>
      <BaseComponent as={"a"} href={"#"} onClick={handleClick}>
        {children}
      </BaseComponent>
    </BaseComponent>
  );
});
