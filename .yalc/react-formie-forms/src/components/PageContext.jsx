import React, { createContext, useContext } from "react";
import pick from "lodash/pick";
import { getFieldHandles, getPageFields } from "../utils/helpers";
import { useFormieContext } from "./FormieContext";

export const PageContext = createContext(null);

export const PageProvider = PageContext.Provider;

export const PageConsumer = PageContext.Consumer;

export function usePageContext() {
  const { errors, values } = useFormieContext();
  const page = useContext(PageContext);

  const pageFieldHandles = getFieldHandles(getPageFields(page));

  return {
    errors: pick(errors, pageFieldHandles),
    values: pick(values, pageFieldHandles),
    ...page,
  };
}
