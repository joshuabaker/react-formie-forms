import React, { forwardRef } from 'react';
import { Field as FormikField } from 'formik';
import { useFieldContext } from './FieldContext';

export const Input = forwardRef((props, ref) => {
  const { handle, placeholder, required } = useFieldContext();

  return (
    <FormikField
      ref={ref}
      type={'text'}
      name={handle}
      placeholder={placeholder}
      required={required}
      style={{ width: '100%' }}
      {...props}
    />
  );
});
