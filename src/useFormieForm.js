import { useFormik } from "formik";
import findIndex from "lodash/findIndex";
import merge from "lodash/merge";
import noop from "lodash/noop";
import React, { useEffect, useMemo, useState } from "react";
import { BackButton } from "./components/BackButton";
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
import { BUTTON_POSITION, FIELD_POSITION, FIELD_TYPE } from "./types";
import {
  shouldShowConditionalField,
  shouldShowConditionalPage,
} from "./utils/conditional";
import {
  defaultModifyClassName,
  defaultModifyId,
  filterInvalid,
  filterShouldShow,
  getFormDefaultValues,
  isShownProp,
  isValidProp,
  parseRawForm,
  requiredPropError,
  validationSchemaProp,
} from "./utils/helpers";
import { getPageValidationSchema } from "./utils/validation";

export const defaultComponents = {
  [FIELD_TYPE.EMAIL]: (props) => <Input type={"email"} {...props} />,
  [FIELD_TYPE.FILE_UPLOAD]: FileUpload,
  [FIELD_TYPE.HIDDEN]: (props) => <Input type={"hidden"} {...props} />,
  [FIELD_TYPE.MULTI_LINE_TEXT]: MultiLineText,
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
  onReset = noop,
  onSubmit,
  options: _options,
  validationSchema: _validationSchema,
  ...props
}) {
  if (!_form) requiredPropError("form");
  if (!onSubmit) requiredPropError("onSubmit");

  const [formErrorMessage, setFormErrorMessage] = useState();
  const [formSuccessMessage, setFormSuccessMessage] = useState();
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [submissionId, setSubmissionId] = useState(initialSubmissionId);

  const form = useMemo(() => {
    return parseRawForm(merge({}, defaultForm, _form));
  }, [_form]);

  const defaultInitialValues = useMemo(() => {
    return getFormDefaultValues(form);
  }, [form]);

  const initialValues = useMemo(() => {
    return merge({}, defaultInitialValues, _initialValues);
  }, [defaultInitialValues, _initialValues]);

  const [formValues, setFormValues] = useState(initialValues);

  const pages = useMemo(() => {
    return form.pages.map((page) => {
      page.rows = page.rows.map((row) => ({
        ...row,
        fields: row.fields.map((field) => ({
          ...field,
          [isShownProp]: shouldShowConditionalField(field, formValues),
        })),
      }));

      const validationSchema = getPageValidationSchema(page);
      const isShown = shouldShowConditionalPage(page, formValues);

      return {
        ...page,
        [isValidProp]:
          !isShown || (isShown && validationSchema.isValidSync(formValues)),
        [isShownProp]: isShown,
        [validationSchemaProp]: validationSchema,
      };
    });
  }, [form.pages, formValues]);

  const page = useMemo(() => {
    return merge({}, defaultPage, pages[pageIndex]);
  }, [pages, pageIndex]);

  const options = useMemo(() => {
    return merge({}, defaultOptions, _options);
  }, [_options]);

  // ❤ Formik
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    onReset: handleReset,
    validationSchema: page[validationSchemaProp],
    ...props,
  });

  useEffect(() => {
    setFormValues(formik.values);
  }, [formik.values]);

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

        if (pageIndex === pages.length - 1) {
          // Reset the form
          actions.resetForm();
          setFormErrorMessage(undefined);
          setFormSuccessMessage(data.submitActionMessage);
          setPageIndex(0);
          setSubmissionId(undefined);
        } else {
          // Go to the next page
          const firstInvalidPageIndex = pages.findIndex(filterInvalid);
          const nextShownPageIndex = findIndex(
            pages,
            filterShouldShow,
            pageIndex + 1
          );

          setPageIndex(
            firstInvalidPageIndex >= 0
              ? firstInvalidPageIndex
              : nextShownPageIndex
          );
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
    setFormErrorMessage,
    setFormSuccessMessage,
    setPageIndex,
    setSubmissionId,
    submissionId,
    ...formik,
  };
}
