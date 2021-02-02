import { serialize } from "object-to-formdata";

export const submitForm = (url) => (values) => rawSubmitForm(url, values);

export function rawSubmitForm(url, values) {
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
    },
    body: serialize(values),
  });
}
