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
  const { type } = field;

  switch (type) {
    case FIELD_TYPE.CHECKBOXES:
    case FIELD_TYPE.FILE_UPLOAD:
      return getArrayFieldValidationSchema(field);

    case FIELD_TYPE.EMAIL:
      return getStringFieldValidationSchema(field).email();

    default:
      return getStringFieldValidationSchema(field);
  }
}

export function getArrayFieldValidationSchema(field) {
  const { errorMessage, name, required } = field;

  let validation = Yup.array().label(name);

  if (required) {
    if (errorMessage) {
      validation = validation.required(errorMessage).min(1, errorMessage);
    } else {
      validation = validation.required().min(1);
    }
  }

  return validation;
}

export function getStringFieldValidationSchema(field) {
  const { errorMessage, limit, limitAmount, limitType, name, required } = field;

  let validation = Yup.string().label(name);

  if (required) {
    if (errorMessage) {
      validation = validation.required(errorMessage);
    } else {
      validation = validation.required();
    }
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

  return validation;
}
