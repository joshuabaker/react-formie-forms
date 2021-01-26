import React, { createContext, useContext } from 'react';

export const FormieFieldContext = createContext(null);

export const FormieFieldProvider = FormieFieldContext.Provider;

export const FormieFieldConsumer = FormieFieldContext.Consumer;

export function useFormieFieldContext() {
  return useContext(FormieFieldContext);
}
