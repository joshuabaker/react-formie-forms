import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { useFormieContext } from "./FormieContext";

export const BackButton = forwardRef((props, ref) => {
  const { isSubmitting, setPageIndex } = useFormieContext();

  function handleClick(event) {
    event.preventDefault();
    setPageIndex((page) => Math.max(0, page - 1));
  }

  return (
    <BaseComponent
      as={"button"}
      type={"button"}
      ref={ref}
      onClick={handleClick}
      disabled={isSubmitting}
      tabIndex={0}
      {...props}
    />
  );
});
