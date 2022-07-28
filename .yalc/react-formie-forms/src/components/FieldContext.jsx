import React, { createContext, useContext } from "react";

export const FieldContext = createContext(null);

export const FieldProvider = FieldContext.Provider;

export const FieldConsumer = FieldContext.Consumer;

export function useFieldContext() {
  return useContext(FieldContext);
}
