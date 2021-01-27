import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { BaseComponent } from "./BaseComponent";

export const BackButton = forwardRef((props, ref) => {
  const { isSubmitting, options, setPageIndex } = useFormieContext();

  function handleClick(event) {
    event.preventDefault();
    setPageIndex((page) => Math.max(0, page - 1));
  }

  return (
    <BaseComponent
      as={"button"}
      ref={ref}
      className={options.modifyClassName("back-button")}
      disabled={isSubmitting}
      onClick={handleClick}
      type={"button"}
      {...props}
    />
  );
});
