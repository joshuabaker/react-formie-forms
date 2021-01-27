import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";

export const BackButton = forwardRef((props, ref) => {
  const { isSubmitting, options, setPageIndex } = useFormieContext();

  function handleClick(event) {
    event.preventDefault();
    setPageIndex((page) => Math.max(0, page - 1));
  }

  return (
    <button
      className={options.modifyClassName("back-button")}
      disabled={isSubmitting}
      onClick={handleClick}
      ref={ref}
      type={"button"}
      {...props}
    />
  );
});
