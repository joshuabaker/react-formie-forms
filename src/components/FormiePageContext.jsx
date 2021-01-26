import React, { createContext, useContext } from "react";
import pick from "lodash/pick";
import { getFieldHandles, getPageFields } from "../utils/helpers";
import { useFormieContext } from "./FormieContext";

export const FormiePageContext = createContext(null);

export const FormiePageProvider = FormiePageContext.Provider;

export const FormiePageConsumer = FormiePageContext.Consumer;

export function useFormiePageContext() {
  const { errors, values } = useFormieContext();
  const page = useContext(FormiePageContext);

  const pageFieldHandles = getFieldHandles(getPageFields(page));

  return {
    errors: pick(errors, pageFieldHandles),
    values: pick(values, pageFieldHandles),
    ...page,
  };
}
