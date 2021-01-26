import fetch from "cross-fetch";
import { requiredPropError } from "./helpers";

export const submitForm = (url) => (body) => rawSubmitForm(url, body);

export async function rawSubmitForm(url, body) {
  return await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: typeof body === "object" ? JSON.stringify(body) : body,
  });
}

export const nextApiSubmitForm = (url) => async (req, res) => {
  if (!url) requiredPropError("url");

  const response = await rawSubmitForm(url, req.body);
  const body = await response.json();

  res.status(response.status).json(body);
};
