import React, { createContext, useContext } from 'react';
import { FormikProvider } from 'formik';

export const FormieContext = createContext(null);

export function FormieProvider({ value, ...props }) {
  return (
    <FormikProvider value={value}>
      <FormieContext.Provider value={value} {...props} />
    </FormikProvider>
  );
}

export const FormieConsumer = FormieContext.Consumer;

export function useFormieContext() {
  return useContext(FormieContext);
}
