import trim from "lodash/trim";
import * as Yup from "yup";
import { objectError, requiredPropErrorMessage } from "./helpers";

export function shouldShowConditionalField(field, formValues) {
  if (!field?.enableConditions) {
    return true;
  }

  const fieldConditions = field?.conditions;

  if (!fieldConditions)
    objectError(requiredPropErrorMessage("conditions"), field);

  return validateShouldShowConditions(fieldConditions, formValues);
}

export function shouldShowConditionalPage(page, formValues) {
  if (!page?.settings?.enablePageConditions) {
    return true;
  }

  const pageConditions = page?.settings?.pageConditions;

  if (!pageConditions)
    objectError(requiredPropErrorMessage("settings.pageConditions"), page);

  return validateShouldShowConditions(pageConditions, formValues);
}

export function validateShouldShowConditions(elementConditions, formValues) {
  const { conditionRule, conditions, showRule } = elementConditions;

  if (!conditionRule)
    objectError(requiredPropErrorMessage("conditionRule"), elementConditions);
  if (!conditions)
    objectError(requiredPropErrorMessage("conditions"), elementConditions);
  if (!showRule)
    objectError(requiredPropErrorMessage("showRule"), elementConditions);

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
    conditionRule === "all"
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
