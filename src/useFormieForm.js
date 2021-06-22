import React, { useEffect, useMemo, useState } from "react";
import merge from "lodash/merge";
import {
  defaultModifyClassName,
  defaultModifyId,
  getFormDefaultValues,
  getPageFieldHandles,
  objectError,
  requiredPropError,
  requiredPropErrorMessage,
} from "./utils/helpers";
import { BackButton } from "./components/BackButton";
import { BUTTON_POSITION, FIELD_POSITION, FIELD_TYPE } from "./types";
import { ButtonGroup } from "./components/ButtonGroup";
import { Field } from "./components/Field";
import { FieldErrorMessage } from "./components/FieldErrorMessage";
import { FieldInstructions } from "./components/FieldInstructions";
import { FieldLabel } from "./components/FieldLabel";
import { FileUpload } from "./components/FileUpload";
import { Form } from "./components/Form";
import { FormErrorMessage } from "./components/FormErrorMessage";
import { FormFooter } from "./components/FormFooter";
import { FormHeader } from "./components/FormHeader";
import { FormPageProgress } from "./components/FormPageProgress";
import { FormPages } from "./components/FormPages";
import { FormPageTabs } from "./components/FormPageTabs";
import { FormSuccessMessage } from "./components/FormSuccessMessage";
import { FormTitle } from "./components/FormTitle";
import { getFormValidationSchema } from "./utils/validation";
import { Input } from "./components/Input";
import { MultiLineText } from "./components/MultiLineText";
import { Page } from "./components/Page";
import { PageFooter } from "./components/PageFooter";
import { PageHeader } from "./components/PageHeader";
import { PageRows } from "./components/PageRows";
import { PageTab } from "./components/PageTab";
import { PageTitle } from "./components/PageTitle";
import { Row } from "./components/Row";
import { SubmitButton } from "./components/SubmitButton";
import { useFormik } from "formik";

export const defaultComponents = {
  [FIELD_TYPE.EMAIL]: (props) => <Input type={"email"} {...props} />,
  [FIELD_TYPE.FILE_UPLOAD]: FileUpload,
  [FIELD_TYPE.HIDDEN]: (props) => <Input type={"hidden"} {...props} />,
  [FIELD_TYPE.MULTI_LINE_TEXT]: MultiLineText,
  [FIELD_TYPE.SINGLE_LINE_TEXT]: Input,
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
  Page,
  PageFooter,
  PageHeader,
  PageRows,
  PageTab,
  PageTitle,
  Row,
  SubmitButton,
};

const defaultForm = {
  settings: {
    defaultInstructionsPosition: FIELD_POSITION.ABOVE_INPUT,
    defaultLabelPosition: FIELD_POSITION.ABOVE_INPUT,
    errorMessagePosition: FIELD_POSITION.ABOVE_FORM,
    submitActionMessagePosition: FIELD_POSITION.ABOVE_FORM,
    unstable_defaultFieldErrorPosition: FIELD_POSITION.BELOW_INPUT,
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
  modifyId: defaultModifyId,
  modifyClassName: defaultModifyClassName,
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
  initialValues: _initialValues,
  onReset = () => {},
  onSubmit,
  options: _options,
  validationSchema: _validationSchema,
  ...props
}) {
  if (!_form) requiredPropError("form");
  if (!_form.handle) objectError(requiredPropErrorMessage("handle"), _form);
  if (!_form.pages) objectError(requiredPropErrorMessage("pages"), _form);
  if (!onSubmit) requiredPropError("onSubmit");

  const [formErrorMessage, setFormErrorMessage] = useState();
  const [formSuccessMessage, setFormSuccessMessage] = useState();
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [submissionId, setSubmissionId] = useState(initialSubmissionId);

  const form = useMemo(() => {
    return merge({}, defaultForm, _form);
  }, [_form]);

  const page = useMemo(() => {
    return merge({}, defaultPage, form.pages[pageIndex]);
  }, [form, pageIndex]);

  const options = useMemo(() => {
    return merge({}, defaultOptions, _options);
  }, [_options]);

  const validationSchema = useMemo(() => {
    return _validationSchema ?? getFormValidationSchema(form);
  }, [form]);

  const pageValidationSchema = useMemo(() => {
    return validationSchema.pick(getPageFieldHandles(page));
  }, [validationSchema, page]);

  const defaultInitialValues = getFormDefaultValues(form);
  const initialValues = useMemo(() => {
    return merge({}, defaultInitialValues, _initialValues);
  }, [form, _initialValues]);

  // ❤ Formik
  const formik = useFormik({
    initialValues,
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
          actions.resetForm();
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
