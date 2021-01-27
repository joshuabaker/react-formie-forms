import React, { createContext, useContext } from "react";

export const RowContext = createContext(null);

export const RowProvider = RowContext.Provider;

export const RowConsumer = RowContext.Consumer;

export function useRowContext() {
  return useContext(RowContext);
}
