import React, { useEffect, useMemo, useState } from "react";
import {
  getFormDefaultValues,
  getFormValidationSchema,
  getPageFieldHandles,
  prefix,
  requiredPropError,
} from "./utils";
import {
  BackButton,
  ButtonGroup,
  Field,
  FieldErrorMessage,
  FieldInstructions,
  FieldLabel,
  Form,
  FormErrorMessage,
  FormFooter,
  FormHeader,
  FormPageProgress,
  FormPages,
  FormPageTabs,
  FormSuccessMessage,
  FormTitle,
  Input,
  Page,
  PageFooter,
  PageHeader,
  PageRows,
  PageTab,
  PageTitle,
  Row,
  SubmitButton,
} from "./components";
import merge from "lodash/merge";
import { BUTTON_POSITION, FIELD_POSITION, FIELD_TYPE } from "./types";
import { useFormik } from "formik";

export const defaultComponents = {
  [FIELD_TYPE.EMAIL]: (props) => <Input type="email" {...props} />,
  [FIELD_TYPE.SINGLE_LINE_TEXT]: Input,
  BackButton: BackButton,
  ButtonGroup: ButtonGroup,
  Field: Field,
  FieldErrorMessage: FieldErrorMessage,
  FieldInstructions: FieldInstructions,
  FieldLabel: FieldLabel,
  Form: Form,
  FormErrorMessage: FormErrorMessage,
  FormFooter: FormFooter,
  FormHeader: FormHeader,
  FormPageProgress: FormPageProgress,
  FormPages: FormPages,
  FormPageTabs: FormPageTabs,
  FormSuccessMessage: FormSuccessMessage,
  FormTitle: FormTitle,
  Page: Page,
  PageFooter: PageFooter,
  PageHeader: PageHeader,
  PageRows: PageRows,
  PageTab: PageTab,
  PageTitle: PageTitle,
  Row: Row,
  SubmitButton: SubmitButton,
};

const defaultForm = {
  settings: {
    defaultInstructionsPosition: FIELD_POSITION.ABOVE_INPUT,
    defaultLabelPosition: FIELD_POSITION.ABOVE_INPUT,
    errorMessagePosition: FIELD_POSITION.ABOVE_FORM,
    submitActionMessagePosition: FIELD_POSITION.ABOVE_FORM,
  },
};

const defaultPage = {
  settings: {
    backButtonLabel: "Back",
    buttonsPosition: BUTTON_POSITION.LEFT,
    showBackButton: true,
    submitButtonLabel: "Submit",
  },
};

const defaultOptions = {
  modifyId: prefix,
  modifyClassName: prefix,
  styles: {
    columnGap: "1rem",
    rowGap: "1rem",
  },
};

export function useFormieForm({
  components = defaultComponents,
  form: _form,
  initialPageIndex = 0,
  initialSubmissionId,
  initialValues,
  onReset = () => {},
  onSubmit,
  options: _options,
  validationSchema: _validationSchema,
  ...props
}) {
  if (!_form) requiredPropError("form");
  if (!_form.handle) requiredPropError("form.handle");
  if (!_form.pages) requiredPropError("form.pages");
  if (!onSubmit) requiredPropError("onSubmit");

  const [formErrorMessage, setFormErrorMessage] = useState();
  const [formSuccessMessage, setFormSuccessMessage] = useState();
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [submissionId, setSubmissionId] = useState(initialSubmissionId);

  const form = useMemo(() => {
    return merge(defaultForm, _form);
  }, [_form]);

  const page = useMemo(() => {
    return merge(defaultPage, form.pages[pageIndex]);
  }, [form, pageIndex]);

  const options = useMemo(() => {
    return merge(defaultOptions, _options);
  }, [_options]);

  const validationSchema = useMemo(() => {
    return _validationSchema ?? getFormValidationSchema(form);
  }, [form]);

  const pageValidationSchema = useMemo(() => {
    return validationSchema.pick(getPageFieldHandles(page));
  }, [validationSchema, page]);

  const defaultInitialValues = getFormDefaultValues(form);

  // ❤ Formik
  const formik = useFormik({
    initialValues: initialValues ?? defaultInitialValues,
    onSubmit: handleSubmit,
    onReset: handleReset,
    validationSchema: pageValidationSchema,
    ...props,
  });

  const imperativeValues = {
    handle: form.handle,
    pageIndex,
    submissionId,
  };

  const imperativeMethods = {
    setFormErrorMessage,
    setFormSuccessMessage,
    setPageIndex,
    setSubmissionId,
  };

  function handleReset(fields, actions) {
    setFormErrorMessage(undefined);
    setFormSuccessMessage(undefined);
    setPageIndex(0);
    setSubmissionId(undefined);

    onReset(
      { ...imperativeValues, fields },
      { ...imperativeMethods, ...actions }
    );
  }

  async function handleSubmit(fields, actions) {
    setFormSuccessMessage(undefined);
    setFormErrorMessage(undefined);

    return onSubmit(
      { ...imperativeValues, fields },
      { ...imperativeMethods, ...actions }
    )
      .then((response) => response.json())
      .then((data) => {
        actions.setSubmitting(false);
        setSubmissionId(data.submissionId);

        if (!data.success) {
          actions.setErrors(data.errors);
          setFormSuccessMessage(undefined);
          return Promise.reject(data.errorMessage ?? data.error);
        }

        if (pageIndex === form.pages.length - 1) {
          // Reset the form
          setFormErrorMessage(undefined);
          setFormSuccessMessage(data.submitActionMessage);
          setPageIndex(0);
          setSubmissionId(undefined);
        } else {
          // Go to the next page
          setPageIndex((page) => Math.min(page + 1, form.pages.length - 1));
        }

        return Promise.resolve(data);
      })
      .catch((error) => {
        setFormErrorMessage(error);
      });
  }

  // Clear the form success and error messages when values change
  useEffect(() => {
    setFormSuccessMessage(undefined);
    setFormErrorMessage(undefined);
  }, [formik.values]);

  return {
    components,
    form,
    formErrorMessage,
    formSuccessMessage,
    options,
    page,
    pageIndex,
    pageValidationSchema,
    setFormErrorMessage,
    setFormSuccessMessage,
    setPageIndex,
    setSubmissionId,
    submissionId,
    validationSchema,
    ...formik,
  };
}
