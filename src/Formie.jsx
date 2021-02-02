import React, { forwardRef } from "react";
import { FormieForm } from "./components/FormieForm";
import { FormieProvider } from "./components/FormieContext";
import { useFormieForm } from "./useFormieForm";

export const Formie = forwardRef(
  (
    {
      id,
      components,
      enableReinitialize,
      form,
      initialErrors,
      initialPageIndex,
      initialStatus,
      initialSubmissionId,
      initialTouched,
      initialValues,
      innerRef,
      isInitialValid,
      onReset,
      onSubmit,
      options,
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnMount,
      validationSchema,
      ...props
    },
    ref
  ) => {
    const formie = useFormieForm({
      components,
      enableReinitialize,
      form,
      initialErrors,
      initialPageIndex,
      initialStatus,
      initialSubmissionId,
      initialTouched,
      initialValues,
      innerRef,
      isInitialValid,
      onReset,
      onSubmit,
      options,
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnMount,
      validationSchema,
    });

    return (
      <FormieProvider value={formie} key={formie.form.handle}>
        <FormieForm ref={ref} {...props} />
      </FormieProvider>
    );
  }
);
