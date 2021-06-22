import { serialize } from "object-to-formdata";

export const submitForm = (url) => (values) => rawSubmitForm(url, values);

export const rawSubmitForm = (url, values) =>
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
    },
    body: serializeFormValues(values),
  });

export const serializeFormValues = (values) =>
  serialize(values, {
    booleansAsIntegers: true,
    indices: true,
  });
