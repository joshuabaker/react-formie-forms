import mapValues from "lodash/mapValues";
import * as Yup from "yup";
import { FIELD_TYPE } from "../types";
import { getFormFields, keyByHandle } from "./helpers";

export function getFormValidationSchema(form) {
  const fields = keyByHandle(getFormFields(form));
  const validation = mapValues(fields, getFieldValidationSchema);
  return Yup.object().shape(validation);
}

export function getFieldValidationSchema(field) {
  const { errorMessage, limit, limitAmount, limitType, name, required, type } =
    field;

  let validation;

  switch (type) {
    case FIELD_TYPE.CHECKBOXES:
    case FIELD_TYPE.FILE_UPLOAD:
      validation = Yup.array();
      if (required) {
        validation = validation.min(1);
      }
      break;

    case FIELD_TYPE.EMAIL:
      validation = Yup.string().email();
      break;

    default:
      validation = Yup.string();
      break;
  }

  if (required) {
    validation = validation.required(errorMessage);
  }

  if (limit) {
    switch (limitType) {
      case "characters":
        validation = validation.test(
          "limit-characters",
          ({ path }) =>
            `${path} must be at most ${limitAmount} ${
              limitAmount < 2 ? "character" : "characters"
            }`,
          (value) => value.length <= limitAmount
        );
        break;

      case "words":
        validation = validation.test(
          "limit-words",
          ({ path }) =>
            `${path} must be at most ${limitAmount} ${
              limitAmount < 2 ? "word" : "words"
            }`,
          (value) => value && value.split(/\s/).length <= limitAmount
        );
        break;
    }
  }

  return validation.label(name);
}
