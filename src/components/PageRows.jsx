import React, { forwardRef } from 'react';
import { BaseComponent } from './BaseComponent';
import { isFunction } from 'formik';
import { RowProvider } from './RowContext';
import { useFormieContext } from './FormieContext';

export const PageRows = forwardRef(({ children, ...props }, ref) => {
  const { page } = useFormieContext();

  return (
    <BaseComponent ref={ref} {...props}>
      {page.rows.map((row, rowIndex) => (
        <RowProvider value={row} key={rowIndex}>
          {isFunction(children) ? children(row, rowIndex) : children}
        </RowProvider>
      ))}
    </BaseComponent>
  );
});
