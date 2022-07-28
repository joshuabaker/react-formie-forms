import trim from "lodash/trim";
import { objectError, requiredPropErrorMessage } from "./helpers";

export function shouldShowConditionalField(field, formValues) {
  if (!field?.enableConditions) {
    return true;
  }

  const fieldConditions = field?.conditions;

  if (!fieldConditions)
    objectError(requiredPropErrorMessage("conditions"), field);

  return testAllConditions(fieldConditions, formValues);
}

export function shouldShowConditionalPage(page, formValues) {
  if (!page?.settings?.enablePageConditions) {
    return true;
  }

  const pageConditions = page?.settings?.pageConditions;

  if (!pageConditions)
    objectError(requiredPropErrorMessage("settings.pageConditions"), page);

  return testAllConditions(pageConditions, formValues);
}

function testAllConditions(
  { conditionRule, conditions, showRule },
  formValues
) {
  const results = conditions.map(({ field, condition, value }) => {
    field = trim(field, "{}");
    return testCondition({ condition, value }, formValues[field]);
  });

  // Check if the validation passes `all` or `any`
  const passes =
    conditionRule === "all" ? !results.includes(false) : results.includes(true);

  return showRule === "hide" ? !passes : passes;
}

function testCondition({ condition, value }, formValue) {
  switch (condition) {
    case "=":
      return value.toString() === formValue.toString();

    case "!=":
      return value.toString() !== formValue.toString();

    case ">":
      return parseFloat(value) > parseFloat(formValue);

    case "<":
      return parseFloat(value) < parseFloat(formValue);

    case "contains":
      return formValue.includes(value);

    case "startsWith":
      return formValue.toString().startsWith(value);

    case "endsWith":
      return formValue.toString().endsWith(value);
  }
}
