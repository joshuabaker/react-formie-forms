import React, { Children, forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import { useFormieContext } from "./FormieContext";

export const Row = forwardRef((props, ref) => {
  const { options } = useFormieContext();

  const columnCount = Children.count(props.children);

  return (
    <BaseWrapper
      style={{
        columnGap: options.styles.columnGap,
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        rowGap: options.styles.rowGap,
      }}
      ref={ref}
      {...props}
    />
  );
});
