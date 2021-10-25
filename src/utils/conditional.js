import trim from "lodash/trim";
import * as Yup from "yup";
import { objectError, requiredPropErrorMessage } from "./helpers";

export function filterConditionalField(field, formValues) {
  if (!field.enableConditions) {
    return true;
  }

  if (!field.conditions)
    objectError(requiredPropErrorMessage("conditions"), field);

  const { conditionalRule, conditions, showRule } = field.conditions;

  // Mock validation of the form values based on each condition
  const validations = conditions
    .map(({ field, condition, value }) => {
      field = trim(field, "{}");

      return Yup.object({
        [field]: getConditionValidationSchema({ condition, value }),
      });
    })
    .map((schema) => schema.isValidSync(formValues));

  // Check if the validation passes `all` or `any`
  const passes =
    conditionalRule === "all"
      ? !validations.includes(false)
      : validations.includes(true);

  return showRule === "hide" ? !passes : passes;
}

export function getConditionValidationSchema({ condition, value }) {
  switch (condition) {
    case "=":
      return Yup.string().oneOf([value]);

    case "!=":
      return Yup.string().notOneOf([value]);

    case ">":
      return Yup.number().min(value);

    case "<":
      return Yup.number().max(value);

    case "contains":
      return Yup.string().matches(`/.*${value}.*/`);

    case "startsWith":
      return Yup.string().matches(`/^${value}/`);

    case "endsWith":
      return Yup.string().matches(`/${value}$/`);
  }
}
