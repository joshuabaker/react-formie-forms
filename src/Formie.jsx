import React, { forwardRef } from "react";
import { FormieForm } from "./components/FormieForm";
import { FormieProvider } from "./components";
import { useFormieForm } from "./useFormieForm";

export const Formie = forwardRef(
  (
    {
      components,
      form,
      initialErrors,
      initialPageIndex,
      initialStatus,
      initialSubmissionId,
      initialTouched,
      initialValues,
      innerRef,
      onReset,
      onSubmit,
      options,
      validate,
      validationSchema,
      ...props
    },
    ref
  ) => {
    const formie = useFormieForm({
      components,
      form,
      initialErrors,
      initialPageIndex,
      initialStatus,
      initialSubmissionId,
      initialTouched,
      initialValues,
      innerRef,
      onReset,
      onSubmit,
      options,
      validate,
      validationSchema,
    });

    return (
      <FormieProvider value={formie}>
        <FormieForm ref={ref} {...props} />
      </FormieProvider>
    );
  }
);
